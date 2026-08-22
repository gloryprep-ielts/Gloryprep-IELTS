# GloryPrep IELTS — Handover Documentation

## 1. Project Overview
GloryPrep is a premium, turn-key IELTS preparation platform built for global scale. It features a modern, "Paper & Ember" aesthetic, high-quality original practice content, and a robust monetization system.

### Key Features
- **Full-Stack Build**: React 19, Tailwind 4, tRPC, and Neon PostgreSQL.
- **Monetization**: Integrated PayPal Live payments for Study Shop unlocks.
- **Standalone Auth**: Custom email/password JWT authentication system.
- **Content Library**: 200+ skill lessons, full mock test engine, and paid practice materials.
- **AI Assistant**: Built-in IELTS-focused AI study partner.
- **SEO Optimized**: Sitemap, meta tags, and clean semantic HTML for international ranking.

---

## 2. Technical Stack
- **Frontend**: React 19, Vite 7, Tailwind CSS 4, Wouter (routing).
- **Backend**: Express 4, tRPC 11 (type-safe API).
- **Database**: Drizzle ORM, Neon PostgreSQL (Serverless).
- **Auth**: JWT-based session cookies (SameSite=Lax).
- **Deployment**: Vercel Serverless ready.

---

## 3. Deployment Instructions

### Prerequisites
1. **GitHub Repository**: Push the clean code to a new repository.
2. **Vercel Account**: For hosting the frontend and serverless API.
3. **Neon PostgreSQL**: A free-tier project for the database.
4. **PayPal Developer Account**: For live Client ID and Secret.

### Environment Variables
Set the following in Vercel/GitHub:
- `DATABASE_URL`: Your Neon PostgreSQL connection string.
- `JWT_SECRET`: A secure random string for session signing.
- `PAYPAL_CLIENT_ID`: Your PayPal Live Client ID.
- `PAYPAL_SECRET`: Your PayPal Live Secret.

### Build Settings on Vercel
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`

---

## 4. Admin Setup
To promote a user to admin:
1. Sign up on the platform with your email.
2. Run the following SQL in your Neon Console:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
3. Access the admin panel at `/admin`.

---

## 5. Marketing Assets
Premium posters (1:1, 16:9, 9:16) are provided in the `marketing/` folder for use on Instagram, LinkedIn, and Facebook.

---

## 6. Business Value
GloryPrep is positioned for sale in the $1.5k - $2k range on marketplaces like Acquire.com or Flippa. Its standalone nature and premium design make it a high-value asset for EdTech entrepreneurs.
