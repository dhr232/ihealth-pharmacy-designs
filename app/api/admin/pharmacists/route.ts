import { NextRequest, NextResponse } from "next/server";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import { getCurrentStaffSession } from "@/lib/auth";
import { SEED_PHARMACISTS } from "@/app/admin/lib/types";
import { mapPrismaToPharmacist } from "@/lib/pharmacists";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getCurrentStaffSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const pharmacists = await withPrismaFallback(
      async () => {
        return prisma.pharmacist.findMany({
          orderBy: { createdAt: "asc" },
        });
      },
      () => []
    );

    if (pharmacists && pharmacists.length > 0) {
      const mapped = pharmacists.map((p, index) => mapPrismaToPharmacist(p, index));
      return NextResponse.json({ success: true, pharmacists: mapped });
    }
  } catch (error) {
    console.warn("Database pharmacists query failed, serving fallback:", error);
  }

  return NextResponse.json({ success: true, pharmacists: SEED_PHARMACISTS });
}

export async function POST(request: NextRequest) {
  const session = await getCurrentStaffSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      id,
      name,
      role,
      title,
      bio,
      photoUrl,
      avatarUrl,
      licenseNumber,
      credentials,
      languages,
      yearsExperience,
      displayOrder,
      active,
      acceptsAppointments,
    } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Pharmacist name is required." },
        { status: 400 }
      );
    }

    const resolvedTitle = (role || title || "Community Pharmacist").trim();
    const resolvedAvatar = photoUrl || avatarUrl || null;
    const resolvedBio = (bio || "").trim();
    const resolvedActive = typeof active === "boolean" ? active : true;
    const resolvedAccepts = typeof acceptsAppointments === "boolean" ? acceptsAppointments : true;
    const resolvedLicense =
      licenseNumber || (id && id.startsWith("BC-") ? id : `BC-PHARM-${Math.floor(10000 + Math.random() * 90000)}`);

    let savedRecord;

    if (id) {
      const existing = await prisma.pharmacist.findUnique({
        where: { id },
      });

      if (existing) {
        savedRecord = await prisma.pharmacist.update({
          where: { id },
          data: {
            name: name.trim(),
            title: resolvedTitle,
            bio: resolvedBio,
            avatarUrl: resolvedAvatar,
            active: resolvedActive,
            acceptsAppointments: resolvedAccepts,
            ...(licenseNumber ? { licenseNumber } : {}),
          },
        });
      } else {
        savedRecord = await prisma.pharmacist.create({
          data: {
            id,
            name: name.trim(),
            title: resolvedTitle,
            licenseNumber: resolvedLicense,
            bio: resolvedBio,
            avatarUrl: resolvedAvatar,
            active: resolvedActive,
            acceptsAppointments: resolvedAccepts,
          },
        });
      }
    } else {
      savedRecord = await prisma.pharmacist.create({
        data: {
          name: name.trim(),
          title: resolvedTitle,
          licenseNumber: resolvedLicense,
          bio: resolvedBio,
          avatarUrl: resolvedAvatar,
          active: resolvedActive,
          acceptsAppointments: resolvedAccepts,
        },
      });
    }

    const mapped = mapPrismaToPharmacist({
      ...savedRecord,
      credentials,
      languages,
      yearsExperience,
      displayOrder,
    });

    return NextResponse.json({ success: true, pharmacist: mapped });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save pharmacist.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getCurrentStaffSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch {
        // Body was empty or not JSON
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Pharmacist ID is required." },
        { status: 400 }
      );
    }

    try {
      await prisma.pharmacist.delete({
        where: { id },
      });
      return NextResponse.json({ success: true, message: "Pharmacist deleted successfully.", id });
    } catch {
      // If foreign key constraint prevents hard deletion, soft-delete by deactivating
      await prisma.pharmacist.update({
        where: { id },
        data: { active: false },
      });
      return NextResponse.json({ success: true, message: "Pharmacist deactivated successfully.", id });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to remove pharmacist.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
