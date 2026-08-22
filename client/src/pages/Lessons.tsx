/*
 * GLORYPREP "Paper & Ember" — Lessons library
 * Editorial asymmetric layout: skill rail on left (desktop), lessons as
 * staggered paper cards with skill-color accents, level filter tabs,
 * progress bars, continue-learning strip.
 */
import { useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "wouter";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  GraduationCap,
  PlayCircle,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { BandRing, Folio, Reveal, SkillDot } from "@/components/primitives";
import { SKILL_COLORS } from "@/components/primitives";
import { getLessonsBySkill, type LessonLevel, type SkillId } from "@/lib/lessons";
import { useProgress, trackEvent } from "@/hooks/useProgress";
import { useSeo } from "@/components/ShellExtras";
import { cn } from "@/lib/utils";

const SKILLS: SkillId[] = ["listening", "reading", "writing", "speaking"];
const LEVELS: (LessonLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Lessons() {
  useSeo("IELTS Lessons Library — GloryPrep", "200+ IELTS skill lessons across Listening, Reading, Writing and Speaking — organised by level with checkpoint quizzes and progress tracking.");

  const [params] = useSearchParams();
  const [location, navigate] = useLocation();
  const skillParam = (params.get("skill") as SkillId) || "listening";
  const [skill, setSkill] = useState<SkillId>(
    SKILLS.includes(skillParam) ? skillParam : "listening",
  );
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const { pctForSkill, completedForSkill, state, recommended, startLesson } =
    useProgress();

  const lessons = useMemo(() => {
    let list = getLessonsBySkill(skill);
    if (level !== "All") list = list.filter((l) => l.level === level);
    return list;
  }, [skill, level]);

  const rec = recommended(skill);

  const onSkillChange = (s: SkillId) => {
    setSkill(s);
    setLevel("All");
    navigate(`/lessons?skill=${s}`, { replace: true });
  };

  return (
    <PageShell>
      {/* Hero strip */}
      <section className="relative overflow-hidden border-b border-border bg-paper-deep">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% -20%, var(--ember) 0%, transparent 38%), radial-gradient(circle at 10% 120%, var(--papaya) 0%, transparent 30%)",
            opacity: 0.1,
          }}
        />
        <div className="container grid gap-8 py-14 md:grid-cols-[1.5fr_1fr] md:items-center md:py-20">
          <div>
            <Folio>THE GLORYPREP LIBRARY</Folio>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              52 lessons per skill.{" "}
              <span className="ember-text">Zero guesswork.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Every lesson targets one exam skill, drills one weakness, and
              ends with a checkpoint quiz. Built for students everywhere who
              want a system, not luck.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold">
                <Flame className="h-4 w-4 text-ember" />
                {state.streak}-day streak
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold">
                <GraduationCap className="h-4 w-4 text-forest" />
                {state.completed.length} lessons completed
              </div>
            </div>
          </div>
          <div className="paper-card sheet-lift relative mt-8 w-40 self-center overflow-visible px-2 py-6 md:mt-0 md:block lg:w-44">
            <div className="flex items-center justify-center">
              <BandRing
                score={pctForSkill(skill)}
                max={100}
                size={120}
                strokeWidth={10}
                color={SKILL_COLORS[skill].color}
                className="md:hidden"
              />
              <BandRing
                score={pctForSkill(skill)}
                max={100}
                size={140}
                strokeWidth={10}
                color={SKILL_COLORS[skill].color}
                className="hidden md:block"
              />
              <span className="absolute font-display text-2xl font-extrabold">
                {pctForSkill(skill)}%
              </span>
            </div>
            <p className="pb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {SKILL_COLORS[skill].label} progress
            </p>
          </div>
        </div>
      </section>

      <div className="container grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
        {/* Skill rail */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Folio>CHOOSE SKILL</Folio>
          <nav className="mt-4 flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-2.5">
            {SKILLS.map((s) => (
              <button
                key={s}
                onClick={() => onSkillChange(s)}
                className={cn(
                  "press group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200",
                  skill === s
                    ? "sheet-lift border-transparent shadow-md"
                    : "border-border bg-background hover:border-foreground/15",
                )}
                style={skill === s ? { borderColor: `${SKILL_COLORS[s].color}33` } : undefined}
              >
                <SkillDot skill={s} />
                <div className="min-w-0">
                  <div className="text-sm font-bold">{SKILL_COLORS[s].label}</div>
                  <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pctForSkill(s)}%`,
                        background: SKILL_COLORS[s].color,
                      }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </nav>
          {/* Continue learning */}
          {rec && (
            <div className="note-clip mt-6 rounded-xl bg-accent p-4">
              <div className="folio text-[10px]">CONTINUE LEARNING</div>
              <p className="mt-2 text-sm font-semibold leading-snug">{rec.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {rec.level} · {rec.minutes} min
              </p>
              <button
                onClick={() => {
                  startLesson(rec);
                  navigate(`/learn/${rec.slug}`);
                }}
                className="press mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-ember to-papaya px-4 py-2 text-xs font-bold text-primary-foreground"
              >
                <PlayCircle className="h-3.5 w-3.5" /> Resume
              </button>
            </div>
          )}
        </aside>

        {/* Lesson list */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              {SKILL_COLORS[skill].label} —{" "}
              <span className="text-muted-foreground">{lessons.length} lessons</span>
            </h2>
            <div className="flex flex-wrap gap-1.5" role="tablist">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  role="tab"
                  aria-selected={level === l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    "press rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors duration-200",
                    level === l
                      ? "bg-foreground text-background"
                      : "bg-accent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {lessons.map((l, i) => (
              <Reveal key={l.id} delay={(i % 6) * 40}>
                <LessonRow
                  lesson={l}
                  done={state.completed.includes(l.id)}
                  current={state.current[skill] === l.id && !state.completed.includes(l.id)}
                  onStart={() => {
                    startLesson(l);
                    navigate(`/learn/${l.slug}`);
                  }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function LessonRow({
  lesson: l,
  done,
  current,
  onStart,
}: {
  lesson: { id: string; num: number; title: string; description: string; level: LessonLevel; minutes: number; skill: SkillId };
  done: boolean;
  current: boolean;
  onStart: () => void;
}) {
  return (
    <article
      className={cn(
        "sheet group flex items-start gap-4 rounded-2xl border p-4 transition-all duration-200 md:p-5",
        done
          ? "border-foreground/10 opacity-80"
          : current
            ? "sheet-lift shadow-md"
            : "border-border bg-background paper-card-hover",
      )}
    >
      <div
        aria-hidden
        className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold md:flex"
        style={{
          background: done
            ? "var(--forest)"
            : `${SKILL_COLORS[l.skill].color}1F`,
          color: done ? "#fff" : SKILL_COLORS[l.skill].color,
        }}
      >
        {done ? <CheckCircle2 className="h-5 w-5" /> : l.num}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-bold leading-snug md:text-lg">
            {l.title}
          </h3>
          {current && (
            <span className="rounded-full bg-ember/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ember">
              In progress
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{l.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground">
          <span
            className="rounded-full px-2 py-0.5 font-bold"
            style={{
              background: `${SKILL_COLORS[l.skill].color}14`,
              color: SKILL_COLORS[l.skill].color,
            }}
          >
            {l.level}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {l.minutes} min
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Checkpoint quiz
          </span>
        </div>
      </div>
      <button
        onClick={onStart}
        className="press mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-ember to-papaya px-4 py-2 text-xs font-bold text-primary-foreground opacity-90 transition-all duration-200 group-hover:opacity-100 group-hover:shadow-md md:px-5"
      >
        {done ? "Review" : current ? "Continue" : "Start"}{" "}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </article>
  );
}
