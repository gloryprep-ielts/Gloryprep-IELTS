// GloryPrep Store catalog — all monetizable items.
// Every item stays VISIBLE on the site at all times (browsable with previews);
// only the deep content is locked until paid.
// Prices in USD; amounts are converted to BDT at checkout (SSLCommerz transacts in BDT).

export type SkuKind = "library" | "kit" | "attempt";

export interface StoreSku {
  sku: string;
  kind: SkuKind;
  title: string;
  tagline: string;
  description: string;
  preview: string; // short preview shown on the storefront
  priceUsd: number;
  currency: "USD" | "BDT";
  /** items included / what unlocks */
  includes: string[];
  /** sections with a free preview excerpt and the locked remainder */
  sections: StoreSection[];
}

export interface StoreSection {
  id: string;
  title: string;
  freePreview: string; // always visible
  lockedPreview: string; // teaser blurb shown while locked
}

export interface AttemptSku {
  sku: string;
  kind: "attempt";
  title: string;
  tagline: string;
  description: string;
  skill: "Listening" | "Writing" | "Reading";
  priceUsd: number;
  /** how many attempts are granted per purchase (1 = per-attempt pricing) */
  attempts: number;
}

/** USD → BDT display rate (editable at checkout). */
export const USD_TO_BDT = 110;

export function toBdt(usd: number): number {
  return Math.round(usd * USD_TO_BDT);
}

export const LIBRARY_SKU: StoreSku = {
  sku: "lex-practice-library",
  kind: "library",
  title: "Full Practice Test Library",
  tagline: "15 original Cambridge-style practice tests across all four skills",
  description:
    "A complete collection of freshly written practice tests in official IELTS style and difficulty — Reading passages with full question sets, Listening audio scripts with question banks, Writing task packs with model-plan guides, and Speaking topic cards with examiner notes. Every item is written from scratch by GloryPrep's editorial team; nothing is copied from Cambridge, Makkar, or any third-party publisher.",
  preview: "Includes 5 full Reading tests, 4 Listening test sets, 3 Writing task packs and 3 Speaking topic sets — each with answer keys and band-level strategy notes.",
  priceUsd: 3,
  currency: "USD",
  includes: [
    "5 full Reading practice tests (passages + 40 questions each)",
    "4 Listening test sets (audio scripts + question banks + answer keys)",
    "3 Writing task packs (Task 1 & Task 2 sets with planning frameworks)",
    "3 Speaking topic card sets (Parts 1–3 with examiner's notes)",
    "Answer keys with band-score rationale for every question",
    "Free updates: new tests added monthly",
  ],
  sections: [
    {
      id: "reading",
      title: "Reading practice tests",
      freePreview:
        "Passage excerpt — \u201cThe Silent Migration of the Monsoon\u201d: Every year between June and September, an invisible river of air moves across the Bay of Bengal. Meteorologists call it a pressure reversal; farmers in coastal Bangladesh simply call it \u201cthe breath of the sea.\u201d ...",
      lockedPreview: "5 complete passages with 200 questions across matching-headings, T/F/NG, summary-completion, short-answer and multiple-choice formats.",
    },
    {
      id: "listening",
      title: "Listening test sets",
      freePreview: "Test 1 Part 1 \u2014 form completion: a rental enquiry about a shared flat in Kuala Lumpur ...",
      lockedPreview: "4 full test sets (Parts 1–4) with 160 questions, transcript scripts and distractor analysis.",
    },
    {
      id: "writing",
      title: "Writing task packs",
      freePreview: "Task 1: a line graph of renewable-energy adoption in Southeast Asia, 2010\u20132024 ...",
      lockedPreview: "3 packs × (Task 1 charts/maps/processes + Task 2 essays), planning grids and band-7 model outlines.",
    },
    {
      id: "speaking",
      title: "Speaking topic sets",
      freePreview: "Part 1 \u2014 Home and neighbourhood; Part 2 \u2014 describe a journey that changed your routine; Part 3 \u2014 migration and city growth ...",
      lockedPreview: "3 full Part 1–3 sets with examiner's notes and vocabulary builders.",
    },
  ],
};

export const KIT_SKU: StoreSku = {
  sku: "lex-mock-kit",
  kind: "kit",
  title: "Complete Mock Test Kit",
  tagline: "Everything you need to run exam-day mocks at home",
  description:
    "A printable kit that recreates exam conditions: timed test schedules, official-style answer sheets, a speaking cue-card deck, writing grids, and a pre-exam checklist. Print it once and you can run unlimited mock sessions with zero setup.",
  preview: "PDF downloads: mock schedule planner, Listening & Reading answer sheets, Writing answer sheets with word-count guides, a 60-card Speaking cue deck, and the exam-day checklist.",
  priceUsd: 1.5,
  currency: "USD",
  includes: [
    "Mock test schedule planner (8-week and 4-week versions)",
    "Listening & Reading answer sheets (10 sets)",
    "Writing answer sheets with word-count rulers (Task 1 & Task 2)",
    "60-card Speaking cue deck (original topics)",
    "Exam-day readiness checklist",
    "Printable scoring calculator",
  ],
  sections: [
    {
      id: "pdfs",
      title: "Printable PDFs",
      freePreview: "Sample page — the exam-day checklist: ID verified, pens packed, water allowed only in clear bottle, 30-minute reading transfer buffer planned ...",
      lockedPreview: "10 printable PDFs covering answer sheets, cue cards, planners and scoring tools.",
    },
  ],
};

export const ATTEMPT_SKUS: AttemptSku[] = [
  {
    sku: "lex-attempt-listening",
    kind: "attempt",
    title: "Real Mock Exam \u2014 Listening",
    tagline: "One full 30-minute exam-grade Listening attempt",
    description:
      "A single, complete Listening mock in real exam conditions: four sections, 40 questions, automatic scoring and a band estimate. You can buy as many attempts as you like — each one is a fresh, original test you have never seen.",
    skill: "Listening",
    priceUsd: 0.5,
    attempts: 1,
  },
  {
    sku: "lex-attempt-writing",
    kind: "attempt",
    title: "Real Mock Exam \u2014 Writing",
    tagline: "One full 60-minute exam-grade Writing attempt",
    description:
    "A single Writing mock with a fresh Task 1 and Task 2 prompt, timed sections, and a self-assessment framework aligned to the public IELTS band descriptors. Original prompts, generated for GloryPrep.",
    skill: "Writing",
    priceUsd: 0.5,
    attempts: 1,
  },
  {
    sku: "lex-attempt-reading",
    kind: "attempt",
    title: "Real Mock Exam \u2014 Reading",
    tagline: "One full 60-minute exam-grade Reading attempt",
    description:
      "A single Reading mock: one original passage set, 40 questions in official formats, 60-minute timer and instant scoring with per-question rationale. Every passage is written from scratch.",
    skill: "Reading",
    priceUsd: 0.5,
    attempts: 1,
  },
];

export const ALL_SKUS = [LIBRARY_SKU, KIT_SKU, ...ATTEMPT_SKUS] as const;

export function getSku(sku: string): StoreSku | AttemptSku | undefined {
  return ALL_SKUS.find((s) => s.sku === sku);
}

/** localStorage key namespace for unlocks. */
export const UNLOCK_KEY = "gloryprep-unlocks-v1";

export interface UnlockRecord {
  /** per-purchase skus */
  library?: string[]; // val_ids
  kit?: string[];
  /** per-attempt credits remaining per skill */
  attempts?: { listening: number; writing: number; reading: number };
  email?: string;
}

export function loadUnlocks(): UnlockRecord {
  try {
    return JSON.parse(localStorage.getItem(UNLOCK_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveUnlocks(u: UnlockRecord) {
  localStorage.setItem(UNLOCK_KEY, JSON.stringify(u));
}

export function hasLibrary(): boolean {
  const u = loadUnlocks();
  return Array.isArray(u.library) && u.library.length > 0;
}

export function hasKit(): boolean {
  const u = loadUnlocks();
  return Array.isArray(u.kit) && u.kit.length > 0;
}

export function attemptCredits(skill: "listening" | "writing" | "reading"): number {
  return loadUnlocks().attempts?.[skill] ?? 0;
}

export function consumeAttempt(skill: "listening" | "writing" | "reading"): boolean {
  const u = loadUnlocks();
  const c = u.attempts?.[skill] ?? 0;
  if (c <= 0) return false;
  u.attempts = { ...(u.attempts ?? { listening: 0, writing: 0, reading: 0 }), [skill]: c - 1 };
  saveUnlocks(u);
  return true;
}

/** Server-side query: which purchases does this email own? Merges into localStorage. */
export async function syncUnlocksByEmail(email: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/pay/owns?email=${encodeURIComponent(email)}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return false;
    const data = (await res.json()) as {
      library: string[];
      kit: string[];
      attempts: { listening: number; writing: number; reading: number };
    };
    const u = loadUnlocks();
    u.library = Array.from(new Set([...(u.library ?? []), ...data.library]));
    u.kit = Array.from(new Set([...(u.kit ?? []), ...data.kit]));
    const att = u.attempts ?? { listening: 0, writing: 0, reading: 0 };
    u.attempts = {
      listening: att.listening + data.attempts.listening,
      writing: att.writing + data.attempts.writing,
      reading: att.reading + data.attempts.reading,
    };
    u.email = email;
    saveUnlocks(u);
    return true;
  } catch {
    return false;
  }
}
