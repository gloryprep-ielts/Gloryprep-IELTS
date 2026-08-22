import { useState } from "react";
import { Link } from "wouter";
import { hasLibrary } from "../lib/store";
import { READING_PASSAGES } from "../lib/practice/reading";
import { useSeo } from "../components/ShellExtras";

export default function PracticeLibrary() {
  useSeo("Practice Test Library — GloryPrep IELTS", "Original Cambridge-style reading, listening, writing and speaking practice tests written by GloryPrep.");

  const unlocked = hasLibrary();
  const [openPassage, setOpenPassage] = useState<string | null>(null);
  const [answersVisible, setAnswersVisible] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-4xl px-5 py-12">
        <Link href="/store" className="text-sm text-taupe hover:text-ink">&larr; Back to store</Link>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">Reading practice tests</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Original passages written in official IELTS style and difficulty. Each test includes questions, answer keys
          and band-level rationale.
        </p>

        <div className="mt-8 space-y-5">
          {READING_PASSAGES.map((p) => {
            const isOpen = openPassage === p.id;
            const canOpen = unlocked;
            return (
              <article key={p.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-paper-soft shadow-[0_1px_0_rgba(22,20,15,0.06),0_10px_24px_-14px_rgba(22,20,15,0.14)]">
                <button
                  onClick={() => canOpen && setOpenPassage(isOpen ? null : p.id)}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-ink/[0.02]"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ember">Reading · {p.difficulty} · ~{p.wordCount} words</p>
                    <h2 className="mt-1 font-display text-xl font-bold text-ink">{p.title}</h2>
                    <p className="mt-1 text-xs text-taupe">{p.questions.length} questions · {p.topic}</p>
                  </div>
                  {canOpen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`mt-1 shrink-0 text-taupe transition-transform ${isOpen ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
                  ) : (
                    <span className="mt-1 shrink-0 rounded-full bg-ember/10 px-3 py-1 text-xs font-semibold text-ember">Unlock to open</span>
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-ink/8 px-6 py-6">
                    {p.body.map((para, i) => (
                      <p key={i} className="mb-4 text-sm leading-[1.85] text-ink">
                        <span className="mr-2 font-bold text-taupe">{String(i + 1).padStart(2, "0")}</span>
                        {para}
                      </p>
                    ))}
                    <h3 className="mt-8 font-display text-lg font-bold text-ink">Questions</h3>
                    <ol className="mt-3 space-y-4">
                      {p.questions.map((q) => (
                        <li key={q.id} className="rounded-xl border border-ink/8 bg-paper p-4">
                          <p className="text-sm font-medium text-ink">
                            <span className="mr-2 text-taupe">{q.id}.</span>
                            <span className="mr-2 rounded bg-ink/6 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-soft">{q.type}</span>
                            {q.text}
                          </p>
                          {q.options && (
                            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                              {q.options.map((o, i) => (
                                <li key={i} className="text-sm text-ink-soft">{String.fromCharCode(65 + i)}. {o}</li>
                              ))}
                            </ul>
                          )}
                          <button
                            onClick={() => setAnswersVisible((v) => ({ ...v, [`${p.id}-${q.id}`]: !v[`${p.id}-${q.id}`] }))}
                            className="mt-2 text-xs font-semibold text-ember hover:underline"
                          >
                            {answersVisible[`${p.id}-${q.id}`] ? "Hide answer" : "Reveal answer + rationale"}
                          </button>
                          {answersVisible[`${p.id}-${q.id}`] && (
                            <div className="mt-2 rounded-lg bg-moss/8 px-3 py-2 text-xs leading-relaxed text-ink">
                              <span className="font-bold">Answer: {q.answer}</span> — {q.rationale}
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                    <div className="mt-6 rounded-xl border border-ember/20 bg-ember/[0.05] px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-ember">Examiner tips</p>
                      <ul className="mt-1.5 space-y-1">
                        {p.tips.map((t) => (
                          <li key={t} className="text-xs leading-relaxed text-ink-soft">• {t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {!unlocked && (
          <div className="mt-10 rounded-2xl border border-ember/25 bg-ember/[0.05] p-6 text-center">
            <p className="font-display text-lg font-bold text-ink">Unlock the full library to open these tests</p>
            <p className="mt-1 text-xs text-ink-soft">$3 one-time — listening, writing and speaking sets included.</p>
            <Link href="/store/checkout/lex-practice-library" className="mt-4 inline-block rounded-full bg-ember px-6 py-2.5 text-sm font-bold text-paper hover:bg-ember/90">
              Unlock now →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
