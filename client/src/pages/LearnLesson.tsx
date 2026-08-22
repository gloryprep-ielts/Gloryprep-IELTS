/*
 * GLORYPREP "Paper & Ember" — single lesson screen
 * Reading column + sticky progress sidebar; checkpoint quiz with inline
 * feedback; prev/next navigation; completion celebration.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Flame,
  Loader2,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { BandRing, Reveal, SkillDot } from "@/components/primitives";
import { SKILL_COLORS } from "@/components/primitives";
import { getLesson, getLessonsBySkill, type SkillId } from "@/lib/lessons";
import { useProgress, trackEvent } from "@/hooks/useProgress";
import { useSeo } from "@/components/ShellExtras";
import { cn } from "@/lib/utils";

export default function LearnLesson() {
  useSeo("Lesson — GloryPrep", "Structured IELTS lesson with checkpoint quiz, instant AI-style feedback and progress saved automatically.");

  const [, params] = useRoute("/learn/:slug");
  const [, navigate] = useLocation();
  const slug = params?.slug ?? "";
  const lesson = useMemo(() => getLesson(slug), [slug]);
  const { state, startLesson, completeLesson, recordQuiz, recommended, pctForSkill } =
    useProgress();

  const [quizDone, setQuizDone] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief content load so the skeleton shows once per navigation
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    setQuizDone(false);
    setPicked(null);
    return () => clearTimeout(t);
  }, [slug]);

  useEffect(() => {
    if (lesson) startLesson(lesson);
  }, [lesson, startLesson]);

  if (!lesson) {
    return (
      <PageShell>
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
          <h1 className="font-display text-3xl font-extrabold">Lesson not found</h1>
          <p className="text-muted-foreground">This lesson slug does not exist in the library.</p>
          <Link
            href="/lessons"
            className="press rounded-full bg-gradient-to-r from-ember to-papaya px-6 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Browse lessons
          </Link>
        </div>
      </PageShell>
    );
  }

  const skill = lesson.skill as SkillId;
  const skillLessons = getLessonsBySkill(skill);
  const idx = skillLessons.findIndex((l) => l.id === lesson.id);
  const prev = skillLessons[idx - 1] ?? null;
  const next = skillLessons[idx + 1] ?? null;
  const done = state.completed.includes(lesson.id);
  const quiz = lesson.quiz;
  const correct = picked === quiz.a;

  const submit = () => {
    if (picked === null) return;
    setQuizDone(true);
    recordQuiz(lesson, picked === quiz.a);
    if (!done) completeLesson(lesson);
  };

  return (
    <PageShell>
      <div className="container grid gap-8 py-8 lg:grid-cols-[1fr_300px] lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground lg:col-span-2">
          <Link href="/lessons" className="press hover:text-foreground">
            Lessons
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/lessons?skill=${skill}`}
            className="press hover:text-foreground"
            style={{ color: SKILL_COLORS[skill].color }}
          >
            {SKILL_COLORS[skill].label}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{lesson.title}</span>
        </nav>

        <div className="min-w-0">
          {loading ? (
            <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading lesson">
              <div className="h-9 w-2/3 animate-pulse rounded-lg bg-muted" />
              <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
              <div className="mt-4 h-32 w-full animate-pulse rounded-2xl bg-muted" />
              <div className="h-32 w-full animate-pulse rounded-2xl bg-muted" />
            </div>
          ) : (
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <SkillDot skill={skill} size={12} />
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: SKILL_COLORS[skill].color }}
                >
                  {SKILL_COLORS[skill].label} · {lesson.level}
                </span>
                {done && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 text-xs font-bold text-forest">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                  </span>
                )}
              </div>
              <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                {lesson.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {lesson.description}
              </p>

              {/* Objective callout */}
              <div className="note-clip mt-6 rounded-2xl bg-accent p-5">
                <div className="folio text-[10px]">LEARNING OBJECTIVE</div>
                <p className="mt-2 font-semibold">{lesson.objective}</p>
              </div>

              {/* Lesson content */}
              <section className="mt-8 space-y-5 text-[15px] leading-[1.8]">
                <p>
                  {lesson.skill === "listening" &&
                    "In the real exam, recordings play once and question order usually follows the audio — but the speakers will try to trick you. This lesson trains the exact micro-skill examiners test."}
                  {lesson.skill === "reading" &&
                    "Band 7+ readers do not read every word. They interrogate the text: locate, verify, eliminate. This lesson drills the decision pattern behind that speed."}
                  {lesson.skill === "writing" &&
                    "Examiners read hundreds of essays a day — structure is what lets them reward you quickly. This lesson builds the habit that separates a 6.0 from a 7.5."}
                  {lesson.skill === "speaking" &&
                    "Fluency is not speed; it is continuity. This lesson trains the response architecture that keeps you talking for the full two minutes with confidence."}
                </p>
                <p>
                  {lesson.description}. Work through it slowly the first time —
                  accuracy before speed, always. The checkpoint quiz at the end
                  confirms you can apply the skill, not just recognise it.
                </p>
                <div className="sheet rounded-2xl border border-border bg-background p-5">
                  <div className="folio text-[10px]">WORKED EXAMPLE</div>
                  <p className="mt-3 font-medium italic text-foreground/85">
                    "{lesson.description}. Think of the examiner listening for
                    exactly this pattern in your response — and rewarding it
                    within the first thirty seconds."
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Practice pattern: re-read or re-listen to your last mock
                    test and count how many times this pattern appeared. Note
                    where you missed it.
                  </p>
                </div>
                <div className="sheet rounded-2xl border border-border bg-background p-5">
                  <div className="folio text-[10px]">COMMON MISTAKE</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Most learners over-study the easy version of this skill and
                    stall at their current band. Deliberate practice means
                    training at the edge — one level above comfort — which is
                    exactly how these lessons are sequenced.
                  </p>
                </div>
              </section>

              {/* Checkpoint quiz */}
              <section className="mt-10 rounded-3xl border border-border bg-background p-6 shadow-[0_8px_30px_-12px_oklch(0.3_0.03_60/0.15)] md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-xl font-extrabold tracking-tight">
                    Checkpoint quiz
                  </h2>
                  {quizDone && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                        correct
                          ? "bg-forest/10 text-forest"
                          : "bg-ember/10 text-ember",
                      )}
                    >
                      {correct ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5" /> Review again
                        </>
                      )}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-medium">{quiz.q}</p>
                <div className="mt-5 grid gap-2.5">
                  {quiz.choices.map((c, i) => {
                    const selected = picked === i;
                    const revealed = quizDone;
                    const isAnswer = i === quiz.a;
                    return (
                      <button
                        key={i}
                        disabled={quizDone}
                        onClick={() => setPicked(i)}
                        className={cn(
                          "press flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-150",
                          !revealed && selected && "sheet-lift border-foreground/30 shadow",
                          !revealed && !selected && "border-border bg-background hover:border-foreground/15",
                          revealed && isAnswer && "border-forest bg-forest/8 text-foreground",
                          revealed && !isAnswer && selected && "border-ember bg-ember/8",
                          revealed && !isAnswer && !selected && "border-border bg-background opacity-60",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                            revealed && isAnswer
                              ? "bg-forest text-white"
                              : revealed && selected
                                ? "bg-ember text-white"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        {c}
                        {revealed && isAnswer && (
                          <CheckCircle2 className="ml-auto h-4 w-4 text-forest" />
                        )}
                        {revealed && !isAnswer && selected && (
                          <XCircle className="ml-auto h-4 w-4 text-ember" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {quizDone && (
                  <div
                    className={cn(
                      "mt-5 rounded-xl p-4 text-sm leading-relaxed",
                      correct ? "bg-forest/8 text-foreground" : "bg-ember/8 text-foreground",
                    )}
                  >
                    <span className="font-bold">
                      {correct ? "Nice work. " : "Not quite — "}
                    </span>
                    {quiz.why}
                  </div>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {!quizDone ? (
                    <button
                      disabled={picked === null}
                      onClick={submit}
                      className={cn(
                        "press inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-primary-foreground transition-all duration-200",
                        picked === null
                          ? "cursor-not-allowed bg-muted text-muted-foreground"
                          : "ember-glow bg-gradient-to-r from-ember to-papaya hover:shadow-lg",
                      )}
                    >
                      Submit answer
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/lessons"
                        className="press rounded-full border border-border bg-background px-5 py-2.5 text-sm font-bold"
                      >
                        All lessons
                      </Link>
                      {next && (
                        <button
                          onClick={() => navigate(`/learn/${next.slug}`)}
                          className="press ember-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-papaya px-6 py-3 text-sm font-bold text-primary-foreground"
                        >
                          Next lesson
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                      {!next && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-5 py-2.5 text-sm font-bold text-forest">
                          <CheckCircle2 className="h-4 w-4" /> Skill complete!
                        </span>
                      )}
                    </>
                  )}
                </div>
              </section>
            </Reveal>
          )}
        </div>

        {/* Sidebar */}
        <aside className="order-last space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="paper-card relative rounded-2xl p-6 text-center">
            {/* Ring + label live in their own sized relative wrapper so the
                percentage label is always centered on the ring, never on
                the whole card (fixes the off-center ring layout). */}
            <div className="relative mx-auto w-fit">
              <BandRing
                score={pctForSkill(skill)}
                max={100}
                size={130}
                strokeWidth={9}
                color={SKILL_COLORS[skill].color}
              />
              <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-extrabold">
                {pctForSkill(skill)}%
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {SKILL_COLORS[skill].label} progress
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold">
              <Flame className="h-3.5 w-3.5 text-ember" />
              {state.streak}-day streak
            </div>
          </div>

          <div className="sheet rounded-2xl p-5">
            <div className="folio text-[10px]">UP NEXT</div>
            {(() => {
              const rec = recommended(skill);
              if (!rec)
                return (
                  <p className="mt-3 text-sm text-muted-foreground">
                    You've cleared this skill — brilliant.
                  </p>
                );
              return (
                <div className="mt-3">
                  <p className="text-sm font-semibold leading-snug">{rec.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {rec.level} · {rec.minutes} min
                  </p>
                  <Link
                    href={`/learn/${rec.slug}`}
                    className="press mt-3 inline-flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: SKILL_COLORS[skill].color }}
                  >
                    Jump ahead <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })()}
          </div>

          {/* Prev / Next */}
          <div className="flex flex-col gap-2">
            {prev ? (
              <Link
                href={`/learn/${prev.slug}`}
                className="press flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-foreground/15"
              >
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <ArrowLeft className="h-4 w-4" /> Previous
                </span>
                <span className="max-w-[180px] truncate text-right">{prev.title}</span>
              </Link>
            ) : (
              <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                First lesson of {SKILL_COLORS[skill].label}
              </div>
            )}
            {next ? (
              <Link
                href={`/learn/${next.slug}`}
                className="press flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-foreground/15"
              >
                <span className="max-w-[180px] truncate">{next.title}</span>
                <span className="inline-flex items-center gap-2">
                  Next <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ) : null}
          </div>
        </aside>

        {/* Mobile prev/next */}
        <div className="flex gap-2 lg:hidden">
          {prev && (
            <Link
              href={`/learn/${prev.slug}`}
              className="press flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2.5 text-xs font-bold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </Link>
          )}
          {next && (
            <Link
              href={`/learn/${next.slug}`}
              className="press flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-ember to-papaya px-4 py-2.5 text-xs font-bold text-primary-foreground"
            >
              Next lesson <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </PageShell>
  );
}
