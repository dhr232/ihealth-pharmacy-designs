# Project Memory — iHealth Pharmacy Website

> Read this FIRST when resuming work. Technical runbook (stack, env vars, deploy, CI,
> lint rules) lives in `CLAUDE.md`. Brand strategy and claim rules live in
> `.agents/product-marketing.md`. This file captures business facts, decisions, and
> gotchas that are not obvious from the code. Last updated: 2026-09-25.

## Who this is for

- **Solo developer** (the owner-operator, dhr232) -- no team, no reviewers. Keep process light: CI green
  on `main` is the gate. Do not propose team processes (PR reviews, staging, approval workflows).
- **Solo-pharmacist pharmacy** (confirmed 2026-09-25): one pharmacist serves patients. Copy should say
  "your pharmacist", not "our team of pharmacists". Which person (Dev Patel vs Dr. Rutu Patel) is still
  being confirmed -- see Pending.

## Business facts (source of truth: `data/pharmacy-info.ts`)

- **iHealth Pharmacy Ltd.**, independent and family-run
- **Address:** 45619 Yale Rd #101, Chilliwack, BC V2P 2N1
- **Phone / WhatsApp:** 604-392-8393 · **Email:** info@ihealthpharmacy.ca
- **Hours (matches Google Business Profile):** Mon–Fri 8:30 am – 5:00 pm, Sat 9:00 am – 12:00 pm,
  Sun closed; statutory holidays may differ
- **Languages:** English, Punjabi, Hindi
- **Online booking window:** Mon–Fri 9:00 am – 2:30 pm (last start 2:30), 15-min slots -- `PHARMACY_INFO.onlineBooking`,
  enforced in both the slots API and the booking POST via `isBookableSlot()`
- **Delivery:** free anywhere in Chilliwack, no minimum order
- **Google rating:** 4.7 (`PHARMACY_INFO.address.googleRating` / `googleReviewsUrl`)
- **Lead pharmacist:** Dr. Rutu Patel (pharmacist records live in PostgreSQL, managed in `/admin`)
- **Domain:** `ihealthpharmacy.ca` (live on Hostinger); booking also served at `booking.` subdomain

Never hardcode hours, phone, or address in components -- import `PHARMACY_INFO`
(`hours`, `hoursSummary`, `hoursShort`, `schedule`) and `getOpenStatus()` for live
open/closed status. If hours change, update `schedule` + `hours*` there, plus the
schema.org block in `app/layout.tsx`, email templates in `app/components/emails/`, and the
announcement seed (see below).

## Brand and positioning

- "The friendly neighbourhood pharmacy that knows you by name." Audience: seniors and caregivers.
- Conversions: 1) prescription transfer (`/transfer`), 2) book a clinical service.
- Colours: primary blue `#3D5FE0`, leaf green `#4CAF7D`, Inter. Red `#C01D16` was retired as
  the default on 2026-09-17 (read as alarming to older patients); still selectable in the admin theme picker.
- Full voice, verified claims, and banned claims: `.agents/product-marketing.md`.

## Legal / claims decisions (owner is sensitive to regulatory risk)

- No "accredited", "fully compliant", "certified", encryption-strength claims, or seal/badge
  styling. `PhipaBadge` is intentionally a quiet grey note linking to `/privacy`.
- PIPEDA removed from marketing copy (kept in `/privacy`, where it states patient access rights).
- PHIPA wording left as-is on the About page per owner instruction (2026-09-25).
- "BC PharmaNet Integration" marketing card removed from About (2026-09-25).
- Verified claims: family-run, many refills under 30 min, free same-day delivery in Chilliwack.
  Not accurate / do not use: sterile compounding, "5.0"/"5-star"/"top rated", NIHB billing, "$25 minimum".

## Database and migrations (set up 2026-09-25)

- Local `.env` points at the **production** Neon DB. Never `db push` / `migrate dev` / `migrate reset` /
  `db seed` locally. Workflow is in `CLAUDE.md` > Prisma (`npm run db:migration -- <name>`).
- `RUN_MIGRATIONS=true` must be set in Hostinger hPanel env vars; the build then runs
  `prisma migrate deploy`. Local and CI builds skip migrations.
- Baseline `0_init` matches production exactly (verified with a read-only `migrate diff`). It must be
  marked applied once with `npx prisma migrate resolve --applied 0_init` before the first deploy that
  includes `prisma/migrations/` -- otherwise `migrate deploy` tries to re-create existing tables and the
  build fails.
- Pharmacist model gained profile fields on 2026-09-25 (slug, profilePublished, tagline, story,
  specialties, education, affiliations, personalNote, plus credentials/languages/yearsExperience/
  displayOrder/directPhone which were previously never persisted).
- Windows: stop `npm run dev` before `npx prisma generate` (EPERM on the engine DLL otherwise).

## Content storage (2026-09-26)

- Blog posts and announcements are stored in Neon Postgres (`BlogPost`, `Announcement`), managed in `/admin`
  through `/api/admin/posts` and `/api/admin/announcements`. Browser localStorage is only a cache.
  First admin load imports `data/blog-posts.ts` / `SEED_ANNOUNCEMENTS` into an empty table; after that the
  code files are only a read fallback if the DB is unreachable.
- Saving a post calls `revalidatePath`, so public pages update within seconds; pages also revalidate every 5 min
  (so scheduled posts go live).
- Blog cover images and flyer files (PDF or image) are saved on the Hostinger server in `UPLOAD_DIR`
  (`/home/u491263438/domains/ihealthpharmacy.ca/uploads`, outside the app folder that each deploy rebuilds) and
  served at `/media/<category>/<file>` (visible in hPanel File Manager). Unique filenames, so they cache forever.
  Neon Object Storage was considered but dropped: not available in the DB project's region (us-west-2).

## Gotchas

- **Announcements are per-browser localStorage**, seeded from `SEED_ANNOUNCEMENTS` in
  `app/admin/lib/types.ts` (also mirrored in `prisma/seed.ts`). Admin edits do NOT reach other
  visitors. When changing seed text, bump the `KEY_ANNOUNCEMENTS` version suffix in
  `app/admin/lib/storage.ts` so returning visitors re-seed.
- **Hydration:** never read `window` during render. `getBookingUrl()` in `lib/routes.ts` accepts a
  hostname; in client components use `useBookingUrl()` / `useClientHostname()` from
  `lib/use-booking-url.ts`. Server components can call `getBookingUrl()` directly.
- **Booking window is intentionally narrower than store hours** (owner decision 2026-09-25). Saturday shows
  as "Walk-in" in the booking calendar.
- **Playwright** has no bundled browser installed; launch with `chromium.launch({ channel: "msedge" })`
  for screenshots. Full-page screenshots show blank gaps where `SectionReveal` scroll animations
  haven't fired -- screenshot each section after `scrollIntoView` instead.
- The `ui-ux-pro-max` and `content-strategy` skills live in `.agents/skills/`; brand colours and Inter
  override any palette/font the design skill suggests.

## Pending / open questions

- **Fictional staff on the live site** (confirmed not real 2026-09-25): Marcus Chen, Priya Patel, Daniel
  Okafor -- DB rows (deactivate in `/admin`), `SEED_PHARMACISTS` in `app/admin/lib/types.ts`,
  `prisma/seed.ts`, `/transfer` page ("Priya Patel reviews every transfer"), admin appointment mock data.
  Also check the homepage "Daniel O." entry (possibly a fabricated testimonial).
- Which single pharmacist is the public face, and is Dr. Rutu Patel's photo (`anika.jpg`) really her?
- Pharmacist profile page (`/team/[slug]`), owner note, community section, and BC-structured privacy
  policy are planned but not built; they need real content from the pharmacist.

- Homepage `TrustMetricsBar` "Zero Wait" card promises "zero clinic wait" -- outcome claim the brand file
  discourages; not yet changed.
- Footer live open/closed status ignores statutory holidays.
