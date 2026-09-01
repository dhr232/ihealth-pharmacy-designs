# REV-01: Revised Design Direction — Pro-Health Reference

## Source reference
Pro-Health Pharmacy (pro-health.ca) — an independent pharmacy site with clear service CTAs at top, dropdown service menu, and direct patient actions.

## Modernization goal
Take the Pro-Health structure but make it feel like a 2026 professional agency site: cleaner spacing, refined typography, modern component system, no clutter, no 2010s pharmacy-template look.

## Service set to include (from Pro-Health)
1. **Online Prescriptions / Prescription Refills**
2. **Transfer to iHealth**
3. **Book a Minor Ailment Walk-in Appointment**
4. **Book a Med Review or Injection**
5. **Book a Virtual Doctor**
6. **Contact / Help**
7. **Vaccinations**
8. **MyHealthPack / Compliance Packaging** (blister packs + med sync)
9. **Download our App**
10. **Flu Shots**
11. **Prescription Delivery**

## Proposed page structure
1. **Header**
   - Logo left
   - Mega/dropdown nav: Services (all 11), About Us, Blog placeholder, Contact
   - Right CTA: "Request Refill"
2. **Hero**
   - Two-column: headline + sub + primary CTA on left; placeholder for pharmacy/team photo on right
   - Below hero: 6 quick-action cards: Fill Prescription, Transfer, Minor Ailment, Med Review/Injection, Virtual Doctor, Contact
3. **Services section**
   - 3-column grid of 11 service cards, each with Lucide icon, title, one-line description, subtle link
4. **App / Digital section**
   - Promote the "online refill portal" or app download placeholder
5. **Minor Ailments Walk-in Clinic**
   - Highlight this service ( pharmacist prescribing )
6. **Compliance Packaging / MyHealthPack**
   - Blister packs + auto-refill explanation
7. **Testimonials / Google Reviews**
   - 3 testimonial cards + placeholder for Google Reviews widget/embed
8. **Newsletter signup**
   - Simple name + email form placeholder
9. **Contact / Location**
   - Address, phone, hours, Google Maps embed
10. **Footer**
    - Links, services list, contact, legal

## Design updates for 2026 look
- Use Inter font
- Palette: white, `#F6F7F9`, `#1F2328`, `#5A6270`, `#D8DCE2`, brand red `#C01D16`
- Cards: 12px radius, 1px border, subtle hover shadow
- Buttons: 8px radius, primary red, secondary white/border
- Icons: Lucide React, 24px, line style
- Image placeholders: soft gray blocks with centered Lucide icon + label
- No emojis
- Subtle animations only, respects reduced motion
- Mobile-first responsive

## Motion
- Use `motion` from `motion/react` (motion.dev) for subtle entrance animations: fade + translateY on scroll reveal, staggered service cards, hero content reveal
- All motion must respect `prefers-reduced-motion`
- Keep animations under 300ms, ease-out

## Image placeholders
Use CSS placeholder blocks everywhere a real photo would go:
- Hero right column: large rounded placeholder with `image` icon
- Services: optional small icon-only cards
- About / pharmacist: placeholder with `users` icon
- Testimonials: avatar placeholders (initials or user icon)
- App section: phone/app placeholder

## Output
This revision replaces the previous UI-01 spec. Use this as the master structure for FE-01.
