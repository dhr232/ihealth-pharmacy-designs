<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rule: time zone (not part of the Next.js block above)

The production server runs in UTC but the pharmacy is in America/Vancouver (Pacific). Never decide "today", "now", "open", "past" or "bookable" from the server's own clock. Use `getPacificNow()` / `getOpenStatus()` in `data/pharmacy-info.ts` or `Intl.DateTimeFormat` with `timeZone: "America/Vancouver"`, and test time-dependent code with `TZ=UTC`. Full rule: CLAUDE.md, "Time Zone".
