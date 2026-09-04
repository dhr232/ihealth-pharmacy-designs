# Project Memory — iHealth Pharmacy Website

> Read this FIRST when resuming work on this project. Captures the state at the last
> working session so future agents don't have to rebuild context from scratch.

## Identity

- **Client**: iHealth Pharmacy, Abbotsford, BC, Canada
- **Brand**: red `#C01D16`, Inter font, white/light neutral palette, no emojis
- **Domain**: `ihealthpharmacy.ca` (transfer planned, not yet done)
- **Live (production)**: https://honeydew-coyote-883999.hostingersite.com/
- **GitHub**: https://github.com/dhr232/ihealth-pharmacy-designs (public)
- **Repo path**: `C:\Users\Dhruvil\pharmacy-website`

## Stack (frozen — don't change without explicit user request)

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Turbopack
- Static export: `output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`
  - **No `basePath`** — Hostinger serves at `/`, not `/ihealth-pharmacy-designs/`
  - If you set `basePath`, CSS/JS will 0-byte because URLs point to `/ihealth-pharmacy-designs/_next/...` which doesn't exist on Hostinger
- `motion/react` for animations (NOT `framer-motion`), EASE_OUT_EXPO = `[0.16, 1, 0.3, 1]`
- `lucide-react` for icons (NO emojis anywhere)
- `three` + `@react-three/fiber` for 3D — but most 3D replaced with reference PNGs

## Routes (14 total)

- `/` — Friendly variant homepage (was `/variants/friendly`, now promoted)
- `/about`, `/contact`, `/cookies`, `/health-tips`, `/privacy`, `/subscribe`, `/terms`
- `/services/[slug]` × 6: `minor-ailments`, `compounding`, `vaccinations`, `myhealthpack`, `med-review`, `delivery`
- `/admin` — PIN-protected (default `2026`), localStorage CRUD for pharmacists + blog posts

## Layout (root)

`app/layout.tsx` imports ThemeApplier + AnnouncementBar + CookieBanner. The
ThemeApplier reads `ihealth_admin_theme` + `ihealth_admin_font` from
localStorage and applies `[data-theme="..."]` to `<html>` + font class to `<body>`.
Inter + 9 other Google Fonts loaded at build time.

## Admin Panel (`/admin`)

PIN: `2026` (env var `NEXT_PUBLIC_ADMIN_PIN` to override). 24h session via
localStorage. Tabs: Pharmacists (4 seeded), Blog Posts (0 seeded; can import
from `public/blog/seed-posts.json`), Theme Selector (10 themes + 10 fonts),
Export JSON for both lists. Image upload via FileReader → base64 → localStorage
(500KB warning). Files: `app/admin/page.tsx` + `app/admin/components/*` +
`app/admin/lib/{storage,types}.ts`.

## Themes & Fonts (CSS variables)

10 themes: pharmacy-red (default), sage-care, ocean-calm, sunset-wellness,
forest-pharmacy, lavender-trust, citrus-vitality, slate-professional,
berry-warmth, midnight-modern. Defined in `app/globals.css` under
`[data-theme="..."]` selectors.

10 font pairings: inter-tight, editorial-serif, geometric-humanist,
medical-mono, friendly-sans, bold-display, clean-roboto, charcoal-grotesk,
warm-manrope, classic-plus-jakarta. Class `font-{name}` on `<body>`.

Note: legacy `--brand` CSS vars (red `#C01D16`) preserved as default so existing
components that hardcode `bg-[var(--brand)]` keep their look. To make themes
swap colors too, refactor components to use `var(--color-accent)`.

## Forms — Real Submission (Web3Forms)

`RefillForm` and `NewsletterForm` POST to `https://api.web3forms.com/submit` with
access key from `process.env.NEXT_PUBLIC_WEB3FORMS_KEY` (currently placeholder).
On failure, falls back to local success state so UX never blocks.
Honeypot `botcheck` field included.

## Deploy Flow (Hostinger via Git integration)

Hostinger `honeydew-coyote-883999.hostingersite.com` pulls `gh-pages` branch →
`public_html`. Build locally, push to `gh-pages`:

```bash
npx next build && \
rm -rf out/.git out/.nojekyll && \
touch out/.nojekyll && \
cd out && \
git init -b gh-pages 2>/dev/null && \
git add . && \
git commit -m "Deploy: <message>" && \
git push "https://x-access-token:$(gh auth token)@github.com/dhr232/ihealth-pharmacy-designs.git" HEAD:gh-pages --force
```

`gh-pages` is force-pushed from local (Bash); main branch never force-pushed.
GitHub Pages ALSO auto-deploys from `gh-pages` to
`dhr232.github.io/ihealth-pharmacy-designs/` — that's a noise workflow the user
opted to keep (skip disabling).

## CI

`.github/workflows/ci.yml` runs on push to `main`. Jobs:
- `build-and-test`: `npm ci` → `npm run lint` → `npx tsc --noEmit` → `npx next build` → smoke test served at port 8080
- `deploy-hostinger`: downloads `out/` artifact, force-pushes to `gh-pages`

**User requirement: lint must be 0 errors before any deploy.**
Last known clean state: `npm run lint` exits 0, 0 errors / 0 warnings.

## Lint House Rules (enforced by ESLint config + AGENTS.md)

- NO emojis anywhere
- NO `Math.random()` in render (impure-function warning)
- NO `setState()` directly inside `useEffect()` (cascading-render warning) — use lazy initializers or derived-state pattern instead
- NO `<img>` without `eslint-disable-next-line @next/next/no-img-element` (intentional for static-export compat)
- `scripts/**` is ignored by ESLint (standalone Node scripts use `require()`)
- `package.json` has `overrides: { picomatch: "^4.0.7" }` (resolves peer-dep conflict with eslint-config-next 16)

## Files Inventory (key paths)

- `app/layout.tsx` — Inter + 9 alternates + ThemeApplier/AnnouncementBar/CookieBanner
- `app/page.tsx` — Friendly homepage (~500 lines)
- `app/globals.css` — 10 themes + 10 fonts + Tailwind v4 @theme
- `app/admin/{page.tsx,components/*,lib/{storage,types}.ts}` — PIN login, editors, storage
- `app/components/*` — Header, Footer, RefillForm, NewsletterForm, MotionKit, CountUp, FloatingPills3D, HappyCustomerCard, LanguageSwitcher (10 BC langs), CookieBanner, AnnouncementBar, WhatsAppButton, ThemeApplier
- `public/` — ihealth-logo-main.jpeg, carousel-dispenser.png, pills-*.png, avatar1-4.webp, blog/seed-posts.json
- `data/blog-posts.ts` — 10 production posts (~25K words)
- `scripts/` — Playwright QA (qa-paths.js, qa-e2e.js, qa-final.js, check-styles.js)
- `.github/workflows/ci.yml` — lint + tsc + build + deploy-hostinger

## Pending User Input (blockers)

- **Web3Forms access key**: replace `YOUR_WEB3FORMS_KEY_HERE` env var
- **WhatsApp phone**: replace `16045550199` placeholder
- **Domain transfer**: `ihealthpharmacy.ca` to Hostinger (user said "later")

## What NOT To Do

- Don't re-add `basePath: "/ihealth-pharmacy-designs"` to next.config.ts (root cause of 0-byte CSS)
- Don't introduce a server runtime dependency (static export only)
- Don't deploy without `npm run lint` exiting 0
- Don't replace Inter or the brand red color
- Don't add emojis
- Don't touch AGENTS.md block (auto-managed by Next.js dev)
- Don't force-push `main` (only `gh-pages`)
- Don't use `<Image>` from `next/image` for static assets (causes basePath resolution issues — use plain `<img>` with `eslint-disable`)

## Recent Wins

basePath removed · lint 0/0 via lazy-init + derived-state pattern · Web3Forms with fallback · all 10 themes + 10 fonts live · admin PIN `2026` E2E verified.

## E2E Verification (end of Language Switcher session)

- Live: `https://honeydew-coyote-883999.hostingersite.com/` — full styled site
- All 14 routes return HTTP 200 from Hostinger
- Home page: 0 console errors, 0 failed requests, H1 present
- Theme switching: `data-theme=ocean-calm` + `font-editorial-serif` applied live
- Admin login: PIN `2026` → dashboard (Pharmacist Team 4 / Blog Posts 0)
- Announcement bar + cookie banner present; cookie Accept dismisses correctly
- LanguageSwitcher: widget loads, 10 BC langs selectable (linguistic E2E pending)

## Session Workflow Conventions (learned this session)

- **Deploy gate is BOTH** `npm run lint` AND `npx tsc --noEmit` — both must exit 0. CI runs both.
- **Multi-agent fan-out preferred** when 3+ independent tasks remain: spawn parallel task agents, then a single QA agent validates E2E after all complete. Don't serialize.
- **E2E validation is a separate phase** — one QA agent runs after task agents finish, never interleaved with build work.

## Recent Session Learnings — Language Switcher

`app/components/LanguageSwitcher.tsx` — 10 BC languages via Google Translate.

### How it works
- Script: `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`, injected once with `data-ihealth-gtranslate="1"` marker so route navigations don't re-inject.
- Hidden host `#google_translate_element` positioned offscreen (`left:-9999px`, `1×1`, `overflow:hidden`) so users never see Google's native banner.
- Language change writes `googtrans=/en/{code}` cookie + sets `.goog-te-combo` value + dispatches `change` event (belt-and-braces — cookie alone isn't always enough).
- `window.__iHealthGTEInitialized` flag prevents re-init across Next.js route navigations.
- SSR-safe: `active` state starts as `"en"` server-side; persisted value restored in post-mount `useEffect` AFTER the Google widget is ready, avoiding hydration mismatches.
- `LANGUAGES` (10 BC langs, ranked by speaker pop): `en`, `pa`, `zh-CN`, `zh-TW`, `hi`, `fr`, `tl`, `ko`, `fa`, `es`.
- Persistence: `localStorage["ihealth_lang"]`. Cookie: `googtrans=/en/{code}` (shape is `/source/target`; clear with `max-age=0` to revert to English).
- Banner / skiptranslate / tooltip chrome hidden via CSS rules in `app/globals.css`.

### Past fixes (already landed — don't reintroduce)
- **React #418 hydration error**: when state init read `localStorage` synchronously, server vs first-client renders diverged. Fixed by always starting `active="en"` and restoring in a post-mount `useEffect`.
- **"Maximum call stack size exceeded"**: a hidden fallback `<select>` mirroring the combo was driving itself in an infinite change-event loop. Fallback select removed entirely; we now drive `.goog-te-combo` only when present (one-shot).

### ⚠️ Active bugs in latest refactor (NOT yet fixed — blocks `npm run lint` deploy gate)
1. `setScriptReady(true)` called synchronously inside `useEffect` (lines ~90 and ~103). Violates project house rule "no `setState()` directly inside `useEffect()`" → cascading-render lint warning.
2. `applyGTranslate` referenced inside the mount `useEffect` (line ~107) BEFORE its `const` declaration (line ~125). Runtime works because the callback fires after commit, but ESLint flags `no-use-before-define` / hoisting. Source order matters here.
3. `scriptReady` state is assigned but never read anywhere — dead state. Delete it (and its two `setScriptReady` calls become no-ops, which collapses bug #1 too).
4. `applyGTranslate` `useCallback` flagged for immutability. Body is pure (no state/props refs) so empty `[]` deps is technically correct, but the lint rule still complains. Consider a plain `function` or restructure to silence it.

### Gotchas to remember
- HTTPS required for `translate.google.com` script — HTTP pages silently fail to load the widget.
- Google Translate applies asynchronously; UI shows a brief `Loader2` spinner via the `translating` state, cleared after a 1200ms `setTimeout` (we don't actually wait for completion).
- Hidden widget div is `aria-hidden="true"`; the switcher root wrapper has `className="notranslate" translate="no"` so the switcher UI itself is never translated.
- `useReducedMotion()` drives the menu animation; reduced-motion users get opacity fade only.
- Outside-click + Escape-to-close handled by a second `useEffect`, only attached while `open` is true.
- The `window.google.translate.TranslateElement.InlineLayout.SIMPLE` flag suppresses the top banner inside the widget itself (we still hide the banner via CSS as a belt-and-braces fallback).

### Deploy gate reminder
`npm run lint` must exit 0 before any deploy (CI enforces). The 4 bugs above block that gate. Suggested fix order: drop the dead `scriptReady` state (collapses bugs #1 + #3) → move `applyGTranslate` declaration above its consumer in the `useEffect`, OR hoist the body into a `useRef` callback → re-evaluate the `useCallback` on `applyGTranslate` (bug #4).
