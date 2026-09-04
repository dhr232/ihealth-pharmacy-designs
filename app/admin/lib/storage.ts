// localStorage helpers for the iHealth admin panel.
// All reads are SSR-safe (no-ops on the server) and degrade gracefully when
// localStorage is unavailable (private mode, quota errors).

import type {
  AuthSession,
  BlogPost,
  FontPairingName,
  Pharmacist,
  ThemeName,
} from "./types";
import { SEED_PHARMACISTS } from "./types";
import { SEED_POSTS } from "./seed-posts";

const KEY_AUTH = "ihealth_admin_auth";
const KEY_PHARMACISTS = "ihealth_admin_pharmacists";
const KEY_POSTS = "ihealth_admin_posts";
const KEY_THEME = "ihealth_admin_theme";
const KEY_FONT = "ihealth_admin_font";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function hasStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!hasStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): boolean {
  if (!hasStorage()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function uuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback: timestamp + random — sufficient for admin panel entities
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/* ---------------- Auth ---------------- */

export function getAuth(): AuthSession | null {
  const data = readJSON<AuthSession | null>(KEY_AUTH, null);
  if (!data || data.auth !== true) return null;
  if (Date.now() - data.ts > ONE_DAY_MS) {
    clearAuth();
    return null;
  }
  return data;
}

export function setAuth(): void {
  const session: AuthSession = { auth: true, ts: Date.now() };
  writeJSON(KEY_AUTH, session);
}

export function clearAuth(): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem(KEY_AUTH);
  } catch {
    /* ignore */
  }
}

/* ---------------- Pharmacists ---------------- */

export function getPharmacists(): Pharmacist[] {
  const stored = readJSON<Pharmacist[] | null>(KEY_PHARMACISTS, null);
  if (stored === null) {
    // First-run: seed and persist
    writeJSON(KEY_PHARMACISTS, SEED_PHARMACISTS);
    return [...SEED_PHARMACISTS];
  }
  return Array.isArray(stored) ? stored : [];
}

export function savePharmacists(list: Pharmacist[]): void {
  writeJSON(KEY_PHARMACISTS, list);
}

export function upsertPharmacist(item: Pharmacist): Pharmacist[] {
  const list = getPharmacists();
  const idx = list.findIndex((p) => p.id === item.id);
  if (idx >= 0) list[idx] = item;
  else list.push(item);
  savePharmacists(list);
  return list;
}

export function deletePharmacist(id: string): Pharmacist[] {
  const list = getPharmacists().filter((p) => p.id !== id);
  savePharmacists(list);
  return list;
}

export function reorderPharmacist(id: string, direction: "up" | "down"): Pharmacist[] {
  const list = [...getPharmacists()].sort((a, b) => a.displayOrder - b.displayOrder);
  const idx = list.findIndex((p) => p.id === id);
  if (idx < 0) return list;
  const swap = direction === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= list.length) return list;
  const tmp = list[idx].displayOrder;
  list[idx].displayOrder = list[swap].displayOrder;
  list[swap].displayOrder = tmp;
  savePharmacists(list);
  return list;
}

/* ---------------- Blog Posts ---------------- */

// Valid theme names used to coerce legacy/unknown values from the seed JSON.
const VALID_THEMES: ReadonlySet<ThemeName> = new Set<ThemeName>([
  "pharmacy-red",
  "sage-care",
  "ocean-calm",
  "sunset-wellness",
  "forest-pharmacy",
  "lavender-trust",
  "citrus-vitality",
  "slate-professional",
  "berry-warmth",
  "midnight-modern",
]);

// Normalise a raw seed-post object coming from JSON into a strict BlogPost.
// The seed JSON uses "default" as a theme placeholder and may be older than
// the current schema; this keeps getPosts() resilient without throwing.
function normaliseSeedPost(raw: Partial<BlogPost> & { id?: string }): BlogPost {
  const status: BlogPost["status"] = raw.status === "draft" ? "draft" : "published";
  const theme: ThemeName = VALID_THEMES.has(raw.themeUsed as ThemeName)
    ? (raw.themeUsed as ThemeName)
    : "pharmacy-red";
  return {
    id: typeof raw.id === "string" && raw.id.length > 0 ? raw.id : uuid(),
    title: raw.title ?? "",
    slug: raw.slug ?? "",
    excerpt: raw.excerpt ?? "",
    content: raw.content ?? "",
    author: raw.author ?? "",
    publishedAt: raw.publishedAt ?? new Date().toISOString().slice(0, 10),
    tags: Array.isArray(raw.tags) ? raw.tags.filter((t): t is string => typeof t === "string") : [],
    imageUrl: raw.imageUrl ?? "",
    status,
    themeUsed: theme,
    readTimeMinutes: typeof raw.readTimeMinutes === "number" ? raw.readTimeMinutes : 5,
    category: raw.category ?? "General",
  };
}

export function getPosts(): BlogPost[] {
  const stored = readJSON<BlogPost[] | null>(KEY_POSTS, null);
  if (stored === null) {
    // First-run: seed from the bundled SEED_POSTS (mirrors /public/blog/seed-posts.json)
    // so the admin panel renders the 10 canonical posts immediately. Persist
    // to localStorage so subsequent edits/deletions take over and the seed
    // does not re-run.
    writeJSON(KEY_POSTS, SEED_POSTS);
    return [...SEED_POSTS];
  }
  return Array.isArray(stored) ? stored : [];
}

/**
 * Async refresh of the post list from the static JSON at /blog/seed-posts.json.
 * Only acts when localStorage is empty (first run); afterwards localStorage is
 * the source of truth and edits persist across reloads. Returns the resulting
 * post list (seeded fresh or the existing localStorage list). Returns [] if
 * the fetch fails AND no localStorage value exists.
 */
export async function seedPostsFromRemote(): Promise<BlogPost[]> {
  const stored = readJSON<BlogPost[] | null>(KEY_POSTS, null);
  if (stored !== null) {
    return Array.isArray(stored) ? stored : [];
  }
  if (typeof fetch === "undefined") {
    // No fetch available (SSR or sandbox) — fall back to bundled seed.
    writeJSON(KEY_POSTS, SEED_POSTS);
    return [...SEED_POSTS];
  }
  try {
    const res = await fetch("/blog/seed-posts.json", { cache: "no-store" });
    if (!res.ok) {
      writeJSON(KEY_POSTS, SEED_POSTS);
      return [...SEED_POSTS];
    }
    const raw = (await res.json()) as unknown;
    if (!Array.isArray(raw)) {
      writeJSON(KEY_POSTS, SEED_POSTS);
      return [...SEED_POSTS];
    }
    const normalised = raw
      .map((entry) => normaliseSeedPost((entry ?? {}) as Partial<BlogPost>))
      .filter((p): p is BlogPost => typeof p.id === "string" && p.id.length > 0);
    if (normalised.length === 0) {
      writeJSON(KEY_POSTS, SEED_POSTS);
      return [...SEED_POSTS];
    }
    writeJSON(KEY_POSTS, normalised);
    return normalised;
  } catch {
    // Offline / file missing — keep the bundled seed rather than failing open.
    writeJSON(KEY_POSTS, SEED_POSTS);
    return [...SEED_POSTS];
  }
}

export function savePosts(list: BlogPost[]): void {
  writeJSON(KEY_POSTS, list);
}

export function upsertPost(item: BlogPost): BlogPost[] {
  const list = getPosts();
  const idx = list.findIndex((p) => p.id === item.id);
  if (idx >= 0) list[idx] = item;
  else list.push(item);
  savePosts(list);
  return list;
}

export function deletePost(id: string): BlogPost[] {
  const list = getPosts().filter((p) => p.id !== id);
  savePosts(list);
  return list;
}

/* ---------------- Theme & Font ---------------- */

export function getTheme(): ThemeName {
  return readJSON<ThemeName>(KEY_THEME, "pharmacy-red");
}

export function setTheme(value: ThemeName): void {
  writeJSON(KEY_THEME, value);
}

export function getFont(): FontPairingName {
  return readJSON<FontPairingName>(KEY_FONT, "inter-tight");
}

export function setFont(value: FontPairingName): void {
  writeJSON(KEY_FONT, value);
}

/* ---------------- Export ---------------- */

export function exportJSON(filename: string, data: unknown): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Defer revoke so Safari/Firefox have a moment to start the download
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const STORAGE_KEYS = {
  auth: KEY_AUTH,
  pharmacists: KEY_PHARMACISTS,
  posts: KEY_POSTS,
  theme: KEY_THEME,
  font: KEY_FONT,
} as const;