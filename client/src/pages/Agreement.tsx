/*
 * GLORYPREP "Paper & Ember" — User Agreement page
 * The broader "Agreement" covering platform use, subscriptions and the
 * relationship between GloryPrep and its students. Links to the detailed
 * Privacy Policy and Terms & Conditions.
 */
import { Link } from "wouter";
import { FileText, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";

const PARTS: { title: string; body: string }[] = [
  {
    title: "What this agreement covers",
    body: "This User Agreement sets out the relationship between you and GloryPrep Learning when you use the GloryPrep platform, including lesson content, mock tests, model feedback resources and any paid subscription. It works together with our Privacy Policy and Terms & Conditions — together they form the complete agreement governing your use of GloryPrep.",
  },
  {
    title: "The service",
    body: "GloryPrep provides IELTS preparation content and practice tools. All scores, bands and feedback are practice estimates generated for learning purposes; they are not official IELTS results and GloryPrep is not affiliated with, endorsed by, or connected to the official IELTS test owners.",
  },
  {
    title: "Subscriptions and billing",
    body: "Paid plans are billed in advance in your selected currency (BDT or MYR). Subscriptions renew automatically at the end of each billing period unless cancelled beforehand. You may cancel at any time; access continues until the end of the period you have paid for. No refunds are implied for partial periods except where required by law.",
  },
  {
    title: "Your data and consent",
    body: "Study progress is stored in your own browser by default. Anonymous analytics run without personal identifiers; you may opt out at any time by contacting us or clearing browser storage. Full details of data collection and your rights are in the Privacy Policy.",
  },
  {
    title: "Acceptable use",
    body: "You may use GloryPrep for personal, non-commercial study. You must not share accounts, scrape or redistribute question banks, reverse-engineer the platform, or use it in ways that disrupt the service for other students.",
  },
  {
    title: "Limitation of liability",
    body: "GloryPrep is provided on an 'as is' basis. While we strive for accuracy and availability, we do not guarantee any specific exam outcome, uninterrupted access, or that feedback is error-free. Our liability is limited to the greatest extent permitted by law.",
  },
];

export default function Agreement() {
  useSeo(
    "User Agreement — GloryPrep",
    "The complete user agreement for GloryPrep: platform use, subscriptions, data consent and acceptable use.",
  );

  return (
    <PageShell>
      <section className="container max-w-3xl py-16">
        <div className="folio">LEGAL</div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          User Agreement
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: August 2026 · GloryPrep Learning. This agreement should be
          read together with the{" "}
          <Link href="/terms" className="text-ember underline-offset-4 hover:underline">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-ember underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-10 flex flex-col gap-8">
          {PARTS.map((p, i) => (
            <div
              key={p.title}
              className="sheet rounded-2xl border border-border bg-background p-6"
            >
              <h2 className="font-display text-lg font-extrabold tracking-tight">
                <span className="ember-text">
                  {String.fromCharCode(65 + i)}
                </span>{" "}
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/privacy"
            className="press flex items-center gap-3 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-ember/40"
          >
            <ShieldCheck className="h-6 w-6 text-ember" />
            <div>
              <div className="font-display font-bold">Privacy Policy</div>
              <div className="text-xs text-muted-foreground">
                How your data is collected and protected
              </div>
            </div>
          </Link>
          <Link
            href="/terms"
            className="press flex items-center gap-3 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-ember/40"
          >
            <FileText className="h-6 w-6 text-ember" />
            <div>
              <div className="font-display font-bold">Terms &amp; Conditions</div>
              <div className="text-xs text-muted-foreground">
                Detailed terms governing platform use
              </div>
            </div>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
