import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentStaffSession } from "@/lib/auth";
import { listPostsForAdmin, savePost, deletePostById } from "@/lib/content";
import type { BlogPost } from "@/data/blog-posts";

export const dynamic = "force-dynamic";

function refreshPublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/health-tips");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog/[slug]", "page");
}

export async function GET() {
  if (!(await getCurrentStaffSession())) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }
  try {
    return NextResponse.json({ success: true, posts: await listPostsForAdmin() });
  } catch (error) {
    console.error("[admin/posts] list failed:", error);
    return NextResponse.json({ success: false, error: "Could not load posts from the database." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await getCurrentStaffSession())) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as BlogPost;
    if (!body?.title?.trim() || !body?.slug?.trim()) {
      return NextResponse.json({ success: false, error: "Title and URL slug are required." }, { status: 400 });
    }
    if (typeof body.imageUrl === "string" && body.imageUrl.startsWith("data:")) {
      return NextResponse.json(
        { success: false, error: "Upload the cover image with the Upload button instead of pasting image data." },
        { status: 400 }
      );
    }
    const saved = await savePost(body);
    refreshPublicPages(saved.slug);
    return NextResponse.json({ success: true, post: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save post.";
    const friendly = message.includes("Unique constraint") ? "Another post already uses this URL slug." : message;
    return NextResponse.json({ success: false, error: friendly }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await getCurrentStaffSession())) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, error: "Post id is required." }, { status: 400 });
  }
  try {
    await deletePostById(id);
    refreshPublicPages();
    return NextResponse.json({ success: true, id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete post.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
