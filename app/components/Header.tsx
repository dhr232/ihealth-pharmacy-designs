"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  RefreshCw,
  Stethoscope,
  FileText,
  HeartPulse,
  Syringe,
  ShieldCheck,
  Sparkles,
  Paperclip,
  CheckCircle2,
  Truck,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { LiquidMetalButton } from "./ui/LiquidMetalButton";
import { MegaMenu, MegaMenuItem } from "@/components/ui/mega-menu";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

const IHEALTH_NAV_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: "Clinical Services",
    subMenus: [
      {
        title: "Pharmacist Prescribing",
        items: [
          {
            label: "21 Minor Ailments",
            description: "Direct BC MSP prescribing for UTI, shingles, allergies & more",
            icon: Stethoscope,
            href: "/services/minor-ailments",
          },
          {
            label: "Medication Reviews",
            description: "Comprehensive review of all your prescriptions & vitamins",
            icon: FileText,
            href: "/services/med-review",
          },
          {
            label: "Chronic Disease Care",
            description: "Dedicated monitoring for diabetes, blood pressure & asthma",
            icon: HeartPulse,
            href: "/care-program",
          },
        ],
      },
      {
        title: "Vaccines & Injections",
        items: [
          {
            label: "Shingles (Shingrix)",
            description: "Now in stock with certified clinical pharmacist administration",
            icon: Syringe,
            href: "/vaccinations",
          },
          {
            label: "Flu & COVID-19",
            description: "Routine seasonal immunization for individuals and families",
            icon: ShieldCheck,
            href: "/vaccinations",
          },
          {
            label: "Custom Compounding",
            description: "Custom dosages, liquid suspensions & hypoallergenic formulas",
            icon: Sparkles,
            href: "/services/compounding",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Refills & Care",
    subMenus: [
      {
        title: "Fast Prescription Tools",
        items: [
          {
            label: "Online Refill Request",
            description: "30-second submission for quick dispensary pickup",
            icon: RefreshCw,
            href: "/prescription-refills",
          },
          {
            label: "Transfer to iHealth",
            description: "We coordinate with your previous pharmacy for seamless switch",
            icon: Paperclip,
            href: "/transfer",
          },
        ],
      },
      {
        title: "Care Programs",
        items: [
          {
            label: "Senior & Caregiver Care",
            description: "Personalized follow-ups, large print & WhatsApp assistance",
            icon: HeartPulse,
            href: "/care-program",
          },
          {
            label: "MyHealthPack Blister Packs",
            description: "Weekly pre-sorted medication blister packaging",
            icon: CheckCircle2,
            href: "/services/myhealthpack",
          },
          {
            label: "Free Abbotsford Delivery",
            description: "Same-day home delivery for orders over $25",
            icon: Truck,
            href: "/care-program",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "About & Advice",
    subMenus: [
      {
        title: "Our Dispensary",
        items: [
          {
            label: "About Our Pharmacists",
            description: "Certified British Columbia clinical pharmacists in Abbotsford",
            icon: Stethoscope,
            href: "/about",
          },
          {
            label: "Hours & Location",
            description: "#105 - 2825 Clearbrook Rd, Abbotsford (Open 7 Days)",
            icon: MapPin,
            href: "/contact",
          },
        ],
      },
      {
        title: "Patient Resources",
        items: [
          {
            label: "Health Tips & Blog",
            description: "Pharmacist-written articles on BC Pharmacare and wellness",
            icon: FileText,
            href: "/health-tips",
          },
          {
            label: "WhatsApp Dispensary Chat",
            description: "Chat directly with on-duty staff at (604) 746-4444",
            icon: MessageCircle,
            href: "https://wa.me/16047464444",
          },
        ],
      },
    ],
  },
  { id: 4, label: "Contact", link: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group transition hover:opacity-95">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ihealth-logo-main.jpeg"
            alt="iHealth Pharmacy logo"
            width={38}
            height={38}
            className="h-9 w-9 rounded-full object-contain ring-1 ring-black/5 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col leading-tight">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                iHealth
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pharmacy
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[10px] text-teal-700 font-semibold tracking-tight">
                Abbotsford Dispensary
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop MegaMenu */}
        <div className="hidden lg:block">
          <MegaMenu items={IHEALTH_NAV_ITEMS} theme="light" />
        </div>

        {/* Desktop Enterprise Action Bar */}
        <div className="hidden items-center gap-2.5 lg:flex shrink-0">
          {/* Language Switcher */}
          <div className="hidden xl:block">
            <LanguageSwitcher />
          </div>

          {/* Call Dispensary Compact Icon Button */}
          <a
            href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-slate-50/80 text-slate-700 shadow-2xs hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50/50 hover:shadow-xs transition-all active:scale-95"
            title={`Call Dispensary: ${PHARMACY_INFO.phoneDisplay}`}
            aria-label={`Call Dispensary: ${PHARMACY_INFO.phoneDisplay}`}
          >
            <Phone size={15} className="stroke-[2.2]" />
          </a>

          {/* Animated Teal Liquid Metal Button */}
          <LiquidMetalButton
            href="/book"
            label="Book Online"
            size="sm"
          />

          {/* Refill Action Button */}
          <Link
            href="/prescription-refills"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C01D16] to-[#a31812] px-4 py-2 text-xs font-bold text-white shadow-sm shadow-red-700/20 hover:from-[#a31812] hover:to-[#88140f] hover:shadow-md transition-all active:scale-[0.98]"
          >
            <RefreshCw size={12} className="stroke-[2.5]" />
            <span>Request Refill</span>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick Call icon for mobile header */}
          <a
            href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-400"
            aria-label={`Call ${PHARMACY_INFO.phoneDisplay}`}
          >
            <Phone size={14} />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white px-5 lg:hidden max-h-[85vh] overflow-y-auto"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-3 py-4">
              {/* Primary Mobile Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/book"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl bg-teal-600 py-2.5 text-center text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition-colors"
                >
                  Book Online
                </Link>
                <Link
                  href="/prescription-refills"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C01D16] to-[#a31812] py-2.5 text-center text-xs font-bold text-white shadow-xs"
                >
                  <RefreshCw size={12} />
                  <span>Request Refill</span>
                </Link>
              </div>

              {/* Categorised Navigation Links */}
              {IHEALTH_NAV_ITEMS.map((item) => (
                <div key={item.id} className="border-b border-slate-100 pb-2.5">
                  {item.link ? (
                    <Link
                      href={item.link}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm font-bold text-slate-900 py-1"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-teal-800 py-1">
                        {item.label}
                      </p>
                      <div className="mt-1 space-y-1 pl-2">
                        {item.subMenus?.map((sub) => (
                          <div key={sub.title} className="mb-2">
                            <p className="text-[11px] font-semibold text-slate-400 mb-1">
                              {sub.title}
                            </p>
                            <div className="space-y-1">
                              {sub.items.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href || "#"}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center justify-between rounded-lg py-1.5 px-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700"
                                >
                                  <span>{subItem.label}</span>
                                  <span className="text-[10px] text-slate-400">View</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Language Switcher */}
              <div className="pt-2">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Language
                </p>
                <LanguageSwitcher />
              </div>

              {/* Direct Phone Call Button */}
              <a
                href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-center text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                <Phone size={14} />
                <span>Call Dispensary: {PHARMACY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
