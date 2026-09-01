# PM-01: Reconciliation & Frontend Build Ticket

## Decisions made by PM

| Conflict | Source A | Source B | PM Decision | Rationale |
|---|---|---|---|---|
| Color palette | CEO: keep red/green/cream | UI: white/neutral/red only | **Use UI spec** | Agency-grade sites don't compete with their own brand colors. Red becomes the only accent. |
| Hero headline | Content: "Care that knows your name" | UI: "Your pharmacist, right around the corner." | **Use content headline** | Directly expresses CEO's core promise of personal care. |
| Primary CTA | Content: "Request a Refill" | UI: "Refill a Prescription" | **Use "Request a Refill"** | Aligns with CEO decision #1 (hero should lead with the main customer path). |
| Secondary CTA | Content: "Transfer to iHealth" | UI: "Transfer my prescription →" | **Use "Transfer to iHealth"** | Clearer for patients not yet at iHealth. |
| Trust bar items | Content: 4 items incl. social proof | UI: 3 items | **Use 4 items** | "Trusted by 300+ Abbotsford Neighbours" satisfies CEO credibility signal #5. |
| Font | Cleanup used Atkinson/Quicksand | UI: Inter | **Use Inter** | Inter is the agency-grade standard for healthcare SaaS and professional services. |
| Hero visual | Logo placeholder | Real photo or illustration | **Use clean logo lockup for now** | No real photography available. Add a Phase 2 ticket for photo shoot or premium illustration. |
| Service cards | — | 3-column Lucide icons on soft circles | **Use UI spec** | Removes emoji blobs, keeps warmth via rounded corners. |

## Build scope (this ticket)

Rebuild `app/variants/friendly/page.tsx` and its components to match the professional UI spec + approved copy.

### Must change
1. **Global style reset for this variant**
   - Load Inter from Google Fonts
   - Reset section backgrounds to white / `#F6F7F9`
   - Remove all playful colors (mint `#d1fae5`, peach `#ffedd5`, purple `#5b21b6`, lavender `#ede9fe`)
2. **Header**
   - Sticky white nav, 1px bottom border `#D8DCE2`
   - Logo + wordmark left, links center, "Request a Refill" CTA right
   - Mobile: hamburger sheet
3. **Hero**
   - Eyebrow: "Independent Pharmacy in Abbotsford, BC"
   - H1: "Care that knows your name"
   - Sub: "Your neighbourhood pharmacy in Abbotsford, where questions are welcomed, refills are quick, and your pharmacist takes the time to listen."
   - Primary: "Request a Refill"
   - Secondary: "Transfer to iHealth →"
   - Trust bar: 4 items with Lucide icons
4. **Services**
   - 6 cards in 3-col grid
   - Lucide icon in soft gray circle, H3, one-line description
5. **How it works**
   - Numbered circles (1/2/3) instead of emoji
   - 3 steps with approved copy
6. **Transfer section**
   - Clean two-column: copy left, short form or CTA right
   - Remove running emoji
7. **About / Pharmacist**
   - Neutral background, professional layout
   - Use approved 3 bullets
8. **Testimonials**
   - Clean cards with 5-star SVG
   - Use approved names + neighbourhoods
9. **Visit / Contact**
   - Lucide icons for address, phone, email, hours, parking
   - Real Google Maps embed iframe (use a placeholder Google Maps embed URL for 123 Main Street, Abbotsford, BC)
10. **Footer**
    - 4-column footer with links, services, contact, legal
11. **Accessibility pass**
    - Focus-visible rings
    - Semantic HTML
    - prefers-reduced-motion
    - Form labels and error states

### Anti-patterns to kill
- All emojis
- Bouncy hover lifts / cartoon shadows
- Sticker badges
- Rainbow pastel backgrounds
- Logo-only hero (acceptable only as placeholder, documented)
- All-caps headings

## Files to edit
- `app/variants/friendly/page.tsx` (full rewrite of page structure + copy)
- `app/variants/friendly/components/Header.tsx`
- `app/variants/friendly/components/RefillForm.tsx`
- `app/variants/friendly/components/Icon.tsx` (replace/extend to use Lucide icons)
- `app/globals.css` (add Inter font variables if needed)

## Deliverables
- Working `npx next build` with no errors
- Route `/variants/friendly.html` generated in `out/`
- Professional, agency-grade visual result

## Status
ready-for-agent

## Acceptance criteria
- [ ] All emojis removed
- [ ] Color palette limited to white, `#F6F7F9`, `#1F2328`, `#5A6270`, `#D8DCE2`, `#C01D16`
- [ ] Inter font loaded and used
- [ ] Lucide icons used for all iconography
- [ ] Hero matches approved copy and CTA labels
- [ ] Google Maps embed present in contact section
- [ ] Refill form has labels, focus ring, and accessible error state
- [ ] Build passes and site republishes to GitHub Pages
- [ ] PM visual QA signs off before delivery
