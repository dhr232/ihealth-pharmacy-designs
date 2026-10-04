import { promises as fs } from "fs";
import { getCurrentStaffSession } from "@/lib/auth";
import { resolvePrescriptionPhoto } from "@/lib/uploads";

// Staff-only viewer for prescription photos (patient health information).
// Photos live in <UPLOAD_DIR>/prescriptions and are never served publicly.
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const session = await getCurrentStaffSession();
  if (!session) {
    return new Response("Staff sign-in required.", { status: 401 });
  }

  const { file } = await params;
  const target = resolvePrescriptionPhoto(file);
  if (!target) return new Response("Not found", { status: 404 });

  try {
    const body = await fs.readFile(target.filePath);
    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": target.contentType,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
