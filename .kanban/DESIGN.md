# iHealth Pharmacy Website — Design Specification

## Reference
`https://pharmacy-wcopilot.webflow.io/` — modern pharmacy Webflow template with a clean, friendly, high-contrast healthcare aesthetic.

## Goal
Apply the reference&apos;s layout and visual rhythm to the iHealth Pharmacy site while keeping our existing brand: Inter font, brand red `#C01D16`, neutral surface `#f6f7f9`, professional but warm tone. Do not introduce new colors outside the iHealth palette and the reference&apos;s functional accents (yellow stars, blue/purple/yellow/red pill accents already exist in our 3D work).

## Color palette (unchanged)
- Background: `#ffffff`
- Surface/alternating sections: `#f6f7f9`
- Foreground: `#1f2328`
- Muted: `#5a6270`
- Border: `#d8dce2`
- Brand red: `#C01D16`
- Brand red hover: `#9e1912`
- Brand subtle: `#fff0ef` (very light red)
- Accent stars: `#f59e0b` (amber)
- 3D pill accents: blue `#60a5fa`, purple `#818cf8`, yellow `#facc15`, red `#f87171`

## Typography
- Font: Inter (already loaded in layout)
- Hero H1: `text-5xl md:text-6xl lg:text-7xl`, `font-bold`, `tracking-tight`, `leading-[1.05]`
- Section H2: `text-3xl md:text-4xl`, `font-bold`, `tracking-tight`
- Body: `text-base md:text-lg`, `text-[var(--muted)]`
- Labels/tags: `text-sm`, `font-semibold`
- Cards: `text-lg font-semibold` titles

## Hero (new layout matching reference)
- Full-width white background, large top padding (`pt-24 pb-16`)
- Left column: bold headline, short subheadline, CTA row, trust mini-card
- Right column: floating 3D pills scene (replaces the single 3D pharmacy capsule)
- Happy Customer card floating near bottom-left of hero: white rounded card with star rating, number, and 5 overlapping avatars
- Reference headline style: stacked bold lines, friendly but confident

### Hero copy
- Tagline pill: "Your health, simplified"
- H1: "Care that knows your name, today and tomorrow."
- Subhead: "Personalized pharmacy care for every member of your family — prescriptions, reminders, and trusted advice."
- Primary CTA: "Request Refill" (red)
- Secondary CTA: "Transfer to iHealth" (outline)
- Trust mini-card: "Happy Customer — 4.9 ★" + 5 overlapping avatars + short quote

## Happy Customer card component
- White card, rounded-2xl, shadow-lg, subtle border
- Top row: 5 overlapping circular avatar placeholders (use initials or colored circles for now)
- Star rating row: 5 amber stars + "4.9" large + "out of 5" small
- Label: "Trusted by 300+ Abbotsford families"
- Optional short quote below

## Services section (numbered cards matching reference)
- Section tag: "All the services you will get"
- 5 numbered cards in a row on desktop, stacked on mobile
- Each card: large number top-left, title, short body, "Learn More →" link
- Cards sit on light surface background
- Use iHealth services:
  1. Easy Prescription Refills
  2. Transfer to iHealth
  3. Med & Refill Reminders
  4. Minor Ailment Clinic
  5. 24/7 Pharmacist Advice

## Stats / Why We Are Better section
- Two-column: image placeholder left (pharmacist/care scene), stats right
- Large stat numbers with labels:
  - 15+ Years Experience
  - 5k+ Happy Customers
  - 800+ Health Products
  - 50k+ Prescriptions Filled

## Trust / Featured section
- Logo row (optional placeholder text blocks or 3–4 generic partner badges)
- Keep it subtle — do not invent real company names

## Product / Featured Products section (optional)
- Skip unless client provides real products. Do not add e-commerce now.

## Testimonials slider
- Single testimonial in a card with large quote icon
- Avatar, name, location
- Navigation arrows
- Keep the existing three testimonials but style them like the reference card

## CTA banner (bottom)
- Light surface background, bold headline, subtext, red CTA
- "Make an order and get free delivery" → adapt to "Ready for easier prescriptions?"

## 3D elements
### FloatingPills3D (hero)
- Replace the single PharmacyIcon3D with a cluster of glossy 3D capsules/pills floating in space
- Match the uploaded screenshot: blue+white, purple+white, yellow+white, red+white capsules
- Add small floating rings/discs in matching colors as decorative elements
- Gentle parallax on mouse move, slow idle float/rotation
- Soft shadows, warm lighting

### CarouselDispenser3D (existing)
- Keep in the medication management section but improve materials to match the new glossy 3D style

## Components to update
- `app/variants/friendly/page.tsx` — full hero, stats, services, testimonials, CTA
- `app/variants/friendly/components/FloatingPills3D.tsx` — new
- `app/variants/friendly/components/HappyCustomerCard.tsx` — new
- `app/variants/friendly/components/Header.tsx` — keep, ensure no visual clashes
- `app/variants/friendly/components/Footer.tsx` — keep

## Interactions
- Use Motion.dev scroll reveals already in place
- Cards lift on hover (`hover:-translate-y-1 hover:shadow-lg`)
- Buttons: red solid + outline variants
- Links: red on hover
- 3D responds to pointer position

## Notes
- Do not change global CSS palette or fonts
- All 3D is code-only procedural Three.js (no downloaded meshes)
- Keep accessibility: alt text, reduced-motion, focus states
- No emojis; use Lucide icons and SVG
- Placeholder avatars use colored circles with initials until real photos are supplied
