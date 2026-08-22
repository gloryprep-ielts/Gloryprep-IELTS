/*
 * GLORYPREP — Student Dashboard ("Paper & Ember")
 * Asymmetric layout: sticky left skill-rail + right content grid.
 * Animated 4-skill rings, streak flame, weekly band-trend sparkline (SVG),
 * upcoming mock schedule, AI recommendations. Motion: rise-in stagger,
 * ring draw-in 1.2s, bar-grow 700ms.
 */
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import {
  ArrowRight,
  Flame,
  Headphones,
  BookOpen,
  PenLine,
  Mic,
  CalendarDays,
  Sparkles,
  Clock,
  Zap,
  Trophy,
  Bell,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSeo } from "@/components/ShellExtras";
import { Spinner } from "@/components/ui/spinner";
import { BandRing, CountUp, Reveal, Folio, SkillDot } from "@/components/primitives";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

import { ASSETS } from "@/lib/assets";

const LOGO = ASSETS.logo;

const SKU_TITLES: Record<string, string> = {
  "full-library": "Full Practice Test Library",
  "mock-kit": "Complete Mock Test Kit",
  "exam-listening": "Real Mock Exam — Listening",
  "exam-reading": "Real Mock Exam — Reading",
  "exam-writing": "Real Mock Exam — Writing",
};

const SKILLS = [
  { skill: "listening", icon: Headphones },
  { skill: "reading", icon: BookOpen },
  { skill: "writing", icon: PenLine },
  { skill: "speaking", icon: Mic },
];



export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { data: purchases } = trpc.auth.myPurchases.useQuery(undefined, {
    enabled: isAuthenticated,
    retry: false,
  });
  useSeo(
    "Dashboard — GloryPrep",
    "Track your IELTS band score across Listening, Reading, Writing and Speaking, keep your streak alive and see personalised recommendations.",
  );

  // Real progress: the mock test engine writes the last attempt to localStorage.
  // Until a mock is taken, every stat shows an empty state — no fabricated numbers.
  const lastAttempt = (() => {
    try {
      return JSON.parse(localStorage.getItem("gp:last-mock") ?? "null");
    } catch {
      return null;
    }
  })();

  const hasAttempt = !!lastAttempt?.completed;

  if (loading) {
    return (
      <PageShell>
        <div className="container flex min-h-[50vh] items-center justify-center py-16">
          <Spinner className="size-6 text-ember" />
        </div>
      </PageShell>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageShell>
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
          <div className="rounded-2xl bg-accent p-8 max-w-md border border-border">
            <h1 className="font-display text-2xl font-extrabold mb-4">Sign in to view your progress</h1>
            <p className="text-muted-foreground mb-6">
              Track your IELTS preparation, save your mock test results, and access your purchased materials in one place.
            </p>
            <Button 
              onClick={() => window.location.href = "/login"}
              className="bg-gradient-to-r from-ember to-papaya text-white font-bold rounded-full px-8 py-6"
            >
              Sign in to GloryPrep
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="container py-10 lg:py-14">
        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="folio">Student Dashboard</div>
              <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
                Your IELTS <span className="ember-text">prep hub</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Take a full mock test to see your band scores, progress and recommended drills here.
              </p>
            </div>
            <div className="paper-card flex items-center gap-3 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-ember to-papaya font-display text-sm font-bold text-primary-foreground">
                {(user?.name || "U").trim().charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-sm font-bold">{user?.name || "Student"}</div>
                <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await logout();
                    toast.success("Signed out");
                    navigate("/");
                  } catch {
                    toast.error("Failed to sign out");
                  }
                }}
                className="press rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-ember hover:text-ember"
              >
                Sign out
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.info("No new notifications")}
                className="press paper-card-hover paper-card flex h-10 w-10 items-center justify-center rounded-full"
                aria-label="Notifications"
              >
                <Bell className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-accent/60 font-display text-sm font-bold text-muted-foreground">
                GP
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* ——— Sticky skill rail ——— */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {SKILLS.map((s, i) => (
              <Reveal key={s.skill} delay={i * 60}>
                <button
                  onClick={() => navigate(`/lessons?skill=${s.skill}`)}
                  className="paper-card paper-card-hover flex w-full items-center gap-3 p-4 text-left"
                >
                  <div className="flex h-11 w-11 items-center justify-center">
                    <s.icon className="h-5 w-5" style={{ color: `var(--skill-${s.skill === "listening" ? "listen" : s.skill === "reading" ? "read" : s.skill === "writing" ? "write" : "speak"})` }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-sm font-bold capitalize">{s.skill}</div>
                  </div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    No attempt yet
                  </span>
                </button>
              </Reveal>
            ))}
            <Reveal delay={260}>
              <Link
                href="/lessons"
                className="press ember-glow block rounded-2xl bg-gradient-to-r from-ember to-papaya p-4 text-center font-bold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
              >
                Continue lessons →
              </Link>
            </Reveal>
          </aside>

          {/* ——— Main grid ——— */}
          <div className="space-y-6">
            {/* My purchases — real unlocks bought on the site */}
            <Reveal>
              <div className="paper-card p-6">
                <div className="folio">My Purchases</div>
                <h3 className="mt-2 font-display text-lg font-bold">Unlocked content</h3>
                {purchases === undefined ? (
                  <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
                ) : purchases.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    You haven&apos;t unlocked anything yet — browse the{" "}
                    <Link href="/store" className="font-medium text-ember underline-offset-4 hover:underline">Store</Link> to unlock practice content.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {purchases.map(p => (
                      <li key={p.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm">
                        <span className="font-medium">{SKU_TITLES[p.sku] || p.title}</span>
                        <span className="font-mono text-xs text-emerald-600">Unlocked</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>

            {/* Hero row: overall ring + streak + quick stats — staggered editorial stack */}
            <div className="grid gap-5 md:grid-cols-[auto_1fr_1fr]">
              {hasAttempt ? (
                <>
                  <Reveal>
                    <div className="paper-card sheet-lift relative p-6 text-center md:translate-y-5">
                      <div className="folio mb-2 justify-center">Overall Band</div>
                      <div className="relative mx-auto w-fit">
                        <BandRing score={lastAttempt.overall ?? 0} size={150} strokeWidth={11} className="block" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-4xl font-extrabold">
                            <CountUp value={lastAttempt.overall ?? 0} />
                          </span>
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">/ 9.0</span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delay={80}>
                    <div className="data-slab paper-card-hover flex h-full flex-col justify-between p-6">
                      <div className="font-display font-bold">This week</div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                        {Object.entries(lastAttempt.skills ?? {}).map(([skill, band]) => (
                          <MiniStat key={skill} value={String(band)} label={skill.slice(0, 4)} />
                        ))}
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground">Practice estimates based on the public IELTS band descriptors.</p>
                    </div>
                  </Reveal>
                  <Reveal delay={140}>
                    <div className="paper-card paper-card-hover flex h-full flex-col justify-center p-6">
                      <div className="font-display font-bold">Keep the momentum</div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Your trend appears after your next mock test — every attempt updates your dashboard.
                      </p>
                      <Link
                        href="/test"
                        className="press mt-4 rounded-xl border border-border py-2.5 text-center text-sm font-semibold transition-colors hover:border-ember hover:text-ember"
                      >
                        Start a mock test
                      </Link>
                    </div>
                  </Reveal>
                </>
              ) : (
                <>
                  <Reveal>
                    <div className="paper-card sheet-lift relative flex h-full min-h-[220px] flex-col items-center justify-center p-6 text-center md:translate-y-5">
                      <div className="folio mb-3 justify-center">Overall Band</div>
                      <BandRing score={0} size={150} strokeWidth={11} className="mx-auto block opacity-40" />
                      <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                        Your band score will appear here after your first mock test.
                      </p>
                      <Link
                        href="/test"
                        className="press mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-ember to-papaya px-5 py-2.5 text-sm font-bold text-primary-foreground"
                      >
                        Take the free mock test <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </Reveal>
                  <Reveal delay={80}>
                    <div className="data-slab paper-card-hover flex h-full flex-col justify-between p-6">
                      <div className="flex items-center gap-2 font-display font-bold">
                        <Flame className="h-5 w-5 text-ember" /> Streak
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Complete daily drills to start building your streak — no numbers are shown until you practice.
                      </p>
                      <Link
                        href="/lessons"
                        className="press mt-4 rounded-xl border border-border py-2.5 text-center text-sm font-semibold transition-colors hover:border-ember hover:text-ember"
                      >
                        Browse lessons
                      </Link>
                    </div>
                  </Reveal>
                  <Reveal delay={140}>
                    <div className="paper-card paper-card-hover flex h-full flex-col justify-between p-6">
                      <div className="font-display font-bold">This week</div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                        <MiniStat value="—" label="studied" />
                        <MiniStat value="—" label="questions" />
                        <MiniStat value="—" label="essays" />
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground">Stats are tracked locally in your browser as you practice.</p>
                    </div>
                  </Reveal>
                </>
              )}
            </div>

            {/* Trend chart — shows only after at least one completed attempt */}
            {hasAttempt && (
              <Reveal delay={60}>
                <div className="note-clip p-6 md:mt-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="folio">Band Trend</div>
                      <h3 className="mt-2 font-display text-lg font-bold">Your score over time</h3>
                    </div>
                    <span className="rounded-full bg-accent/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                      Practice estimates — not official results
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Take a few more mocks and your week-over-week trend will chart here.
                  </p>
                </div>
              </Reveal>
            )}

            {/* Schedule + recommendations — honest placeholders */}
            <div className="grid gap-5 lg:grid-cols-2">
              <Reveal>
                <div className="paper-card h-full p-6 md:translate-x-4">
                  <div className="flex items-center justify-between">
                    <div className="folio">Your Schedule</div>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Nothing scheduled yet — the mock test engine and lesson library are ready whenever you are.
                  </p>
                  <div className="mt-4 space-y-3">
                    <Link href="/test" className="press block rounded-xl border border-border p-4 text-left transition-colors hover:border-ember/50">
                      <div className="font-display text-sm font-bold">Full mock test</div>
                      <div className="mt-1 text-xs text-muted-foreground">Listening · Reading · Writing · Speaking — free first attempt</div>
                    </Link>
                    <Link href="/lessons" className="press block rounded-xl border border-border p-4 text-left transition-colors hover:border-ember/50">
                      <div className="font-display text-sm font-bold">Skill lessons</div>
                      <div className="mt-1 text-xs text-muted-foreground">208 lessons across all four skills, included free</div>
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="paper-card h-full p-6 md:-translate-x-4">
                  <div className="flex items-center justify-between">
                    <div className="folio">Where to focus</div>
                    <Sparkles className="h-4 w-4 text-ember" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    These are starting points, not AI analysis of your work. Personalised recommendations appear once you've completed a mock test.
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      { icon: Headphones, color: "var(--skill-listen)", title: "Listening Part 1 basics", text: "Names, numbers and spellings — the easiest marks on the test.", href: "/lessons?skill=listening" },
                      { icon: BookOpen, color: "var(--skill-read)", title: "Reading: True / False / Not Given", text: "The most-missed question type in official IELTS tests.", href: "/lessons?skill=reading" },
                      { icon: PenLine, color: "var(--skill-write)", title: "Writing Task 2 structure", text: "A reliable four-paragraph structure that works for every prompt.", href: "/lessons?skill=writing" },
                    ].map((r, i) => (
                      <Link key={i} href={r.href} className="press block rounded-xl border border-border p-4 transition-colors hover:border-ember/50">
                        <div className="flex items-center gap-2.5 font-display text-sm font-bold">
                          <r.icon className="h-4.5 w-4.5" style={{ color: r.color, width: 18, height: 18 }} />
                          {r.title}
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{r.text}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-secondary/70 px-2 py-2.5">
      <div className="font-display text-lg font-extrabold ember-text">{value}</div>
      <div className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
