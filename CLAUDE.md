@AGENTS.md

# iHealth Pharmacy Website — Context for Other Agents

## Project
Multi-page, agency-grade marketing website for **iHealth Pharmacy** (Abbotsford, BC, Canada). Owned by Dhruvil; client demo deployed via GitHub Pages. Live demo: https://dhr232.github.io/ihealth-pharmacy-designs/variants/friendly

## Stack
- **Next.js 15 (App Router)** + TypeScript + Tailwind CSS v4 + Turbopack
- Static export (`output: "export"`, `basePath: "/ihealth-pharmacy-designs"`, `images: { unoptimized: true }`)
- **Motion.dev** for reveals (`motion/react`) with `prefers-reduced-motion` safety
- **Three.js** (`@react-three/fiber`) for hero background / interactive pharmacy icon (most 3D replaced with reference PNG assets for visual fidelity)
- **lucide-react** icons (NO emojis anywhere)
- **Inter** font via `next/font/google`

## Brand Tokens (DO NOT change)
- Brand red: `#C01D16` (CSS var `--brand`); hover `#9e1912` (`--brand-hover`)
- Foreground `#1f2328`, muted `#5a6270`, surface `#f6f7f9`, border `#d8dce2`
- Body: Inter; headings: Inter (bold)
- Voice: professional, warm, healthcare-confident

## Repo Structure
```
app/
  layout.tsx               # root layout, Inter font, viewport metadata
  globals.css              # Tailwind v4 theme tokens
  page.tsx                 # design-chooser home
  variants/
    friendly/
      page.tsx             # MAIN page (≈500 lines, primary demo)
      services/[slug]/     # 6 service pages (static params)
      components/
        Header.tsx         # sticky, services dropdown, mobile drawer
        Footer.tsx         # shared footer
        RefillForm.tsx     # refill / transfer form
        NewsletterForm.tsx
        MotionKit.tsx      # BlurReveal / SectionReveal / Stagger / HoverCard / MagneticButton
        CountUp.tsx        # stats count-up
        Hero3DBackground.tsx     # disabled (returns null)
        PharmacyIcon3D.tsx       # unused
        TiltCard.tsx             # unused
        FloatingPills3D.tsx      # hero pill cluster (CSS image-based)
        HappyCustomerCard.tsx    # rating + avatar stack
public/
  ihealth-logo-main.jpeg   # header logo
  ihealth-logo.png         # alt logo
  pills-purple.png, pills-blue.png, pills-red.png, pills-yellow.png
  avatar1-5.webp
  carousel-dispenser.png
```

## Conventions
- All emojis banned. Use `lucide-react` icons.
- All motion components must gate on `useReducedMotion()`.
- Forms must use `Web3Forms` (env var `NEXT_PUBLIC_WEB3FORMS_KEY`); no server actions (static export).
- Cookie banner is a client component using `localStorage`.
- Top "rolling" announcement bar uses CSS `@keyframes marquee` with `prefers-reduced-motion` fallback to a static strip.

## Scripts
```
npm run lint       # ESLint
npm run build      # production build (also runs tsc)
npx tsc --noEmit   # type check only
node scripts/mobile-screenshot.js   # Playwright mobile audit (390x844)
node scripts/mobile-scroll.js        # Playwright scroll capture
node scripts/mobile-menu.js          # Playwright mobile menu + overflow check
node scripts/mobile-service.js       # Playwright service page check
```

## Deployment
- **Source repo**: `dhr232/ihealth-pharmacy-designs` (GitHub)
- **Live**: `gh-pages` branch, force-pushed from `out/` after each build
- **Publish command** (run from `C:/Users/Dhruvil/pharmacy-website`):
  ```bash
  npx next build && \
  rm -rf out/.git out/.nojekyll && \
  touch out/.nojekyll && \
  cd out && git init -b gh-pages && git add . && \
  git commit -m "<message>" && \
  git push "https://x-access-token:$(gh auth token)@github.com/dhr232/ihealth-pharmacy-designs.git" HEAD:gh-pages --force
  ```

## CI/CD
- GitHub Actions at `.github/workflows/ci.yml` runs lint + type-check + build + Playwright E2E on every push and PR.
- Deployment to Hostinger is **manual** via Hostinger's Git integration or FTP (not part of CI per user decision 2026-09-01).
- Required CI status check on `main`: `ci / build-and-test`.

## Do NOT
- Touch AGENTS.md block (auto-managed)
- Introduce emojis
- Replace Inter or brand red
- Add a server / runtime dependency (static export only)
- Force-push `main` (only `gh-pages` is force-pushed)

## Active User Requests (2026-09-01)
- [x] Add count-up effect to stats section (done)
- [x] Brand24-style motion (done — BlurReveal, expo-out easing)
- [x] Mobile-friendly audit (done — viewport meta added, count-up reduced to 1.5s)
- [x] Static carousel-dispenser image (done — no caption, full-width)
- [ ] Add About / Contact / Health Tips / Privacy / Terms / Cookies pages
- [ ] Cookie consent banner
- [ ] Rolling top menu (Flu shots / availability / alerts)
- [ ] WhatsApp floating button
- [ ] CI/CD workflow file
- [ ] Plan form submission (added to Kanban)

## Pending Questions for User
- Hostinger account: pending credentials for production deployment
- Web3Forms access key: pending (env var `NEXT_PUBLIC_WEB3FORMS_KEY`)
- WhatsApp number: pending