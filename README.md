# iHealth Pharmacy Website

Full-stack website for **iHealth Pharmacy** (Abbotsford, BC) — marketing pages, prescription/vaccination booking, a subscriber newsletter, and a 2FA-protected staff admin panel.

**Live site:** [ihealthpharmacy.ca](https://ihealthpharmacy.ca)

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS
- **Webpack** for production builds (`next build --webpack`) — Hostinger's Linux GLIBC is too old for Turbopack's native binaries; Turbopack is fine for local `npm run dev`
- **Prisma v6** + **PostgreSQL** ([Neon](https://neon.tech))
- **Resend** for transactional email and the newsletter audience
- **motion/react** for animation, **lucide-react** for icons
- Custom session-based auth with 2FA (`lib/auth.ts`) for the staff admin panel

## Quick start

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, DIRECT_URL, RESEND_API_KEY, etc.
npx prisma generate
npx prisma db push     # sync schema to your database
npx prisma db seed     # create the seeded staff accounts (see below)
npm run dev
```

Open **http://localhost:3000**.

## Routes

**Public:** `/` `/about` `/contact` `/health-tips` `/blog/[slug]` `/services` `/services/[slug]` `/book` `/vaccinations` `/prescription-refills` `/transfer` `/care-program` `/subscribe` `/privacy` `/terms` `/cookies`

**Admin (2FA-protected):** `/admin` `/admin/login`

API routes live under `/api/` and are all dynamic, server-rendered.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon PostgreSQL pooled connection string |
| `DIRECT_URL` | Neon PostgreSQL direct connection string |
| `RESEND_API_KEY` | Resend transactional email |
| `RESEND_AUDIENCE_ID` | Resend newsletter audience |
| `RESEND_FROM_EMAIL` | Sender address for outgoing mail |
| `NEXT_PUBLIC_SITE_URL` | Public base URL, used in sitemap/robots and unsubscribe links |
| `SESSION_SECRET` | AES-256-GCM session token encryption key |
| `ADMIN_INITIAL_PASSWORD` | Override default admin password |
| `PHARMACIST_INITIAL_PASSWORD` | Override default pharmacist password |

### Seeded staff accounts

| Role | Email | Default password |
| --- | --- | --- |
| Admin | `admin@ihealthpharmacy.ca` | `Admin2026!` |
| Pharmacist | `pharmacist@ihealthpharmacy.ca` | `Pharmacist2026!` |

2FA codes are sent via Resend. In dev/demo mode (no `RESEND_API_KEY` set), the login API returns a `debugCode` in the response body instead of sending an email.

## Deployment

Hosted on **Hostinger Node.js Cloud Hosting**, which auto-deploys on every push to `main` via GitHub OAuth — no manual steps, no webhook, no SSH secrets.

- Build: `prisma generate && next build --webpack`
- Start: `npm start`

## CI

`.github/workflows/ci.yml` runs on every push/PR to `main`: install, lint, `prisma generate`, typecheck (`tsc --noEmit`), build.

## Project docs

See `CLAUDE.md` for the full agent-facing runbook (brand tokens, lint rules, key files, and constraints for this codebase).
