// Creates a new migration file from the difference between the live database
// and prisma/schema.prisma. Read-only against the database: it never applies
// anything. The migration is applied later by `prisma migrate deploy` on Hostinger.
//
// Usage: npm run db:migration -- add_pharmacist_profiles
//
// Why not `prisma migrate dev`? It needs a shadow database and can offer to RESET
// the database on drift. Our local .env points at production, so that is too risky.
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const name = (process.argv[2] || "").trim();
if (!/^[a-z0-9_]+$/.test(name)) {
  console.error("Usage: npm run db:migration -- <snake_case_name>");
  process.exit(1);
}

const run = (args) =>
  spawnSync("npx", ["prisma", ...args], {
    encoding: "utf8",
    shell: process.platform === "win32",
  });

// 1. Refuse if earlier migrations are not applied yet -- diffing against the live
//    database would otherwise duplicate their changes.
const status = run(["migrate", "status"]);
if (status.status !== 0) {
  console.error(status.stdout || status.stderr);
  console.error(
    "\n[new-migration] The database has unapplied migrations (or is not baselined).\n" +
      "Deploy the pending migrations first, then create the next one."
  );
  process.exit(1);
}

// 2. Diff live database -> schema file.
const diff = run([
  "migrate",
  "diff",
  "--from-schema-datasource",
  "prisma/schema.prisma",
  "--to-schema-datamodel",
  "prisma/schema.prisma",
  "--script",
]);
if (diff.status !== 0) {
  console.error(diff.stderr);
  process.exit(1);
}

const sql = diff.stdout.trim();
if (!sql || sql.includes("This is an empty migration")) {
  console.log("[new-migration] Schema matches the database -- nothing to migrate.");
  process.exit(0);
}

// 3. Write prisma/migrations/<timestamp>_<name>/migration.sql
const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
const dir = join("prisma", "migrations", `${stamp}_${name}`);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "migration.sql"), sql + "\n");

console.log(`[new-migration] Created ${dir}/migration.sql -- review it, then commit and push.`);
if (/DROP|ALTER COLUMN .* TYPE|NOT NULL(?! DEFAULT)/i.test(sql)) {
  console.warn(
    "[new-migration] WARNING: this migration drops or tightens something. Read it carefully before pushing."
  );
}
