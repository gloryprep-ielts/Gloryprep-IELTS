# GloryPrep — Final Delivery Notes

This document summarizes the completed **GloryPrep** rebrand and monetization build. The complete project is delivered in `gloryprep-ielts.zip` (source code, excluding `node_modules` and `dist`) and the vector logo sources in `gloryprep-logos.zip`.

## What was delivered

### 1. Monetization system (Study Shop)

| Product | Price | Unlock mechanism |
|---|---|---|
| Full Practice Test Library (15 original Cambridge-style tests, all 4 skills) | $3 (~৳330) | One-time, permanent unlock |
| Complete Mock Test Kit (printable PDFs: answer sheets, writing sheets, 60 cue cards, schedules) | $1.50 (~৳165) | One-time, permanent unlock |
| Real Mock Exam attempts (Listening / Writing / Reading) | $0.50 per attempt (~৳55) | Per-attempt unlock, unlimited repeats |

Everything remains **visible and browsable while locked** — titles, descriptions, excerpts and "Unlock to view" previews. Unlocks are tied to the customer's email and persist across devices (`/api/pay/owns`).

### 2. PayPal payment integration

`server/paypal.ts` implements the full PayPal Orders API flow: `POST /api/pay/create` creates an order, the client's Smart Buttons approve and capture it, and `POST /api/pay/capture` completes payment and instantly unlocks the purchased content for the customer's account. The flow has been validated end-to-end against PayPal's **live** API with real credentials (OAuth token issuance and order creation both succeed). Money lands directly in your PayPal account. Credentials live only in environment variables (`PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`) — never in the repository.

### 3. Original content

All practice material (15 tests, listening scripts, writing prompts, speaking cue cards) was written from scratch in official IELTS style and difficulty. Nothing is copied from Cambridge, Makkar or any other publisher. The Mock Kit PDFs are generated client-side with jsPDF.

### 4. Branding overhaul

- New GP monogram (v6, interlocked, gold accent stroke, navy fill) — legible at 16×16.
- Horizontal lockup with Outfit wordmark.
- New palette/tokens (navy `#14264A`, gold accent, ivory paper) with Fraunces display + Outfit body typography.
- Full asset set shipped in `client/public/images` and also in `gloryprep-logos.zip` (SVG sources, PNG favicons, OG image).

## 5. Intro splash (new)

A once-per-session landing intro (`client/src/components/IntroSplash.tsx`, styles in `index.css`) plays on first load:

| Moment | Effect |
|---|---|
| 0.00–0.62s | Deep navy gradient backdrop; GP monogram draws itself in with stroke animation |
| 0.62–0.95s | Strokes fill to solid with a slight ease-out pop |
| 0.95–1.45s | "GloryPrep" wordmark fades and slides up below the mark |
| 1.30–1.85s | Gold light-sweep crosses the wordmark (accent flourish) |
| 1.80–2.45s | Curtain halves slide apart to reveal the homepage |

Total duration ~2.45s. Pure CSS keyframes (no animation libraries), responsive via `clamp()`/`vmin`, `prefers-reduced-motion` skips it entirely, and `sessionStorage` (key `gp:seen-splash`) ensures it only plays once per session — repeat loads go straight to the homepage. It is also skipped on the payment callback route. A thin gold progress bar runs along the top during playback, and a discreet **Skip** button (top-right) ends the intro immediately.

## 6. Honest content policy (new)

All fabricated placeholder content has been removed. The homepage states real, verifiable numbers only (lesson counts counted from the shipped content, source-of-claims footnotes), demo statistics/testimonials/partner logos have been deleted, the Results page shows real mock attempts from local storage or an honest empty state, the Dashboard shows no placeholder scores/streaks/schedules, and every marketing claim was checked against the actual shipped content (no fake examiner reviews, no unverified popularity claims).

## Running it

```bash
pnpm install
pnpm dev          # front-end only (static, API unavailable)
pnpm dev:all      # front-end + Express (payments)
pnpm start:all    # production (build first: pnpm build:all)
```

The Express server (port 3000 / `PORT` env) serves the built SPA and the payment routes.
