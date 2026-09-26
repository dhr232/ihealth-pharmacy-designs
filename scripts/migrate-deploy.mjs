// Applies pending Prisma migrations during the production build.
//
// Opt-in on purpose: runs only when RUN_MIGRATIONS=true (set in Hostinger hPanel).
// Local `npm run build` and CI builds skip it, so a laptop build can never
// change the production database by accident.
//
// If a migration fails, the build fails -- so new code never goes live
// against a database that is missing the columns it expects.
import { spawnSync } from "node:child_process";

if (process.env.RUN_MIGRATIONS !== "true") {
  console.log("[migrate-deploy] RUN_MIGRATIONS is not 'true' -- skipping database migrations.");
  process.exit(0);
}

if (!process.env.DATABASE_URL) {
  console.error("[migrate-deploy] RUN_MIGRATIONS=true but DATABASE_URL is not set.");
  process.exit(1);
}

console.log("[migrate-deploy] Applying pending Prisma migrations...");
const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
