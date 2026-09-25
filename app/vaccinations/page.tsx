import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SectionReveal } from "../components/MotionKit";
import {
  Syringe,
  ShieldCheck,
  Users,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";
import { getBookingUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Vaccinations & Immunizations — iHealth Pharmacy Chilliwack",
  description:
    "Flu shots, COVID-19 boosters, shingles, travel vaccines and routine immunizations. Walk in or book online — certified immunizing pharmacists in private clinical room.",
};

const VACCINES = [
  "Seasonal flu shots (Influenza)",
  "COVID-19 boosters (mRNA)",
  "Shingles (Shingrix)",
  "Pneumococcal / pneumonia",
  "Tetanus, Diphtheria, Pertussis (Tdap)",
  "Travel vaccines & consultations",
];

const PERKS = [
  { icon: Syringe, text: "Certified injection-trained pharmacists" },
  { icon: ShieldCheck, text: "Private, comfortable clinical room" },
  { icon: Users, text: "Adults, seniors, and eligible children" },
  { icon: FileText, text: "Directly reported to BC Health Gateway" },
];

const VACCINE_BOOKING_OPTIONS = [
  {
    name: "Annual Influenza (Flu Shot)",
    slug: "annual-influenza-immunization",
    coverage: "100% Free under BC MSP",
    duration: "15 min",
    desc: "Seasonal influenza immunization for adults, seniors, and children 6 months and older.",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    name: "COVID-19 Booster",
    slug: "covid-19-vaccination",
    coverage: "100% Free under BC MSP",
    duration: "15 min",
    desc: "Updated Health Canada approved seasonal mRNA protection for eligible BC residents.",
    badgeBg: "bg-teal-50 text-teal-800 border-teal-200",
  },
  {
    name: "Shingles (Shingrix)",
    slug: "shingles-immunization-shingrix",
    coverage: "Eligible Seniors & Private Plans",
    duration: "15 min",
    desc: "Two-dose recombinant vaccine providing over 90% protection against shingles and nerve pain.",
    badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
  },
  {
    name: "Travel Vaccines & Consult",
    slug: "travel-immunizations-consult",
    coverage: "Private Consultation",
    duration: "20 min",
    desc: "Destination-specific immunizations including Hepatitis A/B, Typhoid, and Dukoral.",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    name: "Tetanus, Diphtheria, Pertussis (Tdap)",
    slug: "tetanus-diphtheria-pertussis-tdap",
    coverage: "Publicly Funded Booster",
    duration: "15 min",
    desc: "Routine 10-year booster protection for adults and individuals expecting a newborn.",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    name: "Pneumococcal (Pneumonia)",
    slug: "pneumococcal-immunization",
    coverage: "Covered for Adults 65+",
    duration: "15 min",
    desc: "Immunization against invasive pneumococcal disease, pneumonia, and bloodstream infections.",
    badgeBg: "bg-slate-50 text-slate-800 border-slate-200",
  },
];

export default function VaccinationsPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        <section className="mx-auto max-w-7xl px-5 py-12 lg:py-16 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* Left Column: Clinical Copy + Details */}
            <div className="lg:col-span-7 space-y-8">
              <SectionReveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800">
                  <Syringe className="h-3.5 w-3.5 text-teal-600" />
                  <span>Certified Immunization Dispensary</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  Stay Protected with Guaranteed Pharmacy Appointments
                </h1>

                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                  Book your vaccination online in under two minutes, or walk in when it suits your schedule. Our certified immunizing pharmacists administer vaccines in a private, comfortable clinical room with zero unnecessary waiting.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={getBookingUrl("?category=vaccines")}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-200"
                  >
                    <Calendar size={17} />
                    <span>Book on Appointment Platform</span>
                    <ArrowRight size={15} />
                  </Link>
                  <a
                    href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
                  >
                    <Phone size={15} className="text-blue-600" />
                    <span>Call Dispensary: {PHARMACY_INFO.phoneDisplay}</span>
                  </a>
                </div>

                <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 space-y-4">
                  <h2 className="text-lg font-extrabold text-slate-900">Vaccines Offered at iHealth Pharmacy</h2>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {VACCINES.map((v) => (
                      <li
                        key={v}
                        className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs"
                      >
                        <Syringe size={14} className="shrink-0 text-blue-600" />
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="pt-2 grid gap-2.5 sm:grid-cols-2">
                    {PERKS.map((perk) => (
                      <li key={perk.text} className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                        <perk.icon size={16} className="shrink-0 text-teal-600" />
                        <span>{perk.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pharmacist Profile */}
                <div className="mt-8 flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/pharmacists/dev-patel.jpg"
                    alt="Dev Patel, RPh - Injection Certified Pharmacist"
                    className="h-20 w-20 rounded-xl border border-slate-200 object-cover bg-slate-100 shadow-2xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Dev Patel, RPh</h3>
                      <span className="rounded bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                        Certified Immunizer
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">Pharmacy Manager & Clinical Pharmacist</p>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      Administered safely in a private clinical consultation suite. You will be observed for 15 minutes post-vaccination with full vital checks available.
                    </p>
                  </div>
                </div>

                {/* Official Health Gateway Trust Note */}
                <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-4 text-xs text-slate-700 flex items-start gap-3">
                  <FileText className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-slate-900">Automatic BC Provincial Health Record Sync:</strong> All publicly funded and private vaccinations given at iHealth Pharmacy are submitted electronically to the BC Provincial Immunization Registry and appear on your personal Health Gateway account.
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Right Column: Interactive Booking Platform Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <SectionReveal>
                <div className="rounded-3xl border-2 border-blue-600 bg-white p-6 sm:p-7 shadow-xl space-y-5">
                  <div className="flex items-start gap-3.5 border-b border-slate-100 pb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                      <Syringe className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800">
                          Online Appointment Platform
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                          <Clock className="h-3 w-3 text-slate-400" />
                          15 min
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                        Book Your Vaccination Online
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Select a vaccine below to choose your date & time slot with instant confirmation.
                      </p>
                    </div>
                  </div>

                  {/* Quick Pick Vaccination Options */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      SELECT IMMUNIZATION:
                    </div>
                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {VACCINE_BOOKING_OPTIONS.map((v) => (
                        <div
                          key={v.slug}
                          className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition hover:border-blue-400 hover:bg-blue-50/40"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 leading-snug">
                              {v.name}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2">
                              <span className={`rounded border px-1.5 py-0.2 text-[9px] font-bold ${v.badgeBg}`}>
                                {v.coverage}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {v.duration}
                              </span>
                            </div>
                          </div>

                          <Link
                            href={getBookingUrl(`?service=${v.slug}`)}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-bold text-white transition shrink-0 shadow-2xs"
                          >
                            <span>Book</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Button to Open Full Booking Calendar */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <Link
                      href={getBookingUrl("?category=vaccines")}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-200"
                    >
                      <span>Open Full Vaccination Calendar</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <div className="flex items-center justify-center gap-2 text-center text-[11px] font-medium text-slate-500 pt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                      <span>Instant confirmation code and email receipt sent</span>
                    </div>
                  </div>
                </div>

                {/* Dispensary Walk-In & Hours Card */}
                <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white mt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Walk-In Immunizations Welcome
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {PHARMACY_INFO.address.street}, Chilliwack, BC {PHARMACY_INFO.address.postalCode}<br />
                    <strong>Hours:</strong> Mon–Fri 9:00 AM – 5:00 PM (Sat & Sun Closed)<br />
                    <strong>Direct line:</strong> {PHARMACY_INFO.phone}
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
