import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStaffSession, hashPassword, SEEDED_ADMIN, SEEDED_PHARMACIST } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentStaffSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  if (session.role !== "ADMIN") {
    return NextResponse.json(
      { success: false, error: "Forbidden. Admin access required." },
      { status: 403 }
    );
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (users.length > 0) {
      return NextResponse.json({ success: true, users });
    }
  } catch (error) {
    console.warn("Database error loading users:", error);
  }

  // Fallback default staff list
  return NextResponse.json({
    success: true,
    users: [
      {
        id: SEEDED_ADMIN.id,
        name: SEEDED_ADMIN.name,
        email: SEEDED_ADMIN.email,
        role: SEEDED_ADMIN.role,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: SEEDED_PHARMACIST.id,
        name: SEEDED_PHARMACIST.name,
        email: SEEDED_PHARMACIST.email,
        role: SEEDED_PHARMACIST.role,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ],
  });
}

export async function POST(request: Request) {
  const session = await getCurrentStaffSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json(
      { success: false, error: "Forbidden. Admin access required." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, password, role } = body as {
      name?: string;
      email?: string;
      password?: string;
      role?: "ADMIN" | "PHARMACIST";
    };

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        hashedPassword,
        role,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create staff account.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
