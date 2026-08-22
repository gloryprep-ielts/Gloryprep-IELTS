/*
 * GLORYPREP — Landing page ("Paper & Ember")
 * Asymmetric 60/40 hero with animated Band Ring device; folio eyebrows;
 * skill quartet section; scroll-triggered rise-ins; infinite logo marquee;
 * testimonial cards with photos; dual CTA. Motion: fade+rise 560ms stagger,
 * ring draw-in 1.2s, count-ups 900ms.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useSeo } from "@/components/ShellExtras";
import { trackEvent } from "@/hooks/useProgress";
import { ASSETS } from "@/lib/assets";
import {
  ArrowRight,
  Headphones,
  BookOpen,
  PenLine,
  Mic,
  Check,
  ShoppingBag,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import {
  BandRing,
  Reveal,
  Folio,
  SkillDot,
  SKILL_COLORS,
} from "@/components/primitives";

/** Hero desk vignette — preloaded and drawn only once the file is decoded. */
function useHeroDeskBg() {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      setUrl(ASSETS.studyDesk);
    };
    // Fallback: if onload never fires, still surface the path after a timeout
    // so the layer renders instead of silently disappearing.
    const t = setTimeout(() => {
      if (!cancelled) setUrl(ASSETS.studyDesk);
    }, 2000);
    img.src = ASSETS.studyDesk;
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);
  return url;
}

const SKILLS = [
  {
    icon: Headphones,
    skill: "listening",
    title: "Listening",
    text: "A full 4-part mock (40 questions) scored against official band descriptors — the same exam pressure as test day.",
    score: null as number | null,
  },
  {
    icon: BookOpen,
    skill: "reading",
    title: "Reading",
    text: "Original passages with 40-question timed tests — True/False/Not Given, matching and gap-fill, all with worked rationale.",
    score: null as number | null,
  },
  {
    icon: PenLine,
    skill: "writing",
    title: "Writing",
    text: "Task 1 & Task 2 practice packs — charts, essays and letters — each with band-7 model outlines and the examiner's rubric explained.",
    score: null as number | null,
  },
  {
    icon: Mic,
    skill: "speaking",
    title: "Speaking",
    text: "Three full speaking sets covering Part 1, cue cards and Part 3, each with examiner notes and vocabulary builders.",
    score: null as number | null,
  },
];



const PILLARS = [
  "100% original practice content",
  "Scored on the official IELTS band scale",
  "Pay once — content is yours forever",
  "Honest pricing, no inflated claims",
];

export default function Home() {
  const deskBg = useHeroDeskBg();
  useSeo(
    "GloryPrep — IELTS Preparation Platform for Students Worldwide",
    "Band 7 isn't luck. It's a system. Realistic IELTS mock tests and 200+ original skill lessons — for students everywhere."
  );

  return (
    <PageShell overHero>
      {/* ————— HERO: asymmetric 60/40 split ————— */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-25"
          style={{
            backgroundImage: `url(${ASSETS.studyTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Book & coffee study atmosphere — right vignette behind the score card.
            Rendered as a real <img> once decoded (guaranteed visibility,
            no silent load failures) and masked with a CSS gradient. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/3 overflow-hidden lg:block"
        >
          {deskBg && (
            <img
              src={deskBg}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="h-full w-full object-cover object-right"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.9) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.9) 100%)",
              }}
            />
          )}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-background/40 via-background/15 to-transparent lg:w-2/3 lg:from-background/60 lg:via-background/25"
        />
        <div className="container relative grid items-center gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-28">
          <div>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
                Band 7 isn't luck.
                <br />
                It's a <span className="ember-text">system.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                GloryPrep turns IELTS prep into measurable progress — realistic
                mock tests, 100% original practice content, and examiner-
                style feedback for your IELTS preparation.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/test"
                  onClick={() => trackEvent("cta_click", { cta: "hero_free_test" })}
                  className="press ember-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-papaya px-7 py-3.5 text-base font-bold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Start your free mock test
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/lessons"
                  onClick={() => trackEvent("cta_click", { cta: "hero_lessons" })}
                  className="press paper-card-hover paper-card inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition-all duration-200"
                >
                  Explore lessons
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => trackEvent("cta_click", { cta: "hero_book_test" })}
                  className="press paper-card-hover paper-card inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition-all duration-200"
                >
                  Book a mock test
                </Link>
                <Link
                  href="/store"
                  onClick={() => trackEvent("cta_click", { cta: "hero_store" })}
                  className="press inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-7 py-3.5 text-base font-semibold transition-colors duration-200 hover:border-ember/60 hover:text-ember"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Practice store
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-extrabold ember-text">208</span>
                  <span className="text-sm text-muted-foreground">skill lessons, included free</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-extrabold">0%</span>
                  <span className="text-sm text-muted-foreground">copied from publishers — all original</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Animated band-score device */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Reveal delay={200} className="float-slow">
              <div className="paper-card paper-card-hover relative mx-auto w-fit p-8">
                <div className="folio mb-4">Preview · What your report looks like</div>
                <div className="relative">
                  <BandRing score={7.6} size={232} strokeWidth={14} className="mx-auto block opacity-90" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-6xl font-extrabold leading-none text-muted-foreground/70">
                      7.6
                    </span>
                    <span className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Example band score
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {["listening", "reading", "writing", "speaking"].map((skill) => (
                    <div key={skill} className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary/60 px-1 py-3">
                      <SkillDot skill={skill} />
                      <span className="font-display text-lg font-bold text-muted-foreground/60">—</span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                        {skill.slice(0, 4)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-accent/60 px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                  Your real scores appear after your first mock test
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— HONESTY PILLARS ————— */}
      <section className="border-y border-border bg-paper-deep/60 py-8">
        <div className="container mb-4 text-center">
          <Folio>How we keep it honest</Folio>
        </div>
        <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-2">
          {PILLARS.map((p) => (
            <span
              key={p}
              className="flex items-center gap-2 font-display text-sm font-bold tracking-tight text-muted-foreground/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ————— SKILL QUARTET ————— */}
      <section className="container py-20 lg:py-28">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Folio>01 — The Four Skills</Folio>
              <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
                One platform. Four
                <span className="ember-text"> mastered skills.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Every skill gets its own engine — recordings, passages, essays,
              cue cards — all measured on the real IELTS band scale.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SKILLS.map((s, i) => (
            <Reveal key={s.skill} delay={i * 70}>
              <div className="paper-card paper-card-hover group h-full p-7">
                <div className="flex items-start justify-between">
                    <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105"
                    style={{ borderColor: `${SKILL_COLORS[s.skill].color}4D` }}
                  >
                    <s.icon className="h-6 w-6" style={{ color: SKILL_COLORS[s.skill].color }} />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold" style={{ color: SKILL_COLORS[s.skill].color }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: SKILL_COLORS[s.skill].color }} />
                  {s.title} engine active
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— WHAT YOU ACTUALLY GET ————— */}
      <section className="bg-paper-deep/60 py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <Folio>02 — What you actually get</Folio>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">
              Real content, <span className="ember-text">nothing fabricated.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "208 free skill lessons",
                text: "Every lesson in the library is written by GloryPrep and included with your account. No lesson is paywalled.",
              },
              {
                title: "Original practice tests",
                text: "Three reading passages, a full four-part listening mock, three writing packs and three speaking sets — all freshly written, none copied from Cambridge, Makkar or any publisher.",
              },
              {
                title: "Honest scoring",
                text: "Bands are estimated against the official public IELTS descriptors. We don't inflate scores to make you feel good — you get the number you'd get on test day.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="paper-card paper-card-hover flex h-full flex-col p-7">
                  <div className="font-display text-xl font-bold">{c.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="paper-card mt-12 grid gap-8 overflow-hidden lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-10">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold ember-text">$0</span>
                    <span className="max-w-[9rem] text-xs leading-tight text-muted-foreground">to start — first full mock is free</span>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold ember-text">Once</span>
                    <span className="max-w-[9rem] text-xs leading-tight text-muted-foreground">pay for content and it stays unlocked forever</span>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold ember-text">No ads</span>
                    <span className="max-w-[9rem] text-xs leading-tight text-muted-foreground">no inflated claims, no review games</span>
                  </div>
                </div>
              </div>
              <div className="hidden h-full bg-gradient-to-l from-ember/10 via-papaya/5 to-transparent lg:block lg:w-64 lg:self-stretch" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— HOW IT WORKS ————— */}
      <section className="container py-20 lg:py-28">
        <Reveal>
          <Folio>03 — How GloryPrep Works</Folio>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">
            Three weeks from <span className="ember-text">first test</span> to first insight.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Take a full mock",
              text: "A full exam simulation — Listening, Reading, Writing, Speaking — scored on the official band scale.",
            },
            {
              n: "02",
              title: "Read your diagnosis",
              text: "Your report shows where you lost points — mapped to an IELTS criterion and a skill, so you know what to train next.",
            },
            {
              n: "03",
              title: "Train the gap",
              text: "Targeted drills on your weak criteria keep you compounding until test day.",
            },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="paper-card paper-card-hover relative p-7">
                <span className="font-display text-5xl font-extrabold text-muted-foreground/25">{step.n}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— STUDY SHOP TEASER ————— */}
      <section className="container py-20 lg:py-24">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Folio>04 — The Study Shop</Folio>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">
                Original practice material,
                <span className="ember-text"> one payment at a time.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Fresh, Cambridge-style content written by GloryPrep — nothing copied from
              any publisher. Browse everything; pay only for what you want.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { name: "Full Practice Library", desc: "Reading, listening, writing & speaking tests with keys and rationale", price: "$3" },
            { name: "Mock Test Kit", desc: "Printable answer sheets, writing sheets, cue cards & schedule", price: "$1.50" },
            { name: "Real Mock Exams", desc: "One official-style attempt per skill — Listening, Reading, Writing", price: "$0.50 / attempt" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <Link href="/store" className="paper-card paper-card-hover group flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-ink/12 px-3 py-1 font-mono text-xs font-semibold">{item.price}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/60 transition-all group-hover:translate-x-1 group-hover:text-ember" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{item.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— FINAL CTA ————— */}
      <section className="container pb-20 lg:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ember to-papaya p-10 text-primary-foreground sm:p-14 lg:p-20">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25"
              style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
            />
            <div className="relative max-w-2xl">
              <div className="folio !text-primary-foreground/80">05 — Start Today</div>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                Your next mock test is 30 seconds away.
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90">
                Free for your first full test. No card. No coaching upsells.
                Just a honest band score and a plan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/test"
                  className="press inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-bold text-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Start free mock test <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="press inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-7 py-3.5 font-bold backdrop-blur transition-colors hover:bg-primary-foreground/20"
                >
                  See plans · USD, BDT & MYR
                </Link>
              </div>
              <ul className="mt-8 grid gap-2.5 text-sm sm:grid-cols-2">
                {["Full 4-skill mock test", "Instant band-score report", "Honest band-score feedback", "No card required"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}


