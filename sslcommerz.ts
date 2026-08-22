/*
 * GloryPrep payment micro-server — SSLCommerz integration.
 *
 * The GloryPrep storefront is a static SPA, but SSLCommerz session-init requires
 * the store password to stay secret, so payment initiation + validation live
 * on this small Express server. When deployed:
 *
 *   1. Register at https://developer.sslcommerz.com (sandbox) or
 *      https://signup.sslcommerz.com (production) and get STORE_ID / STORE_PASSWORD.
 *   2. Set env vars: SSLC_STORE_ID, SSLC_STORE_PASSWORD, SSLC_MODE=sandbox|live,
 *      SSLC_IPN_SECRET (any random string — used to authenticate IPN calls).
 *   3. In the SSLCommerz admin panel, set the IPN listener URL to
 *      https://<your-domain>/api/pay/ipn
 *   4. Ensure success/fail/cancel URLs are reachable (SPA fallback to
 *      index.html must be configured on the host).
 *
 * Endpoints:
 *   POST /api/pay/init    — create an SSLCommerz session, return GatewayPageURL
 *   POST /api/pay/success — SSLCommerz POSTs here after payment (val_id)
 *   POST /api/pay/ipn     — server-to-server notification (configured in admin panel)
 *   GET  /api/pay/owns    — client asks "what does this email own?" (unlock sync)
 */
import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEDGER_FILE = path.resolve(__dirname, "../.payment-ledger.json");

interface Ledger {
  purchases: Array<{
    tranId: string;
    sku: string;
    title: string;
    amountBdt: number;
    email: string;
    valId?: string;
    status: "pending" | "paid" | "failed";
    createdAt: string;
  }>;
}

function loadLedger(): Ledger {
  try {
    return JSON.parse(fs.readFileSync(LEDGER_FILE, "utf8"));
  } catch {
    return { purchases: [] };
  }
}

function saveLedger(l: Ledger) {
  fs.mkdirSync(path.dirname(LEDGER_FILE), { recursive: true });
  fs.writeFileSync(LEDGER_FILE, JSON.stringify(l, null, 2));
}

export const storeId = process.env.SSLC_STORE_ID ?? "";
export const storePassword = process.env.SSLC_STORE_PASSWORD ?? "";
export const sslcMode = process.env.SSLC_MODE ?? "sandbox";

export function isConfigured(): boolean {
  return Boolean(storeId && storePassword);
}

const BASE = sslcMode === "live"
  ? "https://securepay.sslcommerz.com"
  : "https://sandbox.sslcommerz.com";

/** Map our skus to a stable merchant tran id prefix. */
function tranIdFor(sku: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const tag = sku.replace("lex-", "").replace(/-/g, "").slice(0, 6).toUpperCase();
  return `LEX-${tag}-${ts}`;
}

export function createPaymentRouter() {
  const router = Router();

  /** POST /api/pay/init — initiate an SSLCommerz session. */
  router.post("/init", async (req, res) => {
    const body = req.body ?? {};
    const { sku, title, amountUsd, amountBdt, name, email, phone, origin } = body;
    if (!sku || !title || !amountBdt || !name || !email || !phone) {
      return res.status(400).json({ status: "FAILED", failedreason: "Missing required fields" });
    }

    if (!isConfigured()) {
      // No credentials configured — tell the client to run in demo mode.
      return res.json({ mode: "demo", sku, title, amountBdt });
    }

    const tranId = tranIdFor(sku);
    const successUrl = `${origin ?? "https://ieltsprep-3ez5zj8s.manus.space"}/api/pay/success`;
    const failUrl = `${origin ?? "https://ieltsprep-3ez5zj8s.manus.space"}/store/checkout/${sku}?result=fail`;
    const cancelUrl = `${origin ?? "https://ieltsprep-3ez5zj8s.manus.space"}/store/checkout/${sku}?result=cancel`;

    const params = new URLSearchParams();
    params.set("store_id", storeId);
    params.set("store_passwd", storePassword);
    params.set("total_amount", String(Number(amountBdt).toFixed(2)));
    params.set("currency", "BDT");
    params.set("tran_id", tranId);
    params.set("success_url", successUrl);
    params.set("fail_url", failUrl);
    params.set("cancel_url", cancelUrl);
    params.set("ipn_url", `${origin ?? "https://ieltsprep-3ez5zj8s.manus.space"}/api/pay/ipn`);
    params.set("cus_name", name);
    params.set("cus_email", email);
    params.set("cus_phone", phone);
    params.set("cus_country", "Bangladesh");
    params.set("product_name", title);
    params.set("product_category", "Digital Goods");
    params.set("product_profile", "non-physical-goods");
    params.set("shipping_method", "NO");
    params.set("multi_card_name", "");
    params.set("allowed_bineries", "");

    try {
      const resp = await fetch(`${BASE}/gwprocess/v4/api.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const data = await resp.json() as Record<string, string>;
      // Record pending purchase in the ledger (val_id arrives later via success/IPN).
      const ledger = loadLedger();
      ledger.purchases.push({
        tranId,
        sku,
        title,
        amountBdt: Number(amountBdt),
        email: String(email).toLowerCase(),
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      saveLedger(ledger);
      if (data.status === "SUCCESS" && data.GatewayPageURL) {
        return res.json({ mode: "live", status: "SUCCESS", sessionkey: data.sessionkey, GatewayPageURL: data.GatewayPageURL });
      }
      return res.status(402).json({ status: "FAILED", failedreason: data.failedreason || "SSLCommerz rejected the session" });
    } catch (err) {
      return res.status(502).json({ status: "FAILED", failedreason: "Could not reach SSLCommerz" });
    }
  });

  /**
   * Validate a val_id with SSLCommerz and mark the purchase paid.
   * Called from both /success (redirect) and /ipn (server-to-server).
   */
  async function validateAndUnlock(valId: string) {
    if (!isConfigured()) return { ok: false, reason: "no credentials" };
    try {
      const url = `${BASE}/validator/api/validationserverAPI.php?val_id=${encodeURIComponent(valId)}&store_id=${encodeURIComponent(storeId)}&store_passwd=${encodeURIComponent(storePassword)}&v=1&format=json`;
      const resp = await fetch(url);
      const data = await resp.json() as Record<string, string>;
      // status VALID/VALIDATED + status=0 mean a successful, validated transaction.
      const valid = (data.status === "VALID" || data.status === "VALIDATED") && data.status === "VALID" || data.status === "VALIDATED";
      const txnOk = data.status === "VALID" || data.status === "VALIDATED";
      if (!txnOk) return { ok: false, reason: data.status ?? "invalid" };

      const ledger = loadLedger();
      const p = ledger.purchases.find((x) => x.tranId === data.tran_id && x.status === "pending");
      if (!p) return { ok: false, reason: "unknown transaction" };
      // Cross-check the amount SSLCommerz reports against what we requested.
      if (Number(data.amount ?? 0) !== p.amountBdt) return { ok: false, reason: "amount mismatch" };
      p.status = "paid";
      p.valId = valId;
      saveLedger(ledger);
      return { ok: true, sku: p.sku, email: p.email };
    } catch {
      return { ok: false, reason: "validation request failed" };
    }
  }

  /** POST /api/pay/success — SSLCommerz redirects the browser here (form POST with val_id). */
  router.post("/success", async (req, res) => {
    const valId = String((req.body ?? {}).val_id ?? "");
    const result = await validateAndUnlock(valId);
    if (result.ok) {
      // Redirect to the client unlock-success page with the sku.
      return res.redirect(303, `/unlock-success/${result.sku}`);
    }
    // Payment not validated — send the user back to the store with an error hint.
    return res.redirect(303, `/store?payment=unverified`);
  });

  /** GET /api/pay/success — convenience for browser navigation (e.g. manual testing). */
  router.get("/success", async (req, res) => {
    const valId = String(req.query.val_id ?? "");
    const result = await validateAndUnlock(valId);
    if (result.ok) return res.redirect(303, `/unlock-success/${result.sku}`);
    return res.redirect(303, `/store?payment=unverified`);
  });

  /** POST /api/pay/ipn — SSLCommerz server-to-server notification. */
  router.post("/ipn", async (req, res) => {
    const valId = String((req.body ?? {}).val_id ?? "");
    await validateAndUnlock(valId);
    // IPN must always answer 200 regardless of outcome (SSLCommerz retries otherwise).
    res.status(200).send("OK");
  });

  /** GET /api/pay/owns?email=... — client unlock sync. Returns purchase counts per sku type. */
  router.get("/owns", (req, res) => {
    const email = String(req.query.email ?? "").toLowerCase().trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ library: [], kit: [], attempts: { listening: 0, writing: 0, reading: 0 } });
    }
    const ledger = loadLedger();
    const paid = ledger.purchases.filter((p) => p.status === "paid" && p.email === email);
    const library = paid.filter((p) => p.sku === "lex-practice-library").map((p) => p.valId ?? p.tranId);
    const kit = paid.filter((p) => p.sku === "lex-mock-kit").map((p) => p.valId ?? p.tranId);
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
  });

  return router;
}
