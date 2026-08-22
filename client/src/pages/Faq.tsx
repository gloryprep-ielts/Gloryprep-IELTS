/*
 * GLORYPREP "Paper & Ember" — FAQ page
 * Editorial single-column layout matching Privacy/Terms; accordion answers.
 */
import { Link } from "wouter";
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is GloryPrep free to try?",
    a: "Yes — your first full mock test is completely free, with no card required. You get an instant band-score report across all four skills. Paid plans unlock unlimited mocks, the full lesson library and the complete Study Shop content.",
  },
  {
    q: "How accurate are the mock test scores?",
    a: "Mock test sections are scored on the official IELTS band scale — the format mirrors the real exam. Scores are practice estimates based on the public band descriptors, not official results.",
  },
  {
    q: "Which skills and lessons are included?",
    a: "GloryPrep covers all four IELTS skills — Listening, Reading, Writing and Speaking — with over 200 lessons organised by level (Beginner, Intermediate, Advanced). Most lessons end with a checkpoint quiz that confirms you can apply the skill, not just recognise it.",
  },
  {
    q: "Does GloryPrep work on mobile?",
    a: "Yes. The full platform — lessons, quizzes, dashboard and mock tests — is responsive from 375px phones up to large desktops, and progress is saved automatically in your browser so you can continue anywhere.",
  },
  {
    q: "Who is GloryPrep for?",
    a: "GloryPrep is built for any student preparing for IELTS, anywhere in the world. Content and pricing are designed for self-study at your own pace, plans are shown in USD, BDT and MYR, and guidance covers the question types and accent varieties you'll encounter on test day.",
  },
  {
    q: "How does writing and speaking feedback work?",
    a: "Practice writing tasks come with band-7 model outlines and examiner notes against the four official criteria, and speaking sets include examiner notes and vocabulary builders. These model resources show you exactly what examiners look for — full automated essay grading is not part of the platform today.",
  },
  {
    q: "Is my progress saved?",
    a: "Yes — completed lessons, quiz results, streaks and your resume point are stored automatically in your browser. If you clear your browser storage you'll need to start your progress tracking again; we don't collect personal study data beyond anonymous analytics you can opt out of.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "You can cancel anytime from your account — there are no coaching upsells, lock-in contracts or hidden charges. Your access continues until the end of the billing period.",
  },
  {
    q: "Who should I contact for support?",
    a: "Use the contact links in the site footer, or reach us via the privacy/terms contact details. Questions about specific lessons and mock tests can also be raised through the platform feedback channels.",
  },
];

export default function Faq() {
  useSeo(
    "FAQ — GloryPrep IELTS Preparation",
    "Answers about GloryPrep's free mock test, writing and speaking feedback, lessons, pricing and how the platform works for students worldwide.",
  );

  return (
    <PageShell>
      <section className="container max-w-3xl py-16">
        <div className="folio">FAQ</div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Frequently asked questions
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Everything you need to know before starting your first mock test.
          Can't find your question?{" "}
          <Link href="/terms" className="text-ember underline-offset-4 hover:underline">
            Get in touch via our contact details
          </Link>
          .
        </p>
        <div className="sheet mt-10 rounded-2xl border border-border bg-background p-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-display text-base font-bold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/test"
            className="press inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-papaya px-6 py-3 text-sm font-bold text-primary-foreground ember-glow"
          >
            Start your free mock test
          </Link>
          <Link
            href="/pricing"
            className="press inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-bold hover:border-foreground/20"
          >
            See plans
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
