import { NextResponse } from "next/server";
import { savePrescriptionPhoto, sweepExpiredPrescriptionPhotos } from "@/lib/uploads";

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

    // Private storage outside the app folder (survives deploys, never publicly served).
    // The original filename is discarded so no patient-supplied name is persisted.
    let photoUrl: string;
    try {
      photoUrl = await savePrescriptionPhoto(Buffer.from(await file.arrayBuffer()), mimeType);
    } catch (storageError) {
      console.error("[Prescription Photo Upload] Storage error:", storageError);
      return NextResponse.json(
        {
          success: false,
          error: "Photo uploads are temporarily unavailable. Please enter the details instead, or call us.",
        },
        { status: 503 }
      );
    }

    // Opportunistic 30-day cleanup (throttled, runs in the background)
    sweepExpiredPrescriptionPhotos();

    return NextResponse.json({
      success: true,
      url: photoUrl,
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
