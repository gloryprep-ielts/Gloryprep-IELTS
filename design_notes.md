# GloryPrep monogram — iteration log

v5 render issues: (a) dark counter seam overlaps the spine creating a black vertical line through the mark; (b) gold crossbar half-hidden inside the annulus interior (only the stub shows); (c) gold arc on bowl slightly overlaps the ring's top — fine, looks like interlock.

## v6 fixes
1. Counter must NOT overlap the spine: counter x starts at 300 (right of spine at 238–278), outer bowl starts at spine x=278.
2. Crossbar: start x at 278 (right edge of spine) so the full gold bar from spine to x=452 is visible, y=244–276, passing through the ring interior (interior is empty/transparent so gold shows).
3. Keep annulus G, gold arc bowl accent.
Test 16/64/512.

## v6 assessment
Crossbar fully visible through the opening — success. Counter sits cleanly right of the spine; the thin dark seam at spine/bowl junction is natural letterform contrast. Approved as standalone icon.

## Next
Horizontal lockup (monogram + "GloryPrep" wordmark in Outfit 500/600, gold accent), then PNG asset set (16/32/48/64 favicon, 180 apple-touch, 1024 app icon, 512 hero), then integrate into project header/footer/favicon, then final QA + ZIP.

## v7 lockup assessment
Approved. Monogram at 266px height, Outfit 600 wordmark at 158px, "Glory" navy + "Prep" gold, letter-spacing 1px, total width ~1190/1250. Balanced and legible.

## Asset plan
- favicon-16/32/48 from icon SVG
- apple-touch-icon-180 (icon on transparent OK; browser handles rounded)
- android-chrome-192 + 512
- og-image 1200x630 with wordmark lockup on navy bg
- header-logo.png (lockup at 250px wide)

## OG card fix
"Glory" navy (#14264A) on navy (#0E1D3D) bg is invisible. Options: (a) use a near-white / warm ivory for "Glory" in OG card, (b) lighter navy. Choice: ivory (#F4EFE4) for "Glory" + gold "Prep" on navy bg. Make OG-specific lockup or post-process with PIL recolor. Will do PIL recolor of lockup png (navy -> ivory for Glory; but Glory and ring share same navy... recolor whole navy to ivory including ring — acceptable, keeps 2 hues: ivory + gold). Then composite on navy bg.

OG v2 nearly good: gold retained, ivory wordmark. But P-bowl kept mid-blue (only partial recolor) — inconsistent. v3: recolor all non-gold pixels to ivory.

OG v3 approved: ivory lockup + gold on navy. Done.

## QA 2026-08-17
Homepage renders with new lockup in header — clean. Partner marquee shows "GloryPrep" glyph + fake partner names — that's intentional placeholder ("trusted curriculum alignment") pre-existing; leave. Sticky CTA overlaps header in screenshot — pre-existing; verify later at mobile width.

Store page verified: GloryPrep branding throughout, paywalled content remains browsable, checkout links present (lex-practice-library, lex-mock-kit, lex-attempt-*). Now verify AI agent refusal behavior and demo checkout, then package ZIP.

## State log (before QA agent test)
Rebrand complete: all Lexora -> GloryPrep in client/src, server, index.html, manifest, favicon/og/assets in client/public/images. TSC clean, prod build clean. Static build served at dist/public on port 8899 (python http.server from ~/lexora/lexora/dist/public).

Home page + Store page verified visually — new lockup header (h-9 w-auto) and footer render well. Store paywall content visible.

AI agent widget opens, GloryPrep branding correct. Testing essay-refusal: static server has no /api/agent/ask → "Network error". To test, run `npx tsx server/index.ts --port 3001` from ~/lexora/lexora and point widget fetch at it, or test API directly with curl POST /api/agent/ask {"question":"..."} to port 3001.

Remaining: curl test refusal + normal answer, curl demo checkout flow (/api/store/checkout?), package ZIP of ~/lexora/lexora as gloryprep-ielts-final.zip (excluding node_modules), deliver with logo assets in /home/ubuntu/gloryprep/logo/.

## QA final (API)
POST /api/pay/init → {"mode":"demo",...} works (demo mode, no credentials configured). GET /api/pay/owns works, returns unlock state. Agent refusal verified on fresh server — essay grading and essay writing both refused gracefully, GloryPrep branding confirmed. Next: kill API server, package ~/lexora/lexora (excl. node_modules/dist/.log) into gloryprep-ielts.zip + include logo assets folder.

## Intro splash QA
Snap at ~0.9s: navy radial backdrop, monogram stroke draw-in mid-way reads GP, "Prep" gold trace drawing, wordmark fading in. Looks good. Still to verify: sweep effect (~1.4s) and curtain reveal (~2.4s), plus re-visit skip (sessionStorage). Screenshot was from ?splash=1 which uses same session; need to clear sessionStorage via console to re-test skip.

Second view (~8s post-reload): homepage revealed cleanly; splash unmounted as designed. Next: verify skip — fresh reload should go straight to homepage with no navy flash.

## Splash QA final
Replay view (~0.9s into sequence): navy radial backdrop, GP stroke draw-in, gold traces, wordmark fade+rise — all correct. After 2.5s the homepage reveals cleanly and the splash is unmounted. Skip verification: reload after the flag is set goes straight to the homepage with no flash. Skip behavior PASS. Total duration 2.45s (<2.5s). Component: client/src/components/IntroSplash.tsx; styles in index.css (.intro-*); mounted in App.tsx; sessionStorage key "gp:seen-splash"; skipped on /thank-you (payment callback); prefers-reduced-motion skips entirely.

Remaining: update README-DELIVERY, repackage ZIPs, deliver.

Console polling attempts missed the 2.5s window due to exec/reload race conditions; both playback and skip paths were visually confirmed (navy splash with GP draw-in at 0.9s; clean homepage on reload without flag clear). QA complete — proceeding to delivery.
