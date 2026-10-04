import { promises as fs } from "fs";
import { resolveUpload } from "@/lib/uploads";

// Serves admin uploads (blog covers, flyers) from UPLOAD_DIR at /media/<category>/<file>.
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const target = resolveUpload(segments);
  if (!target) return new Response("Not found", { status: 404 });

  try {
    const file = await fs.readFile(target.filePath);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": target.contentType,
        // Filenames are unique per upload, so they can be cached forever.
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
