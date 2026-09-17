"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Clock,
  Heart,
  Megaphone,
  Syringe,
  Truck,
} from "lucide-react";
import { getAnnouncements } from "../admin/lib/storage";
import {
  type AnnouncementIcon,
  type AnnouncementItem,
  SEED_ANNOUNCEMENTS,
} from "../admin/lib/types";

const ICON_MAP: Record<AnnouncementIcon, typeof Megaphone> = {
  clock: Clock,
  syringe: Syringe,
  truck: Truck,
  alert: AlertCircle,
  megaphone: Megaphone,
  heart: Heart,
};

const subscribeReducedMotion = (callback: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener?.("change", callback);
  return () => mq.removeEventListener?.("change", callback);
};

export default function AnnouncementBar() {
  // Always start from the server-rendered seed so hydration matches; the
  // real (possibly admin-edited) announcements are pulled in post-mount.
  const [items, setItems] = useState<AnnouncementItem[]>(SEED_ANNOUNCEMENTS);

  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sync = () => {
      setItems(getAnnouncements());
    };
    sync();

    window.addEventListener("storage", sync);
    window.addEventListener("ihealth_announcements_updated", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("ihealth_announcements_updated", sync);
    };
  }, []);

  const activeItems = useMemo(() => {
    return items
      .filter((a) => a.enabled !== false)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [items]);

  const marqueeItems = useMemo(() => {
    if (activeItems.length === 0) return [];
    let list = [...activeItems];
    while (list.length < 6) {
      list = [...list, ...activeItems];
    }
    return [...list, ...list];
  }, [activeItems]);

  if (activeItems.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Pharmacy announcements"
      className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-slate-200"
    >
      <div
        className={
          reduced
            ? "flex flex-wrap items-center justify-center gap-x-6 gap-y-0.5 px-4 py-1 text-[11px] sm:text-xs"
            : "flex w-max items-center gap-10 py-1 text-[11px] sm:text-xs animate-[marquee_45s_linear_infinite] motion-reduce:hidden"
        }
      >
        {marqueeItems.map((a, i) => {
          const IconComp = ICON_MAP[a.icon] || Megaphone;
          return (
            <span
              key={`${a.id}-${i}`}
              className="flex shrink-0 items-center gap-1.5 font-medium tracking-tight"
            >
              <IconComp size={13} className="text-blue-400 shrink-0" />
              {a.urgent && (
                <span className="rounded bg-rose-500/25 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-rose-300 border border-rose-500/40 shrink-0">
                  Notice
                </span>
              )}
              {a.link ? (
                <Link
                  href={a.link}
                  className="hover:text-white hover:underline transition-colors"
                >
                  {a.text}
                </Link>
              ) : (
                <span>{a.text}</span>
              )}
            </span>
          );
        })}
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