import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getUploadRoot } from "@/lib/uploads";

export const dynamic = "force-dynamic";

// Deploy health check, called by the live smoke test (.github/workflows/smoke.yml).
// Reports pass or fail per item and NEVER returns a setting's value. The upload check writes and
// deletes a tiny temp file, so a missing or unwritable UPLOAD_DIR is caught right after a deploy.

type Check = { ok: boolean; note?: string };

async function checkUploads(): Promise<Check> {
  const root = getUploadRoot();
  if (!root) return { ok: false, note: "UPLOAD_DIR is not set" };
  const dir = path.join(root, "prescriptions");
  const probe = path.join(dir, `.health-${crypto.randomBytes(6).toString("hex")}`);
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(probe, "ok");
    await fs.rm(probe, { force: true });
    return { ok: true };
  } catch {
    return { ok: false, note: "upload folder is not writable" };
  }
}

async function checkDatabase(): Promise<Check> {
  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 4000)),
    ]);
    return { ok: true };
  } catch {
    return { ok: false, note: "database did not answer" };
  }
}

function checkEnv(name: string): Check {
  return process.env[name] ? { ok: true } : { ok: false, note: `${name} is not set` };
}

export async function GET() {
  const [uploads, database] = await Promise.all([checkUploads(), checkDatabase()]);

  // Required: the site cannot work properly without these
  const required: Record<string, Check> = {
    database,
    uploads,
    sessionSecret: checkEnv("SESSION_SECRET"),
    resendApiKey: checkEnv("RESEND_API_KEY"),
  };
  // Optional: reported, but does not fail the check
  const optional: Record<string, Check> = {
    resendAudience: checkEnv("RESEND_AUDIENCE_ID"),
  };

  const ok = Object.values(required).every((c) => c.ok);
  return NextResponse.json(
    { ok, required, optional },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}
