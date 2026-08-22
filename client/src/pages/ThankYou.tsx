/*
 * GLORYPREP "Paper & Ember" — Thank You / success page
 * Shown after form submissions / bookings. Success mark, next-step CTA,
 * and a recommended first lesson.
 */
import { Link } from "wouter";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { Reveal } from "@/components/primitives";
import { useSeo } from "@/components/ShellExtras";
import { getLessonsBySkill } from "@/lib/lessons";

export default function ThankYou() {
  useSeo(
    "Thank you — GloryPrep",
    "Your request was received. Here's what happens next and where to continue learning.",
  );

  const starter = getLessonsBySkill("listening")[0];

  return (
    <PageShell>
      <section className="container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
        <Reveal>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest/10">
            <CheckCircle2 className="h-10 w-10 text-forest" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            You're all set. <span className="ember-text">Thank you!</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your request has been received and our team will follow up shortly.
            In the meantime, why not start with your first lesson?
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="press inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-papaya px-6 py-3 text-sm font-bold text-primary-foreground ember-glow"
            >
              Back to home <ArrowRight className="h-4 w-4" />
            </Link>
            {starter && (
              <Link
                href={`/learn/${starter.slug}`}
                className="press inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:border-foreground/20"
              >
                <BookOpen className="h-4 w-4" /> Start: {starter.title}
              </Link>
            )}
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
