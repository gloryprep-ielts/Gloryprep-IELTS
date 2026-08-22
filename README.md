# GloryPrep

GloryPrep is an IELTS examination preparation platform: 208 original skill lessons, a timed mock test engine with honest band-score reporting, a Study Shop with paywalled practice content, and transparent, international pricing.

## Stack

React 19 + Tailwind CSS 4 + Vite on the frontend, Express + tRPC 11 on the backend, Drizzle ORM with MySQL, Manus OAuth for user authentication, and PayPal for payments.

## Getting Started Locally

```bash
pnpm install
cp docs/ENV_TEMPLATE.txt .env     # fill in real values — never commit this
pnpm drizzle-kit push             # sync the database schema
pnpm dev                          # Vite + tsx watch on :3000
```

**npm works too** (Windows PowerShell/CMD friendly — all scripts use `cross-env`, and the Manus-only debug plugins are gated out): `npm install`, `npm run dev`, `npm run build` (production bundle), `npm start` (run the production bundle on port 3000).

On Windows (PowerShell) the legacy equivalents also work: `Copy-Item docs\ENV_TEMPLATE.txt .env` to create the env file. Production deploy (Vercel/GitHub Actions) requires `npm run build` to succeed — it does, with no flags.

See `docs/DEPLOYMENT_AND_SEO_GUIDE.md` for GitHub + Vercel deployment, environment secrets handling, and Google Search Console setup.

## Project Layout

```
client/src/        React pages (Home, Lessons, MockTest, Store, Admin, …)
server/            tRPC routers, Express API routes, payments
drizzle/           Database schema and migrations
docs/              Legal documents and deployment guides
shared/            Constants and shared types
```

Key features: `/admin` (role-gated control panel), `/contact` (moderation queue), `/store` (three paid products, browsable while locked), `/api/pay/*` (PayPal order create, capture and success/fail handling).

## Security Notes

Payment credentials and `JWT_SECRET` must live only in environment variables (Vercel dashboard or local `.env`), never in the repository. The `.env` file is already gitignored; `docs/ENV_TEMPLATE.txt` documents the required shape.

## License

All practice content is proprietary to GloryPrep Learning. Platform software in this repository may be used under the terms agreed with GloryPrep Learning.
