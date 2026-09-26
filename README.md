# Klipvo

Klipvo is a short-video deal discovery app: creators post short (9:16) videos paired with a brand promo code, and viewers browse a feed, search by brand/category, save codes for later, and copy them to redeem. Creators get a dashboard with click/save stats.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Postgres](https://www.postgresql.org) + [Prisma 7](https://www.prisma.io) (via `@prisma/adapter-pg`)
- Custom session auth: `jose` (signed JWT cookie) + `bcryptjs` (password hashing) — no third-party auth provider

## Getting started

1. Have a Postgres database available (local install, Docker, or a hosted instance — Neon/Supabase/Railway/Vercel Postgres all work).
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL` and `AUTH_SECRET` (generate a secret with `openssl rand -base64 32`).
3. Install dependencies, run migrations, and seed demo data:

   ```bash
   npm install
   npm run db:migrate
   npm run db:seed
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000). The layout is mobile-first (max width ~430px) — use your browser's device toolbar for the intended view.

### Demo accounts (from `npm run db:seed`)

All demo accounts use the password `password123`.

| Email | Role |
| --- | --- |
| `alex@klipvo.app`, `marcus@klipvo.app`, `priya@klipvo.app`, `jake@klipvo.app` | Creator (each owns one seeded deal) |
| `viewer@klipvo.app` | Viewer (has 2 deals pre-saved) |

## Project structure

```
prisma/
  schema.prisma       Data model: User, Brand, Deal, SavedDeal
  seed.ts              Seeds demo accounts + deals
src/
  app/
    layout.tsx          Root layout: fonts, ToastProvider, app shell
    page.tsx             Feed (home)
    search/page.tsx       Search
    saved/page.tsx         Saved deals (auth required)
    upload/page.tsx        Publish a deal (creator only)
    dashboard/page.tsx      Creator analytics (creator only)
    login/, signup/, account/   Auth pages
  proxy.ts             Route protection (Next 16's proxy/middleware convention)
  components/          UI building blocks (VideoCard, BottomNav, screens/)
  lib/
    actions/            Server Actions (auth, deal create/save/click tracking)
    data/deals.ts        Server-side data fetchers (Prisma queries)
    session.ts, jwt.ts    Signed-cookie session handling
    prisma.ts            Prisma client singleton (pg driver adapter)
```

## Current status

Real backend, real auth. What's still faked or missing:

- **No video hosting** — deals show an emoji/gradient placeholder, not an actual video. The upload form collects a brand, title, code, discount, affiliate link, category, and expiry; there's no file upload yet.
- **View counts don't increment** — `views` is a seeded static number; only `clicks` (via the "Shop Now" button) and saves are tracked live, and click tracking is a simple unguarded counter (not deduped, not fraud-resistant).
- **No password reset / email verification.**
- **No tests.**

## Roadmap to production MVP

- [ ] Video upload + storage/CDN (e.g. S3/Cloudflare R2/Mux)
- [ ] Real view tracking (with dedup) and fraud-resistant click tracking
- [ ] Password reset + email verification
- [ ] Real search (the search box is currently decorative — brand list and trending terms are static)
- [ ] Tests (unit + e2e) and CI (lint/typecheck/test/build on PRs)
- [ ] Deployment (Vercel + a hosted Postgres) with environment config for staging/production
- [ ] Rotate `AUTH_SECRET` and re-seed/replace demo accounts before any real deployment — the seeded passwords are public (in this file)
