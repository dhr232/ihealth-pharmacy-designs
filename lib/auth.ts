import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma, withPrismaFallback } from "./prisma";

export const SESSION_COOKIE_NAME = "ihealth_staff_session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export type StaffRole = "ADMIN" | "PHARMACIST";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: StaffRole;
  exp: number;
}

export const SEEDED_ADMIN = {
  id: "seeded-admin-id",
  email: "admin@ihealthpharmacy.ca",
  name: "System Administrator",
  role: "ADMIN" as StaffRole,
  defaultPassword: process.env.ADMIN_INITIAL_PASSWORD || "Admin2026!",
};

export const SEEDED_PHARMACIST = {
  id: "seeded-pharmacist-id",
  email: "pharmacist@ihealthpharmacy.ca",
  name: "Clinical Pharmacist",
  role: "PHARMACIST" as StaffRole,
  defaultPassword: process.env.PHARMACIST_INITIAL_PASSWORD || "Pharmacist2026!",
};

// In-memory fallback token store for OTPs when database is unavailable or seeded user is used
interface MemoryOtpToken {
  userId: string;
  email: string;
  hashedToken: string;
  expiresAt: Date;
  attempts: number;
}
const memoryOtpStore = new Map<string, MemoryOtpToken>();

function getEncryptionKey(): Buffer {
  const secret = process.env.SESSION_SECRET || "ihealth-pharmacy-staff-session-secret-salt-2026-key-32";
  return crypto.createHash("sha256").update(secret).digest();
}

/**
 * Encrypt a session payload into a signed, authenticated token.
 */
export function encryptSessionToken(payload: SessionPayload): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  
  const json = JSON.stringify(payload);
  const encrypted = Buffer.concat([cipher.update(json, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

/**
 * Decrypt and validate a session token.
 */
export function decryptSessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [ivB64, tagB64, dataB64] = parts;
    const iv = Buffer.from(ivB64, "base64url");
    const tag = Buffer.from(tagB64, "base64url");
    const encrypted = Buffer.from(dataB64, "base64url");
    const key = getEncryptionKey();

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const payload = JSON.parse(decrypted.toString("utf8")) as SessionPayload;

    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Hash a plain text password using bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compare plain text password against hashed password.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a secure 6-digit OTP code string.
 */
export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store a 2FA OTP token for an email.
 * Attempts database storage first; falls back to in-memory store if DB query fails.
 */
export async function saveTwoFactorToken(params: {
  userId: string;
  email: string;
  code: string;
  expiresAt: Date;
}): Promise<boolean> {
  const hashedToken = await bcrypt.hash(params.code, 10);

  return withPrismaFallback(
    async () => {
      // Clean existing tokens for this user
      await prisma.twoFactorToken.deleteMany({
        where: { userId: params.userId },
      });

      await prisma.twoFactorToken.create({
        data: {
          userId: params.userId,
          token: hashedToken,
          expiresAt: params.expiresAt,
          attempts: 0,
        },
      });
      return true;
    },
    () => {
      memoryOtpStore.set(params.email.toLowerCase(), {
        userId: params.userId,
        email: params.email.toLowerCase(),
        hashedToken,
        expiresAt: params.expiresAt,
        attempts: 0,
      });
      return true;
    }
  );
}

/**
 * Verify a 2FA OTP code.
 * Checks expiry and attempt limit <= 3.
 */
export async function verifyTwoFactorToken(params: {
  email: string;
  code: string;
}): Promise<{ success: boolean; error?: string; userId?: string }> {
  const normalizedEmail = params.email.toLowerCase();

  return withPrismaFallback(
    async () => {
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        include: {
          twoFactorTokens: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });

      if (user && user.twoFactorTokens.length > 0) {
        const record = user.twoFactorTokens[0];

        if (record.attempts >= 3) {
          return { success: false, error: "Too many failed attempts. Please request a new code." };
        }

        if (new Date() > record.expiresAt) {
          return { success: false, error: "Verification code has expired. Please request a new code." };
        }

        const isMatch = await bcrypt.compare(params.code, record.token);
        if (!isMatch) {
          await prisma.twoFactorToken.update({
            where: { id: record.id },
            data: { attempts: record.attempts + 1 },
          });
          return { success: false, error: `Invalid verification code. ${2 - record.attempts} attempts remaining.` };
        }

        // Cleanup token on success
        await prisma.twoFactorToken.delete({ where: { id: record.id } });
        return { success: true, userId: user.id };
      }

      // Check memory store if user token not in DB
      return verifyMemoryOtp(normalizedEmail, params.code);
    },
    () => verifyMemoryOtp(normalizedEmail, params.code)
  );
}

async function verifyMemoryOtp(
  email: string,
  code: string
): Promise<{ success: boolean; error?: string; userId?: string }> {
  const memRecord = memoryOtpStore.get(email);
  if (!memRecord) {
    return { success: false, error: "No active verification code found. Please request a new one." };
  }

  if (memRecord.attempts >= 3) {
    memoryOtpStore.delete(email);
    return { success: false, error: "Too many failed attempts. Please request a new code." };
  }

  if (new Date() > memRecord.expiresAt) {
    memoryOtpStore.delete(email);
    return { success: false, error: "Verification code has expired. Please request a new code." };
  }

  const isMatch = await bcrypt.compare(code, memRecord.hashedToken);
  if (!isMatch) {
    memRecord.attempts += 1;
    memoryOtpStore.set(email, memRecord);
    return { success: false, error: `Invalid verification code. ${3 - memRecord.attempts} attempts remaining.` };
  }

  memoryOtpStore.delete(email);
  return { success: true, userId: memRecord.userId };
}

/**
 * Retrieve current staff session from incoming cookies.
 */
export async function getCurrentStaffSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return decryptSessionToken(token);
}
