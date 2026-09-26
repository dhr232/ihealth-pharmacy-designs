"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Languages,
  ArrowRight,
  ArrowUp,
  Calendar,
} from "lucide-react";
import { PHARMACY_INFO, getOpenStatus, getWhatsAppUrl } from "@/data/pharmacy-info";

interface FooterProps {
  logoHref?: string;
}

export default function Footer({ logoHref = "/" }: FooterProps = {}) {
  // Live dispensary status, derived from PHARMACY_INFO.schedule (Pacific time)
  const getDispensaryStatus = () => {
    const { isOpen, detail } = getOpenStatus();
    return isOpen
      ? {
          isOpen: true,
          label: "Dispensary Open Now",
          detail,
          badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
          dotColor: "bg-emerald-400",
        }
      : {
          isOpen: false,
          label: "Dispensary Closed",
          detail,
          badgeColor: "bg-slate-800 text-slate-400 border-slate-700/80",
          dotColor: "bg-slate-500",
        };
  };

  const status = getDispensaryStatus();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="border-t border-slate-800/80 bg-[#0B1120] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Col 1: Identity, PHIPA & Multilingual */}
          <div className="space-y-4">
            <Link href={logoHref} className="flex items-center gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ihealth-logo-main.jpeg"
                alt="iHealth Pharmacy logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-contain bg-white p-0.5 ring-2 ring-white/10 transition group-hover:ring-blue-500/50"
              />
              <div>
                <span className="text-lg font-bold tracking-tight text-white transition group-hover:text-blue-400">
                  {PHARMACY_INFO.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Community Dispensary
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400">
              Independent, community pharmacy in Chilliwack, BC. Personalized
              medication reviews, blister packaging, minor ailments prescribing,
              and free local delivery across Chilliwack and Sardis.
            </p>

            {/* Multilingual Support Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Languages size={14} className="text-blue-400" />
                <span>Multilingual Care</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                English • ਪੰਜਾਬੀ (Punjabi) • हिन्दी (Hindi)
              </p>
            </div>

          </div>

          {/* Col 2: Direct Contact, Location & Hours */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Get in Touch
            </h3>

            {/* Live Dispensary Status Indicator */}
            <div className="mt-3">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${status.badgeColor}`}
              >
                <span className={`h-2 w-2 rounded-full ${status.dotColor} ${status.isOpen ? "animate-pulse" : ""}`} />
                <span>{status.label}</span>
                <span className="text-[10px] opacity-75">({status.detail})</span>
              </div>
            </div>

            <ul className="mt-4 space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={PHARMACY_INFO.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-slate-300 transition hover:text-blue-400"
                >
                  <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
                  <span className="leading-snug">{PHARMACY_INFO.address.full}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                  className="flex items-center gap-2.5 text-slate-300 transition hover:text-blue-400 font-semibold"
                >
                  <Phone size={16} className="shrink-0 text-blue-400" />
                  <span>{PHARMACY_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 transition hover:text-emerald-300 font-semibold"
                >
                  <MessageCircle size={16} className="shrink-0 text-[#25D366]" />
                  <span>WhatsApp: {PHARMACY_INFO.whatsapp.displayNumber}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PHARMACY_INFO.email}`}
                  className="flex items-center gap-2.5 text-slate-300 transition hover:text-blue-400"
                >
                  <Mail size={16} className="shrink-0 text-blue-400" />
                  <span>{PHARMACY_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 pt-1 border-t border-slate-800/60">
                <Clock size={16} className="mt-0.5 shrink-0 text-slate-500" />
                <span className="text-xs leading-relaxed">{PHARMACY_INFO.hoursSummary}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Fast Actions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pharmacy Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/new-prescription"
                  className="group flex items-center justify-between text-blue-400 font-semibold hover:text-blue-300 transition"
                >
                  <span>Submit New Prescription</span>
                  <span className="text-[10px] uppercase font-bold bg-blue-900/60 text-blue-300 border border-blue-700/60 px-1.5 py-0.5 rounded">
                    Upload
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/prescription-refills"
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  Prescription Refills
                </Link>
              </li>
              <li>
                <Link
                  href="/transfer"
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  Transfer Prescription
                </Link>
              </li>
              <li>
                <Link
                  href="/services/minor-ailments"
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  Minor Ailments Clinic (BC MSP)
                </Link>
              </li>
              <li>
                <Link
                  href="/vaccinations"
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  Vaccinations & Injections
                </Link>
              </li>
              <li>
                <Link
                  href="/services/myhealthpack"
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  MyHealthPack Blister Packs
                </Link>
              </li>
              <li>
                <Link
                  href="/services/compounding"
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  Custom Compounding
                </Link>
              </li>
              <li>
                <Link
                  href="/services/delivery"
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  Free Prescription Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Accreditation, Direct Billing & Booking */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Book & Portals
              </h3>
              <div className="mt-3">
                <Link
                  href="/book"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-blue-700/25 transition-all duration-200 active:scale-95"
                >
                  <Calendar size={14} />
                  <span>Book Appointment Online</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Accreditation
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Licensed community pharmacy with the{" "}
                <strong className="text-white font-semibold">
                  {PHARMACY_INFO.accreditation.college}
                </strong>
                .
              </p>
            </div>

            <div className="pt-1">
              <p className="text-xs font-semibold text-slate-300">Direct billing accepted for:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PHARMACY_INFO.accreditation.directBilling.map((insurer) => (
                  <span
                    key={insurer}
                    className="rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-300 shadow-2xs"
                  >
                    {insurer}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Emergency Medical Advisory */}
        <div className="mt-12 rounded-2xl border border-blue-900/40 bg-blue-950/30 p-4 sm:p-5 text-xs leading-relaxed text-slate-300 shadow-inner">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs mt-0.5">
              <ShieldCheck size={16} />
            </div>
            <div>
              <span className="font-bold text-white text-xs sm:text-sm block mb-0.5">
                Provincial Medical Advisory & Emergency Notice:
              </span>
              <span>
                {PHARMACY_INFO.disclaimers.emergency} {PHARMACY_INFO.disclaimers.telehealth811}
              </span>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {PHARMACY_INFO.legalName}. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-blue-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-blue-400 transition">
              Cookie Policy
            </Link>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer pl-2 border-l border-slate-700/80"
              title="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
