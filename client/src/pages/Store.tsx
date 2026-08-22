import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  LIBRARY_SKU,
  KIT_SKU,
  ATTEMPT_SKUS,
  toBdt,
  hasLibrary,
  hasKit,
  attemptCredits,
} from "../lib/store";
import { useSeo } from "../components/ShellExtras";

function PriceTag({ usd, large }: { usd: number; large?: boolean }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${large ? "text-3xl font-extrabold tracking-tight" : "text-lg font-bold"}`}>
      <span className="text-ink">${usd.toFixed(usd % 1 === 0 ? 0 : 2)}</span>
      <span className={`text-taupe font-medium ${large ? "text-sm" : "text-xs"}`} style={{ fontFamily: '"Noto Sans Bengali", "Hind Siliguri", ui-sans-serif, system-ui, sans-serif' }}>
        ≈ ৳{toBdt(usd).toLocaleString()}
      </span>
    </span>
  );
}

function LockBadge({ unlocked }: { unlocked: boolean }) {
  return unlocked ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-moss/12 px-3 py-1 text-xs font-semibold text-moss-dark ring-1 ring-moss/30">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
      Unlocked
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/10 px-3 py-1 text-xs font-semibold text-ember ring-1 ring-ember/25">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
      Locked
    </span>
  );
}

function BlurredPanel({ children, unlocked }: { children: React.ReactNode; unlocked: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-ink/8 bg-paper-soft shadow-sm">
      <div className={unlocked ? "" : "blur-md select-none pointer-events-none opacity-60"}>{children}</div>
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink shadow-md ring-1 ring-ink/10">
            Unlock to view
          </div>
        </div>
      )}
    </div>
  );
}

export default function Store() {
  useSeo("Practice Library & Mock Kit — GloryPrep IELTS", "Unlock GloryPrep's original practice test library, printable mock test kit, and per-attempt exam-grade mocks. Pay once, unlock instantly.");

  const [library, setLibrary] = useState(hasLibrary());
  const [kit, setKit] = useState(hasKit());
  const [credits, setCredits] = useState({
    listening: attemptCredits("listening"),
    writing: attemptCredits("writing"),
    reading: attemptCredits("reading"),
  });

  useEffect(() => {
    const t = setInterval(() => {
      setLibrary(hasLibrary());
      setKit(hasKit());
      setCredits({
        listening: attemptCredits("listening"),
        writing: attemptCredits("writing"),
        reading: attemptCredits("reading"),
      });
    }, 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        {/* Page header */}
        <div className="mb-10">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ember">
            <span className="inline-block h-px w-8 bg-ember" /> GloryPrep Store
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Practice tests, mock kits and exam attempts.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Everything here stays visible — browse titles, previews and contents freely.
            You only pay when you want full access. All content is written from scratch by
            GloryPrep's editorial team: nothing is copied from Cambridge, Makkar or any other publisher.
          </p>
          <p className="mt-2 text-sm text-taupe">One-time payments · unlock is instant · no subscription</p>
        </div>

        {/* 1. Practice Test Library */}
        <section className="mb-12 scroll-mt-24" id="library">
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper-soft shadow-[0_1px_0_rgba(22,20,15,0.06),0_12px_32px_-16px_rgba(22,20,15,0.18)]">
            <div className="border-b border-ink/8 bg-gradient-to-b from-transparent to-ink/[0.02] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">{LIBRARY_SKU.title}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{LIBRARY_SKU.tagline}</p>
                </div>
                <div className="text-right">
                  <PriceTag usd={LIBRARY_SKU.priceUsd} large />
                  <div className="mt-2"><LockBadge unlocked={library} /></div>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-ink-soft">{LIBRARY_SKU.description}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {LIBRARY_SKU.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm text-ink">
                    <svg className="mt-0.5 shrink-0 text-moss-dark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                    {inc}
                  </li>
                ))}
              </ul>

              {/* Section previews */}
              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                {LIBRARY_SKU.sections.map((sec) => {
                  const unlocked = library;
                  return (
                    <div key={sec.id} className="rounded-xl border border-ink/8 bg-paper p-5">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-ink">{sec.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-ink-soft/90 italic">{sec.freePreview}</p>
                      <p className={`mt-3 text-xs leading-relaxed ${unlocked ? "text-ink-soft" : "text-taupe"}`}>
                        {sec.lockedPreview}
                      </p>
                      {!unlocked && (
                        <div className="mt-4">
                          <BlurredPanel unlocked={false}>
                            <p className="p-2 text-xs text-ink-soft">
                              Full passage text, question sets, answer keys and band rationale appear here once unlocked.
                            </p>
                          </BlurredPanel>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-taupe">
                  {library ? "You own the full library — new tests are added monthly at no extra cost." : "One payment unlocks everything in the library, forever."}
                </p>
                <Link
                  href={library ? "/practice/library" : "/store/checkout/lex-practice-library"}
                  className={`rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                    library
                      ? "bg-moss-dark text-paper hover:bg-moss-dark/90"
                      : "bg-ember text-paper hover:bg-ember/90"
                  }`}
                >
                  {library ? "Open the library →" : `Unlock library — $${LIBRARY_SKU.priceUsd} →`}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Mock Test Kit */}
        <section className="mb-12 scroll-mt-24" id="kit">
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper-soft shadow-[0_1px_0_rgba(22,20,15,0.06),0_12px_32px_-16px_rgba(22,20,15,0.18)]">
            <div className="border-b border-ink/8 bg-gradient-to-b from-transparent to-ink/[0.02] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">{KIT_SKU.title}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{KIT_SKU.tagline}</p>
                </div>
                <div className="text-right">
                  <PriceTag usd={KIT_SKU.priceUsd} large />
                  <div className="mt-2"><LockBadge unlocked={kit} /></div>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-ink-soft">{KIT_SKU.description}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {KIT_SKU.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm text-ink">
                    <svg className="mt-0.5 shrink-0 text-moss-dark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                    {inc}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-taupe">
                  {kit ? "Your kit PDFs are ready to download." : "PDFs are generated instantly and print on any A4 printer."}
                </p>
                <Link
                  href={kit ? "/practice/kit" : "/store/checkout/lex-mock-kit"}
                  className={`rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                    kit ? "bg-moss-dark text-paper hover:bg-moss-dark/90" : "bg-ember text-paper hover:bg-ember/90"
                  }`}
                >
                  {kit ? "Download the kit →" : `Unlock the kit — $${KIT_SKU.priceUsd.toFixed(2)} →`}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Per-attempt mocks */}
        <section className="scroll-mt-24" id="attempts">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-ink">Real Mock Exams — per attempt</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Each attempt is a fresh, original exam-grade mock. Buy exactly the attempts you need — no bundle required.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {ATTEMPT_SKUS.map((att) => {
              const c = credits[att.skill.toLowerCase() as "listening" | "writing" | "reading"];
              return (
                <div key={att.sku} className="flex flex-col rounded-2xl border border-ink/10 bg-paper-soft p-6 shadow-[0_1px_0_rgba(22,20,15,0.06),0_10px_24px_-14px_rgba(22,20,15,0.16)]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ember">{att.skill}</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">{att.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{att.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <PriceTag usd={att.priceUsd} />
                    {c > 0 && <span className="text-xs font-semibold text-moss-dark">{c} attempt{c > 1 ? "s" : ""} remaining</span>}
                  </div>
                  <Link
                    href={c > 0 ? `/practice/mock/${att.skill.toLowerCase()}` : `/store/checkout/${att.sku}`}
                    className={`mt-4 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors ${
                      c > 0 ? "bg-moss-dark text-paper hover:bg-moss-dark/90" : "bg-ink text-paper hover:bg-ink/90"
                    }`}
                  >
                    {c > 0 ? "Start attempt →" : `Unlock attempt — $${att.priceUsd.toFixed(2)} →`}
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-taupe">
            Original content only: every passage, script and prompt is written by GloryPrep in official IELTS style
            and difficulty. Not affiliated with Cambridge Assessment English, IDP Education or the British Council.
          </p>
        </section>
      </div>
    </div>
  );
}
