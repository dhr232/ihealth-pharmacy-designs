/**
 * Shared Form Validation Utilities
 * Validates Email, Phone Number, and BC PHN (Personal Health Number)
 */

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Validates North American phone numbers (10 digits, or 11 with leading 1).
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    // Valid 10-digit North American Numbering Plan: area code must start with 2-9
    return /^[2-9]\d{9}$/.test(digits);
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return /^1[2-9]\d{9}$/.test(digits);
  }
  return false;
}

/**
 * Formats a phone string into (XXX) XXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Validates BC Personal Health Number (PHN).
 * If empty or whitespace, it is valid (optional).
 * If entered, must be exactly 10 digits.
 */
export function isValidOptionalPhn(phn?: string | null): boolean {
  if (!phn || phn.trim() === "") return true;
  const digits = phn.replace(/\D/g, "");
  return digits.length === 10;
}
