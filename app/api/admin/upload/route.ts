import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { getCurrentStaffSession } from "@/lib/auth";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  flyers: ["application/pdf"],
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
        category === "flyers" ? "PDF documents" : "PNG, JPEG, or WEBP images";
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type (${file.type}). Category '${category}' only accepts ${allowedDescription}.`,
        },
        { status: 400 }
      );
    }

    // 5. Generate collision-safe filename
    const originalExt = path.extname(file.name).toLowerCase() || (category === "flyers" ? ".pdf" : ".png");
    const rawBaseName = path.basename(file.name, originalExt);
    const sanitizedBase = rawBaseName
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 40)
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "upload";

    const randomSuffix = crypto.randomBytes(4).toString("hex");
    const timestamp = Date.now();
    const collisionSafeName = `${sanitizedBase}-${timestamp}-${randomSuffix}${originalExt}`;

    // 6. Ensure target directory exists
    const targetDir = path.join(process.cwd(), "public", "uploads", category);
    await fs.mkdir(targetDir, { recursive: true });

    // 7. Write file directly to persistent directory
    const filePath = path.join(targetDir, collisionSafeName);
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    // 8. Return public URL
    const publicUrl = `/uploads/${category}/${collisionSafeName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: collisionSafeName,
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
