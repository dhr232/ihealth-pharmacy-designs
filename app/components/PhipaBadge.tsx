import React from "react";
import { Lock } from "lucide-react";

interface PhipaBadgeProps {
  className?: string;
  variant?: "badge" | "pill" | "card" | "inline";
  showText?: boolean;
}

/**
 * Deliberately low-key privacy note. Avoid seal/shield styling or "compliant"/"aligned"
 * wording here -- it reads as a certification claim. Point to the privacy policy instead.
 */
export default function PhipaBadge({
  className = "",
  variant = "inline",
  showText = true,
}: PhipaBadgeProps) {
  const policyLink = (
    <a
      href="/privacy"
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:text-slate-700"
    >
      privacy policy
    </a>
  );

  if (variant === "card") {
    return (
      <p className={`flex items-start gap-2 px-1 text-[11px] leading-snug text-slate-500 ${className}`}>
        <Lock className="h-3.5 w-3.5 shrink-0 mt-px text-slate-400" aria-hidden="true" />
        <span>
          Your health information is kept confidential. See our {policyLink} for how it is
          collected, used, and protected.
        </span>
      </p>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] text-slate-400 ${className}`}>
      <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
      {showText && <span>Kept confidential &middot; {policyLink}</span>}
    </span>
  );
}
