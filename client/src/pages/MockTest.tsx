/*
 * GLORYPREP — Mock Test interface ("Paper & Ember")
 * Distraction-free reading-mode UI: passage left / questions right,
 * sticky top bar with breathing timer ring + section progress,
 * question navigator grid, highlight/answer states. Motion: progress
 * bar 300ms ease-out, option press scale(0.97), ring breathe on timer.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Flag,
  ChevronLeft,
  ChevronRight,
  Check,
  Highlighter,
  Clock,
  Headphones,
  BookOpen,
  PenLine,
  Mic,
  X,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";
import { trackEvent } from "@/hooks/useProgress";
import { SkillDot } from "@/components/primitives";
import { toast } from "sonner";

const PASSAGE = `
The Great Barrier Reef: An Ecosystem Under Pressure

The Great Barrier Reef, located off the northeast coast of Australia, is the world's largest coral reef system, composed of over 2,900 individual reef systems and hundreds of islands. It extends for over 2,300 kilometres and covers an area of approximately 344,400 square kilometres.

Coral reefs are often described as the "rainforests of the sea" because of their extraordinary biodiversity. Although coral reefs cover less than 0.1% of the ocean floor, they support roughly 25% of all marine species. This concentration of life makes reefs disproportionately important to the health of the entire ocean.

In recent decades, however, the reef has faced mounting pressure. Rising sea temperatures have triggered repeated mass bleaching events, most severely in 2016, 2017 and 2020. During bleaching, stressed corals expel the symbiotic algae that live in their tissues and provide them with food, leaving the coral white and vulnerable. If the stress is prolonged, the coral dies.

Scientists argue that the long-term survival of the reef depends less on local conservation measures and more on global reductions in greenhouse gas emissions. Local interventions — such as controlling crown-of-thorns starfish outbreaks and improving water quality — can buy time, but cannot address the root cause.

Meanwhile, the reef remains economically vital. It supports around 64,000 jobs and contributes roughly AU$6.4 billion annually to the Australian economy through tourism, fishing and research. This creates a policy tension: the very activities that sustain coastal communities can also degrade the reef's condition.
`.trim();

const QUESTIONS = [
  {
    id: 1,
    type: "MCQ",
    text: "According to the passage, coral reefs are called \"rainforests of the sea\" because they",
    options: [
      "contain the largest number of trees in the ocean",
      "support about a quarter of all marine species despite their small area",
      "grow fastest in tropical rain climates",
      "produce more oxygen than land forests",
    ],
    correct: 1,
  },
  {
    id: 2,
    type: "T/F/NG",
    text: "The Great Barrier Reef covers more than 400,000 square kilometres.",
    options: ["TRUE", "FALSE", "NOT GIVEN"],
    correct: 1,
  },
  {
    id: 3,
    type: "T/F/NG",
    text: "Coral bleaching occurs when corals lose the algae that live in their tissues.",
    options: ["TRUE", "FALSE", "NOT GIVEN"],
    correct: 0,
  },
  {
    id: 4,
    type: "MCQ",
    text: "The author suggests that local conservation measures alone are",
    options: [
      "sufficient to save the reef",
      "more effective than reducing emissions",
      "temporary relief rather than a permanent solution",
      "a waste of limited resources",
    ],
    correct: 2,
  },
  {
    id: 5,
    type: "MCQ",
    text: "The \"policy tension\" mentioned in the final paragraph refers to the conflict between",
    options: [
      "tourism revenue and scientific research funding",
      "economic dependence on the reef and activities that damage it",
      "local and international conservation laws",
      "fishing communities and environmental NGOs",
    ],
    correct: 1,
  },
  {
    id: 6,
    type: "FILL",
    text: "The reef supports around _________ jobs in Australia.",
    answer: "64,000",
  },
];

const SECTIONS = [
  { id: "listening", label: "Listening", icon: Headphones, done: true },
  { id: "reading", label: "Reading", icon: BookOpen, done: false, active: true },
  { id: "writing", label: "Writing", icon: PenLine, done: false },
  { id: "speaking", label: "Speaking", icon: Mic, done: false },
];

function TimerRing({ seconds }: { seconds: number }) {
  const total = 60 * 60; // 1h reading block
  const r = 16;
  const C = 2 * Math.PI * r;
  const pct = 1 - seconds / total;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="22" cy="22" r={r} fill="none" stroke="var(--border)" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={seconds < 600 ? "var(--destructive)" : "var(--ember)"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - pct)}
        style={{ transition: "stroke-dashoffset 1s linear" }}
      />
    </svg>
  );
}

export default function MockTest() {
  useSeo(
    "Free Mock Test — GloryPrep",
    "Take a realistic full-length IELTS mock test — Listening, Reading, Writing and Speaking — with an instant band score report.",
  );

  const [current, setCurrent] = useState(0);
  const [, navigate] = useLocation();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [seconds, setSeconds] = useState(3427);
  const [started, setStarted] = useState(true);

  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [started]);

  const answeredCount = Object.keys(answers).length;

  const submitSection = () => {
    trackEvent("mock_test_submit", { section: currentQ.type, answered: answeredCount });
    // Persist completion so Results has real data to display.
    try {
      const progress = JSON.parse(localStorage.getItem("gloryprep-progress-v1") ?? "{}");
      localStorage.setItem(
        "gloryprep-progress-v1",
        JSON.stringify({ ...progress, mockTestSubmittedAt: Date.now() }),
      );
    } catch {
      /* storage unavailable — Results still renders its demo report */
    }
    navigate("/results");
  };
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const currentQ = useMemo(() => QUESTIONS[current], [current]);

  const select = (idx: number) => {
    setAnswers((a) => ({ ...a, [currentQ.id]: idx }));
  };

  const toggleFlag = () => {
    setFlagged((f) => {
      const next = new Set(f);
      if (next.has(currentQ.id)) next.delete(currentQ.id);
      else next.add(currentQ.id);
      return next;
    });
    toast.info(flagged.has(currentQ.id) ? "Question unflagged" : "Question flagged for review");
  };

  return (
    <PageShell>
      {/* ——— Sticky test bar ——— */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/92 backdrop-blur-xl">
        <div className="container flex h-16 items-center gap-4">
          <Link href="/dashboard" className="press hidden h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember sm:flex">
            <X className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-display truncate text-sm font-bold">
                Full Mock Test #14 — Academic
              </span>
              <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest">
                Reading · Passage 1 of 3
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ember to-papaya"
                style={{
                  width: `${(answeredCount / QUESTIONS.length) * 100}%`,
                  transition: "width 300ms cubic-bezier(0.23,1,0.32,1)",
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <TimerRing seconds={seconds} />
            <div className="flex flex-col leading-none">
              <span className={`font-mono text-lg font-bold ${seconds < 600 ? "breathe text-destructive" : ""}`}>
                {mm}:{ss}
              </span>
              <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                remaining
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container grid gap-6 py-8 lg:grid-cols-[1.15fr_1fr]">
        {/* ——— Passage rail ——— */}
        <section className="note-clip h-fit max-h-[72vh] overflow-y-auto p-7 lg:sticky lg:top-36">
          <div className="folio">Passage 1 · Reading</div>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug">
            The Great Barrier Reef: An Ecosystem Under Pressure
          </h2>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-[1.85] text-muted-foreground">
            {PASSAGE.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <button
            onClick={() => toast.info("Highlight mode: select text to mark it")}
            className="press mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold transition-colors hover:border-ember hover:text-ember"
          >
            <Highlighter className="h-3.5 w-3.5" />
            Highlight text
          </button>
        </section>

        {/* ——— Questions ——— */}
        <section className="space-y-4">
          <div className="paper-card sheet-lift p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ember to-papaya font-mono text-xs font-bold text-primary-foreground">
                  {currentQ.id}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest">
                  {currentQ.type}
                </span>
              </div>
              <button
                onClick={toggleFlag}
                className={`press flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                  flagged.has(currentQ.id)
                    ? "border-amber-400 bg-amber-400/15 text-amber-500"
                    : "border-border text-muted-foreground hover:border-ember hover:text-ember"
                }`}
                aria-label="Flag question"
              >
                <Flag className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 font-medium leading-relaxed">{currentQ.text}</p>

            <div className="mt-5 space-y-2.5">
              {(currentQ.options ?? []).map((opt, i) => {
                const selected = answers[currentQ.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className={`press flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all duration-200 ${
                      selected
                        ? "border-ember bg-accent/60 font-semibold"
                        : "border-border hover:border-ember/50"
                    }`}
                    style={selected ? { transform: "scale(0.99)" } : undefined}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-bold transition-colors ${
                        selected ? "border-ember bg-ember text-primary-foreground" : "border-border text-muted-foreground"
                      }`}
                    >
                      {selected ? <Check className="h-3.5 w-3.5" /> : String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
              {currentQ.type === "FILL" && (
                <input
                  placeholder="Type your answer…"
                  className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-ember"
                />
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="press flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-ember hover:text-ember disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <button
                onClick={() => {
                  if (current === QUESTIONS.length - 1) {
                    submitSection();
                  }
                  setCurrent((c) => Math.min(QUESTIONS.length - 1, c + 1));
                }}
                className="press flex items-center gap-1.5 rounded-full bg-gradient-to-r from-ember to-papaya px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {current === QUESTIONS.length - 1 ? "Submit section" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ——— Navigator ——— */}
          <div className="data-slab p-5 md:translate-x-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Question Navigator
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                {answeredCount}/{QUESTIONS.length} answered
              </span>
            </div>
            <div className="mt-3 grid grid-cols-10 gap-1.5 sm:grid-cols-6">
              {QUESTIONS.map((q, i) => {
                const done = answers[q.id] !== undefined;
                const flaggedQ = flagged.has(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrent(i)}
                    className={`press relative flex h-9 items-center justify-center rounded-lg border text-xs font-bold transition-all duration-200 ${
                      i === current
                        ? "border-ember bg-ember text-primary-foreground"
                        : done
                          ? "border-forest/40 bg-forest/10 text-forest"
                          : "border-border text-muted-foreground hover:border-ember/50"
                    }`}
                  >
                    {q.id}
                    {flaggedQ && (
                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="tick mb-2">Live sections · 1 in progress</div>
              <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">Sections</div>
              <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                {SECTIONS.map((s) => (
                  <div
                    key={s.id}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-2.5 ${
                      s.active ? "border-ember/60 bg-accent/50" : "border-border"
                    }`}
                  >
                    <s.icon className="h-3.5 w-3.5" style={s.done ? { color: "var(--forest)" } : undefined} />
                    <SkillDot skill={s.id} size={6} />
                    <span className="text-[0.6rem] font-bold uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
