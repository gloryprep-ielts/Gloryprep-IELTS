# Deployment & Google Search Console Guide

This guide covers pushing the repository to GitHub, deploying to Vercel, configuring environment secrets, and connecting Google Search Console. It assumes you already have accounts on [GitHub](https://github.com), [Vercel](https://vercel.com), and [Google Search Console](https://search.google.com/search-console).

## 1. Repository Setup (GitHub)

Create a new repository on GitHub, then push the project code (the ZIP delivered with this package contains everything except your secrets).

```bash
git init
git add .
git commit -m "Initial commit: GloryPrep IELTS platform"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/gloryprep.git
git push -u origin main
```

The repository's `.gitignore` excludes `.env`, so real secrets are never committed. Only `docs/ENV_TEMPLATE.txt` (a template with placeholder values) is tracked.

## 2. Environment Secrets on GitHub

Real credentials live in the deployment environment, never in the repository. When importing the project on Vercel, set these keys under **Project → Settings → Environment Variables**:

| Variable | Source | Required |
|---|---|---|
| `PAYPAL_CLIENT_ID` | PayPal Developer Dashboard → My Apps & Credentials (Live) | Yes (for live payments) |
| `PAYPAL_SECRET` | PayPal Developer Dashboard → My Apps & Credentials (Live) | Yes (for live payments) |
| `PAYPAL_BASE_URL` | Use `https://api-m.paypal.com` for live | No (defaults to live) |
| `PAYPAL_WEBHOOK_ID` | PayPal Developer Dashboard → Webhooks → Add webhook (events: CHECKOUT.ORDER.APPROVED, PAYMENT.CAPTURE.COMPLETED/DENIED/REFUNDED/REVERSED; URL: `https://your-domain.com/api/pay/webhook`) | Recommended (server-side payment verification) |
| `DATABASE_URL` | Managed PostgreSQL (Neon — sign up at neon.tech, free tier) | Yes |
| `JWT_SECRET` | Generate: `openssl rand -hex 32` | Yes |
| `SITE_URL` | Your production domain (e.g. `https://gloryprep.com`) | Yes |
| `VITE_ANALYTICS_WEBSITE_ID`, `VITE_ANALYTICS_ENDPOINT` | Optional Umami-compatible analytics account | No |

Two ways to handle secrets with GitHub:

1. **Recommended — Vercel environment variables** (above). GitHub Actions secrets are only needed if you add a CI workflow; in that case store the same keys in **Repo → Settings → Secrets and variables → Actions**.
2. **Never commit `.env`**. The tracked `docs/ENV_TEMPLATE.txt` documents the required shape; developers copy it to `.env` locally and fill in their own values.

> PayPal credentials are real money. Obtain them only from [developer.paypal.com](https://developer.paypal.com) under your own account, keep them exclusively in Vercel's Environment Variables, and never share or commit them. If PayPal ever reports a flagged transaction, pause payments and resolve it in the PayPal Resolution Center.

## 3. Vercel Deployment

1. Log in to Vercel and click **Add New → Project**.
2. Import your GitHub repository.
3. Framework preset: **Vite**. Build command: `pnpm build` (or `npm run build`). Output directory: `dist`.
4. Add the environment variables from the table above.
5. Create the PayPal webhook on developer.paypal.com (URL above, event set listed), then add `PAYPAL_WEBHOOK_ID` to Vercel. This enables server-side verification of every capture and automatic refund/reversal handling — without it the site falls back to API-only verification (still safe, just less fault-tolerant).
6. Click **Deploy**. For the backend, the `DATABASE_URL` environment variable points at your Neon PostgreSQL cluster — Vercel serverless functions connect over TLS automatically.

The included `vercel.json` provides SPA rewrites and headers for the static build.

## 4. Google Search Console

Search Console verifies ownership and monitors indexing. Complete these steps after your site is live:

1. Go to [search.google.com/search-console](https://search.google.com/search-console) and add a property. Use the **URL prefix** method with your exact domain (e.g. `https://gloryprep.com`).
2. Verify ownership — the easiest method is adding a DNS TXT record, or uploading the provided HTML verification file to the site root (`client/public/` files are served at `/`).
3. Submit the sitemap: **Sitemaps → enter `sitemap.xml` → Submit**.
4. The site already ships `robots.txt` at the root pointing to the sitemap.
5. Allow a few days for crawling; check **Indexing → Pages** for coverage issues.

> Before submitting, edit `client/public/sitemap.xml` and `client/public/robots.txt` and replace `https://gloryprep.com` with your real production domain.

## 5. Custom Domain & SSL

In Vercel, go to **Project → Settings → Domains**, add your purchased domain, and follow the DNS instructions (usually a CNAME to `cname.vercel-dns.com`). Vercel provisions SSL certificates automatically — no separate certificate purchase is needed.

## 6. Post-Launch Checklist

| Item | Where |
|---|---|
| Replace example domain in `sitemap.xml` / `robots.txt` | `client/public/` |
| Set `SITE_URL` and payment credentials | Vercel env vars |
| Update `support@gloryprep.com` to your real inbox | Contact page + legal docs |
| Verify admin access: sign in once, then set `role='admin'` on your user | Database (management UI or SQL) |
| Test payment flow end-to-end in sandbox mode | `/store` |
| Submit sitemap to Search Console | Google Search Console |
| Add analytics ID (optional) | `VITE_ANALYTICS_*` env vars |
