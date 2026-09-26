"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsletterForm from "./components/NewsletterForm";
import HomeBlogSection from "./components/HomeBlogSection";
import TrustMetricsBar from "./components/TrustMetricsBar";
import PharmacistTeamSection from "./components/PharmacistTeamSection";
import FAQSection from "./components/FAQSection";
import PharmacyLocationHeroCard from "./components/PharmacyLocationHeroCard";
import SectionWaveDivider from "./components/SectionWaveDivider";
import {
  BlurReveal,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  MagneticButton,
} from "./components/MotionKit";
import {
  Pill,
  ArrowLeftRight,
  Mail,
  Syringe,
  Package,
  Truck,
  Phone,
  Clock,
  MapPin,
  FlaskConical,
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Heart,
  Target,
  Eye,
  ShieldCheck,
  Star,
  Thermometer,
  ClipboardCheck,
} from "lucide-react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

const FEATURED_SERVICES = [
  {
    title: "Minor Ailments Prescribing",
    badge: "Walk-In Clinical Care",
    badgeStyle: "bg-[#EDF3FF] text-[#3D5FE0] border-[#C5D5F9]",
    statusPill: "No Wait Required",
    desc: "Skip long walk-in clinic waits. Consult directly with our certified prescribing pharmacists for common minor ailments with prescriptions written on-site.",
    highlights: ["Zero Doctor Wait", "Walk-Ins Welcome", "On-Site Prescriptions"],
    href: "/services/minor-ailments",
    cta: "Consult Pharmacist",
    image: "/services/minor-ailments.jpg",
    icon: Thermometer,
    theme: {
      card: "border-[#D9E4FA] bg-gradient-to-br from-white via-[#F8FAFF] to-[#EDF3FF] hover:border-[#B8CEF8]",
      btn: "bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 text-white shadow-md shadow-blue-500/20",
      accent: "text-[var(--brand)]",
    },
  },
  {
    title: "Free Same-Day Delivery",
    badge: "Free Chilliwack & Sardis Delivery",
    badgeStyle: "bg-[#EAF8F1] text-[#238150] border-[#CEEEDC]",
    statusPill: "Same-Day Dispatch",
    desc: "Prescriptions, recurring refills, and compliance blister packs delivered free directly to your door in temperature-monitored packaging across Chilliwack.",
    highlights: ["Chilliwack & Sardis", "Blister Packs & Refills", "Always Free"],
    href: "/services/delivery",
    cta: "Request Delivery",
    image: "/services/delivery-doorstep.jpg",
    icon: Truck,
    theme: {
      card: "border-[#D3EEDF] bg-gradient-to-br from-white via-[#F6FCF8] to-[#EAF8F1] hover:border-[#AEE1C7]",
      btn: "bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-400 hover:from-emerald-600 hover:via-emerald-500 hover:to-teal-300 text-white shadow-md shadow-emerald-500/20",
      accent: "text-[#238150]",
    },
  },
];

const QUICK_SERVICES = [
  {
    title: "Prescription Refills",
    desc: "Ready in 30 minutes for counter pickup, or requested online.",
    badge: "Ready in 30m",
    href: "/prescription-refills",
    icon: Pill,
    iconColor: "text-[var(--brand)]",
    iconBg: "bg-[#EDF3FF]",
  },
  {
    title: "1-Step Transfer",
    desc: "Switch pharmacies in 1 step — our team handles all prior files.",
    badge: "Zero Hassle",
    href: "/transfer",
    icon: ArrowLeftRight,
    iconColor: "text-[#238150]",
    iconBg: "bg-[#EAF8F1]",
  },
  {
    title: "Vaccines & Boosters",
    desc: "Walk-in COVID-19, Shingrix, flu shots, and travel vaccines.",
    badge: "Walk-In Ready",
    href: "/vaccinations",
    icon: Syringe,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
  },
  {
    title: "Blister Compliance Packs",
    desc: "Pre-sorted weekly medication cards organized by day and time.",
    badge: "Complimentary",
    href: "/services/myhealthpack",
    icon: Package,
    iconColor: "text-teal-700",
    iconBg: "bg-teal-50",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "They texted me before I even got home — my refill was ready for pickup. The staff is always so courteous and genuinely knows our family.",
    name: "Jasmin P.",
    location: "Chilliwack, BC",
    rating: 5,
  },
  {
    quote:
      "The pharmacist remembered my mother's allergy without having to look it up. That level of personal attention is rare today.",
    name: "Daniel O.",
    location: "Yale Rd, Chilliwack",
    rating: 5,
  },
  {
    quote:
      "Transferring my prescription took one quick message. They handled everything with my old clinic and delivered my blister packs the next day.",
    name: "Margaret L.",
    location: "Sardis / Chilliwack",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="bg-white text-[var(--foreground)] antialiased" id="top">
      <Header />

      <main>
        {/* 1. Hero Section */}
        <section
          id="hero"
          className="relative overflow-hidden bg-gradient-to-b from-[#F2F6FC] via-[#F8FAFD] to-white"
          aria-labelledby="hero-heading"
        >
          {/* Subtle Geometric Grid Atmosphere */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(61, 95, 224, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(61, 95, 224, 0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pt-20 pb-16 md:grid-cols-2 md:items-center md:pt-24 md:pb-24 lg:px-8">
            <BlurReveal className="flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-subtle)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                <Sparkles size={14} />
                Health Solutions, Human Touch
              </span>

              <h1
                id="hero-heading"
                className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
              >
                Care that knows your name,
                <br />
                <span className="text-[var(--brand)]">today and tomorrow.</span>
              </h1>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                Skip the clinic wait. Walk in to consult directly with our prescribing pharmacists for everyday ailments, manage refills in minutes, and enjoy free same-day delivery across Chilliwack.
              </p>

              {/* Dual Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3.5">
                <MagneticButton>
                  <Link
                    href="/prescription-refills"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200 active:scale-[0.98]"
                  >
                    Request Refill
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/transfer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-blue-400 hover:text-blue-700 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-2xs transition-all duration-200 active:scale-[0.98]"
                  >
                    Transfer to iHealth
                  </Link>
                </MagneticButton>
              </div>

              {/* WhatsApp & Hours Helper */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Clock size={14} className="text-[var(--brand)]" />
                  <span>Open {PHARMACY_INFO.hoursShort}</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#128C7E] hover:underline"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>
            </BlurReveal>

            {/* Hero Modern Pharmacy Location Card */}
            <SectionReveal className="relative mx-auto w-full max-w-lg md:mx-0">
              <PharmacyLocationHeroCard />
            </SectionReveal>
          </div>
        </section>

        {/* 2. Trust Metrics Counter Bar */}
        <TrustMetricsBar />

        {/* 3. Services Section ("What We Offer") */}
        <section id="services" className="bg-slate-100/80 pt-20 pb-12 lg:pt-28 lg:pb-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionReveal className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full bg-white/95 border border-slate-200 px-3.5 py-1 mb-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                  What We Offer
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                Care Tailored to Your Everyday Life
              </h2>
              <p className="mt-3 text-base text-slate-600 sm:text-lg">
                Direct pharmacist access, walk-in prescribing, and complimentary same-day delivery across Chilliwack.
              </p>
            </SectionReveal>

            {/* Top Row: 2 Featured Bento Hero Cards */}
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {FEATURED_SERVICES.map((item) => (
                <SectionReveal key={item.title}>
                  <div
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border ${item.theme.card} p-6 sm:p-7 shadow-xs transition duration-300 hover:shadow-xl`}
                  >
                    <div>
                      {/* Image Preview Banner */}
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold border backdrop-blur-xs ${item.badgeStyle}`}
                          >
                            <item.icon size={13} />
                            <span>{item.badge}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {item.statusPill}
                          </span>
                        </div>
                      </div>

                      {/* Content Header */}
                      <div className="mt-5">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 transition group-hover:text-[var(--brand)]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {item.desc}
                        </p>
                      </div>

                      {/* Highlights / Quick Chips */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.highlights.map((h) => (
                          <span
                            key={h}
                            className="inline-flex items-center rounded-lg border border-slate-200/90 bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between gap-3">
                      <Link
                        href={item.href}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition duration-200 ${item.theme.btn}`}
                      >
                        <span>{item.cta}</span>
                        <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={item.href}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition flex items-center gap-1"
                      >
                        <span>Service details</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Bottom Row: 4 Fast-Action Bento Tiles */}
            <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <StaggerItem key={s.title}>
                    <HoverCard className="h-full">
                      <Link
                        href={s.href}
                        className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                      >
                        <div>
                          {/* Top Row: Icon + Badge */}
                          <div className="flex items-center justify-between gap-2 mb-3.5">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.iconBg} ${s.iconColor} transition duration-200 group-hover:scale-105`}
                            >
                              <Icon size={20} />
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                              {s.badge}
                            </span>
                          </div>

                          {/* Title & Desc */}
                          <h4 className="text-sm font-bold text-slate-900 transition group-hover:text-[var(--brand)]">
                            {s.title}
                          </h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                            {s.desc}
                          </p>
                        </div>

                        {/* Text Link */}
                        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--brand)]">
                          <span>Get started</span>
                          <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Utility Strip: Specialized Services */}
            <SectionReveal className="mt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white px-5 py-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <FlaskConical size={18} />
                  </div>
                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900">Looking for specialized clinical care?</span>{" "}
                    We also formulate custom compounded therapies and perform comprehensive medication reviews.
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/services/compounding"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition"
                  >
                    <span>Custom Compounding</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <Link
                    href="/services/med-review"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition"
                  >
                    <ClipboardCheck size={13} />
                    <span>Medication Review</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Concept 2 Organic Wave Divider: Transitioning from Services (slate-100) to About (white) */}
        <SectionWaveDivider
          fillColor="text-white"
          backgroundColor="bg-slate-100/80"
          className="h-10 sm:h-16 lg:h-20"
        />

        {/* 4. About Us — "Committed to Quality Care" */}
        <section id="about" className="bg-white pt-6 pb-20 lg:pt-8 lg:pb-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-6">
                <SectionReveal>
                  <div className="inline-flex items-center rounded-full bg-[#E8ECFB] border border-[#C7D2F7] px-3.5 py-1 mb-4 shadow-2xs">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                      About Our Community Practice
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                    Committed to Quality Community Care
                  </h2>
                  <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
                    iHealth Pharmacy is an independent community pharmacy in Chilliwack, BC. We believe healthcare is fundamentally human — where patients are recognized by name, questions are answered thoroughly, and your health comes first.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {/* Vision Card */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Eye size={18} className="text-[var(--brand)]" />
                        Our Vision
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        To empower every Chilliwack resident with accessible, personalized clinical care that improves quality of life.
                      </p>
                    </div>

                    {/* Mission Card */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Target size={18} className="text-[var(--brand)]" />
                        Our Mission
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        Delivering accurate, timely medications, clear health education, and empathetic care in English, Punjabi, and Hindi.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-[var(--brand-hover)] transition"
                    >
                      <span>Read our full story</span>
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="#team"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-[var(--brand)] hover:text-[var(--brand)] transition"
                    >
                      <span>Meet the Pharmacists</span>
                    </Link>
                  </div>
                </SectionReveal>
              </div>

              {/* Right Column Graphic / Pill Dispenser Preview */}
              <div className="lg:col-span-6">
                <SectionReveal>
                  <HoverCard className="h-full">
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10">
                      {/* Top Header Row with Subtle Glow & Pulse Badge */}
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
                              Compliance Packaging
                            </span>
                            <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
                              Smart Health Tech
                            </span>
                          </div>
                          <h3 className="mt-1.5 text-lg sm:text-xl font-extrabold text-slate-900 transition-colors group-hover:text-blue-900">
                            Carousel Automatic Pill Dispenser
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-bold text-emerald-700 shadow-2xs">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          Senior Friendly
                        </span>
                      </div>

                      {/* Interactive Image Container with Zoom & Floating Smart Overlays */}
                      <div className="relative mt-5 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-inner group/img">
                        <Image
                          src="/carousel-dispenser.jpg"
                          alt="Carousel automatic pill dispenser for senior medication safety"
                          width={600}
                          height={450}
                          className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Subtle Gradient Vignette Overlay on Hover */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-900/20 opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                        {/* Floating Top-Left Tag: Automated Chimes & Alert */}
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-[11px] font-bold text-slate-800 shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                          <Clock size={13} className="text-blue-600" />
                          <span>Timed Audio & Visual Alerts</span>
                        </div>

                        {/* Floating Bottom-Right Tag: Tamper-Proof Lock */}
                        <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 rounded-xl bg-slate-900/85 px-3 py-1.5 text-[11px] font-bold text-white shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                          <ShieldCheck size={13} className="text-emerald-400" />
                          <span>Tamper-Resistant Safety Lock</span>
                        </div>
                      </div>

                      {/* Feature Highlights Pills */}
                      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 rounded-xl bg-white border border-slate-200/80 px-3 py-2 text-slate-700 shadow-2xs transition group-hover:border-blue-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="font-semibold text-[11px]">28 Compartments</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-xl bg-white border border-slate-200/80 px-3 py-2 text-slate-700 shadow-2xs transition group-hover:border-blue-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="font-semibold text-[11px]">Pharmacist Pre-Filled</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 rounded-xl bg-white border border-slate-200/80 px-3 py-2 text-slate-700 shadow-2xs transition group-hover:border-blue-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                          <span className="font-semibold text-[11px]">Prevents Double Doses</span>
                        </div>
                      </div>

                      {/* Action Bar with Luminous CTA Gradient */}
                      <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-xs text-slate-500 leading-snug">
                          Available for home medication management and caregiver peace of mind.
                        </p>
                        <Link
                          href="/services/myhealthpack"
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-700/20 transition-all duration-200 active:scale-95 shrink-0"
                        >
                          <span>Learn About Packaging</span>
                          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </HoverCard>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Pharmacist ("Meet Our Caring Experts") */}
        <PharmacistTeamSection />

        {/* Wave 4: Transitioning from Team (white) to Why Choose Us (slate-100) */}
        <SectionWaveDivider
          fillColor="text-slate-100/80"
          backgroundColor="bg-white"
          className="h-10 sm:h-14 lg:h-18"
          flipX={true}
        />

        {/* 6. Why Choose Us / Trust Pillars */}
        <section id="why-us" className="bg-slate-100/80 pt-10 pb-16 lg:pt-14 lg:pb-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionReveal className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full bg-white/95 border border-slate-200 px-3.5 py-1 mb-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Care That Truly Matters
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Experience the difference of a locally owned pharmacy dedicated to quick turnarounds, accurate dispensing, and patient dignity.
              </p>
            </SectionReveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)] mb-3">
                  <Clock size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">Under 15-Min Refills</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  No long lines or wasted hours. Most prescription orders are ready for pickup within 15 minutes.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)] mb-3">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">Direct Doctor Line</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  We liaise directly with your Chilliwack family doctor or specialist for renewals and dosage adjustments.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)] mb-3">
                  <Heart size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">Multilingual Care</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Speak comfortably with our pharmacists in English, Punjabi (ਪੰਜਾਬੀ), or Hindi (हिन्दी).
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)] mb-3">
                  <Truck size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">Free Home Delivery</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Free prescription delivery across Chilliwack, with no minimum order. Same-day service on weekdays.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wave 5: Transitioning from Why Choose Us (slate-100) to Blog (white) */}
        <SectionWaveDivider
          fillColor="text-white"
          backgroundColor="bg-slate-100/80"
          className="h-10 sm:h-14 lg:h-18"
        />

        {/* 7. Blog / Health Tips ("Stay Informed, Stay Healthy") */}
        <HomeBlogSection />

        {/* Wave 6: Transitioning from Blog (white) to Testimonials (slate-100) */}
        <SectionWaveDivider
          fillColor="text-slate-100/80"
          backgroundColor="bg-white"
          className="h-10 sm:h-14 lg:h-18"
          flipX={true}
        />

        {/* 8. Testimonials ("Healing Stories, Shared Honestly") */}
        <section id="testimonials" className="bg-slate-100/80 pt-10 pb-16 lg:pt-14 lg:pb-20">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <SectionReveal className="text-center">
              <div className="inline-flex items-center rounded-full bg-white/95 border border-slate-200 px-3.5 py-1 mb-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                  Patient Testimonials
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Healing Stories, Shared Honestly
              </h2>
              <p className="mt-3 text-base text-slate-600">
                What Chilliwack families, seniors, and caregivers say about their care at iHealth Pharmacy.
              </p>
            </SectionReveal>

            <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <StaggerItem key={t.name}>
                  <HoverCard className="h-full">
                    <figure className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-3">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} size={15} fill="currentColor" />
                          ))}
                        </div>
                        <blockquote className="text-sm leading-relaxed text-slate-700">
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>
                      </div>

                      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200/70 pt-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-xs font-bold text-[var(--brand)]">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{t.name}</p>
                          <p className="text-[11px] text-slate-500">{t.location}</p>
                        </div>
                      </figcaption>
                    </figure>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Wave 7: Transitioning from Testimonials (slate-100) to FAQ (white) */}
        <SectionWaveDivider
          fillColor="text-white"
          backgroundColor="bg-slate-100/80"
          className="h-10 sm:h-14 lg:h-18"
        />

        {/* 9. FAQ Section */}
        <FAQSection />

        {/* Wave 8: Transitioning from FAQ (white) to Newsletter (slate-100) */}
        <SectionWaveDivider
          fillColor="text-slate-100/80"
          backgroundColor="bg-white"
          className="h-10 sm:h-14 lg:h-18"
          flipX={true}
        />

        {/* 10. Newsletter */}
        <section id="newsletter" className="bg-slate-100/80 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <SectionReveal>
              <div className="inline-flex items-center rounded-full bg-white/95 border border-slate-200 px-3.5 py-1 mb-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                  Wellness Newsletter
                </span>
              </div>
              <Mail className="mx-auto h-8 w-8 text-[var(--brand)]" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                Subscribe for Wellness & Care Insights
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Get seasonal health advisories, BC Fair PharmaCare updates, and vaccination alerts directly to your inbox.
              </p>
              <div className="mt-8">
                <NewsletterForm />
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Wave 9: Transitioning from Newsletter (slate-100) to Contact (white) */}
        <SectionWaveDivider
          fillColor="text-white"
          backgroundColor="bg-slate-100/80"
          className="h-10 sm:h-14 lg:h-18"
        />

        {/* 11. Contact Hub & Map */}
        <section id="contact" className="bg-white pt-10 pb-20 lg:pt-14 lg:pb-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <SectionReveal>
                <div className="inline-flex items-center rounded-full bg-[#E8ECFB] border border-[#C7D2F7] px-3.5 py-1 mb-4 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                    Get in Touch
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Come Say Hello.
                </h2>
                <p className="mt-3 text-base text-slate-600">
                  Drop by our Chilliwack location or call our clinical desk directly.
                </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <div>
                    <strong className="block text-xs font-semibold text-slate-900">Address</strong>
                    <a
                      href={PHARMACY_INFO.address.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-700 hover:text-[var(--brand)] transition"
                    >
                      {PHARMACY_INFO.address.full}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <div>
                    <strong className="block text-xs font-semibold text-slate-900">Phone</strong>
                    <a
                      href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                      className="text-sm text-slate-700 hover:text-[var(--brand)] underline underline-offset-2 transition"
                    >
                      {PHARMACY_INFO.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <div>
                    <strong className="block text-xs font-semibold text-slate-900">Email</strong>
                    <a
                      href={`mailto:${PHARMACY_INFO.email}`}
                      className="text-sm text-slate-700 hover:text-[var(--brand)] underline underline-offset-2 transition"
                    >
                      {PHARMACY_INFO.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <div>
                    <strong className="block text-xs font-semibold text-slate-900">Operating Hours</strong>
                    <div className="mt-0.5 text-sm text-slate-700 space-y-0.5">
                      {PHARMACY_INFO.hours.map((h) => (
                        <div key={h.days}>
                          <span className="font-medium text-slate-800">{h.days}:</span> {h.time}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-dark)] transition"
                >
                  <Phone size={16} />
                  Call {PHARMACY_INFO.phoneDisplay}
                </a>
                <a
                  href={PHARMACY_INFO.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-2xs hover:border-[var(--brand)] hover:text-[var(--brand)] transition"
                >
                  <MapPin size={16} className="text-[var(--brand)]" />
                  Get Directions
                </a>
              </div>
            </SectionReveal>

            <SectionReveal className="h-full">
              <div className="h-full min-h-[360px] lg:min-h-[440px] flex flex-col overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  title="iHealth Pharmacy Chilliwack location"
                  src="https://maps.google.com/maps?q=45619%20Yale%20Rd%20%23101%2C%20Chilliwack%2C%20BC%20V2P%200B1&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="min-h-[300px] flex-1 border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span>{PHARMACY_INFO.address.parkingNotes}</span>
                  <a
                    href={PHARMACY_INFO.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--brand)] hover:underline inline-flex items-center gap-1"
                  >
                    Open in Maps
                    <ArrowUpRight size={13} />
                  </a>
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
