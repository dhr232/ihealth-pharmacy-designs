// Shared in-memory store for appointment status overrides (fallback/dev mode).
// Kept in a dedicated module so it is not exported from a Next.js route handler,
// which would cause a TypeScript constraint violation with the route file schema.

export const memoryStatusStore = new Map<string, "CONFIRMED" | "COMPLETED" | "CANCELLED">();

