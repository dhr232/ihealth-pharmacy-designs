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
- **Auth:** Email-code sign-in for the single admin `info@ihealthpharmacy.ca` via `lib/auth.ts` -- 6-digit code (hashed, 2-minute expiry) stored in DB or in-memory fallback, encrypted 12-hour session cookie.
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
| `RUN_MIGRATIONS` | Set to `true` in Hostinger ONLY. Makes `npm run build` apply pending Prisma migrations. Never set locally or in CI. |
| `UPLOAD_DIR` | Absolute folder for admin uploads (blog covers, flyer PDFs/images), OUTSIDE the app so deploys don't wipe it: `/home/u491263438/domains/ihealthpharmacy.ca/uploads`. Served at `/media/<category>/<file>`. Production refuses uploads if unset. |

## Admin Sign-in

- One admin only: `info@ihealthpharmacy.ca` (`ADMIN_EMAIL` in `lib/auth.ts`, = `PHARMACY_INFO.email`). No passwords and no other staff accounts.
- Flow: enter the email on `/admin/login`, a 6-digit code is emailed to that inbox (valid 2 minutes, 3 attempts, 60s resend cooldown), enter it to start a 12-hour session.
- `getCurrentStaffSession` rejects any session that is not for `ADMIN_EMAIL`. `SESSION_SECRET` must be set in production (the app refuses to start sessions without it).
- In dev/demo mode (no RESEND_API_KEY) `/api/auth/login` returns `debugCode`; in production with no key it returns an error instead.
- The admin `User` row is created at runtime on first sign-in (`ensureAdminUser`). Do not seed other users.

## Email and Notifications (one inbox rule)

- **The one and only pharmacy email is `info@ihealthpharmacy.ca`** (`PHARMACY_INFO.email` in `data/pharmacy-info.ts`). Never add another contact address (no `hello@`, `pharmacy@`, Gmail, etc.) to pages, copy, schema or code. Always read it from `PHARMACY_INFO.email`.
- **Every form submission must also email `info@ihealthpharmacy.ca`** (pharmacist notification), in addition to any confirmation sent to the patient. Today that covers: appointment booking (all services: minor ailments, vaccines, medication review, etc.) via `sendStaffBookingNotification`; new prescription, refill and transfer via `sendStaffRefillNotification`; contact form (`/api/contact`) and newsletter sign-up (`/api/newsletter/subscribe`) via `sendStaffFormAlert`. All live in `lib/resend.ts`.
- **Any new form or alert must follow the same pattern**: submit to our own `/api/...` route and send the staff alert to `DEFAULT_DISPENSARY_ALERT_EMAIL` (which is `PHARMACY_INFO.email`). Do not use third-party form services (Web3Forms etc.).
- `DEFAULT_DISPENSARY_ALERT_EMAIL` is intentionally NOT overridable by an env var. The old `DISPENSARY_ALERT_EMAIL` variable is no longer read and can be deleted from Hostinger.
- The Resend *sender* (`RESEND_FROM_EMAIL`, default `notifications@notifications.ihealthpharmacy.ca`) is a sending identity on a verified Resend domain, not a mailbox; change it only after verifying the new domain in Resend.
- The admin sign-in code is emailed to `info@`, the same inbox as all form alerts.

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

`.github/workflows/ci.yml` on push to `main` only (it does not run on pull requests, so run lint, tests and typecheck locally before merging):
1. Install deps (`npm ci`)
2. Lint (`npm run lint`)
3. Prisma generate
4. Typecheck (`npx tsc --noEmit`)
5. Build (`npm run build`)

`.github/workflows/audit.yml` runs `npm audit --omit=dev --audit-level=high` on every pull request, every push to `main` and weekly (Mondays). A failure means a production dependency has a known high/critical vulnerability: run `npm audit fix`, then lint, `npx tsc --noEmit`, tests and build, and commit `package-lock.json`. Do not merge with it red and do not add `--force` fixes without testing. Dependabot (`.github/dependabot.yml`) opens routine grouped updates monthly; merge or close them so they do not pile up.

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
- `lib/content.ts` -- blog posts + announcements: DB reads/writes, one-time import of the code-file seed, code-file fallback
- `lib/uploads.ts` + `app/media/[...path]/route.ts` -- save uploads to `UPLOAD_DIR` and serve them at `/media/...`
- `lib/appointment-store.ts` -- shared in-memory fallback Map for appointment status (dev/demo mode)
- `prisma/schema.prisma` -- full normalized DB schema
- `next.config.mjs` -- Next.js config (plain JS ES module)
- `package.json` -- build: `prisma generate && next build --webpack`

## Mobile-First (applies to every change)

Most patients (many of them older adults) browse on phones. Every UI change MUST be mobile friendly before it is considered done:

- Design mobile first (base classes = phone), then add `sm:` / `lg:` enhancements.
- Verify at 360-390px wide: no horizontal scroll, no clipped or overlapping text, badges and pills wrap instead of overflowing.
- Tap targets at least 44x44px with 8px+ spacing; never rely on hover alone for information or actions.
- Body text 16px (`text-base`) or larger for patient-facing copy; decorative text may be smaller but must stay legible.
- Check tablet (768px) and desktop (1280px) too; grids must not leave orphan or misaligned cards.
- Images must reserve space (`aspect-*` or explicit size) to avoid layout shift, and use `loading="lazy"` below the fold.
- Keep motion gated on `useReducedMotion`.

## Time Zone (applies to every date or time decision)

The Hostinger server runs in **UTC**; the pharmacy and its patients are in **America/Vancouver (Pacific)**. A bug from ignoring this made every same-day booking slot show as unavailable on the live site (the server thought it was already evening).

- **Never** use the server's clock (`new Date().getHours()`, `getDate()`, `getDay()` on "now", `toISOString().slice(0, 10)`, `toLocaleString()` without a time zone) to decide what "today", "now", "open", "past" or "bookable" means.
- Use `getPacificNow()` (date string + minutes since midnight) and `getOpenStatus()` from `data/pharmacy-info.ts`, or `Intl.DateTimeFormat` with `timeZone: "America/Vancouver"`. Add new shared time helpers there, not inline in routes.
- Calendar dates passed around as `YYYY-MM-DD` strings are compared as strings or built from their own parts; do not round-trip them through `new Date("YYYY-MM-DD")` (that is UTC midnight).
- Anything that depends on the current time must be checked against the live server's behaviour, not only on a Pacific-time dev machine, where UTC bugs stay hidden. Test by faking a UTC clock, e.g. run a check with `TZ=UTC`.

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
