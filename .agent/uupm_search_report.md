# UI/UX Pro Max design intelligence for iHealth Pharmacy

## design-system(pharmacy local health friendly)

```
## Design System: iHealth Pharmacy

### Pattern
- **Name:** Trust & Authority + Conversion
- **Conversion Focus:** Security badges. Case studies. Transparent pricing. Low-friction form. Provide pause/stop and stop the logo carousel on focus, hover, and reduced motion. Previous/next controls provide the keyboard equivalent; pause offscreen/hidden and render a static logo set under reduced motion.
- **CTA Placement:** Contact Sales / Get Quote (primary) + Nav
- **Color Strategy:** Navy/Grey corporate. Trust blue. Accent for CTA only.
- **Sections:** Hero (mission/credibility) > Proof (logos, certs, stats) > Solution overview > Clear CTA path

### Style
- **Name:** Flat Design
- **Mode Support:** Light supported | Dark supported
- **Keywords:** 2D, minimalist, bold colors, no shadows, clean lines, simple shapes, typography-focused, modern, icon-heavy
- **Best For:** Web apps, mobile apps, cross-platform, startup MVPs, user-friendly, SaaS, dashboards, corporate
- **Performance:** cost:low|drivers:none | **Accessibility:** risk:low|requires:contrast-text-4.5,keyboard,visible-focus,reduced-motion

### Colors
| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#15803D` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#22C55E` | `--color-secondary` |
| On Secondary | `#0F172A` | `--color-on-secondary` |
| Accent/CTA | `#0369A1` | `--color-accent` |
| On Accent/CTA | `#FFFFFF` | `--color-on-accent` |
| Background | `#F0FDF4` | `--color-background` |
| Foreground | `#14532D` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Card Foreground | `#14532D` | `--color-card-foreground` |
| Muted | `#E8F0F1` | `--color-muted` |
| Muted Foreground | `#475569` | `--color-muted-foreground` |
| Border | `#BBF7D0` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring | `#15803D` | `--color-ring` |

*Notes: Pharmacy green + trust blue*

### Typography
- **Heading:** Atkinson Hyperlegible
- **Body:** Atkinson Hyperlegible
- **Mood:** accessible, readable, inclusive, WCAG, dyslexia-friendly, clear
- **Best For:** Accessibility-critical sites, government, healthcare, inclusive design
- **Google Fonts:** https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');
```

### Key Effects
No gradients/shadows, simple hover (color/opacity shift), fast loading, clean transitions (150-200ms ease), minimal icons

### Avoid (Anti-patterns)
- Confusing layout
- Privacy concerns
- AI purple/pink gradients

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px


```

## ux(emoji icon accessibility pharm)

```
## UI Pro Max Search Results
**Domain:** ux | **Query:** emoji icon accessibility pharmacy
**Source:** ux-guidelines.csv | **Found:** 3 results

### Result 1
- **Category:** Accessibility
- **Issue:** Alt Text
- **Platform:** All
- **Description:** Images need text alternatives
- **Do:** Descriptive alt text for meaningful images
- **Don't:** Empty or missing alt attributes
- **Code Example Good:** alt='Dog playing in park'
- **Code Example Bad:** alt='' for content images
- **Severity:** High

### Result 2
- **Category:** Accessibility
- **Issue:** Error Messages
- **Platform:** All
- **Description:** Error messages must be announced
- **Do:** Use aria-live or role=alert for errors
- **Don't:** Visual-only error indication
- **Code Example Good:** role='alert'
- **Code Example Bad:** Red border only
- **Severity:** High

### Result 3
- **Category:** Accessibility
- **Issue:** Color Contrast
- **Platform:** All
- **Description:** Text must be readable against background
- **Do:** Minimum 4.5:1 ratio for normal text
- **Don't:** Low contrast text
- **Code Example Good:** #333 on white (7:1)
- **Code Example Bad:** #999 on white (2.8:1)
- **Severity:** High


```

## landing(friendly healthcare landing pa)

```
## UI Pro Max Search Results
**Domain:** landing | **Query:** friendly healthcare landing page trust credibility
**Source:** landing.csv | **Found:** 3 results

### Result 1
- **Pattern ID:** trust-authority-conversion
- **Pattern Name:** Trust & Authority + Conversion
- **Aliases:** Conversion + Trust|Conversion-Optimized + Trust|Data + Trust|Feature-Rich Showcase + Trust|Hero-Centric + Trust|Social Proof-Focused + Trust|Storytelling + Trust|Trust & Authority|Trust & Authority + Accessible|Trust & Authority + Conversion-Optimized|Trust & Authority + Feature|Trust & Authority + ...
- **Keywords:** trust & authority, trust, authority, conversion, credibility, enterprise, carousel accessibility, keyboard accessible carousel, pause auto rotation, reduced motion final state
- **Section Order:** Hero (mission/credibility) > Proof (logos, certs, stats) > Solution overview > Clear CTA path
- **Primary CTA Placement:** Contact Sales / Get Quote (primary) + Nav
- **Color Strategy:** Navy/Grey corporate. Trust blue. Accent for CTA only.
- **Conversion Optimization:** Security badges. Case studies. Transparent pricing. Low-friction form. Provide pause/stop and stop the logo carousel on focus, hover, and reduced motion. Previous/next controls provide the keyboard equivalent; pause offscreen/hidden and render a static logo set under reduced motion.

### Result 2
- **Pattern ID:** pricing-page-cta
- **Pattern Name:** Pricing Page + CTA
- **Aliases:** 
- **Keywords:** pricing, plans, tiers, comparison, cta
- **Section Order:** Hero (pricing headline) > Price comparison cards > Feature comparison table > FAQ section > Final CTA
- **Primary CTA Placement:** Each card: CTA button. Sticky CTA in nav
- **Color Strategy:** Free: Grey, Starter: Blue, Pro: Green/Gold, Enterprise: Dark. Cards: 1px border, shadow
- **Conversion Optimization:** Highlight the plan that matches the intended audience and show actual annual savings transparently. Use FAQs to address concerns.

### Result 3
- **Pattern ID:** event-conference-landing
- **Pattern Name:** Event/Conference Landing
- **Aliases:** 
- **Keywords:** event, conference, meetup, registration, schedule, hero-centric design, hero-centric, countdown accessibility, pause animation, reduced motion final state
- **Section Order:** Hero (date/location/countdown) > Speakers grid > Agenda/schedule > Sponsors > Register CTA
- **Primary CTA Placement:** Register CTA sticky + After speakers + Bottom
- **Color Strategy:** Urgency colors (countdown). Event branding. Speaker cards professional. Sponsor logos neutral.
- **Conversion Optimization:** Early bird pricing with deadline. Social proof (past attendees). Speaker credibility. Multi-ticket discounts. Expose the exact deadline as text; pause decorative countdown motion offscreen/hidden and show a static final state under reduced motion.


```

## color(green red pharmacy health colo)

```
## UI Pro Max Search Results
**Domain:** color | **Query:** green red pharmacy health color palette
**Source:** colors.csv | **Found:** 3 results

### Result 1
- **Product Type:** Pharmacy/Drug Store
- **Primary:** #15803D
- **On Primary:** #FFFFFF
- **Secondary:** #22C55E
- **On Secondary:** #0F172A
- **Accent:** #0369A1
- **On Accent:** #FFFFFF
- **Background:** #F0FDF4
- **Foreground:** #14532D
- **Card:** #FFFFFF
- **Card Foreground:** #14532D
- **Muted:** #E8F0F1
- **Muted Foreground:** #475569
- **Border:** #BBF7D0
- **Destructive:** #DC2626
- **On Destructive:** #FFFFFF
- **Ring:** #15803D
- **Notes:** Pharmacy green + trust blue

### Result 2
- **Product Type:** Patient Portal / Health Records
- **Primary:** #0284C7
- **On Primary:** #000000
- **Secondary:** #0891B2
- **On Secondary:** #000000
- **Accent:** #16A34A
- **On Accent:** #000000
- **Background:** #F0F9FF
- **Foreground:** #0C4A6E
- **Card:** #FFFFFF
- **Card Foreground:** #0C4A6E
- **Muted:** #E8F2F8
- **Muted Foreground:** #475569
- **Border:** #BAE6FD
- **Destructive:** #DC2626
- **On Destructive:** #FFFFFF
- **Ring:** #0284C7
- **Notes:** Clinical blue + health green + alert red

### Result 3
- **Product Type:** Healthcare App
- **Primary:** #0891B2
- **On Primary:** #000000
- **Secondary:** #22D3EE
- **On Secondary:** #0F172A
- **Accent:** #059669
- **On Accent:** #000000
- **Background:** #ECFEFF
- **Foreground:** #164E63
- **Card:** #FFFFFF
- **Card Foreground:** #164E63
- **Muted:** #E8F1F6
- **Muted Foreground:** #475569
- **Border:** #A5F3FC
- **Destructive:** #DC2626
- **On Destructive:** #FFFFFF
- **Ring:** #0891B2
- **Notes:** Calm cyan + health green


```

## typography(friendly approachable rounded )

```
## UI Pro Max Search Results
**Domain:** typography | **Query:** friendly approachable rounded sans pharmacy
**Source:** typography.csv | **Found:** 3 results

### Result 1
- **Font Pairing Name:** Soft Rounded
- **Category:** Sans + Sans
- **Heading Font:** Varela Round
- **Body Font:** Nunito Sans
- **Mood/Style Keywords:** soft, rounded, friendly, approachable, warm, gentle
- **Best For:** Children's products, pet apps, friendly brands, wellness, soft UI
- **Google Fonts URL:** https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Varela+Round&display=swap
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Varela+Round&display=swap');
- **Tailwind Config:** fontFamily: { heading: ['Varela Round', 'sans-serif'], body: ['Nunito Sans', 'sans-serif'] }
- **Notes:** Both rounded and friendly. Perfect for soft UI designs.

### Result 2
- **Font Pairing Name:** Friendly SaaS
- **Category:** Sans + Sans
- **Heading Font:** Plus Jakarta Sans
- **Body Font:** Plus Jakarta Sans
- **Mood/Style Keywords:** friendly, modern, saas, clean, approachable, professional
- **Best For:** SaaS products, web apps, dashboards, B2B, productivity tools
- **Google Fonts URL:** https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
- **Tailwind Config:** fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] }
- **Notes:** Single versatile font. Modern alternative to Inter.

### Result 3
- **Font Pairing Name:** Playful Creative
- **Category:** Display + Sans
- **Heading Font:** Fredoka
- **Body Font:** Nunito
- **Mood/Style Keywords:** playful, friendly, fun, creative, warm, approachable
- **Best For:** Children's apps, educational, gaming, creative tools, entertainment
- **Google Fonts URL:** https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
- **Tailwind Config:** fontFamily: { heading: ['Fredoka', 'sans-serif'], body: ['Nunito', 'sans-serif'] }
- **Notes:** Rounded, friendly fonts perfect for playful UIs.


```

## stack(nextjs static export images fo)

```
## UI Pro Max Stack Guidelines
**Stack:** nextjs | **Query:** nextjs static export images fonts
**Source:** stacks/nextjs.csv | **Found:** 3 results

### Result 1
- **Category:** Rendering
- **Guideline:** Choose correct rendering strategy
- **Description:** SSG for static SSR for dynamic ISR for semi-static
- **Do:** generateStaticParams for known paths
- **Don't:** SSR for static content
- **Code Good:** export const revalidate = 3600
- **Code Bad:** fetch without cache config
- **Severity:** Medium
- **Docs URL:** 
- **Applies To:** nextjs 16.2
- **Status:** active
- **Verified At:** 2026-08-13

### Result 2
- **Category:** Metadata
- **Guideline:** Use metadata API
- **Description:** Export metadata object for static metadata
- **Do:** export const metadata = {}
- **Don't:** Manual head tags
- **Code Good:** export const metadata = { title: 'Page' }
- **Code Bad:** <head><title>Page</title></head>
- **Severity:** Medium
- **Docs URL:** 
- **Applies To:** nextjs 16.2
- **Status:** active
- **Verified At:** 2026-08-13

### Result 3
- **Category:** Fonts
- **Guideline:** Use next/font for fonts
- **Description:** Self-hosted fonts with zero layout shift
- **Do:** next/font/google or next/font/local
- **Don't:** External font links
- **Code Good:** import { Inter } from 'next/font/google'
- **Code Bad:** <link href="fonts.googleapis.com"/>
- **Severity:** Medium
- **Docs URL:** https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- **Applies To:** nextjs 16.2
- **Status:** active
- **Verified At:** 2026-08-13


```

