import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

let isDatabaseReachable = true;
let lastFailureTimestamp = 0;

/**
 * Executes a Prisma query with a fast timeout and in-memory fallback.
 * Prevents 15-second TCP connection hangs when DATABASE_URL is not yet pointed to active Neon/Postgres.
 */
export async function withPrismaFallback<T>(
  query: () => Promise<T>,
  fallback: () => Promise<T> | T,
  timeoutMs = 1500
): Promise<T> {
  const dbUrl = process.env.DATABASE_URL || "";
  const isLocalhostUnreachable =
    dbUrl.includes("localhost:5432") && !process.env.HAS_LOCAL_POSTGRES;

  if (isLocalhostUnreachable) {
    return fallback();
  }

  // If a connection failed recently, avoid hammering timeout
  if (!isDatabaseReachable && Date.now() - lastFailureTimestamp < 30000) {
    return fallback();
  }

  try {
    const result = await Promise.race([
      query(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Database connection timeout")), timeoutMs)
      ),
    ]);
    isDatabaseReachable = true;
    return result;
  } catch (error: unknown) {
    const err = error as { isSlotConflict?: boolean; code?: string };
    if (err?.isSlotConflict || err?.code === "SLOT_CONFLICT") {
      throw error;
    }
    isDatabaseReachable = false;
    lastFailureTimestamp = Date.now();
    return fallback();
  }
}

export default prisma;
