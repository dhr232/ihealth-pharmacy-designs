@AGENTS.md

# iHealth Pharmacy Website — Agent Runbook

Full project state lives in [MEMORY.md](./MEMORY.md). This file is the operational quick-reference.

## Project

Multi-page marketing website for **iHealth Pharmacy** (Abbotsford, BC). Production host is **Hostinger**; GitHub is source-of-truth + CI. Live: https://honeydew-coyote-883999.hostingersite.com/ — repo `dhr232/ihealth-pharmacy-designs` at `C:\Users\Dhruvil\pharmacy-website`.

## Stack

- Next.js 15 App Router + TypeScript + Tailwind CSS v4 + Turbopack
- Static export: `output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`, **NO basePath** (Hostinger serves at `/`)
- `motion/react` (NOT framer-motion), easing `[0.16, 1, 0.3, 1]`, all motion gated on `useReducedMotion`
- `lucide-react` icons — emojis are banned everywhere
- Forms POST to Web3Forms (`https://api.web3forms.com/submit`), key from `NEXT_PUBLIC_WEB3FORMS_KEY` (placeholder until user provides)

## Brand Tokens (do not change)

- Brand red `#C01D16` (`--brand`), hover `#a31812`; foreground `#1f2328`; muted `#5a6270`; surface `#f6f7f9`; border `#d8dce2`
- Inter font (default). 9 alternate pairings selectable via admin.
- Voice: warm, professional, Abbotsford-community, Canadian English

## Routes (14)

`/` (friendly-variant homepage) · `/about` `/contact` `/cookies` `/health-tips` `/privacy` `/subscribe` `/terms` · `/services/[slug]` ×6 (minor-ailments, compounding, vaccinations, myhealthpack, med-review, delivery) · `/admin`

## Layout

`app/layout.tsx` loads 10 Google Fonts (Inter + 9 alternates) and mounts `ThemeApplier`, `AnnouncementBar`, `CookieBanner` on every page. ThemeApplier reads `ihealth_admin_theme` / `ihealth_admin_font` from localStorage → applies `data-theme` on `<html>` + `font-*` class on `<body>`.

## Admin (`/admin`)

- PIN `2026` (override: `NEXT_PUBLIC_ADMIN_PIN`), 24h localStorage session
- Tabs: Pharmacists (4 seeded) + Blog Posts (seeded from `public/blog/seed-posts.json` on first load) + theme/font pickers
- Files: `app/admin/page.tsx`, `app/admin/components/*`, `app/admin/lib/{storage,types,seed-posts}.ts`
- Data in localStorage (`ihealth_admin_*` keys); JSON export buttons for both lists

## Deploy Flow (Hostinger via Git integration)

Hostinger pulls `gh-pages` → `public_html`. Publish:

```bash
npx next build && \
rm -rf out/.git out/.nojekyll && \
touch out/.nojekyll && \
cd out && git init -b gh-pages 2>/dev/null && \
git add . && git commit -m "Deploy: <msg>" && \
git push "https://x-access-token:$(gh auth token)@github.com/dhr232/ihealth-pharmacy-designs.git" HEAD:gh-pages --force
```

`gh-pages` is the only branch ever force-pushed. Push `main` for CI first.

## CI

`.github/workflows/ci.yml` on push/PR to `main`: lint → tsc → build → artifact → `deploy-hostinger` job (force-pushes `out/` to gh-pages).

## Lint House Rules

**`npm run lint` and `npx tsc --noEmit` must BOTH exit 0 before any deploy.**
- No `setState` synchronously in `useEffect` — use lazy `useState` initializers (with `typeof window` guard) or derived-state-during-render pattern
- No impure functions in render (`Math.random()`)
- `<img>` needs `eslint-disable-next-line @next/next/no-img-element` (intentional: static export + basePath history)
- `scripts/**` eslint-ignored; `picomatch: ^4.0.7` override in package.json

## File Map

- `app/page.tsx` — homepage (~500 lines)
- `app/globals.css` — brand tokens + 10 `[data-theme]` blocks + 10 `.font-*` classes + Google-Translate CSS overrides
- `app/components/` — Header, Footer, RefillForm, NewsletterForm, MotionKit, CountUp, FloatingPills3D, HappyCustomerCard, LanguageSwitcher (Google Translate, 10 BC languages), CookieBanner, AnnouncementBar, WhatsAppButton, ThemeApplier
- `data/blog-posts.ts` — 10 production posts (~25K words); `app/health-tips/page.tsx` renders them
- `public/blog/seed-posts.json` — admin seed data

## Pending User Input

- Web3Forms access key (placeholder `YOUR_WEB3FORMS_KEY_HERE`)
- WhatsApp number (placeholder `16045550199`)
- `ihealthpharmacy.ca` domain transfer to Hostinger ("later")
- Booking subdomain sprint (BOOK-01…09 in `.kanban/board.md`) — stack + hosting decisions needed

## Do NOT

- Re-add `basePath` to next.config.ts (root cause of 0-byte CSS on Hostinger)
- Deploy with lint errors
- Add server/runtime dependencies (static export only)
- Replace Inter or brand red; add emojis; use `next/image` for static assets
- Force-push `main`; touch the AGENTS.md block
