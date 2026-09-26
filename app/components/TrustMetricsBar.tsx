"use client";

import { Star, Stethoscope, Truck, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SectionReveal } from "./MotionKit";
import Link from "next/link";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

const ASSURANCES = [
  {
    category: "Reputation",
    badge: `${PHARMACY_INFO.address.googleRating} on Google`,
    badgeStyle: "bg-amber-50 text-amber-800 border-amber-200/90",
    icon: Star,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100/70",
    title: "Loved by Our Neighbours",
    description: `Rated ${PHARMACY_INFO.address.googleRating} stars on Google by Chilliwack patients and families. Read their reviews.`,
    href: PHARMACY_INFO.address.googleReviewsUrl,
    external: true,
  },
  {
    category: "Zero Wait",
    badge: "Walk-Ins Welcome",
    badgeStyle: "bg-[#EDF3FF] text-[#3D5FE0] border-[#C5D5F9]",
    icon: Stethoscope,
    iconColor: "text-[#3D5FE0]",
    iconBg: "bg-[#E0E8FC]",
    title: "Pharmacist Prescribing",
    description: "Consult directly with our licensed pharmacists for everyday health needs with zero clinic wait.",
    href: "/services/minor-ailments",
    external: false,
  },
  {
    category: "Convenience",
    badge: "Same-Day Dispatch",
    badgeStyle: "bg-[#EAF8F1] text-[#238150] border-[#CEEEDC]",
    icon: Truck,
    iconColor: "text-[#2F9E64]",
    iconBg: "bg-[#D4F4E4]",
    title: "Free Doorstep Delivery",
    description: "Prescriptions and blister packs delivered free across Chilliwack and Sardis direct to your door.",
    href: "/services/delivery",
    external: false,
  },
  {
    category: "Coverage",
    badge: "Direct Billing",
    badgeStyle: "bg-slate-100 text-slate-800 border-slate-200",
    icon: ShieldCheck,
    iconColor: "text-[#1E2A44]",
    iconBg: "bg-slate-200/80",
    title: "Direct Insurance Billing",
    description: "We bill BC Fair PharmaCare, Pacific Blue Cross, Sun Life, Manulife, and more directly at the counter.",
    href: "/about#billing",
    external: false,
  },
];

export default function TrustMetricsBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative z-10 -mt-8 sm:-mt-10 mx-auto max-w-7xl px-5 lg:px-8">
      <SectionReveal>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xl shadow-slate-900/5">
          {ASSURANCES.map((item) => {
            const Icon = item.icon;
            const CardContent = (
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-[#F9FBFE] p-4 sm:p-5 transition hover:bg-white hover:border-slate-300 hover:shadow-md cursor-pointer"
              >
                <div>
                  {/* Top Header Strip: Badge + Category Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${item.badgeStyle}`}
                    >
                      {item.badge}
                    </span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} transition duration-200 group-hover:scale-105`}
                    >
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[var(--brand)] transition">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-3.5 flex items-center gap-1 text-[11px] font-semibold text-[var(--brand)] group-hover:translate-x-0.5 transition">
                  <span>Learn more</span>
                  <ArrowUpRight size={12} />
                </div>
              </motion.div>
            );

            return item.external ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {CardContent}
              </a>
            ) : (
              <Link key={item.title} href={item.href} className="block h-full">
                {CardContent}
              </Link>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
