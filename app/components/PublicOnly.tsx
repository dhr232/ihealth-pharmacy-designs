"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children on public pages only. The root layout wraps the
 * announcement bar, cookie banner and other patient-facing extras in this so
 * they stay off the staff admin panel (a nested admin layout cannot remove
 * elements rendered by the root layout).
 */
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
