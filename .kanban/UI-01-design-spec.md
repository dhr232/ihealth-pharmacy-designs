# iHealth Pharmacy — Professional UI Design Specification

## Design stance
A clean, trustworthy neighbourhood pharmacy that feels like a modern healthcare service: calm, organized, human, and confident — not playful or trendy.

## Color system (exact hex tokens)

Core palette (6 colors):

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#FFFFFF` | Page background |
| Surface | `#F6F7F9` | Cards, sections, subtle bands |
| Text | `#1F2328` | Headings, body text |
| Muted text | `#5A6270` | Captions, labels, secondary copy |
| Border | `#D8DCE2` | Dividers, input borders, card outlines |
| Primary (brand red) | `#C01D16` | CTAs, focus emphasis, active links |

Supporting tokens:

| Token | Hex | Usage |
|-------|-----|-------|
| Success | `#157F3C` | Confirmation states |
| Error | `#B91C1C` | Form errors |
| Accent surface | `#FDF2F2` | Very light red tint behind highlighted brand moments |

Brand red `#C01D16` is used sparingly: primary buttons, link hover, key emphasis words, and small accent rules. It never fills large backgrounds, headings, or icon backgrounds. White space + muted text do the visual work; red only calls for action.

## Typography

- **Font family:** `Inter` (Google Fonts). Weights 400, 500, 600. No second display font.
- **Type scale:**

| Element | Size | Line height | Weight |
|---------|------|-------------|--------|
| Hero H1 | `48px` desktop, `36px` mobile | 1.15 | 600 |
| H2 | `32px` desktop, `26px` mobile | 1.25 | 600 |
| H3 | `22px` | 1.3 | 600 |
| Body | `16px` | 1.65 | 400 |
| Small | `14px` | 1.5 | 400 |
| Button | `15px` | 1 | 500 |

- Letter spacing: `0` for headings; `-0.01em` only on hero H1.
- Body paragraphs max width: `680px`.

## Layout rules

- Max content width: `1200px`, centered with `16px` gutters.
- Section vertical rhythm: `80px` desktop / `56px` mobile between major sections.
- Grid for services: desktop `3 columns`, tablet `2 columns`, mobile `1 column`, gap `24px`.
- Border radius policy: move from big rounded (`24px+`) to a refined system:
  - Cards: `12px`
  - Buttons: `8px`
  - Inputs: `8px`
  - Pills/badges: `999px` (only for small labels)
  - No giant rounded corners on large containers.

## Iconography

- Style: line icons, consistent `1.5px` stroke.
- Size: `24px` in body, `20px` inline with text.
- Source: **Lucide React** (`lucide-react`).
- No emojis anywhere. Replace every emoji on the current page with a Lucide icon.
- Icons sit inside `40px × 40px` soft circles on service cards using `#F6F7F9` background; never use colored emoji-style blobs.

## Component rules

### Buttons
- **Primary:** `#C01D16` background, white text, `8px` radius, `14px 24px` padding. Hover: darken to `#A31812`.
- **Secondary:** white background, `#1F2328` text, `1px #D8DCE2` border, `8px` radius. Hover: background `#F6F7F9`.
- **Ghost:** transparent, `#1F2328` text. Hover: background `#F6F7F9`.

### Cards
- Background white, `1px #D8DCE2` border, `12px` radius.
- Shadow: none by default; use `0 1px 3px rgba(31,35,40,0.05)` only on hover.
- Padding: `24px`.

### Form inputs
- Height `48px`, `1px #D8DCE2` border, `8px` radius, `14px` horizontal padding.
- Focus: `2px #C01D16` ring, border becomes `#C01D16`.
- Error state: border `#B91C1C`, error text `14px #B91C1C` below input.

### Navigation
- Sticky top, white background, `1px #D8DCE2` bottom border.
- Logo left, nav links center/right, primary CTA rightmost.
- Mobile: hamburger opens a full-height sheet with stacked links and a bottom CTA.
- Nav link hover: text color becomes `#C01D16`.

## Hero redesign

Remove: floating badges, emoji icons, logo-only visual, and playful copy.

New composition:
1. **Left column (55%):**
   - Small uppercase eyebrow text (`12px`, `500`, `#5A6270`, `0.08em` spacing): “Independent Pharmacy in Abbotsford, BC”
   - H1: “Your pharmacist, right around the corner.”
   - Subheadline (`18px`, muted): “Same-day local delivery, easy prescription transfers, and one-on-one medication care.”
   - Primary CTA button: “Refill a Prescription”
   - Secondary link: “Transfer my prescription →”
   - Trust bar below: line icons + short labels — “Licensed BC Pharmacists”, “Free Local Delivery”, “Same-Day Transfers”
2. **Right column (45%):**
   - Professional hero image: warm photo of a pharmacist consulting with a patient at the counter. If no real photo exists, use a clean two-tone illustration in muted neutrals with a single red accent. No stock-looking clip art or floating stickers.
3. Background: white with a very subtle `#F6F7F9` corner shape (no gradients, no bouncing shadows).

## Sections to refine / remove

| Section | Change |
|---------|--------|
| Floating hero badges | Remove entirely |
| Emoji icons in services | Replace with Lucide line icons |
| Services grid | Move to 3-column cards with icon, H3, and one-line description |
| “Refills in 3 easy steps” | Keep the 3-step flow, but use flat numbered circles (`1`, `2`, `3`) on `#F6F7F9` backgrounds instead of emoji |
| Pharmacy transfer section | Use a two-column layout with a short form or CTA; remove running-person emoji |
| Meet your pharmacist | Keep, but use a real or professional illustration; remove waving emoji |
| Testimonials | Keep layout; replace star ratings with a clean 5-star SVG icon; remove decorative sparkles |
| Contact section | Replace emoji bullets with Lucide icons; keep map placeholder |
| Footer | Add a proper footer with address, hours, phone, links, and legal text |

## Anti-patterns to avoid

1. **No emojis** anywhere on the site.
2. **No bouncing shadows** or animated floating elements.
3. **No sticker badges**, starbursts, or confetti-style callouts.
4. **No pastel rainbow palette**; only the approved 6-color core system.
5. **No logo-only hero visual**; use a real/illustrated scene with people.
6. **No all-caps headings** or exclamation-heavy marketing copy.

## Accessibility non-negotiables

- Minimum contrast ratio `4.5:1` for body text; `3:1` for large text and UI components. `#C01D16` on white passes `4.5:1`.
- Visible focus states on all interactive elements; use `2px #C01D16` outline with `2px` offset.
- `prefers-reduced-motion`: disable hover transforms and any scroll animations for users who opt out.
- Semantic HTML: one `h1` per page, logical heading order, `nav`, `main`, `section`, `footer`, `button` for actions, `a` for links.
- All icons in interactive controls have accessible labels.
- Form inputs have associated `label` elements and `aria-invalid` on errors.
