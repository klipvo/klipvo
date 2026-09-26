# Klipvo

Klipvo is a short-video deal discovery app: influencers post short (9:16) videos paired with a brand promo code, and viewers browse a feed, search by brand/category, save codes for later, and copy them to redeem. Influencers get a dashboard with click/save/usage stats.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com)
- Mock data only for now — no backend/database/auth yet (see Roadmap)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The layout is mobile-first (max width ~430px) — use your browser's device toolbar for the intended view.

## Project structure

```
src/
  app/
    layout.tsx        Root layout: fonts, global providers, app shell
    page.tsx           Feed (home)
    search/page.tsx     Search
    saved/page.tsx       Saved deals
    upload/page.tsx      Add a deal (form UI only, not wired to a backend)
    dashboard/page.tsx    Influencer analytics
  components/         UI building blocks (VideoCard, BottomNav, ...)
  components/providers  Client-side context (saved deals, toast)
  lib/                Types and mock data
```

## Current status

This is a front-end prototype turned into a structured Next.js app — routing, componentization, and mock data are in place, but there is **no backend yet**. Saved deals persist to `localStorage` only.

## Roadmap to production MVP

- [ ] Pick a database + ORM (e.g. Postgres + Prisma/Drizzle) for deals, brands, users
- [ ] Auth (creator accounts vs. viewers) — e.g. Auth.js or Clerk
- [ ] Video upload + storage/CDN (e.g. S3/Cloudflare R2/Mux) instead of the mock upload form
- [ ] Real search/filtering backed by the database
- [ ] Affiliate link tracking + click/save/redemption analytics for the dashboard
- [ ] Promo code validity checks (expiry, single-use, brand API integration where available)
- [ ] Tests (unit + e2e) and CI (lint/typecheck/test on PRs)
- [ ] Deployment (Vercel) with environment config for staging/production
