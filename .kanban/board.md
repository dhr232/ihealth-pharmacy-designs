# iHealth Pharmacy Website — Kanban Board

## Project goal
Transform the selected Friendly variant into a polished, professional agency-grade pharmacy website for iHealth Pharmacy (Abbotsford, BC), modeled after pro-health.ca but modernized for 2026.

## Rules
Move **one task** from **To Do** → **In Progress**, complete it, move to **Review**, get PM/QA sign-off, then move to **Done**. Repeat.

## Columns

### In Progress
- [ ] **FE-02: Build professional Header with Services mega-menu and sticky behavior**

### To Do
- [x] PM-01: Define professional design direction and acceptance criteria (PM agent)
- [x] CEO-01: Gather business priorities and client approval workflow from owner
- [x] UI-01: Redesign hero + trust section for professional credibility (UI engineer)
- [x] CC-01: Write final professional copy for all sections (content creator)
- [x] REV-01: Incorporate Pro-Health reference site services and 2026 modern structure
- [x] FE-01: Install dependencies (lucide-react, motion) and set up Inter font / base CSS tokens
- [ ] FE-03: Build Hero section with headline, CTAs, and image placeholder
- [ ] FE-04: Build Quick Action cards row (6 patient actions)
- [ ] FE-05: Build Services section with all 11 Pro-Health services in 3-col grid
- [ ] FE-06: Build App / Direct Refill portal section with placeholder
- [ ] FE-07: Build Minor Ailments Walk-in Clinic section
- [ ] FE-08: Build MyHealthPack / Compliance Packaging section
- [ ] FE-09: Build Testimonials + Google Reviews placeholder
- [ ] FE-10: Build Newsletter signup form
- [ ] FE-11: Build Contact / Location with Google Maps embed and Footer
- [ ] FE-12: Add Motion.dev scroll reveal animations (respect reduced motion)
- [ ] FE-13: Add accessibility pass — focus rings, labels, semantic HTML, contrast check
- [ ] FE-14: Add responsive QA (mobile, tablet, desktop)
- [ ] QA-01: Final build check and GitHub Pages republish
- [ ] CEO-02: Final client delivery summary and publish report

### Review
- [x] **FE-01: Install dependencies (lucide-react, motion) and set up Inter font / base CSS tokens**

### Done
- [x] Select winning design variant from 5 options
- [x] Initial cleanup pass (SVG icons, accessibility, palette)
- [x] Publish live demo to GitHub Pages
- [x] FE-01: Install dependencies (lucide-react, motion) and set up Inter font / base CSS tokens

## Current active task
FE-02 — Header.

## Done definition
- Code passes `npx next build` with exit code 0
- Visual passes agency-quality bar (no emojis, no toy-like colors, clean typography)
- Motion animations respect `prefers-reduced-motion`
- Client can view at https://dhr232.github.io/ihealth-pharmacy-designs/variants/friendly
- All tasks in Review approved by PM + CEO agent before Done

## Notes
- Add more tasks under To Do as needed.
- Each task owner: PM / UI / FE / CC / CEO / QA.
- Image placeholders used everywhere real photography is pending.
