import { mkdtempSync, mkdirSync, writeFileSync, utimesSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { deleteExpiredPrescriptionPhotos } from "../lib/uploads";

// Prescription photos must be deleted after 30 days, and nothing else in the folder touched.
describe("prescription photo cleanup", () => {
  const root = mkdtempSync(join(tmpdir(), "rx-cleanup-"));
  const dir = join(root, "prescriptions");
  const DAY = 24 * 60 * 60 * 1000;
  const now = Date.now();

  const oldPhoto = join(dir, `${"a".repeat(32)}.jpg`);
  const freshPhoto = join(dir, `${"b".repeat(32)}.png`);
  const oldOtherFile = join(dir, "notes.txt");

  beforeAll(() => {
    process.env.UPLOAD_DIR = root;
    mkdirSync(dir, { recursive: true });
    for (const f of [oldPhoto, freshPhoto, oldOtherFile]) writeFileSync(f, "x");
    const old = new Date(now - 31 * DAY);
    utimesSync(oldPhoto, old, old);
    utimesSync(oldOtherFile, old, old);
    const fresh = new Date(now - 2 * DAY);
    utimesSync(freshPhoto, fresh, fresh);
  });

  afterAll(() => {
    delete process.env.UPLOAD_DIR;
    rmSync(root, { recursive: true, force: true });
  });

  it("deletes photos older than 30 days and keeps everything else", async () => {
    const removed = await deleteExpiredPrescriptionPhotos(undefined, now);
    expect(removed).toBe(1);
    expect(existsSync(oldPhoto)).toBe(false);
    expect(existsSync(freshPhoto)).toBe(true);
    expect(existsSync(oldOtherFile)).toBe(true);
  });
});
