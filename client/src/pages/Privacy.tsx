/*
 * GLORYPREP "Paper & Ember" — Privacy Policy
 * Editorial single-column layout; placeholder legal identity clearly marked.
 */
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Information we collect",
    body: "When you use GloryPrep we collect the information you provide directly — such as your name, email address and study preferences — together with technical data like browser type and usage events. Lesson progress, quiz results and streak data are stored locally in your browser by default.",
  },
  {
    title: "How information is used",
    body: "We use collected information to operate and improve the platform: tracking your learning progress, personalising lesson recommendations, and analysing aggregated usage patterns to improve content. We do not sell personal data to third parties.",
  },
  {
    title: "Cookies and local storage",
    body: "GloryPrep uses cookies and browser local storage for essential functions (login state, progress). Anonymous usage analytics run with no personal identifiers attached — you can opt out at any time by contacting us or by clearing browser storage.",
  },
  {
    title: "Analytics",
    body: "We use an analytics service to understand page views and feature usage in aggregate. Events such as 'lesson started' or 'mock test completed' are recorded without capturing personal identifiers.",
  },
  {
    title: "Data security",
    body: "We apply industry-standard safeguards to protect information, including encrypted connections and access controls. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Third-party services",
    body: "GloryPrep relies on third-party hosting, font delivery and analytics providers. Each operates under its own privacy terms; we select providers committed to responsible data handling.",
  },
  {
    title: "Your rights",
    body: "You may request access to, correction of, or deletion of your personal data by contacting us. You may also opt out of anonymous analytics at any time by contacting us or by clearing your browser storage.",
  },
  {
    title: "Contact",
    body: "For privacy questions, contact privacy@gloryprep.example.com. [Placeholder — replace with the company's real contact details before publication.]",
  },
];

export default function Privacy() {
  useSeo(
    "Privacy Policy — GloryPrep",
    "How GloryPrep collects, uses and protects your data while you prepare for IELTS.",
  );

  return (
    <PageShell>
      <section className="container max-w-3xl py-16">
        <div className="folio">LEGAL</div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Privacy Policy
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
