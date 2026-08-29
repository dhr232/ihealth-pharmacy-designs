## Variant: Premium dark concierge

### Design stance
An upscale, concierge-level neighborhood pharmacy — closer in temperament to a boutique wellness clinic or private members' practice than a drugstore. Sleek and quietly luxurious on a rich dark charcoal base (`#0e0e10`), with warm off-white text (`#ece9e4`), a single muted gold accent (`#c9a35f`), hairline gold dividers, and cinematic vertical spacing. Calm authority: the design doesn't shout "trust us," it assumes you already do.

### Key choices
- **Palette:** near-black charcoal base, warm off-white body text at 16px minimum (hard legibility rule), one gold accent used sparingly for labels, dividers, and interactive states — never for large fills.
- **Typography:** Cormorant Garamond (light weight, large sizes) as the serif display voice via Google Fonts `<link>` tags in JSX; system sans stack for body. Small-caps labels with wide 0.3–0.4em letter-spacing in gold.
- **Hero:** editorial split layout with a subtle radial gold glow behind an inline-SVG apothecary-bottle stand-in framed in a hairline double border (no external images anywhere).
- **Structure:** fixed translucent header (phone + Refill RX CTA, mobile hamburger), hero, trust strip (Licensed in Texas · 4.9★ · 12 yrs · Same-day), hairline-grid services section (four quiet rooms of care), numbered 3-step refill, full-bleed transfer band, pharmacist profile with SVG portrait stand-in, testimonial trio, visit/hours/contact columns, footer.
- **Interactions:** concierge consult modal (hero CTA → client component, backdrop blur, name/phone/note form with graceful success state) and a mobile menu. Hover states everywhere: gold text on service cards, growing hairline rules, border-color shifts on testimonials.
- **Copy:** realistic, persuasive, specific — real address corner, phone numbers, "average transfer time: 2 working hours," pharmacist origin story. No lorem ipsum, no emoji in the UI.

### Trade-offs
- Dark theme with display serif favors aesthetic over familiarity; some older patients in the 35–70 audience may find dark pages less expected for healthcare (mitigated by high contrast, 16px+ body text, and generous spacing).
- Cormorant Garamond loads via Google Fonts `<link>` rather than `next/font` (layout.tsx is off-limits), so there's a brief font swap on first paint.
- Only one interactive form (the consult modal); refill/transfer CTAs are phone-call links by design — the concierge stance deliberately routes to human contact rather than self-service tooling.
- SVG stand-ins for imagery (apothecary bottle, pharmacist portrait) are elegant but abstract; a real production version would swap in photography.

### Best for
An independent pharmacy positioning itself as a premium, relationship-first practice — compounding-heavy, delivery-forward, competing on service rather than price. Suits affluent neighborhoods, med-sync programs for patients on complex regimens, and any brand where "your pharmacist knows your name" is the actual product.
