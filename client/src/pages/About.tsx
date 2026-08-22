/*
 * GLORYPREP "Paper & Ember" — About page
 * Editorial shell matching Terms/Privacy/Refund pages.
 */
import { Link } from "wouter";
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";
import { ASSETS } from "@/lib/assets";

const PILLARS: { label: string; body: string }[] = [
  {
    label: "100% original content",
    body: "Every lesson, practice passage, and mock exam on GloryPrep is authored from scratch by our team. We write to the public conventions of IELTS preparation — format, question types, and difficulty — without copying any published resource.",
  },
  {
    label: "Honest scoring",
    body: "Mock test scores are calculated from the official publicly published band conversion tables. We never inflate, fabricate, or guarantee results — your practice scores are a genuine indicator of where you stand.",
  },
  {
    label: "Fair pricing, real unlocks",
    body: "One-time micro-payments through PayPal. Every purchase is verified server-side before content is unlocked, and our refund policy protects you if anything goes wrong.",
  },
  {
    label: "Built for students worldwide",
    body: "GloryPrep is an online platform, available anywhere in the world. IELTS preparation should not depend on where you live or which currency you hold.",
  },
];

const FOUNDER_NOTES: { heading: string; body: string }[] = [
  {
    heading: "Why GloryPrep exists",
    body: "IELTS preparation materials are often expensive, region-locked, or recycled from copyrighted publications. GloryPrep was built to offer the opposite: affordable original practice content, transparent pricing, and honest progress tracking for any student preparing for the test — anywhere in the world.",
  },
  {
    heading: "What you get",
    body: "Two hundred and eight skill lessons across Listening, Reading, Writing, and Speaking; a full mock test engine with examiner-style feedback; a practice test library, a complete mock test kit, and per-attempt real mock exams in the Study Shop. Everything you see on the site is browsable; only the final content is locked behind one-time payments.",
  },
  {
    heading: "Who runs it",
    body: "GloryPrep is an independent education platform. Payments are processed by PayPal, account data is handled under our Privacy Policy, and content questions are answered by our support team through the contact form on the site.",
  },
];

export default function About() {
  useSeo(
    "About GloryPrep — Original IELTS Preparation, Worldwide",
    "GloryPrep is an independent online IELTS preparation platform offering 208 original lessons, honest mock test scoring, and fair-priced study unlocks for students worldwide.",
  );

  return (
    <PageShell>
      <section className="container max-w-3xl py-16">
        <div className="folio">ABOUT</div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          About GloryPrep
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          An independent IELTS preparation platform — online, for students
          anywhere in the world.
        </p>

        <div className="mt-12 flex flex-col gap-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <div
                key={p.label}
                className="sheet rounded-2xl border border-border bg-background p-6"
              >
                <h2 className="font-display text-base font-extrabold tracking-tight">
                  <span className="ember-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {p.label}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            {FOUNDER_NOTES.map((n) => (
              <div key={n.heading}>
                <h2 className="font-display text-lg font-extrabold tracking-tight">
                  {n.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {n.body}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-dashed border-border bg-paper p-6 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">
              Questions about the platform?
            </p>
            <p className="mt-1">
              Reach the support team through the{" "}
              <Link
                href="/contact"
                className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
              >
                contact form
              </Link>{" "}
              or email{" "}
              <a
                href="mailto:support@gloryprep.com"
                className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
              >
                support@gloryprep.com
              </a>
              . Legal matters are covered in our{" "}
              <Link
                href="/terms"
                className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
              >
                Terms
              </Link>
              ,{" "}
              <Link
                href="/privacy"
                className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/refund"
                className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
              >
                Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
