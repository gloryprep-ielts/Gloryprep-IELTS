/*
 * GLORYPREP "Paper & Ember" — Refund & Content Policy
 * Mirrors the written policy in docs/REFUND_AND_CONTENT_POLICY.md.
 */
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";

const SECTIONS: { title: string; body: string; note?: string }[] = [
  {
    title: "Fair-use refund window",
    body: "GloryPrep sells digital educational products. Because digital content is delivered instantly and cannot be returned, we offer a fair-use refund window designed to balance access with protection against misuse: requests made within 7 days of purchase where less than 10% of the content has been accessed receive a full refund; requests after that window, or where the content has been substantially consumed, are not eligible. Duplicate or accidental charges, failed payments that still debited your account, and broken or corrupted content are always eligible for a full refund or re-delivery, regardless of timing.",
    note: "All refund decisions are issued within five (5) working days and returned to the original payment method.",
  },
  {
    title: "How to request a refund",
    body: "Email support@gloryprep.com with the email address used at purchase and the PayPal transaction reference. Our team reviews each request and replies within five working days.",
  },
  {
    title: "Content originality",
    body: "Every practice question, passage, lesson, and mock examination on GloryPrep is authored originally by our team. We do not copy, paraphrase-for-copy, or reproduce material from Cambridge IELTS publications, IDP or British Council materials, Makkar IELTS, Barron's, The Official Cambridge Guide, or any other published resource. Content is written to match the style, format, and difficulty of public IELTS preparation conventions, but no third-party intellectual property is used. If you believe any item resembles protected material, notify us at support@gloryprep.com and we will review and, if warranted, remove or rewrite it.",
  },
  {
    title: "Score estimates",
    body: "Mock test scores are honest estimates calculated from the official publicly published conversion tables. We do not inflate, fabricate, or guarantee scores. Band-score results on the platform are indicators of preparation progress, not predictions of official exam outcomes.",
  },
  {
    title: "Honest marketing commitment",
    body: "GloryPrep does not use fabricated testimonials, inflated user counts, fake recommended badges, or misleading discount labels. Marketing statistics shown on the platform are either real platform data or clearly labelled as illustrative examples.",
  },
];

export default function Refund() {
  useSeo(
    "Refund & Content Policy — GloryPrep",
    "GloryPrep's fair-use refund terms and commitment to 100% original IELTS practice content.",
  );

  return (
    <PageShell>
      <section className="container max-w-3xl py-16">
        <div className="folio">LEGAL</div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Refund &amp; Content Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: August 2026
        </p>
        <div className="mt-10 flex flex-col gap-8">
          {SECTIONS.map((s, i) => (
            <div
              key={s.title}
              className="sheet rounded-2xl border border-border bg-background p-6"
            >
              <h2 className="font-display text-lg font-extrabold tracking-tight">
                <span className="ember-text">{String(i + 1).padStart(2, "0")}</span>{" "}
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
              {s.note && (
                <p className="mt-3 rounded-xl bg-paper px-4 py-3 text-xs font-semibold text-foreground">
                  {s.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
