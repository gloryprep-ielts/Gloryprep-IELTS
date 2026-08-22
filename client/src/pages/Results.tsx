/*
 * GLORYPREP — Mock Test Results ("Paper & Ember")
 * Shows your real mock result when one exists; otherwise an honest empty state.
 * No fabricated band scores, no fake AI analysis.
 */
import { Link } from "wouter";
import { ArrowRight, Target } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";
import { BandRing, Reveal, Folio } from "@/components/primitives";

type Attempt = {
  completed: boolean;
  overall: number;
  skills: Record<string, number>;
  date?: string;
};

function readAttempt(): Attempt | null {
  try {
    const raw = localStorage.getItem("gp:last-mock");
    if (!raw) return null;
    const a = JSON.parse(raw);
    return a && a.completed ? a : null;
  } catch {
    return null;
  }
}

const SKILL_LABEL: Record<string, string> = {
  listening: "Listening",
  reading: "Reading",
  writing: "Writing",
  speaking: "Speaking",
};

function ResultReport({ attempt }: { attempt: Attempt }) {
  const overall = attempt.overall ?? 0;
  const skills = attempt.skills ?? {};
  return (
    <>
      <Reveal>
        <div className="folio">
          {attempt.date ? `Mock test · ${attempt.date}` : "Mock test · full report"}
        </div>
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
          You scored <span className="ember-text">{overall.toFixed(1)}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Practice estimate based on the official public IELTS band descriptors — not an official result.
        </p>
      </Reveal>

      {/* ——— Top band row ——— */}
      <div className="mt-10 grid gap-5 lg:grid-cols-[340px_1fr]">
        <Reveal delay={60}>
          <div className="paper-card sheet-lift p-7 lg:mt-8">
            <div className="folio mb-4 justify-center">Overall Band</div>
            <div className="relative mx-auto w-fit">
              <BandRing score={overall} size={210} strokeWidth={13} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-5xl font-extrabold">{overall.toFixed(1)}</span>
                <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                  / 9.0
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="paper-card h-full p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="folio">Band Breakdown · 4 Skills</div>
              <span className="tick">Practice estimates</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {Object.entries(skills).map(([skill, band]) => (
                <div key={skill} className="flex items-center gap-4 rounded-xl border border-border p-4">
                  <div className="relative shrink-0">
                    <BandRing score={band} size={84} strokeWidth={8} />
                    <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-extrabold">
                      {band.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-sm font-bold capitalize">{SKILL_LABEL[skill] ?? skill}</span>
                    <div className="mt-1 text-xs text-muted-foreground">Practice band</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Listening and Reading bands are converted from your answer accuracy; Writing and Speaking
              are estimated from your submitted answers. Detailed criterion-level grading is not part of
              the platform today — use the writing packs and speaking sets in the Study Shop for rubric-guided practice.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ——— Next actions ——— */}
      <Reveal>
        <div className="paper-card mt-10 grid items-center gap-6 p-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2">
              <Target className="h-4.5 w-4.5 text-ember" style={{ width: 18, height: 18 }} />
              <div className="folio">What to do next</div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Review the lessons in your weaker skills, then retake a mock test. Your dashboard will
              chart your progress once you have more than one attempt on record.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="press ember-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-papaya px-7 py-3.5 font-bold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
          >
            Go to dashboard <ArrowRight className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
          </Link>
        </div>
      </Reveal>
    </>
  );
}

function NoResult() {
  return (
    <>
      <Reveal>
        <div className="folio">Test Results</div>
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
          No results <span className="ember-text">yet</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          This page shows your real mock test results. You haven't completed a mock test on this device yet —
          take the free one to see your band breakdown here.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="paper-card mt-10 flex flex-col items-center gap-5 p-10 text-center">
          <BandRing score={0} size={160} strokeWidth={12} className="opacity-40" />
          <div className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Your band score, per-skill breakdown and progress chart will all appear here after your first
            completed mock test. We don't show placeholder numbers — what you see here will be your own work.
          </div>
          <Link
            href="/test"
            className="press ember-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-papaya px-7 py-3.5 font-bold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
          >
            Take the free mock test <ArrowRight className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
          </Link>
        </div>
      </Reveal>
    </>
  );
}

export default function Results() {
  useSeo(
    "Test Results — GloryPrep",
    "Your real IELTS mock test results — band breakdown across Listening, Reading, Writing and Speaking.",
  );

  const attempt = readAttempt();

  return (
    <PageShell>
      <div className="container py-12 lg:py-16">{attempt ? <ResultReport attempt={attempt} /> : <NoResult />}</div>
    </PageShell>
  );
}
