# iHealth Pharmacy Website — Kanban Board

## Project goal
Transform the selected Friendly variant into a polished, professional agency-grade pharmacy website for iHealth Pharmacy (Abbotsford, BC), modeled after pro-health.ca but modernized for 2026.

## Rules
Move **one task** from **To Do** → **In Progress**, complete it, move to **Review**, get PM/QA sign-off, then move to **Done**. Repeat.

## Columns

### In Progress
- _empty_

### To Do
- [x] PM-01: Define professional design direction and acceptance criteria (PM agent)
- [x] CEO-01: Gather business priorities and client approval workflow from owner
- [x] UI-01: Redesign hero + trust section for professional credibility (UI engineer)
- [x] CC-01: Write final professional copy for all sections (content creator)
- [x] REV-01: Incorporate Pro-Health reference site services and 2026 modern structure
- [x] FE-01: Install dependencies (lucide-react, motion) and set up Inter font / base CSS tokens
- [x] FE-02: Build professional Header with Services mega-menu and sticky behavior
- [x] FE-03: Build Hero section with headline, CTAs, and image placeholder
- [x] FE-04: Build Quick Action cards row (6 patient actions)
- [x] FE-05: Build Services section with all 11 Pro-Health services in 3-col grid
- [x] FE-06: Build App / Direct Refill portal section with placeholder
- [x] FE-07: Build Minor Ailments Walk-in Clinic section
- [x] FE-08: Build MyHealthPack / Compliance Packaging section
- [x] FE-09: Build Testimonials + Google Reviews placeholder
- [x] FE-10: Build Newsletter signup form
- [x] FE-11: Build Contact / Location with Google Maps embed and Footer
- [x] FE-12: Add Motion.dev scroll reveal animations (respect reduced motion)
- [x] FE-13: Add accessibility pass — focus rings, labels, semantic HTML, contrast check
- [x] FE-14: Add responsive QA (mobile, tablet, desktop)
- [x] QA-01: Final build check and GitHub Pages republish
- [x] 3D-01: Add Three.js subtle hero background (floating organic shapes)
- [x] 3D-02: Add interactive 3D pharmacy icon (pill/capsule with mouse tilt)
- [x] 3D-03: Add 3D tilt hover effect to service cards
- [x] 3D-04: Build, verify, and republish live demo with 3D elements
- [x] CEO-02: Final client delivery summary and publish report

### Review
- _empty_

### Done
- [x] Select winning design variant from 5 options
- [x] Initial cleanup pass (SVG icons, accessibility, palette)
- [x] Publish live demo to GitHub Pages
- [x] FE-01 → FE-14 + QA-01: Complete professional 2026 redesign and republish
- [x] 3D-01 → 3D-04: Complete Three.js 3D features and republish
- [x] CEO-02: Final client delivery summary and publish report

## Current active task
None — board is clear.

## Done definition
- Code passes `npx next build` with exit code 0
- Visual passes agency-quality bar (no emojis, no toy-like colors, clean typography)
- Motion animations respect `prefers-reduced-motion`
- Client can view at https://dhr232.github.io/ihealth-pharmacy-designs/variants/friendly
- All tasks in Review approved by PM + CEO agent before Done

## Notes
- Real Hermes kanban board `ihealth-pharmacy-website` is active and tracking tasks.
- Image placeholders used everywhere real photography is pending.
- Live demo verified HTTP 200 after latest republish.
- Three.js added via @react-three/fiber.
