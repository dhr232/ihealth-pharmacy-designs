import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB, matches client-side check

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp", "image/heic"];

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { success: false, error: "Content-Type must be multipart/form-data." },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "File size exceeds the 5MB limit." },
        { status: 400 }
      );
    }

    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type (${file.type}). Only JPEG, PNG, WEBP, or HEIC photos are accepted.`,
        },
        { status: 400 }
      );
    }

    // Generate a collision-safe, non-guessable filename — the original
    // filename is discarded so no patient-supplied name is persisted.
    const extByMime: Record<string, string> = {
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "image/webp": ".webp",
      "image/heic": ".heic",
    };
    const ext = extByMime[mimeType] || ".jpg";
    const randomName = crypto.randomBytes(16).toString("hex");
    const collisionSafeName = `${randomName}${ext}`;

    const targetDir = path.join(process.cwd(), "public", "uploads", "prescription-photos");
    await fs.mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, collisionSafeName);
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    const publicUrl = `/uploads/prescription-photos/${collisionSafeName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("[Prescription Photo Upload] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during photo upload." },
      { status: 500 }
    );
  }
}
