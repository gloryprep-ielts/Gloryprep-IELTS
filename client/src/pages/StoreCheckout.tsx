import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { getSku, loadUnlocks, saveUnlocks } from "../lib/store";
import { useSeo } from "../components/ShellExtras";
import { useAuth } from "@/_core/hooks/useAuth";

declare global {
  interface Window {
    paypal?: {
      Buttons: (opts: {
        style?: { layout: string; color?: string; shape?: string; label?: string; height?: number };
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onCancel?: () => void;
        onError: (err: unknown) => void;
      }) => { render: (el: string | HTMLElement) => void; isEligible: () => boolean };
    };
  }
}

export default function StoreCheckout() {
  const [, params] = useRoute("/store/checkout/:sku");
  const sku = params?.sku ?? "";
  const item = useMemo(() => getSku(sku) ?? null, [sku]);
  const { user, loading: authLoading } = useAuth();
  const product = item as NonNullable<typeof item>;
  const includes = product && "includes" in product ? product.includes : [];

  useSeo(item ? `Checkout — ${product.title} — GloryPrep IELTS` : "Checkout — GloryPrep IELTS", "Complete your one-time payment and unlock GloryPrep practice content instantly.");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState("");
  const [paypalReady, setPaypalReady] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  const buttonsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const sdkLoaded = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sku]);

  if (!item) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Item not found</h1>
      </div>
    );
  }

  if (authLoading) {
    return <div className="min-h-[60vh] bg-paper" aria-label="Checking checkout access" />;
  }

  if (!user) {
    const next = encodeURIComponent(`/store/checkout/${sku}`);
    return (
      <div className="min-h-screen bg-paper px-5 py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-ember/15 bg-paper-soft p-8 text-center shadow-sm">
          <p className="folio text-ember">Secure checkout</p>
          <h1 className="mt-3 font-display text-3xl font-black text-ink">Continue with your GloryPrep account</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Sign in or create an account only to complete this purchase and keep your unlock available across devices.
          </p>
          <Link
            href={`/login?next=${next}`}
            className="press mt-7 inline-flex rounded-full bg-ember px-6 py-3 text-sm font-bold text-paper transition-colors hover:bg-ember/90"
          >
            Continue securely
          </Link>
        </div>
      </div>
    );
  }

  async function validateForm(): Promise<{ ok: boolean }> {
    setError("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address — unlocks are tied to it.");
      return { ok: false };
    }
    if (name.trim().length < 2) { setError("Please enter your name."); return { ok: false }; }
    if (!agree) { setError("Please accept the terms to continue."); return { ok: false }; }
    return { ok: true };
  }

  function applyDemoUnlock() {
    const u = loadUnlocks();
    if (product.kind === "library") {
      u.library = [...(u.library ?? []), `${product.sku}-demo`];
    } else if (product.kind === "kit") {
      u.kit = [...(u.kit ?? []), `${product.sku}-demo`];
    } else if (product.kind === "attempt") {
      const att = u.attempts ?? { listening: 0, writing: 0, reading: 0 };
      const skill = (item as { skill: string }).skill.toLowerCase() as "listening" | "writing" | "reading";
      u.attempts = { ...att, [skill]: att[skill] + (item as { attempts: number }).attempts };
    }
    u.email = email.trim().toLowerCase();
    saveUnlocks(u);
  }

  /** Capture an already-approved PayPal order and redirect on success. */
  async function captureOrder(orderId: string): Promise<void> {
    try {
      const res = await fetch("/api/pay/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paypalOrderId: orderId,
          expectedSku: product.sku,
          expectedUsd: product.priceUsd,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "COMPLETED") {
        setDetails(`Payment could not be completed: ${data.failedreason ?? "Please try again or contact support."}`);
        setBusy(false);
        return;
      }
      if (data.demo) applyDemoUnlock();
      window.location.href = `/unlock-success/${product.sku}${data.demo ? "?demo=1" : ""}`;
    } catch {
      setDetails("Network error — your payment may still have completed. Contact support with your email and order id.");
      setBusy(false);
    }
  }

  /** Load the PayPal script once and render the Smart Buttons. */
  async function loadPaypal() {
    setPaypalError("");
    try {
      const configRes = await fetch("/api/pay/config");
      const config = await configRes.json() as { paypalClientId: string; currency: string; configured: boolean };
      if (!config.configured) {
        // No live credentials — render in simulated demo mode.
        setPaypalReady(true);
        setDetails(
          "Demo mode: no live payment credentials configured yet. Click the orange button below to simulate the unlock instantly.",
        );
        return;
      }
      if (sdkLoaded.current && window.paypal) { renderButtons(); return; }
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(config.paypalClientId)}&currency=${encodeURIComponent(config.currency)}&intent=capture`;
      script.async = true;
      script.onload = () => { sdkLoaded.current = true; renderButtons(); };
      script.onerror = () => setPaypalError("Could not load PayPal. Please check your connection and try again.");
      document.head.appendChild(script);
    } catch {
      setPaypalError("Could not prepare checkout. Please try again.");
    }
  }

  function renderButtons() {
    if (!window.paypal || !buttonsRef.current) { setPaypalError("PayPal could not start — please refresh the page."); return; }
    const btn = window.paypal.Buttons({
      style: { layout: "horizontal", color: "gold", shape: "pill", label: "paypal", height: 48 },
      createOrder: async () => {
        const v = await validateForm();
        if (!v.ok) throw new Error("validation");
        setBusy(true);
        setDetails("");
        const res = await fetch("/api/pay/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sku: product.sku,
            title: product.title,
            amountUsd: product.priceUsd,
            name: name.trim(),
            email: email.trim().toLowerCase(),
          }),
        });
        const data = await res.json();
        if (data.mode === "demo") {
          // Fallback demo: no live credentials — simulate immediately.
          applyDemoUnlock();
          window.location.href = `/unlock-success/${product.sku}?demo=1`;
          throw new Error("demo-redirect");
        }
        if (!res.ok || !data.paypalOrderId) {
          setBusy(false);
          throw new Error(data.failedreason ?? "Could not start the payment");
        }
        return data.paypalOrderId;
      },
      onApprove: async (data) => {
        setDetails("Completing your payment — please wait…");
        await captureOrder(data.orderID);
      },
      onCancel: () => {
        setBusy(false);
        setDetails("Payment cancelled — nothing was charged. Try again whenever you're ready.");
      },
      onError: (err) => {
        setBusy(false);
        if (err instanceof Error && err.message === "validation") return;
        if (err instanceof Error && err.message === "demo-redirect") return;
        setDetails(`Something went wrong: ${err instanceof Error ? err.message : "PayPal error"} — please try again.`);
      },
    });
    if (btn.isEligible()) {
      btn.render(buttonsRef.current);
      setPaypalReady(true);
    } else {
      // Not eligible (e.g. old browser / logged-out edge cases): show manual fallback.
      setPaypalError("Your browser could not load PayPal — try a different browser or contact support.");
    }
  }

  const ready = !busy && paypalReady;

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 lg:grid-cols-[1.4fr_1fr] lg:py-16">
        <div>
          <Link href="/store" className="text-sm text-taupe hover:text-ink">&larr; Back to store</Link>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">Checkout</h1>
          <p className="mt-2 text-sm text-ink-soft">
            One-time payment. Your email is only used to record the unlock so it persists across devices.
          </p>

          {/* Customer details */}
          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full rounded-lg border border-ink/15 bg-paper-soft px-4 py-3 text-sm text-ink outline-none transition-shadow focus:border-ember/60 focus:shadow-[0_0_0_3px_rgba(232,93,38,0.12)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-ink/15 bg-paper-soft px-4 py-3 text-sm text-ink outline-none transition-shadow focus:border-ember/60 focus:shadow-[0_0_0_3px_rgba(232,93,38,0.12)]"
              />
              <p className="mt-1 text-xs text-taupe">Unlocks are tied to this email — use one you can access later.</p>
            </div>

            <label className="flex items-start gap-3 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#E85D26]"
              />
              <span>
                I agree to the <Link href="/terms" className="text-ember underline-offset-2 hover:underline">Terms</Link> and{" "}
                <Link href="/privacy" className="text-ember underline-offset-2 hover:underline">Privacy Policy</Link>.
                Digital content — no refunds once content is unlocked, except where consumer law requires.
              </span>
            </label>

            {error && (
              <div className="rounded-lg border border-red-400/40 bg-red-500/5 px-4 py-3 text-sm text-red-700">{error}</div>
            )}
            {details && (
              <div className="rounded-lg border border-amber-400/50 bg-amber-50 px-4 py-3 text-sm text-amber-800">{details}</div>
            )}
            {paypalError && (
              <div className="rounded-lg border border-red-400/40 bg-red-500/5 px-4 py-3 text-sm text-red-700">{paypalError}</div>
            )}

            <div className="rounded-2xl border border-ink/10 bg-paper-soft p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe">Pay securely with PayPal</p>
              <p className="mt-1 text-xs text-ink-soft">Cards, PayPal balance, and Apple Pay supported. No account needed to pay with a card.</p>
              {!ready && (
                <button
                  type="button"
                  onClick={() => { void validateForm().then((v) => v.ok && void loadPaypal()); }}
                  disabled={busy}
                  className="mt-4 w-full rounded-full bg-[#FFC439] px-6 py-3.5 text-sm font-bold text-[#003087] shadow-[0_8px_20px_-6px_rgba(255,196,57,0.5)] transition-all hover:brightness-95 disabled:opacity-60"
                >
                  {busy ? "Preparing secure payment…" : `Continue to PayPal — $${product.priceUsd.toFixed(2)}`}
                </button>
              )}
              <div ref={buttonsRef} className={ready ? "mt-4" : "hidden"} />
            </div>
            <div ref={detailsRef} />

            <p className="text-center text-xs text-taupe">
              Payments processed by PayPal — accepted worldwide.
            </p>
          </div>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-ink/10 bg-paper-soft p-6 shadow-[0_1px_0_rgba(22,20,15,0.06),0_12px_32px_-16px_rgba(22,20,15,0.18)] lg:sticky lg:top-24">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe">Order summary</h2>
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-ink">{product.title}</p>
              <p className="mt-0.5 text-xs text-ink-soft">{product.tagline}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-ink">${product.priceUsd.toFixed(2)}</p>
              <p className="text-xs text-taupe">one-time</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2 border-t border-ink/8 pt-4">
            {includes.map((inc) => (
              <li key={inc} className="flex items-start gap-2 text-xs text-ink-soft">
                <svg className="mt-0.5 shrink-0 text-moss-dark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                {inc}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg bg-ink/[0.04] px-3 py-2.5 text-xs leading-relaxed text-ink-soft">
            Original GloryPrep content — written from scratch, never copied from Cambridge,
            Makkar or any third-party publisher.
          </p>
        </aside>
      </div>
    </div>
  );
}
