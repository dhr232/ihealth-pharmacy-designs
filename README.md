# iHealth Pharmacy — Design Explorer (Abbotsford)

Five design directions for **iHealth Pharmacy** (Abbotsford, BC), built as routes in a single Next.js 16 app so you can compare them live and pick the winner.

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:3000** — the home page is a design explorer with a live preview of each variant.

## The 5 directions

| # | Route | Name | Direction |
|---|-------|------|-----------|
| 01 | `/variants/heritage` | Warm Heritage | Cream, forest green & terracotta. Serif warmth, trusted neighbourhood institution. |
| 02 | `/variants/clinical` | Clinical Modern | White & medical teal, Swiss grid. Digital-first, calm and precise. |
| 03 | `/variants/editorial` | Editorial Bold | Paper & ink with a lime accent. Huge type, numbered magazine sections. |
| 04 | `/variants/friendly` | Friendly & Playful | Bright, cheerful, colourful wellness. Rounded and approachable. |
| 05 | `/variants/concierge` | Premium Dark | Charcoal & muted gold. Boutique, concierge-level care. |

> **My take:** Warm Heritage or Friendly Playful fit an independent Abbotsford pharmacy best. Editorial Bold if they want to stand out the most.

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Turbopack
- Each variant is fully self-contained under `app/variants/<name>/`
- Brand assets (logo) in `public/`
