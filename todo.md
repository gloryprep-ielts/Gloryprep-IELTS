# GloryPrep Web Project TODO

## Brand & assets

- [x] Upload brand images (lockup, monogram, favicons, OG) via manus-upload-file --webdev

- [x] Wire index.html title/meta/favicon/theme-color to GloryPrep navy/gold

## Pages & frontend

- [x] Port Home page (hero, honesty pillars, skill overview, shop teaser, CTA)

- [x] Port Lessons page + 208 lessons library with localStorage progress

- [x] Port LearnLesson page

- [x] Port Mock Test engine (4-skill, timed, flagging, band report)

- [x] Port Results page with honest empty state (real attempts only)

- [x] Port Dashboard with honest empty states (real attempts only)

- [x] Port Pricing (BDT/MYR toggle, monthly/annual toggle, honest copy)

- [x] Port FAQ, Terms, Privacy, User Agreement, About, Contact pages

- [x] Port Study Shop (3 SKUs, visible/browsable while locked)

- [x] Port Checkout page

- [x] Port SiteChrome (header/footer/nav) with GP lockup

- [x] Port intro splash: ~2.45s navy backdrop, GP draw-in, wordmark slide, gold sweep, curtain reveal, progress bar, Skip button, sessionStorage once-per-session, reduced-motion skip, skip on payment callback routes

- [x] Port brand CSS (navy/gold palette, Fraunces + Outfit fonts)

- [x] Port App.tsx routing (wouter)

## Backend

- [x] AI study assistant: /api/agent/ask endpoint, IELTS-only scope, refuses essay writing/grading and speaking evaluation

- [x] SSLCommerz payment server: session init, success/fail/cancel, IPN, email-tied unlocks persisting across devices, demo mode without credentials

- [x] Store unlocks data (per-user unlocks) persisted server-side tied to email

## QA & delivery

- [x] TypeScript check passes

- [x] Vitest tests pass

- [x] Visual verification of home, lessons, mock test, dashboard, results, pricing, store

- [x] AI agent refusal verified live

- [x] Payment demo flow verified

- [x] Checkpoint saved for publish

## Post-QA fixes

- [x] Remove fake "We recommend" badge and "SAVE ~27%" pill from Pricing

- [x] Remove cookie consent banner (analytics anonymous; privacy/agreement copy updated)

- [x] Verify storage asset URLs resolve on preview and deploy

## User-reported fixes

- [x] Fix header "GloryPrep logo" alt text rendering — actual lockup image fails to load in header/footer (mobile header showed broken image icon)

- [x] Remove "Built for students in Bangladesh & Malaysia · 100% original content" badge from hero

- [x] Replace all Bangladesh/Malaysia-specific copy site-wide with international wording (hero, footer, pricing, legal pages, FAQ)

- [x] Keep BDT/MYR + USD pricing options as currency choices without country-locking the site

## Delivery package (ZIP with GitHub/Vercel/Search Console readiness)

- [x] sitemap.xml generation (fixed: updated domain to gloryprepielts.com, fixed XML syntax, verified 14 URLs)
- [x] SEO meta tags optimization (international copy, updated canonical URL, brand theme-color)

- [x] robots.txt in client/public

- [x] Admin panel with moderation capabilities (user/content moderation UI)

- [x] Legal documentation pack (Terms, Privacy, Refund, AI usage policy) as deliverable docs

- [x] GitHub packaging: clean .gitignore, README for repo, deploy guide

- [x] Vercel deployment config (vercel.json, added api/index.js serverless entry)

- [x] .env handling: .env.example with secret template (no real secrets in repo)

- [x] Final ZIP containing everything + delivery README

## Payment gateway research (Bangladeshi owner, TNG card)

- [x]Research payment gateways that work for Bangladeshi merchants accepting international cards

- [x]Recommend best options (Paddle, Lemon Squeezy, Payoneer, 2Checkout etc.) with fees & setup requirements

- [x]Deliver comparison to user in Bangla

## PayPal payment integration (replaces SSLCommerz demo)

- [x]Create PayPal payment server module (create order, capture order, webhook) in demo/sandbox mode

- [x]Wire PayPal Smart Buttons into Checkout page

- [x]Map PayPal captures to unlocks (email-tied, same unlock logic)

- [x]Update store copy and admin payment references (remove SSLCommerz-only messaging)

- [x]Request PayPal client secret from user via secrets card

- [x]Verify checkout flow end-to-end, vitest pass, checkpoint, deliver

## PayPal payment integration (replaces SSLCommerz, worldwide)

- [x]Create PayPal payment server module (create order, capture order, webhook) in sandbox mode

- [x]Wire PayPal Smart Buttons into Checkout page

- [x]Map PayPal captures to unlocks (email-tied, same unlock logic)

- [x]Update store/checkout copy — remove SSLCommerz-only messaging

- [x]Verify checkout flow end-to-end, vitest pass, checkpoint, deliver

## PayPal payment integration (replaces SSLCommerz, worldwide)

- [x]Create PayPal payment server module (create order, capture order) using user-provided credentials (IN PROGRESS)

- [x]Store PayPal credentials as project environment variables (never in repo/GitHub)

- [x]Wire PayPal Smart Buttons into Checkout page

- [x]Map PayPal captures to unlocks (email-tied, same unlock logic)

- [x]Update store/checkout copy — remove SSLCommerz-only messaging

- [x]Verify checkout flow end-to-end, vitest pass, checkpoint, deliver

## AI agent "no internet" error fix

- [x] Reproduce "no internet" error when sending a message to the AI agent

- [x] Identify root cause (client-side LLM fallback vs /api/agent/ask route)

- [x] Fix the agent so it reliably answers

- [x] Verify end-to-end, checkpoint, deliver

## OpenAI-based AI agent (self-hostable/Vercel-compatible)

- [ ] Request OpenAI API key from user (free $5 credit new account)

- [ ] Store OPENAI_API_KEY as project environment variable (secure, never in repo)

- [ ] Rewrite server/agent.ts to call OpenAI chat completions (keep IELTS-only system prompt and refusals)

- [ ] Update /api/agent/ask error handling for OpenAI

- [ ] Test agent live against OpenAI API

- [ ] Update docs/ENV_TEMPLATE.txt and DEPLOYMENT_AND_SEO_GUIDE.md with OPENAI_API_KEY setup

- [ ] Rebuild and deliver final ZIP (no credentials in repo)

## AI agent full removal (user request)

- [ ] Remove AI agent chat widget from SiteChrome/App (AiAgent.tsx component + launcher)

- [ ] Remove server/agent.ts and /api/agent/ask route wiring in server/_core/index.ts

- [ ] Remove any homepage mentions of the AI assistant (hero, FAQ, pricing)

- [ ] Update docs (deployment guide, env template) to remove agent references

- [ ] Verify TS/tests pass, visual check

- [x] Rebuild delivery ZIP without AI agent and deliver (GloryPrep-Delivery.zip: no node_modules/.env/.git/AI agent/SSLCommerz, PayPal docs verified, secret scan clean)

## npm install ERESOLVE fix (Windows user)

- [x] Make project npm-installable: removed @builder.io/vite-plugin-jsx-loc (vite peer conflict), added npm overrides for vite-plugin-manus-runtime

- [x] Verify `npm install` completes without --force in sandbox

- [x] Update README/docs with Windows install instructions (cross-env scripts; npm works on Windows)

- [x] Checkpoint + rebuild delivery ZIP and deliver (GloryPrep-Delivery.zip 242 files, npm install + tsc verified on copy, no secrets/AI agent/SSLCommerz artifacts)

## Windows build/launch fixes

- [x] Fix `npm run build` EISDIR failure: canonical href="/" in index.html resolved to root dir by vite — changed to absolute URL [https://gloryprep.com/](https://gloryprep.com/) and switched /manus-storage/ asset refs to local publicDir files (favicon*, icon*, apple-touch-icon, og-image in client/public )

- [x] Verify `npm run build` completes and production node dist/index.js serves site (root 200, favicon 200)

- [x] cross-env scripts for Windows (dev/start/build all portable)

## Final production polish (Phase: production polish)

- [x] Create /refund page rendering REFUND_AND_CONTENT_POLICY.md (verified screenshot)

- [x] Create /about page with real product features and CTAs (verified screenshot)

- [x] Register /about and /refund routes in App.tsx

- [x] Footer links include About & Refund Policy (already present)

- [x] sitemap.xml updated with /refund (15 urls)

- [x] Investigate dev server error "Cannot find module rawbody" at 05:52:38 (stale log; paypal webhook route intact, verified 200 in production build)

- [x] Final end-to-end QA screenshots: store checkout, admin dashboard, about, refund, store, practice library

- [x] Save checkpoint (1401340f: localized assets, env template docs)

- [x] Rebuild delivery ZIP (no secrets, no Manus-internal artifacts, PayPal docs verified, secret scan clean) deliver — fixed npm `workspace:*` crash by removing unused wouter patchedDependencies (patch was only for Manus dev route collector); verified npm + pnpm install from clean extracted ZIP, tsc, tests, production build; secret scan clean

## Final delivery run (post-webhook hardening)

- [x] Checkpoint 5cdbb003: webhook rawbody mounts before express.json, webhook path skips body parsing (POST now returns 401 correctly instead of crashing)

- [x] Excluded client/public/**manus** from delivery ZIP; artifacts clean, secret scan clean, npm install + tsc verified on clean extract; delivered final ZIPs

- [x] Fix startServer missing request handler (server.on('request', app)) causing unresponsive production server — verified fix against Postgres: root 200, /api/pay/create full round trip OK

## Neon (PostgreSQL) migration — MySQL → PostgreSQL (user created Neon cluster)

- [x] Migrate Drizzle schema from mysql-core to pg (users, unlocks, supportTickets, paypalOrders, payments)

- [x] Switch server/db.ts driver from drizzle-orm/mysql2 to drizzle-orm/node-postgres (with connection pooling for Neon serverless)

- [x] Replace onDuplicateKeyUpdate with PostgreSQL onConflictDoUpdate (users upsert)

- [x] Replace insertId (MySQL) with RETURNING id (Postgres) in createTicket

- [x] Update drizzle.config.ts dialect from mysql to postgresql

- [x] Swap dependencies: remove mysql2, add pg; update package.json + overrides if needed

- [x] Verify tsc + vitest + production build after migration

- [x] Test DB connection and core queries against a real local Postgres instance

- [x] Update docs/ENV_TEMPLATE.txt and delivery README for Neon DATABASE_URL

- [x] Package updated ZIP and deliver with Neon + Vercel setup guide in Bangla (GloryPrep-v2-Neon.zip, secret scan clean, npm install + tsc verified)


## Standalone email/password auth (replaces Manus OAuth for Vercel deployment)
- [x] Add passwordHash column to users table, generate migration (0001_standalone_auth.sql)
- [x] Implement password hashing (scrypt) + JWT session in server auth router (jose)
- [x] Add tRPC auth.register / auth.login / auth.logout procedures with email+password
- [x] Replace Manus OAuth flow with standalone email session cookie (context.ts JWT fallback, startLogin → /login)
- [x] Build /login page (sign in + sign up) + header Sign in button + account dropdown + footer link
- [x] Admin dashboard gating via role field + email-to-admin SQL instruction in Bangla guide
- [x] Verify tsc + vitest (3/3) + production build + e2e login/admin round trip against Postgres
- [x] Update Bangla guide (v3 auth + 0001 migration) and deliver GloryPrep-v3.zip (secret scan clean, npm install + tsc verified on clean extract)

## Login redirect + admin panel fixes
- [x] Login/signup redirect: reads returned user.role → admin → /admin, user → / (verified e2e: role in register/login response)
- [x] /dashboard user-friendly: profile card + Sign out + My Purchases (auth.myPurchases); unauthenticated → /login; admin stats FORBIDDEN for non-admins (verified e2e), OK after role=admin
- [x] Verified tsc + vitest 3/3 + production build; ZIP v3.1 packaging pending

## Promotional 1:1 poster
- [x] Gathered brand lockup and defined poster copy
- [x] Generated 1:1 sale-ready poster (1920x1920, navy/gold, quality verified) in webdev-static-assets
- [x] Delivered poster to user

## Splash re-theme to site ember-orange palette (user request: match loading screen with site colors, nothing else changes)
- [x] Splash backdrop radial gradient navy → ember (#6e2b10/#57200b/#3c1607); curtains #4a1f0c
- [x] Logo strokes, "Prep" wordmark accent, light-sweep, progress-bar gradient, skip hover → papaya amber #f2a94e
- [x] CSS-only splash block edits; no other site changes; verified tsc + vitest 3/3 + production build + homepage render
- [x] Update delivery ZIP (splash colors in index.css changed) and deliver — GloryPrep-v3.2.zip, 282 entries, secret scan clean (no PayPal keys), tsc verified on copy

280	## Final delivery & polish (Phase: delivery)
281	- [x] Fix login/signup redirect (final fix: SameSite=Lax + 100ms delay for reliable state transition)
282	- [x] Update delivery ZIP v3.3 with sitemap fix and orange brand assets
283	- [x] Deliver updated orange brand assets (lockup, monogram, OG image)
284	- [x] Deliver 10 promotional posters in orange brand palette
285	- [x] Guide user through Vercel root directory configuration (gloryprep subfolder)
286	- [x] Guide user through Neon admin role SQL update
287	- [x] Guide user through domain purchase and DNS setup (Namecheap)
288	- [x] Guide user through Google Search Console verification and sitemap submission
289	

## v4.0 Final Refresh (User Requested)

- [x] Remove global auth (public browsing for lessons/mock tests)
- [x] Isolate auth to Payment/Study Shop flow (login required only for purchases)
- [x] Fix Light/Dark mode (ensure toggle works and colors are consistent)
- [x] Standardize homepage logo to Ember-Orange (remove any remaining blue logos)
- [ ] Refresh v4.0 ZIP (no node_modules, no .env, no .git)
- [ ] Provide final pnpm deployment commands for Vercel
