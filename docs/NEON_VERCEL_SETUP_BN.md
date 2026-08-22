# GloryPrep — Neon Database + Vercel ডিপ্লয়মেন্ট গাইড (বাংলা)

এই গাইড আপনার **Neon PostgreSQL cluster** কে GloryPrep সাইটের সাথে যোগ করার জন্য।
Database ছাড়া user login, payment, support ticket কিছুই সেভ থাকবে না — তাই এটি আবশ্যক।

> **v3 আপডেট (Standalone Auth):** এখন সাইটে **email + password login** system আছে। Manus OAuth-এর দরকার নেই। `/login` page-এ signup করে login করুন, তারপর admin হতে role change করুন (ধাপ ৬)।

## ধাপ ১: Neon থেকে DATABASE_URL নেওয়া

1. [neon.tech](https://neon.tech)-এ login করুন।
2. আপনার **gloryprep** project-এ ঢুকুন।
3. **Connection Details** section-এ connection string দেখাবে। **Pooled connection** version কপি করুন।
   - এটি এভাবে দেখাবে: `postgresql://gloryprep_owner:xxxx@ep-xxxx-pooler...`
   - **⚠️ গুরুত্বপূর্ণ:** `-pooler` version নেবেন (URL-এ `-pooler` থাকবে)। Vercel serverless-এ এটাই দরকার।

## ধাপ ২: Vercel-এ Environment Variable যোগ করা

1. [vercel.com](https://vercel.com) → আপনার **gloryprep** project → **Settings** → **Environment Variables**।
2. Neon integration অনেক variable অটো যোগ করেছে (`DATABASE_URL` সহ) — চেক করুন।
3. যা নেই, সেগুলো **Add** করুন:

| Key | Value |
|---|---|
| `DATABASE_URL` | Neon connection string (`postgresql://...-pooler...`) |
| `JWT_SECRET` | লম্বা random string (PowerShell-এ: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` এর ফল) |
| `PAYPAL_CLIENT_ID` | আপনার PayPal live client id |
| `PAYPAL_SECRET` | আপনার PayPal live secret |
| `PAYPAL_WEBHOOK_ID` | `WH-...` — webhook বানানোর পর (ধাপ ৭) |
| `SITE_URL` | আপনার Vercel domain, যেমন `https://gloryprep.vercel.app` |

4. সব দেওয়ার পর Vercel → **Deployments** → সবচেয়ে নতুন deployment-এর ডানে **⋯** → **Redeploy** → **Yes**।

## ধাপ ৩: Database schema apply করা (একবারই)

Neon → **SQL Editor** → `drizzle/0000_fancy_overlord.sql` ফাইলের পুরো content paste করে **Run** করুন।

✅ Schema-এ থাকবে: `users`, `unlocks`, `support_tickets`, `paypal_orders`, `payments` — ৫টি table + সব index।

**v3 মাইগ্রেশন (আগে থেকে থাকা database-এ):** `drizzle/0001_standalone_auth.sql` ফাইলের পুরো content-ও SQL Editor-এ paste করে **Run** করুন — এটি `users` table-এ `passwordHash` column যোগ করে email/password login সম্ভব করবে (১ বারই দরকার)।

## ধাপ ৪: সাইটে signup করুন

1. `https://আপনার-vercel-domain.vercel.app/login` খুলুন।
2. **Sign up** — আপনার email + password দিয়ে account বানান।
3. Login হয়ে **Dashboard** page-এ আপনার profile দেখালে database ১০০% ঠিক আছে।

## ধাপ ৫: Admin Dashboard পাওয়া (আপনার জন্য)

1. Neon → **SQL Editor** → এই command paste করে **Run** করুন (আপনার email বসিয়ে):

```sql
UPDATE "users" SET "role" = 'admin' WHERE "email" = 'আপনার-ইমেইল';
```

2. সাইট refresh করুন → header-এ আপনার avatar + dropdown দেখাবে।
3. `/admin` URL-এ যান — এখন admin dashboard দেখবেন (sales, payments, support tickets, user management)।

## ধাপ ৬: PayPal Webhook যোগ করা (টাকা আসার জন্য)

1. [developer.paypal.com](https://developer.paypal.com) → **Webhooks** → **Add webhook**।
2. **Webhook URL**: `https://আপনার-vercel-domain.com/api/pay/webhook`
3. **Events**: `CHECKOUT.ORDER.APPROVED`, `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`, `PAYMENT.CAPTURE.REFUNDED`, `PAYMENT.CAPTURE.REVERSED`
4. **Webhook ID** (`WH-...`) কপি করে Vercel-এ `PAYPAL_WEBHOOK_ID` variable হিসেবে Add করুন এবং Redeploy করুন।

## যাচাই করার উপায়

- সাইট খুলুন → signup করুন → **Dashboard** page-এ আপনার প্রোফাইল দেখালে database কাজ করছে।
- **Store** page-এ কিছু purchase try করুন → payment success হলে content unlock হবে।
- **Admin dashboard**-এ payment/sales count বাড়লে সব ঠিক আছে।
