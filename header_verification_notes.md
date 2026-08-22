# Header verification — 2026-08-22

- Desktop homepage: The shared header uses the custom Ember-Orange GP mark and no longer renders the old blue/gold image logo.
- Desktop homepage: The public `Sign in` and `Start free test` header actions are absent.
- Mobile homepage: The Ember-Orange brand mark is visible and the navigation opens from the menu button without public login actions.
- Quality checks: `pnpm run check`, `pnpm test` (3/3), and `pnpm run build` all pass.
- Unauthenticated checkout route: `/store/checkout/lex-practice-library` renders a secure continuation screen rather than exposing payment controls.
- Private authentication handoff: the continuation opens `/login?next=/store/checkout/lex-practice-library`; its header has the Ember-Orange brand mark and no public login action.
