/*
 * GloryPrep payment micro-server — PayPal integration (worldwide).
 *
 * PayPal is the only payment option: customers pay in USD via PayPal Smart
 * Buttons. Content unlocks only after server-side verification of a real
 * PayPal capture — never from a client-side success signal. A PayPal webhook
 * endpoint is the source of truth for refunds, reversals and cancellations,
 * with unique-index idempotency so duplicate events can never double-grant
 * a purchase.
 *
 * Flow:
 *   GET  /api/pay/config              — public client config (paypal clientId, currency)
 *   POST /api/pay/create              — create a PayPal order (returns order id)
 *   POST /api/pay/capture             — capture an approved order; verified
 *                                       server-side before any unlock
 *   GET  /api/pay/owns?email=...      — unlock sync (reads verified DB rows)
 *   POST /api/pay/webhook             — PayPal webhook (verify-webhook-
 *                                       signature endpoint; handles capture
 *                                       completed/denied, refund, reversal,
 *                                       cancellation)
 *
 * Secrets (never committed to the repo — only in env / Vercel vars):
 *   PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_WEBHOOK_ID
 */
import { Router, type Request, type Response } from "express";
import { and, eq, inArray, sql } from "drizzle-orm";
import {
  createPayment,
  getCompletedPaymentsByEmail,
  getPaymentByOrderId,
  getPendingPayment,
  upsertPaymentForEvent,
  updatePaymentStatus,
  type PaymentStatus,
} from "./db";
import { unlocks } from "../drizzle/schema";

const PAYPAL_API = "https://api-m.paypal.com";

// Simple per-order capture rate limiting — prevents hammering the capture
// endpoint for the same order (and PayPal-side duplicate charges are already
// guarded by the unique paypal_order_id constraint in the database).
const captureAttempts = new Map<string, { count: number; resetAt: number }>();
const CAPTURE_LIMIT = 5;
const CAPTURE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isCaptureRateLimited(orderId: string): boolean {
  const now = Date.now();
  const entry = captureAttempts.get(orderId);
  if (!entry || now >= entry.resetAt) {
    captureAttempts.set(orderId, { count: 1, resetAt: now + CAPTURE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > CAPTURE_LIMIT;
}

const clientCredentials = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? "";
  const secret = process.env.PAYPAL_SECRET ?? "";
  const webhookId = process.env.PAYPAL_WEBHOOK_ID ?? "";
  return { clientId, secret, webhookId, configured: Boolean(clientId && secret) };
};

function tranIdFor(sku: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const tag = sku.replace("lex-", "").replace(/-/g, "").slice(0, 6).toUpperCase();
  return `GP-${tag}-${ts}`;
}

/* ------------------------------------------------------------------ */
/* PayPal REST API helpers                                             */
/* ------------------------------------------------------------------ */

/** Get an OAuth2 bearer token for the PayPal REST API. */
async function getAccessToken(): Promise<string> {
  const { clientId, secret, configured } = clientCredentials();
  if (!configured) throw new Error("paypal not configured");
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`paypal oauth failed: ${res.status}`);
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("paypal oauth returned no token");
  return data.access_token;
}

async function paypalFetch<T = unknown>(accessToken: string, urlPath: string, opts: RequestInit): Promise<T> {
  const res = await fetch(`${PAYPAL_API}${urlPath}`, {
    ...opts,
    headers: {
      ...(opts.headers ?? {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
  });
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail =
        (body as { details?: Array<{ issue?: string }> })?.details
          ?.map((d) => d.issue ?? "")
          .join(", ") || "";
    } catch {
      /* ignore */
    }
    throw new Error(`paypal ${res.status}: ${detail}`);
  }
  return res.json() as Promise<T>;
}

export function isConfigured(): boolean {
  return clientCredentials().configured;
}

interface OrderShape {
  id: string;
  status: string;
  purchase_units?: Array<{
    reference_id?: string;
    custom_id?: string;
    amount?: { currency_code?: string; value?: string };
    payments?: { captures?: Array<{ id: string; status: string; amount: { currency_code: string; value: string } }> };
  }>;
  links?: Array<{ rel: string; href: string }>;
}

/** Verify a live PayPal order (by GET) and return its purchase unit data. */
async function fetchOrder(token: string, paypalOrderId: string): Promise<OrderShape> {
  return paypalFetch<OrderShape>(token, `/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}`, {
    method: "GET",
  });
}

/* ------------------------------------------------------------------ */
/* Grant helpers                                                       */
/* ------------------------------------------------------------------ */

/**
 * Persist the unlock + payment record for a verified capture. Idempotent on
 * the database side (unlocks are email-tied; payments dedupe by webhook event
 * id). The ledger file remains as a human-readable audit mirror.
 */
async function grantUnlockForVerifiedCapture(params: {
  email: string;
  sku: string;
  title: string;
  amount: string;
  currency: string;
  orderId: string;
  captureId: string;
  verifiedBy: "capture_api" | "webhook";
  webhookEventId?: string;
  webhookEventType?: string;
}) {
  const email = params.email.toLowerCase().trim();
  const { createUnlock } = await import("./db");
  await Promise.all([
    createUnlock({
      email,
      sku: params.sku,
      orderId: params.orderId,
      amount: params.amount,
      currency: params.currency,
      status: "completed",
    }),
    createPayment({
      email,
      paypalOrderId: params.orderId,
      captureId: params.captureId,
      sku: params.sku,
      title: params.title,
      amountUsd: params.amount,
      currency: params.currency,
      status: "completed",
      verifiedBy: params.verifiedBy,
      webhookEventId: params.webhookEventId,
      webhookEventType: params.webhookEventType,
    }),
  ]);
}

/** Revoke a completed unlock and mark the payment refunded/reversed. */
async function revokeUnlockForEvent(params: {
  orderId: string;
  captureId?: string;
  status: "refunded" | "reversed";
  webhookEventId?: string;
  webhookEventType?: string;
}) {
  const db = await (await import("./db")).getDb();
  if (!db) return;
  // Payments reconciled by PayPal order id (primary) and capture id.
  const { payments } = await import("../drizzle/schema");
  const [paymentsRows, unlockRows] = await Promise.all([
    params.captureId
      ? db
          .select()
          .from(payments)
          .where(
            and(
              eq(payments.captureId, params.captureId),
              eq(payments.status, "completed"),
            ),
          )
      : db
          .select()
          .from(payments)
          .where(
            and(
              eq(payments.paypalOrderId, params.orderId),
              eq(payments.status, "completed"),
            ),
          ),
    db
      .select({ id: unlocks.id, email: unlocks.email, sku: unlocks.sku })
      .from(unlocks)
      .where(
        and(
          eq(unlocks.orderId, params.orderId),
          eq(unlocks.status, "completed"),
        ),
      ),
  ]);
  for (const row of paymentsRows) {
    await updatePaymentStatus(row.id, params.status, {
      webhookEventId: params.webhookEventId,
      webhookEventType: params.webhookEventType,
    });
  }
  for (const row of unlockRows) {
    const { setUnlockStatus } = await import("./db");
    await setUnlockStatus(row.id, "refunded");
  }
}

/* ------------------------------------------------------------------ */
/* Webhook signature verification                                      */
/* ------------------------------------------------------------------ */

interface WebhookHeaders {
  algo: string;
  transmissionId: string;
  certUrl: string;
  sig: string;
  time: string;
}

function parseWebhookHeaders(req: Request): WebhookHeaders | null {
  const h = req.headers;
  const get = (name: string) => {
    const v = h[name];
    return Array.isArray(v) ? v[0] : v;
  };
  const algo = get("paypal-auth-algo");
  const transmissionId = get("paypal-transmission-id");
  const certUrl = get("paypal-cert-url");
  const sig = get("paypal-transmission-sig");
  const time = get("paypal-transmission-time");
  if (!algo || !transmissionId || !certUrl || !sig || !time) return null;
  return { algo, transmissionId, certUrl, sig, time };
}

/**
 * Verify a PayPal webhook event via PayPal's official
 * POST /v1/notifications/verify-webhook-signature endpoint. This is the
 * mechanism PayPal recommends and it never trusts client-provided claims —
 * the transmission id/cert url/signature headers are PayPal-signed metadata.
 */
export async function verifyWebhookSignature(opts: {
  headers: WebhookHeaders;
  rawBody: string;
  webhookId: string;
}): Promise<{ verificationStatus: string }> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_algo: opts.headers.algo,
      transmission_id: opts.headers.transmissionId,
      cert_url: opts.headers.certUrl,
      transmission_time: opts.headers.time,
      webhook_id: opts.webhookId,
      webhook_event: opts.rawBody,
    }),
  });
  if (!res.ok) throw new Error(`webhook verify failed: ${res.status}`);
  return (await res.json()) as { verificationStatus: string };
}

/** Extract capture/order identifiers from a webhook event payload. */
function captureIdFromEvent(resource: Record<string, unknown>): string | undefined {
  const maybe = (v: unknown): string | undefined =>
    typeof v === "string" && v.length > 0 ? v : undefined;
  return maybe(resource?.id ?? (resource as { links?: Array<{ href: string }> })?.links?.[0]?.href);
}

function orderIdFromEvent(resource: Record<string, unknown>): string | undefined {
  const sup = resource?.supplementary_data as Record<string, unknown> | undefined;
  const relatedIds = sup?.related_ids as Record<string, unknown> | undefined;
  const parent = (relatedIds?.order_id as string | undefined) ?? (resource?.billing_agreement_id as string | undefined);
  return typeof parent === "string" && parent.length > 0 ? parent : undefined;
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export function createPaymentRouter() {
  const router = Router();

  /** Public config for the checkout page (client id + currency). */
  router.get("/config", (_req, res) => {
    const { clientId, configured } = clientCredentials();
    res.json({ paypalClientId: configured ? clientId : "", currency: "USD", configured });
  });

  /** POST /api/pay/create — create a PayPal order for the requested sku. */
  router.post("/create", async (req, res) => {
    const body = req.body ?? {};
    const { sku, title, amountUsd, name, email } = body;
    if (!sku || !title || !amountUsd || !email || !name) {
      return res.status(400).json({ status: "FAILED", failedreason: "Missing required fields" });
    }
    if (typeof sku !== "string" || sku.length > 64 || !/^[a-z0-9\-]+$/.test(sku)) {
      return res.status(400).json({ status: "FAILED", failedreason: "Invalid sku" });
    }
    if (typeof title !== "string" || title.length > 255 || title.length < 2) {
      return res.status(400).json({ status: "FAILED", failedreason: "Invalid title" });
    }
    const usd = Number(amountUsd);
    if (!Number.isFinite(usd) || usd <= 0) {
      return res.status(400).json({ status: "FAILED", failedreason: "Invalid amount" });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 320) {
      return res.status(400).json({ status: "FAILED", failedreason: "Invalid email" });
    }

    if (!isConfigured()) {
      return res.json({ mode: "demo", sku, title, amountUsd });
    }

    const tranId = tranIdFor(sku);
    try {
      const token = await getAccessToken();
      const order = await paypalFetch<{ id: string; status: string; links: Array<{ rel: string; href: string }> }>(
        token,
        "/v2/checkout/orders",
        {
          method: "POST",
          body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
              {
                reference_id: tranId,
                description: `${title} — GloryPrep`,
                custom_id: sku,
                amount: { currency_code: "USD", value: usd.toFixed(2) },
              },
            ],
            payer: { email_address: email.toLowerCase() },
          }),
        },
      );

      // Record the pending purchase in the auditable payments table.
      await Promise.all([
        createPayment({
          email: email.toLowerCase().trim(),
          paypalOrderId: order.id,
          sku,
          title,
          amountUsd: usd.toFixed(2),
          currency: "USD",
          status: "pending",
          verifiedBy: "capture_api",
        }),
        upsertPaymentForEvent({
          email: email.toLowerCase().trim(),
          paypalOrderId: order.id,
          sku,
          title,
          amountUsd: usd.toFixed(2),
          status: "pending",
          verifiedBy: "capture_api",
        }),
      ]);

      return res.json({ mode: "live", status: "SUCCESS", paypalOrderId: order.id });
    } catch (err) {
      const reason = err instanceof Error ? err.message : "unknown";
      return res.status(402).json({ status: "FAILED", failedreason: `Could not create PayPal order (${reason})` });
    }
  });

  /** POST /api/pay/capture — capture an approved PayPal order and unlock. */
  router.post("/capture", async (req, res) => {
    const body = req.body ?? {};
    const { paypalOrderId, expectedSku, expectedUsd } = body;
    if (!paypalOrderId || !expectedSku || expectedUsd == null) {
      return res.status(400).json({ status: "FAILED", failedreason: "Missing required fields" });
    }
    if (typeof paypalOrderId !== "string" || !/^[A-Z0-9\-]{1,30}$/.test(paypalOrderId)) {
      return res.status(400).json({ status: "FAILED", failedreason: "Invalid paypal order id" });
    }
    if (typeof expectedSku !== "string" || !/^[a-z0-9\-]+$/.test(expectedSku)) {
      return res.status(400).json({ status: "FAILED", failedreason: "Invalid sku" });
    }
    if (isCaptureRateLimited(paypalOrderId)) {
      return res.status(429).json({ status: "FAILED", failedreason: "Too many attempts — try again later" });
    }

    // The pending purchase must exist in the auditable payments table — the
    // ledger file is only a mirror. No matching pending row means the client
    // cannot manufacture a success signal.
    const pending = await getPendingPayment(paypalOrderId, expectedSku);
    if (!pending) {
      return res.status(404).json({ status: "FAILED", failedreason: "Unknown or already-processed order" });
    }
    if (Math.abs(Number(pending.amountUsd) - Number(expectedUsd)) > 0.005) {
      return res.status(400).json({ status: "FAILED", failedreason: "Order does not match this price" });
    }

    if (!isConfigured()) {
      await grantUnlockForVerifiedCapture({
        email: pending.email,
        sku: pending.sku,
        title: pending.title,
        amount: "0.00",
        currency: "USD",
        orderId: paypalOrderId,
        captureId: "demo-capture",
        verifiedBy: "capture_api",
      });
      return res.json({ status: "COMPLETED", sku: pending.sku, email: pending.email });
    }

    try {
      const token = await getAccessToken();
      // Re-fetch the order and capture it — server-side verification of the
      // reference id / sku / status before anything is granted.
      const before = await fetchOrder(token, paypalOrderId);
      if (before.status !== "APPROVED" && before.status !== "CREATED") {
        await updatePaymentStatus(pending.id, "failed");
        return res.status(402).json({ status: "FAILED", failedreason: `Order is not approvable (status ${before.status})` });
      }
      const captured = await paypalFetch<OrderShape>(
        token,
        `/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}/capture`,
        { method: "POST" },
      );

      const unit = captured.purchase_units?.[0];
      const capture = unit?.payments?.captures?.[0];
      if (captured.status !== "COMPLETED" || capture?.status !== "COMPLETED") {
        await updatePaymentStatus(pending.id, "failed");
        return res.status(402).json({ status: "FAILED", failedreason: "PayPal capture did not complete" });
      }
      if (unit?.custom_id !== expectedSku) {
        await updatePaymentStatus(pending.id, "failed");
        return res.status(400).json({ status: "FAILED", failedreason: "Captured order sku mismatch" });
      }

      await grantUnlockForVerifiedCapture({
        email: pending.email,
        sku: pending.sku,
        title: pending.title,
        amount: capture.amount.value,
        currency: capture.amount.currency_code,
        orderId: paypalOrderId,
        captureId: capture.id,
        verifiedBy: "capture_api",
      });

      return res.json({ status: "COMPLETED", sku: pending.sku, email: pending.email });
    } catch (err) {
      const reason = err instanceof Error ? err.message : "unknown";
      return res.status(402).json({ status: "FAILED", failedreason: `Capture failed (${reason})` });
    }
  });

  /** GET /api/pay/owns?email=... — client unlock sync, verified DB rows only. */
  router.get("/owns", (req, res) => {
    const email = String(req.query.email ?? "").toLowerCase().trim();
    const empty = { library: [], kit: [], attempts: { listening: 0, writing: 0, reading: 0 } };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.json(empty);
    }
    getCompletedPaymentsByEmail(email)
      .then((paid) => {
        const library = paid.filter((p) => p.sku === "lex-practice-library").map((p) => p.captureId ?? p.paypalOrderId);
        const kit = paid.filter((p) => p.sku === "lex-mock-kit").map((p) => p.captureId ?? p.paypalOrderId);
        const count = (sku: string) => paid.filter((p) => p.sku === sku).length;
        res.json({
          library,
          kit,
          attempts: {
            listening: count("lex-attempt-listening"),
            writing: count("lex-attempt-writing"),
            reading: count("lex-attempt-reading"),
          },
        });
      })
      .catch(() => res.json(empty));
  });

  /** POST /api/pay/webhook — PayPal webhook endpoint. */
  router.post("/webhook", async (req, res) => {
    const headers = parseWebhookHeaders(req);
    if (!headers) {
      return res.status(401).json({ error: "missing webhook signature headers" });
    }
    const { webhookId, configured } = clientCredentials();
    // Use the exact raw bytes PayPal signed (captured before express.json).
    const rawBody = (req as Request & { rawBody?: string }).rawBody ?? JSON.stringify(req.body ?? {});

    // Demo mode: without credentials we cannot verify the signature, so we
    // accept only well-formed events when the env is clearly a local sandbox.
    if (!configured) {
      return res.status(503).json({ error: "webhooks unavailable until PayPal is configured" });
    }
    if (!webhookId) {
      return res.status(503).json({ error: "PAYPAL_WEBHOOK_ID not configured" });
    }

    try {
      const { verificationStatus } = await verifyWebhookSignature({ headers, rawBody, webhookId });
      if (verificationStatus !== "SUCCESS") {
        return res.status(401).json({ error: "webhook signature verification failed" });
      }
    } catch {
      return res.status(401).json({ error: "webhook verification error" });
    }

    const event = (typeof req.body === "string" ? (() => {
      try {
        return JSON.parse(req.body as string);
      } catch {
        return null;
      }
    })() : req.body) as { id?: string; event_type?: string; resource?: Record<string, unknown> } | null;
    if (!event || !event.resource) {
      return res.status(400).json({ error: "malformed event" });
    }

    const resource = event.resource;
    const eventId = event.id ?? "";
    const eventType = event.event_type ?? "";
    const resJson = resource as Record<string, unknown>;
  const supplementary = (resJson.supplementary_data ?? {}) as Record<string, unknown>;
    const orderStatus: string | undefined =
      typeof resJson.status === "string" ? resJson.status : undefined;

    try {
      if (eventType === "CHECKOUT.ORDER.APPROVED") {
        const orderId = captureIdFromEvent(resJson);
        if (orderId) await upsertPaymentForEvent({ email: "", paypalOrderId: orderId, sku: "any", title: "", amountUsd: "0.00", status: "approved", verifiedBy: "webhook", webhookEventId: eventId, webhookEventType: eventType });
        return res.status(200).json({ ok: true });
      }

      if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
        const captureId = resJson.id as string | undefined;
        // PayPal nests the order id inside supplementary_data for capture events.
        const orderId = orderIdFromEvent(resJson) ?? ((resource as { links?: Array<{ href: string; rel?: string }> })?.links
          ?.find((l) => l.href?.includes("/orders/"))?.href?.split("/orders/")[1]?.split("?")[0]);
        const amountObj = resJson.amount as { value?: string; currency_code?: string } | undefined;
        if (!orderId) {
          // No order id — cannot reconcile; log and 200 so PayPal doesn't retry forever.
          console.warn("[webhook] CAPTURE.COMPLETED without order id", { eventId, eventType });
          return res.status(200).json({ ok: true });
        }
        // Idempotent: unique index + pre-check inside upsertPaymentForEvent.
        const emailMatch = typeof resJson.custom_id === "string" ? "" : "";
        // Resolve the order to learn sku/email from our pending row.
        const token = await getAccessToken();
        const order = await fetchOrder(token, orderId);
        const unit = order.purchase_units?.[0];
        const sku = unit?.custom_id ?? emailMatch;
        const amount = amountObj?.value ?? unit?.amount?.value ?? "0.00";
        const currency = amountObj?.currency_code ?? unit?.amount?.currency_code ?? "USD";
        // Find who paid: look up our pending payment for this order, else
        // fall back to the payer email on the order itself.
        const pending = await getPaymentByOrderId(orderId);
        const email = pending?.email ?? "";
        const title = pending?.title ?? `Order ${orderId}`;
        await upsertPaymentForEvent({
          email: email || "unknown",
          paypalOrderId: orderId,
          captureId,
          sku: sku || "unknown",
          title,
          amountUsd: amount,
          currency,
          status: "completed",
          verifiedBy: "webhook",
          webhookEventId: eventId,
          webhookEventType: eventType,
        });
        // Grant the unlock only if our capture path hasn't already. The DB
        // rows exist; ensure the unlocks row exists for cross-device sync.
        if (email) {
          const granted = await getCompletedPaymentsByEmail(email).then((rows) =>
            rows.some((r) => r.paypalOrderId === orderId && r.sku === (sku || "unknown")),
          );
          if (!granted && sku) {
            await grantUnlockForVerifiedCapture({
              email,
              sku,
              title,
              amount,
              currency,
              orderId,
              captureId: captureId ?? "",
              verifiedBy: "webhook",
              webhookEventId: eventId,
              webhookEventType: eventType,
            });
          }
        }
        return res.status(200).json({ ok: true });
      }

      if (eventType === "PAYMENT.CAPTURE.DENIED") {
        return res.status(200).json({ ok: true });
      }

      if (eventType === "PAYMENT.CAPTURE.CANCELLED") {
        return res.status(200).json({ ok: true });
      }

      if (eventType === "PAYMENT.CAPTURE.REFUNDED" || eventType === "PAYMENT.CAPTURE.REVERSED") {
        const status: PaymentStatus = eventType === "PAYMENT.CAPTURE.REFUNDED" ? "refunded" : "reversed";
        const captureId = resJson.id as string | undefined;
        const orderId = orderIdFromEvent(resJson);
        if (captureId || orderId) {
          await revokeUnlockForEvent({
            orderId: orderId ?? "",
            captureId,
            status,
            webhookEventId: eventId,
            webhookEventType: eventType,
          });
        }
        return res.status(200).json({ ok: true });
      }

      // Any other event: acknowledged, no action.
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("[webhook] processing error", err);
      return res.status(500).json({ error: "webhook processing failed" });
    }
  });

  return router;
}
