import { NextRequest, NextResponse } from "next/server";
import { getCurrentStaffSession } from "@/lib/auth";
import {
  listAnnouncementsForAdmin,
  saveAnnouncement,
  deleteAnnouncementById,
  reorderAnnouncements,
} from "@/lib/content";
import type { AnnouncementItem } from "@/app/admin/lib/types";

export const dynamic = "force-dynamic";

async function unauthorized() {
  if (await getCurrentStaffSession()) return null;
  return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
}

function failure(error: unknown, fallback: string) {
  const message = error instanceof Error ? error.message : fallback;
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}

export async function GET() {
  const denied = await unauthorized();
  if (denied) return denied;
  try {
    return NextResponse.json({ success: true, announcements: await listAnnouncementsForAdmin() });
  } catch (error) {
    return failure(error, "Could not load announcements.");
  }
}

/** Create or update one announcement (also used for Enable/Disable). */
export async function POST(request: NextRequest) {
  const denied = await unauthorized();
  if (denied) return denied;
  try {
    const body = (await request.json()) as AnnouncementItem;
    if (!body?.text?.trim()) {
      return NextResponse.json({ success: false, error: "Announcement text is required." }, { status: 400 });
    }
    return NextResponse.json({ success: true, announcement: await saveAnnouncement(body) });
  } catch (error) {
    return failure(error, "Failed to save announcement.");
  }
}

/** Reorder: body { ids: string[] } in the new top-to-bottom order. */
export async function PUT(request: NextRequest) {
  const denied = await unauthorized();
  if (denied) return denied;
  try {
    const { ids } = (await request.json()) as { ids?: string[] };
    if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) {
      return NextResponse.json({ success: false, error: "ids must be an array of strings." }, { status: 400 });
    }
    return NextResponse.json({ success: true, announcements: await reorderAnnouncements(ids) });
  } catch (error) {
    return failure(error, "Failed to reorder announcements.");
  }
}

export async function DELETE(request: NextRequest) {
  const denied = await unauthorized();
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, error: "Announcement id is required." }, { status: 400 });
  }
  try {
    await deleteAnnouncementById(id);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return failure(error, "Failed to delete announcement.");
  }
}
