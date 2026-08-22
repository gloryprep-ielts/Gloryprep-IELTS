/*
 * GLORYPREP — Pricing ("Paper & Ember")
 * Tiered pricing with BDT/MYR currency toggle, premium-feel cards
 * (paper-cut + ember-glow featured tier), trust row (guarantee,
 * partner logos, secure payment), FAQ accordion. Motion: rise-in stagger,
 * price count-up on currency switch, toggle slide 220ms.
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  Check,
  Sparkles,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { useSeo } from "@/components/ShellExtras";
import { Reveal, Folio, CountUp } from "@/components/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

import { ASSETS } from "@/lib/assets";

const LOGO = ASSETS.logo;

type Currency = "USD" | "BDT" | "MYR";

const PRICES: Record<Currency, { monthly: number[]; annual: number[]; symbol: string; suffix: string; note: string }> = {
  USD: {
    monthly: [0, 14.99, 27.99],
    annual: [0, 129.99, 239.99],
    symbol: "$",
    suffix: "/mo",
    note: "Pay with any major card via PayPal",
  },
  BDT: {
    monthly: [0, 790, 1490],
    annual: [0, 6990, 12990],
    symbol: "৳",
    suffix: "/mo",
    note: "Pay via bKash, Nagad, Rocket or card",
  },
  MYR: {
    monthly: [0, 39, 79],
    annual: [0, 349, 649],
    symbol: "RM ",
    suffix: "/mo",
    note: "Pay via FPX, GrabPay or card",
  },
};

const TIERS = [
  {
    name: "Free",
    tagline: "Taste the system",
    features: [
      "1 full mock test (all 4 skills)",
      "Instant band-score report",
      "7 days of skill drills",
      "Skill drills library",
    ],
    missing: ["Unlimited mocks", "Extra mock attempts", "Full Study Shop content"],
    cta: "Start free test",
    href: "/test",
    featured: false,
  },
  {
    name: "Scholar",
    tagline: "Best value for serious prep",
    features: [
      "Unlimited mock tests",
      "Band-7 examiner notes (writing & speaking)",
      "Band-7 model outlines",
      "Worked answer keys & rationale",
      "Progress tracking",
    ],
    missing: [],
    cta: "Start free mock",
    href: "/dashboard",
    featured: true,
  },
  {
    name: "Scholar+",
    tagline: "For the final push",
    features: [
      "Everything in Scholar",
      "All Study Shop content unlocked",
      "Priority support",
      "Early access to new content",
    ],
    missing: [],
    cta: "Start free mock",
    href: "/dashboard",
    featured: false,
  },
];

const FAQS = [
  {
    q: "How is GloryPrep different from a physical coaching centre?",
    a: "Coaching centres charge $30–$80 per lesson for fixed schedules and generic classes. GloryPrep gives you the same skills at a fraction of the cost — study on your own schedule, at 11pm after your shift or between lectures.",
  },
  {
    q: "Are the mock tests like the real IELTS exam?",
    a: "Our tests mirror the official format — same section order, question types and time limits. Band estimates follow the publicly available IELTS public band descriptors, so the score you see is a realistic indication of where you stand.",
  },
  {
    q: "Can I pay in my local currency?",
    a: "Yes — prices are shown in USD, Bangladeshi Taka (BDT) and Malaysian Ringgit (MYR). Checkout is settled in USD via PayPal, which accepts cards and wallets worldwide, and your bank handles the local-currency conversion.",
  },
  {
    q: "Does it work if my English level is below band 5?",
    a: "Yes. Start with the free mock test to see where you stand, then follow the lessons library from the fundamentals up — you only pay for extra content when you want it.",
  },
];

export default function Pricing() {
  useSeo(
    "Pricing — GloryPrep (USD, BDT & MYR)",
    "Simple, honest pricing in USD, Bangladeshi Taka and Malaysian Ringgit. From free mock tests to the full study system.",
  );

  const [currency, setCurrency] = useState<Currency>("BDT");
  const [annual, setAnnual] = useState(false);
  const prices = PRICES[currency];
  const displayPrices = annual ? prices.annual : prices.monthly;
  // key forces CountUp re-animation on currency/billing switch
  const priceKey = `${currency}-${annual}`;

  return (
    <PageShell>
      <div className="container py-14 lg:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="folio justify-center">Pricing</div>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              Less than one tutoring session.
              <br />
              <span className="ember-text">A whole preparation system.</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              A single private IELTS lesson can cost $30–$80. Don't gamble it on
              guesswork — a month of GloryPrep costs less than one tutoring session.
            </p>
          </div>
        </Reveal>

        {/* Currency + billing toggle */}
        <Reveal delay={100}>
          <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-border bg-card p-1.5">
            {(["BDT", "MYR"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`press rounded-full px-5 py-2 text-sm font-bold transition-all duration-220 ${
                  currency === c ? "bg-gradient-to-r from-ember to-papaya text-primary-foreground shadow" : "text-muted-foreground"
                }`}
              >
                {c === "USD" ? "$ USD · Global" : c === "BDT" ? "৳ BDT" : "RM MYR"}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setAnnual((v) => !v)}
              aria-label="Toggle annual billing"
              className={`press relative h-7 w-12 rounded-full transition-colors duration-220 ${annual ? "bg-gradient-to-r from-ember to-papaya" : "bg-secondary"}`}
            >
              <span
                className="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-220"
                style={{ left: annual ? 26 : 4 }}
              />
            </button>
            <span className={`text-sm font-semibold ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual
            </span>
          </div>
        </Reveal>

        {/* Tier cards — staggered editorial spread */}
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-3">
          {TIERS.map((t, i) => {
            const price = displayPrices[i];
            const isAnnualSaved = annual && price > 0;
            return (
              <Reveal key={t.name} delay={i * 90}>
                <div
                  className={`relative flex h-full flex-col p-7 ${
                    t.featured ? "paper-card ember-glow-lg ring-2 ring-ember/40 sheet-lift lg:my-2" : "paper-card md:translate-y-3"
                  } ${i % 2 === 1 && !t.featured ? "md:translate-y-6" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-extrabold">{t.name}</h3>
                    {t.featured && <Sparkles className="h-4.5 w-4.5 text-ember" style={{ width: 18, height: 18 }} />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{t.tagline}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold" key={`p-${priceKey}-${i}`}>
                      {price > 0 ? (
                        <CountUp value={price} decimals={0} />
                      ) : (
                        "0"
                      )}
                    </span>
                    <span className="text-muted-foreground">
                      {prices.symbol}
                      {price > 0 ? prices.suffix : " — free forever"}
                    </span>
                  </div>
                  {isAnnualSaved && (
                    <div className="mt-1 text-xs font-semibold text-forest">
                      {prices.symbol}
                      {Math.round((displayPrices[i] * 12 - (annual ? prices.monthly[i] * 12 : 0)))} saved per year
                    </div>
                  )}

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                        {f}
                      </li>
                    ))}
                    {t.missing.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground/60">
                        <span className="mt-0.5 h-4 w-4 shrink-0 text-center leading-4">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={t.href}
                    onClick={(e) => {
                      if (i > 0) {
                        e.preventDefault();
                        toast.success(`${t.name} trial started`);
                        // Paid tiers funnel into the thank-you flow so the
                        // success page is actually reachable from a real action.
                        setTimeout(() => (window.location.href = "/thank-you"), 350);
                      }
                    }}
                    className={`press mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                      t.featured
                        ? "ember-glow bg-gradient-to-r from-ember to-papaya text-primary-foreground hover:shadow-xl"
                        : "paper-card-hover border border-border hover:border-ember hover:text-ember"
                    }`}
                  >
                    {t.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-muted-foreground">
            {prices.note}
          </p>
        </Reveal>

        {/* Trust row */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Trusted gateway", text: "Payments processed through PayPal — cards and wallets accepted worldwide." },
            { icon: RefreshCw, title: "Cancel anytime", text: "One click in settings. No calls, no guilt trips." },
            { icon: GraduationCap, title: "Aligned content", text: "Materials built on the official public IELTS band descriptors." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="paper-card flex items-start gap-3.5 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember/60">
                  <item.icon className="h-5 w-5 text-ember" />
                </div>
                <div>
                  <div className="font-display text-sm font-bold">{item.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <div className="folio justify-center">Questions</div>
            <h2 className="mt-3 text-center font-display text-3xl font-extrabold">
              Straight answers, no sales talk
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="mt-8">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`q${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-display font-bold hover:text-ember">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        {/* Final CTA — clipped editorial banner */}
        <Reveal>
          <div className="note-clip relative mx-auto mt-20 max-w-4xl flex flex-col items-center gap-4 p-10 text-center sm:p-14 md:-rotate-[0.3deg]">
            <CreditCard className="h-7 w-7 text-ember" />
            <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
              Try the full system free — your first mock test is on us.
            </h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              No card required. Get an honest band score in under 3 hours.
            </p>
            <Link
              href="/test"
              className="press ember-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-papaya px-8 py-3.5 font-bold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Take my free mock test <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
