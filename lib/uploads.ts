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
