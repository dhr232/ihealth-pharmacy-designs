@AGENTS.md

# iHealth Pharmacy Website -- Agent Runbook

## Project

Multi-page full-stack website for **iHealth Pharmacy** (Chilliwack, BC).
- **Repo:** `dhr232/ihealth-pharmacy-designs` at `C:\Users\Dhruvil\pharmacy-website`
- **Production host:** Hostinger Node.js Cloud Hosting -- auto-deploys from `main` via GitHub OAuth
- **Live domain:** `ihealthpharmacy.ca` -- DNS A record on GoDaddy now points to Hostinger; this is the production URL
- **Temp live URL:** `https://lightslategrey-eel-264716.hostingersite.com` -- legacy pre-DNS-cutover URL, may be stale/unreachable now that the custom domain is live

## Stack

- **Next.js 16.3.3** App Router + TypeScript + Tailwind CSS + Webpack (production)
- **Runtime:** Node.js 22.x server -- NOT static export. `output: "export"` is removed.
- **Bundler:** Webpack for production builds (`next build --webpack`) -- Hostinger Linux has GLIBC < 2.29, incompatible with Turbopack native binaries. Turbopack is fine for local `npm run dev`.
- **ORM:** Prisma v6 with PostgreSQL (Neon). Schema at `prisma/schema.prisma`.
- **Auth:** Custom 2FA session auth via `lib/auth.ts` -- bcrypt password + 6-digit TOTP stored in DB or in-memory fallback.
- **Email:** Resend via `lib/resend.ts`. Audience sync to `RESEND_AUDIENCE_ID`.
- **motion/react** (NOT framer-motion), easing `[0.16, 1, 0.3, 1]`, all motion gated on `useReducedMotion`
- **lucide-react** icons -- emojis are banned everywhere in code, commits, and responses
- **Config:** `next.config.mjs` (plain ES module -- NOT `.ts`)

## Brand Tokens (do not change without explicit user request)

- Primary blue `#3D5FE0` (`--brand`), hover `#2F4BC4`, subtle tint `#e8ecfb`; secondary leaf green `#4CAF7D` (`--brand-secondary`), hover `#3D9468`, subtle tint `#e6f7ec`; foreground `#1e2a44`; muted `#5a6270`; surface `#f6f7f9`; border `#d8dce2`
  - Swapped from the original brand red (`#C01D16`) on 2026-09-17 per explicit user request -- red read as alarming/clinical to older patients. Red is kept as a selectable "Pharmacy Red" option in the admin theme picker only; it is no longer the site's rendered default (see `app/globals.css` `:root`).
- Inter font (default). 9 alternate pairings selectable via admin theme picker.
- Voice: warm, professional, Chilliwack-community, Canadian English
- **Brand strategy, audience, and verified/banned claims:** `.agents/product-marketing.md` -- read before writing any customer-facing copy

## Environment Variables (Hostinger hPanel)

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon PostgreSQL pooled connection string |
| `DIRECT_URL` | Neon PostgreSQL direct connection string |
| `RESEND_API_KEY` | Resend transactional email |
| `RESEND_AUDIENCE_ID` | Resend newsletter audience |
| `SESSION_SECRET` | AES-256-GCM session token encryption key |
| `ADMIN_INITIAL_PASSWORD` | Override default admin password (default: `Admin2026!`) |
| `PHARMACIST_INITIAL_PASSWORD` | Override default pharmacist password (default: `Pharmacist2026!`) |
| `RUN_MIGRATIONS` | Set to `true` in Hostinger ONLY. Makes `npm run build` apply pending Prisma migrations. Never set locally or in CI. |

## Seeded Staff Accounts

| Role | Email | Default Password |
| --- | --- | --- |
| Admin | `admin@ihealthpharmacy.ca` | `Admin2026!` |
| Pharmacist | `pharmacist@ihealthpharmacy.ca` | `Pharmacist2026!` |

2FA OTP is sent via Resend email. In dev/demo mode (no RESEND_API_KEY), the API returns `debugCode` in the response body.

## Routes

Public: `/` `/about` `/contact` `/health-tips` `/blog/[slug]` `/services` `/services/[slug]` `/book` `/vaccinations` `/prescription-refills` `/transfer` `/care-program` `/subscribe` `/privacy` `/terms` `/cookies`

Admin (protected, 2FA): `/admin` `/admin/login`

API routes under `/api/` -- all dynamic server-rendered.

## Layout

`app/layout.tsx` loads 10 Google Fonts and mounts `ThemeApplier`, `AnnouncementBar`, `CookieBanner`, `WhatsAppButton` on every **public** page.

`app/admin/layout.tsx` is a bare layout that suppresses all of the above on admin pages.

`ThemeApplier` reads `ihealth_admin_theme` / `ihealth_admin_font` from localStorage and applies `data-theme` on `<html>` + `font-*` class on `<body>`.

## Deploy Flow

Hostinger auto-deploys on every push to `main` via GitHub OAuth. No manual steps, no webhook, no SSH secrets required.

Build command run by Hostinger: `npm run build` -> `prisma generate && node scripts/migrate-deploy.mjs && next build --webpack`
(`migrate-deploy.mjs` applies pending migrations only when `RUN_MIGRATIONS=true`; a failed migration fails the build, so code never ships ahead of its schema.)
Start command: `npm start`

**Never manually push to any Hostinger branch -- push to `main` only.**

## CI

`.github/workflows/ci.yml` on push/PR to `main`:
1. Install deps (`npm ci`)
2. Lint (`npm run lint`)
3. Prisma generate
4. Typecheck (`npx tsc --noEmit`)
5. Build (`npm run build`)

There is no separate deploy workflow -- Hostinger handles that natively.

## Prisma

Schema: `prisma/schema.prisma`
Seed: `prisma/seed.ts`
Client singleton: `lib/prisma.ts` (global singleton pattern for Next.js hot-reload safety)

Migrations: `prisma/migrations/` (baseline `0_init` = schema as of 2026-09-25). Schema changes ship as
committed SQL migrations and are applied automatically by the Hostinger build.

**Local `.env` points at the PRODUCTION Neon database** (solo project, no dev branch yet). Therefore:

- **Never** run `prisma db push`, `prisma migrate dev`, `prisma migrate reset`, or `prisma db seed` locally.
- To change the schema:
  1. Edit `prisma/schema.prisma`
  2. `npm run db:migration -- <snake_case_name>` -- read-only diff of live DB vs schema; writes
     `prisma/migrations/<timestamp>_<name>/migration.sql` (refuses if earlier migrations are unapplied)
  3. Review the SQL (prefer additive changes: new nullable/defaulted columns; no drops)
  4. Stop `npm run dev` (Windows locks the Prisma engine DLL -> EPERM), run `npx prisma generate`, restart
  5. Commit and push to `main`; Hostinger applies it via `prisma migrate deploy`
- `npm run db:status` shows applied vs pending migrations (read-only).

## Key Files

- `app/layout.tsx` -- root layout, 10 fonts, public-page wrappers
- `app/admin/layout.tsx` -- bare admin layout (no announcement bar, no WhatsApp, no cookie banner)
- `app/globals.css` -- brand tokens, 10 `[data-theme]` blocks, 10 `.font-*` classes
- `lib/auth.ts` -- session encryption, 2FA, seeded staff constants
- `lib/prisma.ts` -- Prisma global singleton
- `lib/resend.ts` -- Resend email helpers
- `lib/appointment-store.ts` -- shared in-memory fallback Map for appointment status (dev/demo mode)
- `prisma/schema.prisma` -- full normalized DB schema
- `next.config.mjs` -- Next.js config (plain JS ES module)
- `package.json` -- build: `prisma generate && next build --webpack`

## Lint House Rules

**`npm run lint` and `npx tsc --noEmit` must BOTH exit 0 before any commit.**

- No `setState` synchronously in `useEffect`
- No impure functions in render (`Math.random()`)
- Route handler files (`app/api/**/route.ts`) may ONLY export HTTP handlers (`GET`, `POST`, `PATCH`, `DELETE`) and Next.js config (`generateStaticParams`). Never export plain variables or stores from route files.
- `middleware.ts` is deprecated in Next.js 16 -- do not rename to `proxy.ts` without thorough testing (affects subdomain routing logic)

## Do NOT

- Use Turbopack for production builds (`next build --turbo` or `TURBOPACK=1`) -- breaks on Hostinger GLIBC
- Use `next.config.ts` -- must stay as `next.config.mjs`
- Re-add `output: "export"` -- the site is now a full Node.js server
- Force-push `main`
- Add emojis anywhere (code, commits, responses)
- Export non-handler values from Next.js route files
- Commit `node_modules`, `.next`, or `out` directories (all gitignored)
- Touch the AGENTS.md block
