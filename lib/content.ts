// Server-side content layer for blog posts and announcements.
// The database (Neon Postgres) is the source of truth. The code files
// (data/blog-posts.ts, SEED_ANNOUNCEMENTS) are only used to seed an empty
// database and as a read fallback if the database is unreachable.
import type { BlogPost as DbBlogPost, Announcement as DbAnnouncement } from "@prisma/client";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import { MKT_01_POSTS, isPostPublished, type BlogPost } from "@/data/blog-posts";
import { SEED_ANNOUNCEMENTS, type AnnouncementItem, type AnnouncementIcon } from "@/app/admin/lib/types";

type DbPostWithCategory = DbBlogPost & { category: { name: string } };

const STATUSES = ["draft", "published", "scheduled"] as const;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

/* ---------------- Posts: mapping ---------------- */

export function dbToPost(row: DbPostWithCategory): BlogPost {
  const status = (STATUSES as readonly string[]).includes(row.status)
    ? (row.status as BlogPost["status"])
    : "draft";
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.contentHtml,
    author: row.authorName || "iHealth Pharmacy",
    publishedAt: (row.publishedAt ?? row.createdAt).toISOString().slice(0, 10),
    tags: row.tags,
    imageUrl: row.coverImageUrl || "",
    status,
    themeUsed: row.themeUsed || "",
    readTimeMinutes: row.readTimeMinutes,
    category: row.category.name,
    layoutVariant: row.layoutVariant === "editorial" ? "editorial" : "standard",
    keyTakeaways: row.keyTakeaways,
  };
}

async function categoryIdFor(name: string): Promise<string> {
  const clean = (name || "Health Tips").trim();
  const category = await prisma.blogCategory.upsert({
    where: { slug: slugify(clean) || "health-tips" },
    update: {},
    create: { slug: slugify(clean) || "health-tips", name: clean },
  });
  return category.id;
}

function postData(post: BlogPost) {
  const date = new Date(post.publishedAt);
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    contentHtml: post.content || "",
    authorName: post.author || null,
    tags: post.tags ?? [],
    keyTakeaways: post.keyTakeaways ?? [],
    layoutVariant: post.layoutVariant === "editorial" ? "editorial" : "standard",
    themeUsed: post.themeUsed || null,
    coverImageUrl: post.imageUrl || null,
    readTimeMinutes: Number.isFinite(post.readTimeMinutes) && post.readTimeMinutes > 0 ? Math.round(post.readTimeMinutes) : 5,
    publishedAt: isNaN(date.getTime()) ? null : date,
    status: (STATUSES as readonly string[]).includes(post.status) ? post.status : "draft",
  };
}

/* ---------------- Posts: public reads ---------------- */

/** All posts (any status). Falls back to the code file if the DB is empty/unreachable. */
async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await withPrismaFallback<DbPostWithCategory[]>(
    () => prisma.blogPost.findMany({ include: { category: true }, orderBy: { publishedAt: "desc" } }),
    () => [],
    4000
  );
  return rows.length > 0 ? rows.map(dbToPost) : MKT_01_POSTS;
}

/** Posts visible to the public right now, newest first. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .filter((p) => isPostPublished(p))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** A single post by slug, including drafts/scheduled (the page's guard decides visibility). */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

/* ---------------- Posts: admin writes ---------------- */

/** Imports the code-file articles once, when the table is empty. */
export async function seedPostsIfEmpty(): Promise<void> {
  if ((await prisma.blogPost.count()) > 0) return;
  for (const post of MKT_01_POSTS) {
    await prisma.blogPost.create({
      data: { ...postData(post), categoryId: await categoryIdFor(post.category) },
    });
  }
}

export async function listPostsForAdmin(): Promise<BlogPost[]> {
  await seedPostsIfEmpty();
  const rows = await prisma.blogPost.findMany({ include: { category: true }, orderBy: { publishedAt: "desc" } });
  return rows.map(dbToPost);
}

/**
 * Creates or updates a post. Matches on id first (existing DB rows), then on
 * slug (posts first created in the old browser-only admin, whose ids never
 * reached the database).
 */
export async function savePost(post: BlogPost): Promise<BlogPost> {
  const data = { ...postData(post), categoryId: await categoryIdFor(post.category) };
  const existing =
    (await prisma.blogPost.findUnique({ where: { id: post.id } })) ||
    (await prisma.blogPost.findUnique({ where: { slug: post.slug } }));
  const row = existing
    ? await prisma.blogPost.update({ where: { id: existing.id }, data, include: { category: true } })
    : await prisma.blogPost.create({ data, include: { category: true } });
  return dbToPost(row);
}

export async function deletePostById(id: string): Promise<void> {
  await prisma.blogPost.deleteMany({ where: { id } });
}

/* ---------------- Announcements ---------------- */

const ICONS: AnnouncementIcon[] = ["clock", "syringe", "truck", "alert", "megaphone", "heart"];

function dbToAnnouncement(row: DbAnnouncement): AnnouncementItem {
  return {
    id: row.id,
    text: row.text,
    icon: (ICONS as string[]).includes(row.icon) ? (row.icon as AnnouncementIcon) : "megaphone",
    enabled: row.enabled,
    urgent: row.urgent,
    link: row.link || undefined,
    displayOrder: row.displayOrder,
  };
}

function announcementData(item: AnnouncementItem) {
  return {
    text: item.text.trim(),
    icon: item.icon,
    enabled: item.enabled !== false,
    urgent: Boolean(item.urgent),
    link: item.link?.trim() || null,
    displayOrder: Number.isFinite(item.displayOrder) ? item.displayOrder : 0,
  };
}

/** Enabled announcements for the public ticker; falls back to the seed list. */
export async function getActiveAnnouncements(): Promise<AnnouncementItem[]> {
  const rows = await withPrismaFallback<DbAnnouncement[] | null>(
    () => prisma.announcement.findMany({ orderBy: { displayOrder: "asc" } }),
    () => null,
    3000
  );
  const list = rows && rows.length > 0 ? rows.map(dbToAnnouncement) : SEED_ANNOUNCEMENTS;
  return list.filter((a) => a.enabled !== false).sort((a, b) => a.displayOrder - b.displayOrder);
}

/** All announcements for the admin panel; imports the seed list once if the table is empty. */
export async function listAnnouncementsForAdmin(): Promise<AnnouncementItem[]> {
  if ((await prisma.announcement.count()) === 0) {
    await prisma.announcement.createMany({ data: SEED_ANNOUNCEMENTS.map(announcementData) });
  }
  const rows = await prisma.announcement.findMany({ orderBy: { displayOrder: "asc" } });
  return rows.map(dbToAnnouncement);
}

export async function saveAnnouncement(item: AnnouncementItem): Promise<AnnouncementItem> {
  const data = announcementData(item);
  const existing = await prisma.announcement.findUnique({ where: { id: item.id } });
  const row = existing
    ? await prisma.announcement.update({ where: { id: item.id }, data })
    : await prisma.announcement.create({ data });
  return dbToAnnouncement(row);
}

export async function deleteAnnouncementById(id: string): Promise<void> {
  await prisma.announcement.deleteMany({ where: { id } });
}

/** Persists a new order: ids listed first-to-last get displayOrder 1..n. */
export async function reorderAnnouncements(ids: string[]): Promise<AnnouncementItem[]> {
  await prisma.$transaction(
    ids.map((id, index) => prisma.announcement.updateMany({ where: { id }, data: { displayOrder: index + 1 } }))
  );
  return listAnnouncementsForAdmin();
}
