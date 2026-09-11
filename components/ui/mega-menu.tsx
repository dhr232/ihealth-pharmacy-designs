"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export type MegaMenuItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: React.ComponentType<{ className?: string }>;
      href?: string;
    }[];
  }[];
  link?: string;
};

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MegaMenuItem[];
  className?: string;
  theme?: "dark" | "light";
}

const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
  ({ items, className, theme = "dark", ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
    const [isHover, setIsHover] = React.useState<number | null>(null);
    const leaveTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    const cancelLeave = () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
    };

    const handleMouseEnterItem = (navItem: MegaMenuItem) => {
      cancelLeave();
      setIsHover(navItem.id);
      if (navItem.subMenus && navItem.subMenus.length > 0) {
        setOpenMenu(navItem.label);
      } else {
        setOpenMenu(null);
      }
    };

    const handleMouseLeaveItem = () => {
      cancelLeave();
      setIsHover(null);
      leaveTimerRef.current = setTimeout(() => {
        setOpenMenu(null);
      }, 150);
    };

    const handleDropdownEnter = () => {
      cancelLeave();
    };

    const handleDropdownLeave = () => {
      cancelLeave();
      leaveTimerRef.current = setTimeout(() => {
        setOpenMenu(null);
        setIsHover(null);
      }, 150);
    };

    React.useEffect(() => {
      return () => cancelLeave();
    }, []);

    const isLight = theme === "light";

    return (
      <ul
        ref={ref}
        className={`relative flex items-center space-x-1 ${className || ""}`}
        {...props}
      >
        {items.map((navItem) => {
          const hasSub = Boolean(navItem.subMenus && navItem.subMenus.length > 0);
          const isItemActive = openMenu === navItem.label || isHover === navItem.id;

          return (
            <li
              key={navItem.label}
              className="relative py-1"
              onMouseEnter={() => handleMouseEnterItem(navItem)}
              onMouseLeave={handleMouseLeaveItem}
            >
              {navItem.link && !hasSub ? (
                <Link
                  href={navItem.link}
                  className={`relative flex cursor-pointer items-center justify-center gap-1.5 py-2 px-4 text-sm font-semibold transition-colors duration-150 rounded-full select-none ${
                    isLight
                      ? isItemActive
                        ? "text-slate-950 font-bold"
                        : "text-slate-700 hover:text-slate-950"
                      : isItemActive
                      ? "text-white font-bold"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{navItem.label}</span>
                  {isHover === navItem.id && (
                    <motion.div
                      layoutId="hover-bg"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      className={`absolute inset-0 size-full rounded-full ${
                        isLight ? "bg-slate-100/90" : "bg-white/10"
                      }`}
                    />
                  )}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === navItem.label ? null : navItem.label)}
                  className={`relative flex cursor-pointer items-center justify-center gap-1.5 py-2 px-4 text-sm font-semibold transition-colors duration-150 rounded-full select-none ${
                    isLight
                      ? isItemActive
                        ? "text-slate-950 font-bold"
                        : "text-slate-700 hover:text-slate-950"
                      : isItemActive
                      ? "text-white font-bold"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{navItem.label}</span>
                  {hasSub && (
                    <ChevronDown
                      className={`relative z-10 h-3.5 w-3.5 transition-transform duration-200 ${
                        openMenu === navItem.label ? "rotate-180 text-teal-700" : ""
                      } ${isLight ? "text-slate-400" : "text-white/50"}`}
                    />
                  )}
                  {isItemActive && (
                    <motion.div
                      layoutId="hover-bg"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      className={`absolute inset-0 size-full rounded-full ${
                        isLight ? "bg-slate-100" : "bg-white/10"
                      }`}
                    />
                  )}
                </button>
              )}

              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                    className="absolute left-0 top-full pt-2 z-50 transform-gpu"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.985 }}
                      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-max border p-6 shadow-2xl transition-all ${
                        isLight
                          ? "border-slate-200/95 bg-white shadow-xl shadow-slate-900/10 text-slate-900"
                          : "border-white/10 bg-[#0A0A0A] shadow-black/60 text-white"
                      }`}
                      style={{
                        borderRadius: 24,
                      }}
                    >
                      <div className="flex w-fit shrink-0 space-x-10">
                        {navItem.subMenus.map((sub) => (
                          <div className="w-full min-w-[210px]" key={sub.title}>
                            <h3
                              className={`mb-4 text-[11px] font-extrabold uppercase tracking-wider ${
                                isLight ? "text-teal-800" : "text-white/50"
                              }`}
                            >
                              {sub.title}
                            </h3>
                            <ul className="space-y-3">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                const href = item.href || "#";
                                return (
                                  <li key={item.label}>
                                    <Link
                                      href={href}
                                      onClick={() => setOpenMenu(null)}
                                      className="flex items-start space-x-3.5 group rounded-2xl p-2 -m-2 transition-all duration-150 hover:bg-slate-50"
                                    >
                                      <div
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-150 ${
                                          isLight
                                            ? "border-teal-200/80 bg-teal-50/70 text-teal-700 group-hover:bg-[#0D9488] group-hover:text-white group-hover:border-[#0D9488] shadow-2xs"
                                            : "border-white/30 text-white group-hover:bg-white group-hover:text-[#0A0A0A]"
                                        }`}
                                      >
                                        <Icon className="h-4 w-4 flex-none" />
                                      </div>
                                      <div className="w-max leading-snug">
                                        <p
                                          className={`shrink-0 text-sm font-bold transition-colors ${
                                            isLight
                                              ? "text-slate-900 group-hover:text-[var(--brand)]"
                                              : "text-white"
                                          }`}
                                        >
                                          {item.label}
                                        </p>
                                        <p
                                          className={`shrink-0 text-xs mt-0.5 transition-colors duration-150 ${
                                            isLight
                                              ? "text-slate-500 group-hover:text-slate-700"
                                              : "text-white/50 group-hover:text-white"
                                          }`}
                                        >
                                          {item.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    );
  }
);

MegaMenu.displayName = "MegaMenu";

export { MegaMenu };
export default MegaMenu;
