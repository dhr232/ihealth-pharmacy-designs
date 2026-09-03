"use client";

import { useEffect, useState } from "react";
import { Syringe, Truck, Clock, AlertCircle } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    icon: Syringe,
    text: "Walk-in flu shots available — no appointment needed",
  },
  {
    icon: Truck,
    text: "Free prescription delivery in Abbotsford for orders over $25",
  },
  {
    icon: Clock,
    text: "Open 7 days a week: Mon–Fri 8am–9pm, Sat–Sun 9am–6pm",
  },
  {
    icon: AlertCircle,
    text: "Shingles and pneumonia vaccines now in stock — book online",
  },
];

export default function AnnouncementBar() {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <div
      role="region"
      aria-label="Pharmacy announcements"
      className="relative overflow-hidden border-b border-[var(--brand)]/20 bg-[var(--brand-subtle)] text-[var(--foreground)]"
    >
      <div
        className={
          reduced
            ? "flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs"
            : "flex w-max items-center gap-12 py-2 text-xs animate-[marquee_40s_linear_infinite] motion-reduce:hidden"
        }
      >
        {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2">
            <a.icon size={14} className="text-[var(--brand)]" />
            {a.text}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}