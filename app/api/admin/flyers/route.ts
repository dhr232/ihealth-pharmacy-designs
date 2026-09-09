import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStaffSession } from "@/lib/auth";

export interface SerializedFlyer {
  id: string;
  title: string;
  pdfUrl: string;
  thumbnailUrl?: string | null;
  validFrom?: string | null;
  validTo?: string | null;
  active: boolean;
  createdAt: string;
}

const FALLBACK_FLYERS: SerializedFlyer[] = [
  {
    id: "flyer-1",
    title: "March Health & Wellness Savings Flyer",
    pdfUrl: "/uploads/flyers/march-wellness-flyer.pdf",
    thumbnailUrl: null,
    validFrom: "2026-03-01",
    validTo: "2026-03-31",
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "flyer-2",
    title: "Senior Care & Mobility Equipment Feature",
    pdfUrl: "/uploads/flyers/senior-care-feature.pdf",
    thumbnailUrl: null,
    validFrom: "2026-02-15",
    validTo: "2026-03-15",
    active: true,
    createdAt: new Date().toISOString(),
  },
];

const memoryFlyers = [...FALLBACK_FLYERS];

export async function GET() {
  const session = await getCurrentStaffSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const flyers = await prisma.flyer.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (flyers.length > 0) {
      return NextResponse.json({ success: true, flyers });
    }
  } catch (error) {
    console.warn("Database flyers lookup failed, serving fallback flyers:", error);
  }

  return NextResponse.json({ success: true, flyers: memoryFlyers });
}

export async function POST(request: Request) {
  const session = await getCurrentStaffSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, pdfUrl, thumbnailUrl, validFrom, validTo, active } = body;

    if (!title || !pdfUrl) {
      return NextResponse.json(
        { success: false, error: "Title and PDF URL are required." },
        { status: 400 }
      );
    }

    try {
      const flyer = await prisma.flyer.create({
        data: {
          title,
          pdfUrl,
          thumbnailUrl: thumbnailUrl || null,
          validFrom: validFrom ? new Date(validFrom) : null,
          validTo: validTo ? new Date(validTo) : null,
          active: active ?? true,
        },
      });
      return NextResponse.json({ success: true, flyer });
    } catch {
      const newFlyer: SerializedFlyer = {
        id: `flyer-${Date.now()}`,
        title,
        pdfUrl,
        thumbnailUrl,
        validFrom,
        validTo,
        active: active ?? true,
        createdAt: new Date().toISOString(),
      };
      memoryFlyers.unshift(newFlyer);
      return NextResponse.json({ success: true, flyer: newFlyer });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create flyer.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
