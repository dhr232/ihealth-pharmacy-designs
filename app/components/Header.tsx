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
  Sparkles,
  Paperclip,
  CheckCircle2,
  Truck,
  MapPin,
  MessageCircle,
  CreditCard,
  UserCheck,
  Languages,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { MegaMenu, MegaMenuItem } from "@/components/ui/mega-menu";
import { PHARMACY_INFO } from "@/data/pharmacy-info";
import { getBookingUrl, getMainSiteUrl } from "@/lib/routes";

const IHEALTH_NAV_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: "Prescriptions",
    featureCard: {
      badge: "Free Home Delivery",
      title: "Medications Delivered to Your Door",
      description: "Prescriptions and weekly blister packs delivered free across Chilliwack and Sardis.",
      image: "/services/delivery.jpg",
      ctaText: "Request home delivery",
      href: "/services/delivery",
    },
    subMenus: [
      {
        title: "Prescription Services",
        items: [
          {
            label: "Submit New Prescription",
            description: "Upload a photo or enter doctor script",
            icon: FileText,
            iconClass: "border-blue-200/80 bg-blue-100 text-[#3D5FE0] group-hover:bg-[#3D5FE0] group-hover:text-white group-hover:border-[#3D5FE0]",
            href: "/new-prescription",
          },
          {
            label: "Refill a Prescription",
            description: "Ready in 30 mins for counter pickup",
            icon: RefreshCw,
            iconClass: "border-teal-200/80 bg-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
            href: "/prescription-refills",
          },
          {
            label: "Transfer to iHealth",
            description: "We coordinate with your former pharmacy",
            icon: Paperclip,
            iconClass: "border-purple-200/80 bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
            href: "/transfer",
          },
          {
            label: "Free Home Delivery",
            description: "Same-day across Chilliwack & Sardis",
            icon: Truck,
            iconClass: "border-emerald-200/80 bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
            href: "/services/delivery",
          },
          {
            label: "Blister Packaging",
            description: "Pre-sorted weekly medication cards",
            icon: CheckCircle2,
            iconClass: "border-purple-200/80 bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
            href: "/services/myhealthpack",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Clinical Services",
    featureCard: {
      badge: "Walk-In Prescribing",
      title: "No Doctor Appointment Required",
      description: "Consult directly with our licensed prescribing pharmacists for common minor ailments with prescriptions on-site.",
      image: "/services/minor-ailments.jpg",
      ctaText: "Explore prescribing care",
      href: "/services/minor-ailments",
    },
    subMenus: [
      {
        title: "Walk-In & Prescribing Care",
        items: [
          {
            label: "Minor Ailments Clinic",
            description: "Walk-in assessment & on-site prescribing",
            icon: Stethoscope,
            iconClass: "border-blue-200/80 bg-blue-100 text-[#3D5FE0] group-hover:bg-[#3D5FE0] group-hover:text-white group-hover:border-[#3D5FE0]",
            href: "/services/minor-ailments",
          },
          {
            label: "Vaccines & Flu Shots",
            description: "Flu, COVID-19, Shingrix & travel",
            icon: Syringe,
            iconClass: "border-teal-200/80 bg-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
            href: "/vaccinations",
          },
          {
            label: "Medication Reviews",
            description: "1-on-1 pharmacist checkup",
            icon: FileText,
            iconClass: "border-amber-200/80 bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
            href: "/services/med-review",
          },
          {
            label: "Custom Compounding",
            description: "Custom doses & special formulas",
            icon: Sparkles,
            iconClass: "border-purple-200/80 bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
            href: "/services/compounding",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "About",
    featureCard: {
      badge: "Local Dispensary",
      title: "Your Independent Chilliwack Pharmacy",
      description: "Serving Chilliwack and Sardis with personalized clinical care, direct billing, and free parking.",
      image: "/pharmacy-storefront.jpg",
      ctaText: "Meet our clinical team",
      href: "/about",
    },
    subMenus: [
      {
        title: "Practice & Team",
        items: [
          {
            label: "Our Story & Independence",
            description: "Family-owned local care with zero chain quotas",
            icon: HeartHandshake,
            iconClass: "border-blue-200/80 bg-blue-100 text-[#3D5FE0] group-hover:bg-[#3D5FE0] group-hover:text-white group-hover:border-[#3D5FE0]",
            href: "/about#story",
          },
          {
            label: "Meet Dev Patel & Team",
            description: "Experienced licensed clinical pharmacists",
            icon: UserCheck,
            iconClass: "border-teal-200/80 bg-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
            href: "/about#team",
          },
          {
            label: "Multilingual Care",
            description: "English • ਪੰਜਾਬੀ (Punjabi) • हिन्दी (Hindi)",
            icon: Languages,
            iconClass: "border-purple-200/80 bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
            href: "/about#multilingual",
          },
        ],
      },
      {
        title: "Coverage & Plans",
        items: [
          {
            label: "Direct Billing & Plans",
            description: "Fair PharmaCare, Blue Cross, Sun Life & NIHB",
            icon: CreditCard,
            iconClass: "border-blue-200/80 bg-blue-100 text-[#3D5FE0] group-hover:bg-[#3D5FE0] group-hover:text-white group-hover:border-[#3D5FE0]",
            href: "/about#billing",
          },
          {
            label: "College Accreditation & Standards",
            description: "Licensed with College of Pharmacists of BC",
            icon: ShieldCheck,
            iconClass: "border-emerald-200/80 bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
            href: "/about#accreditation",
          },
          {
            label: "Patient Health Tips",
            description: "Pharmacist-written articles and healthcare advice",
            icon: FileText,
            iconClass: "border-amber-200/80 bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
            href: "/health-tips",
          },
        ],
      },
    ],
  },
  { id: 4, label: "Hours & Location", link: "/contact" },
];

interface HeaderProps {
  logoHref?: string;
}

export default function Header({ logoHref }: HeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const resolvedLogoHref = logoHref || (typeof window !== "undefined" ? getMainSiteUrl("/") : "/");

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = logoHref || getMainSiteUrl("/");
    if (typeof window !== "undefined" && (target.startsWith("http://") || target.startsWith("https://"))) {
      try {
        const targetOrigin = new URL(target).origin;
        if (targetOrigin !== window.location.origin) {
          e.preventDefault();
          window.location.href = target;
        }
      } catch {
        // Fallback to default Link navigation
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={resolvedLogoHref}
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 shrink-0 group transition hover:opacity-95 cursor-pointer"
        >
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
                Chilliwack Dispensary
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop MegaMenu */}
        <div className="hidden lg:block">
          <MegaMenu items={IHEALTH_NAV_ITEMS} theme="light" />
        </div>

        {/* Desktop Senior-Optimized Action Bar */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          {/* Direct Phone Call Badge - High Priority for Seniors */}
          <a
            href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-teal-50 text-slate-800 hover:text-teal-800 transition border border-slate-200/90 shadow-2xs group"
            title={`Call Dispensary: ${PHARMACY_INFO.phoneDisplay}`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs group-hover:scale-105 transition-transform">
              <Phone size={13} className="stroke-[2.5]" />
            </div>
            <div className="text-left leading-none pr-1">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Call Dispensary</span>
              <span className="text-xs font-extrabold text-slate-900 tracking-tight">{PHARMACY_INFO.phoneDisplay}</span>
            </div>
          </a>

          {/* High-Contrast Primary Refill Button with Fade Gradient */}
          <Link
            href="/prescription-refills"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-400 hover:from-teal-600 hover:via-teal-500 hover:to-emerald-300 px-4 py-2 text-xs font-bold text-white shadow-md shadow-teal-700/20 transition-all duration-200 active:scale-[0.98]"
          >
            <RefreshCw size={13} className="stroke-[2.5]" />
            <span>Refill Prescription</span>
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
                  href={getBookingUrl()}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-400 hover:from-teal-600 hover:via-teal-500 hover:to-emerald-300 py-2.5 text-center text-xs font-bold text-white shadow-xs transition-all duration-200"
                >
                  Book Online
                </Link>
                <Link
                  href="/prescription-refills"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 py-2.5 text-center text-xs font-bold text-white shadow-xs transition-all duration-200"
                >
                  <RefreshCw size={12} />
                  <span>Request Refill</span>
                </Link>
              </div>

              {/* Home Link */}
              <div className="border-b border-slate-100 pb-2.5">
                <Link
                  href={resolvedLogoHref}
                  onClick={(e) => {
                    setMobileOpen(false);
                    handleLogoClick(e);
                  }}
                  className="block text-sm font-bold text-slate-900 py-1 hover:text-[var(--brand)] transition-colors"
                >
                  Home
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
                      <div className="flex items-center justify-between py-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">
                          {item.label}
                        </p>
                        {item.badge && (
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#3D5FE0]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.featureCard && (
                        <Link
                          href={item.featureCard.href}
                          onClick={() => setMobileOpen(false)}
                          className="mt-1 mb-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-2.5 border border-blue-100/80 text-xs font-medium text-slate-800 hover:bg-blue-100/50 transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="inline-flex shrink-0 items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#3D5FE0] text-white">
                              {item.featureCard.badge}
                            </span>
                            <span className="font-bold text-xs text-slate-900 truncate">{item.featureCard.title}</span>
                          </div>
                          <span className="text-[#3D5FE0] font-bold text-xs shrink-0">&rarr;</span>
                        </Link>
                      )}
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
