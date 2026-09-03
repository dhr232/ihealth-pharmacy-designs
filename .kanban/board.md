# Kanban Board — iHealth Pharmacy Website

## Today (Sprint: Production Launch)
- [x] **FE-15** Rolling top announcement bar (Flu shots, delivery, hours, vaccines)
- [x] **FE-16** Cookie consent banner with granular controls (necessary/analytics/marketing)
- [x] **FE-17** About page (`/about`)
- [x] **FE-18** Contact page with map + Web3Forms integration
- [x] **FE-19** Health Tips / Blog index (`/health-tips`)
- [x] **FE-20** Privacy + Terms + Cookies pages
- [x] **FE-21** Refill form → Web3Forms (env: `NEXT_PUBLIC_WEB3FORMS_KEY`)
- [x] **FE-22** Newsletter form → Web3Forms
- [x] **FE-23** WhatsApp floating button (placeholder until number provided)
- [ ] **QA-02** E2E test all new pages + cookie banner + announcement bar
- [ ] **ADMIN-01** Admin panel (PIN login, Pharmacist CRUD, Blog CRUD)
- [ ] **ADMIN-02** 10 theme presets + 10 font pairings for admin
- [ ] **ADMIN-03** Image upload in blog post editor
- [ ] **MKT-01** 10 blog posts via marketing agent

## Tomorrow (Pending Decisions)
- [ ] **FE-24** Wire real Web3Forms access key (need user)
- [ ] **FE-25** Wire real WhatsApp number (need user)
- [ ] **DOM-01** Point ihealthpharmacy.ca to Hostinger (DNS decision)
- [ ] **HOST-01** ✅ DONE — Hostinger deployed via Git integration

## Backlog
- WhatsApp live-chat integration (own Kanban board — see `ihealth-messaging`)
- Service area map with delivery zones
- Multilingual support (EN + Punjabi for Abbotsford)
- Online booking for medication reviews

## Kanban Boards
- `ihealth-pharmacy-website` — main build (this)
- `ihealth-messaging` — WhatsApp / live chat integration (TBD)
- `ihealth-admin` — admin panel for content management (NEW 2026-09-01)

## Hostinger Deploy Notes
- hPanel URL: https://hpanel.hostinger.com/websites (user shared 2026-09-01)
- Need from user: hPanel login (or FTP password) to upload `out/` to public_html/
- Domain: TBD (ihealthpharmacy.ca vs hstgr.cloud subdomain)
- Once deployed: verify with `curl -s -o /dev/null -w "%{http_code}" https://<domain>/`

## Form Submission Plan (added 2026-09-01)
**Decision: Web3Forms**

Rationale:
- Static export (`output: "export"`) means no Next.js Server Actions available.
- Web3Forms: 250 free submissions/mo, no signup friction, single access-key env var.
- Formspree as fallback (50/mo free, requires form ID setup).

Implementation:
1. User signs up at https://web3forms.com and copies access key.
2. Key goes in `NEXT_PUBLIC_WEB3FORMS_KEY` (GitHub Actions secret).
3. Forms POST to `https://api.web3forms.com/submit` directly from the browser.
4. Honeypot field `botcheck` for spam filtering.
5. Success: redirect to `/thanks` page or show inline success state.
6. All forms share a `<Web3FormsForm>` wrapper component for consistency.

## Hostinger CI/CD Plan
**Per user decision 2026-09-01: GitHub Actions handles CI/testing only; Hostinger deployment is manual.**

- `.github/workflows/ci.yml` runs on every push and PR to `main`:
  - `npm ci`
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npx next build` (produces `out/`)
  - Verifies `out/index.html`, `out/.nojekyll`, `out/_next/static/`
  - Installs Playwright Chromium
  - Smoke test: serves `out/` and curls `/`, `/variants/friendly`, `/variants/friendly/services/minor-ailments`
- Required status check: `ci / build-and-test`
- Deployment to Hostinger stays manual (user will use Hostinger's Git integration or FTP).

## Out of Scope (this iteration)
- Booking system backend
- Patient portal / auth
- Stripe / payment processing