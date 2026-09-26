"use client";

import { useState, useRef, MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { MapPin, Navigation, Building2, Star } from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

export default function PharmacyLocationHeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values (-0.5 to 0.5 relative to card center)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid, physics-based responsiveness
  const springX = useSpring(x, { stiffness: 180, damping: 24 });
  const springY = useSpring(y, { stiffness: 180, damping: 24 });

  // 3D rotation transforms
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  // Dynamic glare coordinates in percentage
  const glareX = useTransform(springX, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(springY, [-0.5, 0.5], [10, 90]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.15) 35%, transparent 60%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mousePosX = e.clientX - rect.left;
    const mousePosY = e.clientY - rect.top;

    x.set(mousePosX / rect.width - 0.5);
    y.set(mousePosY / rect.height - 0.5);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
    >
      {/* Organic Mint & Periwinkle Ambient Aura with Floating Motion */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.7, 0.9, 0.7],
                x: [0, 8, 0],
                y: [0, -6, 0],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -right-8 w-72 h-72 rounded-full bg-[#EAF8F1] blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
                opacity: [0.7, 0.85, 0.7],
                x: [0, -6, 0],
                y: [0, 6, 0],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-8 -left-8 w-72 h-72 rounded-full bg-[#E8EEFB] blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Outer Elevated Card with 3D Tilt and Idle Float */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          shouldReduceMotion || isHovered
            ? { y: 0 }
            : {
                y: [-5, 5, -5],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
        className="relative rounded-[2rem] bg-white border border-slate-200/90 p-3 sm:p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl space-y-3.5 overflow-hidden"
      >
        {/* Dynamic Specular Sheen Glare */}
        {!shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[2rem]"
            style={{
              opacity: isHovered ? 0.45 : 0,
              background: glareBackground,
            }}
            aria-hidden="true"
          />
        )}

        {/* Real Storefront Image Frame - Full Window Wraps Visible */}
        <div className="group relative aspect-[2/1] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-200/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pharmacy-storefront.jpg"
            alt="iHealth Pharmacy and Clinic storefront with window wraps in Chilliwack, BC"
            loading="eager"
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
          />

          {/* Top-Left Glass Status Pill */}
          <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-md backdrop-blur-md border border-slate-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Open Today &bull; Walk-ins Welcome</span>
          </div>

          {/* Top-Right Address Pill */}
          <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#1E2A44]/90 px-3 py-1 text-[11px] font-medium text-white shadow-md backdrop-blur-md">
            <MapPin size={12} className="text-red-400" />
            <span>Unit #101 &bull; Chilliwack</span>
          </div>
        </div>

        {/* Location Title & Rating Strip */}
        <div className="flex items-center justify-between px-1 pt-0.5">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">
              Chilliwack Community Health Center
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1E2A44] leading-snug">
              iHealth Pharmacy & Clinic
            </h3>
            <p className="text-xs text-[#5A6270]">
              {PHARMACY_INFO.address.street}, {PHARMACY_INFO.address.city}, {PHARMACY_INFO.address.province}
            </p>
          </div>

          <a
            href={PHARMACY_INFO.address.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#F8FAFD] border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 px-3 py-1.5 rounded-xl shadow-2xs shrink-0 transition"
            title={`Rated ${PHARMACY_INFO.address.googleRating} on Google. Read our reviews`}
          >
            <div className="flex text-amber-400">
              <Star size={13} fill="currentColor" />
            </div>
            <div className="text-xs font-bold text-[#1E2A44]">{PHARMACY_INFO.address.googleRating}</div>
            <span className="text-[10px] text-[#5A6270] hidden sm:inline">&bull; Google</span>
          </a>
        </div>

        {/* Dual Floating Cards Matching Layout 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          
          {/* Card 1: Soft Periwinkle Blue (Primary Pharmacist) */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            className="rounded-xl bg-[#EDF3FF] border border-[#D5E2FA] p-3 flex items-center gap-2.5 shadow-2xs hover:shadow-xs transition duration-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pharmacists/dev-patel.png"
                alt="Dev Patel"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-2xs shrink-0 bg-white"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#1E2A44] truncate leading-tight">
                  Dev Patel
                </div>
                <div className="text-[10px] text-[#3D5FE0] font-semibold truncate">
                  Primary Pharmacist
                </div>
                <div className="text-[9px] text-[#5A6270] truncate">
                  BSc Pharm, RPh
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Soft Mint Green (Dispensary Location & Map) */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            className="rounded-xl bg-[#EAF8F1] border border-[#CEEEDC] p-3 flex items-center justify-between gap-2.5 shadow-2xs hover:shadow-xs transition duration-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#D4F4E4] text-[#2F9E64] flex items-center justify-center shrink-0 shadow-2xs">
                <Building2 size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#1E2A44] truncate leading-tight">
                  Dispensary
                </div>
                <div className="text-[10px] text-[#2F9E64] font-semibold truncate">
                  Free Parking & Delivery
                </div>
                <div className="text-[9px] text-[#5A6270] truncate">
                  Unit #101 Entrance
                </div>
              </div>
            </div>

            <a
              href={PHARMACY_INFO.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#4CAF7D] text-white text-[10px] font-bold shadow-2xs hover:bg-[#3D9468] transition duration-150 shrink-0"
              title="Open Google Maps listing"
            >
              <Navigation size={11} />
              <span>Map</span>
            </a>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
}
