import { NextResponse } from "next/server";
import { getCurrentStaffSession } from "@/lib/auth";
import { getUploadRoot, saveUpload, type UploadCategory } from "@/lib/uploads";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  flyers: ["application/pdf", "image/png", "image/jpeg", "image/webp"],
  blog: ["image/png", "image/jpeg", "image/webp"],
};

export async function POST(request: Request) {
  try {
    // 1. Verify authenticated staff session
    const session = await getCurrentStaffSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Staff authentication required." },
        { status: 401 }
      );
    }

    // 2. Validate Content-Type
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { success: false, error: "Content-Type must be multipart/form-data." },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded." },
        { status: 400 }
      );
    }

    if (!category || !["flyers", "blog"].includes(category)) {
      return NextResponse.json(
        { success: false, error: "Invalid category. Must be 'flyers' or 'blog'." },
        { status: 400 }
      );
    }

    // 3. Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "File size exceeds the 15MB limit." },
        { status: 400 }
      );
    }

    // 4. Validate MIME type
    const validMimes = ALLOWED_MIME_TYPES[category];
    const mimeType = file.type.toLowerCase();
    if (!validMimes.includes(mimeType)) {
      const allowedDescription =
        category === "flyers" ? "PDF documents or PNG, JPEG, WEBP images" : "PNG, JPEG, or WEBP images";
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type (${file.type}). Category '${category}' only accepts ${allowedDescription}.`,
        },
        { status: 400 }
      );
    }

    // 5. Refuse if there is nowhere persistent to write. Hostinger rebuilds the
    //    app folder on every deploy, so writing inside it would silently lose files.
    if (!getUploadRoot()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "File storage is not configured. Set UPLOAD_DIR in Hostinger to a folder outside the app, e.g. /home/u491263438/domains/ihealthpharmacy.ca/uploads",
        },
        { status: 503 }
      );
    }

    // 6. Save under a unique name in UPLOAD_DIR; served back at /media/<category>/<file>
    const publicUrl = await saveUpload(
      category as UploadCategory,
      Buffer.from(await file.arrayBuffer()),
      mimeType,
      file.name
    );

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: publicUrl.split("/").pop(),
      size: file.size,
      mimeType: file.type,
      category,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error during upload";
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
