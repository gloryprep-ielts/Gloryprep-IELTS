/*
 * GLORYPREP "Paper & Ember" — Terms & Conditions
 * Same editorial shell as the privacy page; placeholders clearly marked.
 */
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Acceptance of terms",
    body: "By accessing or using GloryPrep you agree to these terms. If you do not agree, please do not use the platform. [Governing jurisdiction — placeholder until the operating entity is confirmed.]",
  },
  {
    title: "Use of the platform",
    body: "GloryPrep provides IELTS preparation content, mock tests and examiner-style practice feedback. The platform is intended for personal, non-commercial study use. Scores and feedback are indicative practice estimates, not official results.",
  },
  {
    title: "User responsibilities",
    body: "You are responsible for the accuracy of the information you provide, the security of your account, and using the platform lawfully and respectfully toward other users and our content.",
  },
  {
    title: "Intellectual property",
    body: "All lessons, mock tests, designs and branding on GloryPrep are owned by GloryPrep Learning or its licensors. You may not reproduce, redistribute or resell platform content without written permission.",
  },
  {
    title: "Educational content disclaimer",
    body: "GloryPrep content is educational material prepared with care but is not affiliated with, endorsed by, or connected to the official IELTS test owners. Band-score predictions are estimates based on practice performance.",
  },
  {
    title: "Account responsibilities",
    body: "You are responsible for maintaining the confidentiality of your account and for all activity under it. Notify us immediately of any unauthorised access.",
  },
  {
    title: "Prohibited activities",
    body: "You may not reverse-engineer the platform, share account access, upload harmful content, scrape or redistribute question banks, or use the service in any way that disrupts it for others.",
  },
  {
    title: "Service availability",
    body: "We strive for high availability but do not guarantee uninterrupted access. The service may be paused for maintenance or upgraded without notice where reasonably practicable.",
  },
  {
    title: "Changes to terms",
    body: "We may update these terms from time to time. Material changes will be announced on the platform; continued use after changes constitutes acceptance.",
  },
  {
    title: "Contact",
    body: "For legal or terms questions, contact legal@gloryprep.example.com. [Placeholder — replace with the company's real contact details before publication.]",
  },
];

export default function Terms() {
  useSeo(
    "Terms & Conditions — GloryPrep",
    "The terms governing your use of the GloryPrep IELTS preparation platform.",
  );

  return (
    <PageShell>
      <section className="container max-w-3xl py-16">
        <div className="folio">LEGAL</div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: August 2026 · [Company legal name and registration
          details — placeholder]
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
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
