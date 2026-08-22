/*
 * GLORYPREP "Paper & Ember" — custom 404
 * Giant brand-numeral, friendly message, two CTAs, band-ring motif echo.
 */
import { Link } from "wouter";
import { ArrowRight, BookOpen, Home } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";

export default function NotFound() {
  useSeo(
    "Page not found — GloryPrep",
    "The page you're looking for doesn't exist. Browse GloryPrep's IELTS lessons or return home.",
  );

  return (
    <PageShell>
      <section className="container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
        <div className="relative">
          <span className="font-display text-[9rem] font-extrabold leading-none tracking-tighter text-foreground/90 sm:text-[12rem]">
            4<span className="ember-text">0</span>4
          </span>
          <div
            aria-hidden
            className="absolute -right-10 top-6 h-24 w-24 rounded-full border-[7px] border-dashed border-ember/30"
          />
        </div>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          This page took the wrong exam.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          We couldn't find the page you're looking for — but your next lesson
          (or a free mock test) is one click away. No band score is harmed in
          the process.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="press inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-papaya px-6 py-3 text-sm font-bold text-primary-foreground ember-glow"
          >
            <Home className="h-4 w-4" /> Back to home
          </Link>
          <Link
            href="/lessons"
            className="press inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:border-foreground/20"
          >
            <BookOpen className="h-4 w-4" /> Explore lessons
          </Link>
        </div>
        <Link
          href="/"
          className="press mt-10 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" /> gloryprep homepage
        </Link>
      </section>
    </PageShell>
  );
}
