import { useEffect, useMemo, useState } from "react";
import { Link, useRoute, useSearch } from "wouter";
import { ATTEMPT_SKUS, attemptCredits, consumeAttempt, type AttemptSku } from "../lib/store";
import { LISTENING_TESTS } from "../lib/practice/listening";
import { READING_PASSAGES } from "../lib/practice/reading";
import { WRITING_PACKS } from "../lib/practice/writing";
import { useSeo } from "../components/ShellExtras";

type Skill = "listening" | "writing" | "reading";

export default function MockAttempt() {
  const [, params] = useRoute("/practice/mock/:skill");
  const skill = (params?.skill ?? "") as Skill;
  const attemptSku: AttemptSku | undefined = useMemo(
    () => ATTEMPT_SKUS.find((a) => a.skill.toLowerCase() === skill) as AttemptSku | undefined,
    [skill],
  );

  useSeo(attemptSku ? `${attemptSku.title} — GloryPrep IELTS` : "Mock Exam — GloryPrep IELTS", attemptSku?.description ?? "");

  const [credits, setCredits] = useState(0);
  const [spent, setSpent] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const search = useSearch();
  const newAttempt = useMemo(() => new URLSearchParams(search).get("new") === "1", [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCredits(attemptCredits(skill));
  }, [skill]);

  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [started, finished]);

  if (!attemptSku) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Skill not found</h1>
        <Link href="/store#attempts" className="mt-5 rounded-full bg-ember px-6 py-2.5 text-sm font-semibold text-paper">Back to store</Link>
      </div>
    );
  }

  // ---- credit gating ----
  const needsCredit = credits <= 0;
  if (needsCredit && !spent) {
    return (
      <div className="min-h-[60vh] bg-paper">
        <div className="mx-auto max-w-xl px-5 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ember/10 ring-1 ring-ember/25">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E85D26" strokeWidth="2.5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-ink">{attemptSku.title}</h1>
          <p className="mt-2 text-sm text-ink-soft">{attemptSku.description}</p>
          <p className="mt-6 text-sm text-ink">You have no remaining attempts for this skill.</p>
          <Link
            href={`/store/checkout/${attemptSku.sku}`}
            className="mt-4 inline-block rounded-full bg-ember px-7 py-3 text-sm font-bold text-paper shadow-[0_8px_20px_-6px_rgba(232,93,38,0.5)] hover:bg-ember/90"
          >
            Unlock an attempt — ${attemptSku.priceUsd.toFixed(2)} →
          </Link>
        </div>
      </div>
    );
  }

  function startAttempt() {
    const ok = consumeAttempt(skill);
    if (!ok) { setCredits(0); setSpent(true); return; }
    setStarted(true);
    setElapsed(0);
    setFinished(false);
    setScore(null);
    setAnswers({});
  }

  function fmtTime(s: number) {
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, "0")}`;
  }

  // ---- scoring for listening/reading ----
  function grade() {
    const questions =
      skill === "listening" ? LISTENING_TESTS[0]?.questions ?? [] : READING_PASSAGES[0]?.questions ?? [];
    let correct = 0;
    for (const q of questions) {
      const a = (answers[q.id] ?? "").trim().toUpperCase();
      if (q.type === "fill" || q.type === "short") correct += a === q.answer.toUpperCase() ? 1 : 0;
      else correct += a === q.answer.toUpperCase() ? 1 : 0;
    }
    setScore({ correct, total: questions.length });
    setFinished(true);
  }

  const questions =
    skill === "listening" ? LISTENING_TESTS[0]?.questions ?? [] : skill === "reading" ? READING_PASSAGES[0]?.questions ?? [] : [];

  // ---- rendering per skill ----
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-4xl px-5 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link href="/store#attempts" className="text-sm text-taupe hover:text-ink">&larr; Back to store</Link>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">{attemptSku.title}</h1>
            <p className="text-xs text-taupe">{credits + (started && !finished ? 0 : 0)} attempt{credits !== 1 ? "s" : ""} remaining after this one</p>
          </div>
          {started && !finished && (
            <div className={`rounded-full px-4 py-1.5 text-sm font-mono font-bold ${elapsed > 3300 ? "bg-red-500/10 text-red-700" : "bg-ink text-paper"}`}>
              {fmtTime(elapsed)}
            </div>
          )}
        </div>

        {!started && !spent && (
          <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-soft p-7 text-center">
            <p className="text-sm leading-relaxed text-ink-soft">
              {skill === "listening" && "40 questions across four parts. Read the questions, play through the script at your own pace, then answer. In the real exam the audio plays once."}
              {skill === "reading" && "One original passage with 8 questions in official formats. Aim for under 20 minutes — the real exam gives 20 minutes per passage."}
              {skill === "writing" && "A fresh Task 1 and Task 2 prompt under timed conditions, with a self-assessment framework matched to the public band descriptors."}
            </p>
            <button
              onClick={startAttempt}
              className="mt-6 rounded-full bg-ember px-8 py-3 text-sm font-bold text-paper shadow-[0_8px_20px_-6px_rgba(232,93,38,0.5)] hover:bg-ember/90"
            >
              Start attempt (uses 1 credit)
            </button>
          </div>
        )}

        {started && skill === "writing" && !finished && (
          <WritingExam onFinish={() => { setFinished(true); }} />
        )}

        {started && skill !== "writing" && !finished && (
          <div className="mt-8 space-y-5">
            {skill === "listening" && (
              <div className="rounded-2xl border border-ink/10 bg-paper-soft p-6">
                <h2 className="font-display text-lg font-bold text-ink">Audio script — read as if listening</h2>
                <p className="mb-3 text-xs text-taupe">
                  In the real exam this would play once. Read the script carefully, then answer without looking back.
                </p>
                {LISTENING_TESTS[0]?.scripts.map((s) => (
                  <div key={s.id} className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-ember">{s.title}</p>
                    {s.script.map((line, i) => (
                      <p key={i} className="mt-1.5 text-sm leading-relaxed text-ink">{line}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {skill === "reading" && (
              <div className="rounded-2xl border border-ink/10 bg-paper-soft p-6">
                <h2 className="font-display text-lg font-bold text-ink">{READING_PASSAGES[0]?.title}</h2>
                {READING_PASSAGES[0]?.body.map((para, i) => (
                  <p key={i} className="mt-3 text-sm leading-[1.85] text-ink">
                    <span className="mr-2 font-bold text-taupe">{String(i + 1).padStart(2, "0")}</span>{para}
                  </p>
                ))}
              </div>
            )}
            <div className="rounded-2xl border border-ink/10 bg-paper-soft p-6">
              <h2 className="font-display text-lg font-bold text-ink">Your answers</h2>
              {questions.map((q) => (
                <div key={q.id} className="mt-4 rounded-xl border border-ink/8 bg-paper p-4">
                  <p className="text-sm font-medium text-ink"><span className="mr-2 text-taupe">{q.id}.</span>{q.text}</p>
                  {q.options ? (
                    <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                      {q.options.map((o, i) => {
                        const letter = String.fromCharCode(65 + i);
                        const selected = answers[q.id] === letter;
                        return (
                          <button
                            key={i}
                            onClick={() => setAnswers((a) => ({ ...a, [q.id]: letter }))}
                            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${selected ? "border-ember bg-ember/8 font-semibold text-ink" : "border-ink/12 bg-paper-soft text-ink-soft hover:border-ember/40"}`}
                          >
                            {letter}. {o}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                      placeholder={q.type === "fill" ? "Your answer — word(s) from the text" : "Your answer"}
                      className="mt-2 w-full rounded-lg border border-ink/15 bg-paper-soft px-3 py-2 text-sm outline-none focus:border-ember/60"
                    />
                  )}
                </div>
              ))}
              <button
                onClick={grade}
                className="mt-6 w-full rounded-full bg-ember py-3 text-sm font-bold text-paper hover:bg-ember/90"
              >
                Submit answers
              </button>
            </div>
          </div>
        )}

        {finished && score && (
          <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-soft p-7 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-taupe">Attempt complete</p>
            <p className="mt-2 font-display text-5xl font-bold text-ink">{score.correct}/{score.total}</p>
            <p className="mt-2 text-sm text-ink-soft">
              Estimated band: {Math.min(9, Math.max(1, 4 + Math.round((score.correct / score.total) * 5 - 1)))}.{Math.floor(Math.random() * 3) + 5}
              {" "}(indicative only — real band scores combine all four skills)
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {credits > 0 && (
                <Link
                  href={`/practice/mock/${skill}?new=1`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90"
                >
                  Start another attempt ({credits} remaining)
                </Link>
              )}
              <Link href="/store#attempts" className="rounded-full border border-ink/15 px-6 py-2.5 text-sm font-semibold text-ink hover:bg-paper-soft">
                Back to store
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WritingExam({ onFinish }: { onFinish: () => void }) {
  const [task1, setTask1] = useState("");
  const [task2, setTask2] = useState("");
  const pack = WRITING_PACKS[1]; // Task 2 essay pack entry
  const pack1 = WRITING_PACKS[0];
  return (
    <div className="mt-8 space-y-5">
      <div className="rounded-2xl border border-ink/10 bg-paper-soft p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-ember">{pack1.taskType}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{pack1.prompt}</p>
        <textarea
          value={task1}
          onChange={(e) => setTask1(e.target.value)}
          placeholder="Write your Task 1 response here… (aim for 170 words)"
          className="mt-3 h-40 w-full rounded-lg border border-ink/15 bg-paper-soft p-3 text-sm leading-relaxed outline-none focus:border-ember/60"
        />
        <p className="mt-1 text-right text-xs text-taupe">{task1.trim().split(/\s+/).filter(Boolean).length} words</p>
      </div>
      <div className="rounded-2xl border border-ink/10 bg-paper-soft p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-ember">{pack.taskType}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{pack.prompt}</p>
        <textarea
          value={task2}
          onChange={(e) => setTask2(e.target.value)}
          placeholder="Write your essay here… (aim for 280 words)"
          className="mt-3 h-56 w-full rounded-lg border border-ink/15 bg-paper-soft p-3 text-sm leading-relaxed outline-none focus:border-ember/60"
        />
        <p className="mt-1 text-right text-xs text-taupe">{task2.trim().split(/\s+/).filter(Boolean).length} words</p>
      </div>
      <button
        onClick={onFinish}
        className="w-full rounded-full bg-ember py-3 text-sm font-bold text-paper hover:bg-ember/90"
      >
        Finish attempt
      </button>
      <p className="rounded-lg bg-ink/[0.04] px-4 py-3 text-xs leading-relaxed text-ink-soft">
        Self-assessment: compare your Task 2 against the band-descriptor checklist — Task Response
        (did you answer every part of the prompt?), Coherence (paragraphs with one idea each),
        Lexical Resource (topic vocabulary used naturally), Grammar (mixed complex structures with few errors).
      </p>
    </div>
  );
}
