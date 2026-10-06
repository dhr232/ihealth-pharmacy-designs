import { beforeAll, describe, expect, it, vi } from "vitest";

// Use the in-memory code store: a localhost DATABASE_URL makes withPrismaFallback skip the database.
process.env.DATABASE_URL = "postgresql://user:pass@localhost:5432/test";

type Auth = typeof import("../lib/auth");
let auth: Auth;

beforeAll(async () => {
  auth = await import("../lib/auth");
});

const EMAIL = "info@ihealthpharmacy.ca";

async function issue(code: string, ttlMs = 2 * 60 * 1000) {
  await auth.saveTwoFactorToken({
    userId: "u1",
    email: EMAIL,
    code,
    expiresAt: new Date(Date.now() + ttlMs),
  });
}

describe("admin email-code sign-in", () => {
  it("only the pharmacy inbox is the admin identity", () => {
    expect(auth.ADMIN_EMAIL).toBe(EMAIL);
  });

  it("codes are 6 digits", () => {
    for (let i = 0; i < 50; i++) expect(auth.generateOtpCode()).toMatch(/^\d{6}$/);
  });

  it("accepts the right code once, then rejects reuse", async () => {
    await issue("123456");
    expect((await auth.verifyTwoFactorToken({ email: EMAIL, code: "123456" })).success).toBe(true);
    expect((await auth.verifyTwoFactorToken({ email: EMAIL, code: "123456" })).success).toBe(false);
  });

  it("rejects an expired code", async () => {
    await issue("111111", 2 * 60 * 1000);
    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + 2 * 60 * 1000 + 1000);
    const result = await auth.verifyTwoFactorToken({ email: EMAIL, code: "111111" });
    vi.useRealTimers();
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/expired/i);
  });

  it("locks the code after 3 wrong attempts", async () => {
    await issue("222222");
    for (let i = 0; i < 3; i++) {
      expect((await auth.verifyTwoFactorToken({ email: EMAIL, code: "000000" })).success).toBe(false);
    }
    const result = await auth.verifyTwoFactorToken({ email: EMAIL, code: "222222" });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/too many/i);
  });

  it("session tokens round-trip and expire", () => {
    const token = auth.encryptSessionToken({
      userId: "u1",
      email: EMAIL,
      name: "iHealth Pharmacy",
      role: "ADMIN",
      exp: Date.now() + 1000,
    });
    expect(auth.decryptSessionToken(token)?.email).toBe(EMAIL);

    const expired = auth.encryptSessionToken({
      userId: "u1",
      email: EMAIL,
      name: "iHealth Pharmacy",
      role: "ADMIN",
      exp: Date.now() - 1,
    });
    expect(auth.decryptSessionToken(expired)).toBeNull();
  });

  it("sessions last 12 hours and codes 2 minutes", () => {
    expect(auth.SESSION_MAX_AGE_SECONDS).toBe(12 * 60 * 60);
    expect(auth.OTP_TTL_MINUTES).toBe(2);
  });
});
