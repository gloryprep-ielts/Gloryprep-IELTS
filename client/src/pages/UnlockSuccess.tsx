import { useEffect, useState } from "react";
import { Link, useRoute, useSearchParams } from "wouter";
import {
  getSku,
  syncUnlocksByEmail,
  hasLibrary,
  hasKit,
  attemptCredits,
} from "../lib/store";
import { useSeo } from "../components/ShellExtras";

export default function UnlockSuccess() {
  const [, params] = useRoute("/unlock-success/:sku");
  const [searchParams] = useSearchParams();
  const sku = params?.sku ?? "";
  const item = getSku(sku);
  const isDemo = searchParams.get("demo") === "1";

  useSeo("Unlocked — GloryPrep IELTS", "Your content is unlocked. Start practising now.");

  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [syncEmail, setSyncEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sku]);

  // After returning from the PayPal capture (handled server-side),
  // the server marks the unlock. Client polls sync once the user confirms their email.
  async function handleSync() {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(syncEmail)) return;
    setSyncing(true);
    const ok = await syncUnlocksByEmail(syncEmail.trim().toLowerCase());
    setSynced(ok);
    setSyncing(false);
  }

  if (!item) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Unknown item</h1>
        <Link href="/store" className="mt-5 rounded-full bg-ember px-6 py-2.5 text-sm font-semibold text-paper">Back to store</Link>
      </div>
    );
  }

  const unlocked =
    item.kind === "library" ? hasLibrary() : item.kind === "kit" ? hasKit() : attemptCredits((item as { skill: string }).skill.toLowerCase() as "listening" | "writing" | "reading") > 0;

  const destination =
    item.kind === "library"
      ? "/practice/library"
      : item.kind === "kit"
        ? "/practice/kit"
        : `/practice/mock/${(item as { skill: string }).skill.toLowerCase()}`;

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss-dark/12 ring-1 ring-moss-dark/30">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3d6b35" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink">Payment successful</h1>
        <p className="mt-3 text-sm text-ink-soft">
          You now own <strong className="text-ink">{item.title}</strong>.
          {isDemo && (
            <span className="ml-1 rounded bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-400/50">Demo mode</span>
          )}
        </p>

        {!unlocked && !isDemo && (
          <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-soft p-6 text-left">
            <h2 className="text-sm font-bold text-ink">Almost there — link your email</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
              Enter the email you used at checkout. We'll verify your payment on our side and unlock the content
              on this device immediately.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                type="email"
                value={syncEmail}
                onChange={(e) => setSyncEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-lg border border-ink/15 bg-paper px-4 py-2.5 text-sm outline-none focus:border-ember/60"
              />
              <button
                onClick={handleSync}
                disabled={syncing || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(syncEmail)}
                className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-paper disabled:opacity-50"
              >
                {syncing ? "Verifying…" : "Unlock now"}
              </button>
            </div>
            {synced && <p className="mt-3 text-xs font-semibold text-moss-dark">Unlocked! Your content is ready below.</p>}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={destination}
            className="rounded-full bg-ember px-7 py-3 text-sm font-bold text-paper shadow-[0_8px_20px_-6px_rgba(232,93,38,0.5)] hover:bg-ember/90"
          >
            {unlocked || isDemo ? "Start practising →" : "Open your content →"}
          </Link>
          <Link href="/store" className="rounded-full border border-ink/15 bg-paper px-6 py-3 text-sm font-semibold text-ink hover:bg-paper-soft">
            Back to store
          </Link>
        </div>

        <p className="mt-8 rounded-lg bg-ink/[0.04] px-4 py-3 text-xs leading-relaxed text-ink-soft">
          {item.kind === "attempt"
            ? "Your attempt credit is saved to this device. It also stays linked to your email — log in with the same email on another device and we'll restore it."
            : "Your unlock is saved to this device and linked to your email — it restores automatically on any device where you verify the same email."}
        </p>
      </div>
    </div>
  );
}
