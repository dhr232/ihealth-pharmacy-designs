import { NextRequest, NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/content";

// Public list of published posts for client components (homepage blog cards).
// Article bodies are omitted to keep the payload small.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const limitParam = Number(new URL(request.url).searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 50) : 50;
  const posts = (await getPublishedPosts()).slice(0, limit).map((p) => ({ ...p, content: "" }));
  return NextResponse.json(
    { success: true, posts },
    { headers: { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" } }
  );
}
