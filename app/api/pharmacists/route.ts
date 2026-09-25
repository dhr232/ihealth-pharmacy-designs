import { NextResponse } from "next/server";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import { SEED_PHARMACISTS } from "@/app/admin/lib/types";
import { mapPrismaToPharmacist } from "@/lib/pharmacists";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pharmacists = await withPrismaFallback(
      async () => {
        return prisma.pharmacist.findMany({
          where: { active: true },
          orderBy: { createdAt: "asc" },
        });
      },
      () => []
    );

    if (pharmacists && pharmacists.length > 0) {
      const mapped = pharmacists.map((p, index) => mapPrismaToPharmacist(p, index));
      mapped.sort((a, b) => a.displayOrder - b.displayOrder);
      return NextResponse.json({ success: true, pharmacists: mapped });
    }
  } catch (error) {
    console.warn("Prisma query failed for /api/pharmacists, falling back to SEED_PHARMACISTS:", error);
  }

  return NextResponse.json({ success: true, pharmacists: SEED_PHARMACISTS });
}
