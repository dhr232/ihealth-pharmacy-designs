// Server-side only: persistent storage for admin uploads (blog cover images,
// flyer PDFs/images) on the Hostinger server's disk.
//
// Hostinger rebuilds the app into a fresh folder on every deploy, so uploads must
// live OUTSIDE the app: set UPLOAD_DIR to an absolute path such as
//   /home/u491263438/domains/ihealthpharmacy.ca/uploads
// Files are served back through app/media/[...path]/route.ts at /media/<category>/<file>.
// Locally (no UPLOAD_DIR) files go to <project>/.uploads, which is gitignored.
import crypto from "crypto";
import path from "path";
import { promises as fs } from "fs";

export type UploadCategory = "blog" | "flyers";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

const EXT_FOR_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "application/pdf": ".pdf",
};

/** Absolute upload root, or null in production when UPLOAD_DIR is not configured. */
export function getUploadRoot(): string | null {
  if (process.env.UPLOAD_DIR) return path.resolve(process.env.UPLOAD_DIR);
  if (process.env.NODE_ENV !== "production") return path.join(process.cwd(), ".uploads");
  return null;
}

/** Saves a file under a unique name and returns its public URL (/media/...). */
export async function saveUpload(
  category: UploadCategory,
  body: Buffer,
  mimeType: string,
  originalName: string
): Promise<string> {
  const root = getUploadRoot();
  if (!root) throw new Error("UPLOAD_DIR is not configured.");

  const ext = EXT_FOR_MIME[mimeType] || ".bin";
  const base =
    originalName
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "upload";
  // Unique name: a replaced image gets a new URL, so no cache can show the old one.
  const filename = `${base}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;

  const dir = path.join(root, category);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), body);
  return `/media/${category}/${filename}`;
}

// ---------------------------------------------------------------------------
// Prescription photos: patient health information, so they are PRIVATE.
// Stored in <UPLOAD_DIR>/prescriptions (never served by /media -- resolveUpload
// only allows blog/flyers) and read back only through the staff-only route
// app/api/prescriptions/photo/[file]/route.ts, plus attached to the staff alert email.
// ---------------------------------------------------------------------------

const PRESCRIPTION_DIR = "prescriptions";
export const PRESCRIPTION_PHOTO_URL_PREFIX = "/api/prescriptions/photo/";

const PRESCRIPTION_PHOTO_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/heic": ".heic",
};
const PRESCRIPTION_PHOTO_FILENAME = /^[a-f0-9]{32}\.(jpg|png|webp|heic)$/;

/** Saves a prescription photo under an unguessable name; returns its staff-only URL. */
export async function savePrescriptionPhoto(body: Buffer, mimeType: string): Promise<string> {
  const root = getUploadRoot();
  if (!root) throw new Error("UPLOAD_DIR is not configured.");
  const ext = PRESCRIPTION_PHOTO_TYPES[mimeType];
  if (!ext) throw new Error(`Unsupported photo type: ${mimeType}`);

  const filename = `${crypto.randomBytes(16).toString("hex")}${ext}`;
  const dir = path.join(root, PRESCRIPTION_DIR);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), body);
  return `${PRESCRIPTION_PHOTO_URL_PREFIX}${filename}`;
}

/** Maps a stored photo filename (or its staff-only URL) to a file on disk, or null if invalid. */
export function resolvePrescriptionPhoto(
  fileOrUrl: string
): { filePath: string; filename: string; contentType: string } | null {
  const root = getUploadRoot();
  if (!root) return null;
  const filename = fileOrUrl.startsWith(PRESCRIPTION_PHOTO_URL_PREFIX)
    ? fileOrUrl.slice(PRESCRIPTION_PHOTO_URL_PREFIX.length)
    : fileOrUrl;
  if (!PRESCRIPTION_PHOTO_FILENAME.test(filename)) return null;

  const ext = path.extname(filename).toLowerCase();
  const contentType =
    Object.entries(PRESCRIPTION_PHOTO_TYPES).find(([, e]) => e === ext)?.[0] ?? "application/octet-stream";
  return { filePath: path.join(root, PRESCRIPTION_DIR, filename), filename, contentType };
}

// Photos are a temporary intake copy (the dispensing record lives in the pharmacy
// system), so they are deleted after 30 days to limit disk use and how long patient
// images sit on the server. Copies attached to the staff alert email are not affected.
export const PRESCRIPTION_PHOTO_RETENTION_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;
const SWEEP_INTERVAL_MS = 6 * 60 * 60 * 1000;
let lastSweepAt = 0;

/** Deletes prescription photos older than the retention period. Returns how many were removed. */
export async function deleteExpiredPrescriptionPhotos(
  maxAgeMs: number = PRESCRIPTION_PHOTO_RETENTION_DAYS * DAY_MS,
  now: number = Date.now()
): Promise<number> {
  const root = getUploadRoot();
  if (!root) return 0;
  const dir = path.join(root, PRESCRIPTION_DIR);

  let names: string[];
  try {
    names = await fs.readdir(dir);
  } catch {
    return 0; // folder not created yet
  }

  let removed = 0;
  for (const name of names) {
    if (!PRESCRIPTION_PHOTO_FILENAME.test(name)) continue; // only touch files we created
    const filePath = path.join(dir, name);
    try {
      const { mtimeMs } = await fs.stat(filePath);
      if (now - mtimeMs > maxAgeMs) {
        await fs.unlink(filePath);
        removed++;
      }
    } catch {
      // already gone or unreadable -- skip
    }
  }
  return removed;
}

/**
 * Runs the cleanup in the background, at most once every 6 hours per server process.
 * Called on each photo upload, so no cron job is needed on Hostinger.
 */
export function sweepExpiredPrescriptionPhotos(): void {
  const now = Date.now();
  if (now - lastSweepAt < SWEEP_INTERVAL_MS) return;
  lastSweepAt = now;
  deleteExpiredPrescriptionPhotos()
    .then((removed) => {
      if (removed > 0) console.log(`[Uploads] Deleted ${removed} prescription photo(s) older than ${PRESCRIPTION_PHOTO_RETENTION_DAYS} days.`);
    })
    .catch((err) => console.error("[Uploads] Prescription photo cleanup failed:", err));
}

/**
 * Resolves /media/<category>/<file> to a file on disk. Returns null for anything
 * outside the upload root, unknown categories, or unsupported file types.
 */
export function resolveUpload(segments: string[]): { filePath: string; contentType: string } | null {
  const root = getUploadRoot();
  if (!root || segments.length !== 2) return null;
  const [category, filename] = segments;
  if (category !== "blog" && category !== "flyers") return null;
  if (!/^[a-z0-9._-]+$/i.test(filename) || filename.startsWith(".")) return null;

  const contentType = CONTENT_TYPES[path.extname(filename).toLowerCase()];
  if (!contentType) return null;

  const filePath = path.resolve(root, category, filename);
  if (!filePath.startsWith(path.resolve(root) + path.sep)) return null;
  return { filePath, contentType };
}
