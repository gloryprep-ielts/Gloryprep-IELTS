# GloryPrep v4.1 Header Fix — Vercel Deploy

এই আপডেটে পাবলিক হেডার থেকে পুরনো নীল লোগো, **Sign in** এবং **Start free test** বাটন সরানো হয়েছে। নতুন হেডারে Ember-Orange `GP` চিহ্ন ও GloryPrep wordmark আছে। Lessons, mock tests এবং Store ব্রাউজ করা সবার জন্য খোলা থাকবে। শুধু কোনো পেইড আইটেমের checkout-এ ঢুকলে সাইন-ইন/অ্যাকাউন্ট তৈরি করার private ধাপটি আসবে এবং সফল লগইনের পরে ওই নির্বাচিত checkout-এই ফিরিয়ে দেবে।

পুরনো ফাইলের উপর নতুন ZIP-এর ফাইলগুলো replace করুন, কিন্তু `.git` ফোল্ডারটি মুছবেন না। VS Code terminal-এ project folder থেকে নিচের কমান্ড চালান:

```powershell
git add .
git commit -m "v4.1: fix Ember header and checkout-only login"
git push origin main
```

Vercel-এর Project Settings-এ Root Directory খালি বা `./` রাখুন। Install Command হবে `pnpm install`, Build Command হবে `pnpm run build`, এবং Output Directory হবে `dist/public`। GitHub push হওয়ার পর Vercel সাধারণত স্বয়ংক্রিয়ভাবে নতুন deployment শুরু করবে। না হলে Deployments পেজ থেকে সর্বশেষ commit-এর জন্য **Redeploy** দিন।

Deployment `Ready` হলে browser-এ hard refresh দিন (`Ctrl + F5`)। এরপর homepage-এর header-এ orange GP mark আছে এবং Sign in/Start free test button নেই কিনা দেখুন। তারপর Store থেকে যে কোনো locked item খুলে checkout-এ গেলে **Continue securely** screen দেখাবে কিনা পরীক্ষা করুন।
