import { NextResponse } from "next/server";
import { getActiveAnnouncements } from "@/lib/content";

// Public feed for the top announcement ticker (enabled items only).
export const dynamic = "force-dynamic";

export async function GET() {
  const announcements = await getActiveAnnouncements();
  return NextResponse.json(
    { success: true, announcements },
    { headers: { "Cache-Control": "public, max-age=0, s-maxage=30, stale-while-revalidate=60" } }
  );
}
