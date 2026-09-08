"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsletterForm from "./components/NewsletterForm";
import HomeBlogSection from "./components/HomeBlogSection";
import TrustMetricsBar from "./components/TrustMetricsBar";
import PatientCareProgramSection from "./components/PatientCareProgramSection";
import PharmacistTeamSection from "./components/PharmacistTeamSection";
import FAQSection from "./components/FAQSection";
import FloatingPills3D from "./components/FloatingPills3D";
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
  Thermometer,
  Truck,
  Phone,
  Clock,
  MapPin,
  FlaskConical,
  ClipboardCheck,
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Heart,
  Target,
  Eye,
  ShieldCheck,
  Star,
} from "lucide-react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

const SERVICES = [
  {
    title: "Prescription Refills",
    desc: "Ready within the hour, or delivered free to your Abbotsford doorstep.",
    href: "/prescription-refills",
    icon: Pill,
    image: "/services/refills.jpg",
    badge: "Fast Refills",
  },
  {
    title: "Transfer to iHealth",
    desc: "Switch pharmacies in 1 simple step — our team handles all former pharmacy records.",
    href: "/transfer",
    icon: ArrowLeftRight,
    image: "/services/transfer.jpg",
    badge: "1-Step Transfer",
  },
  {
    title: "Minor Ailments Clinic",
    desc: "Walk-in assessment and on-site prescribing for 21 conditions without seeing a doctor.",
    href: "/services/minor-ailments",
    icon: Thermometer,
    image: "/services/minor-ailments.jpg",
    badge: "Walk-in Prescribing",
  },
  {
    title: "Vaccinations & Flu Shots",
    desc: "COVID-19 boosters, shingles, pneumonia, and travel vaccines administered on-site.",
    href: "/vaccinations",
    icon: Syringe,
    image: "/services/vaccinations.jpg",
    badge: "Certified Injections",
  },
  {
    title: "MyHealthPack Blister Packs",
    desc: "Pre-sorted medication cards organized by day and time to avoid missed doses.",
    href: "/services/myhealthpack",
    icon: Package,
    image: "/services/blister-packs.jpg",
    badge: "Complimentary Care",
  },
  {
    title: "Custom Compounding",
    desc: "Specialized dosages, paediatric liquids, veterinary meds, and allergen-free formulas.",
    href: "/services/compounding",
    icon: FlaskConical,
    image: "/services/compounding.jpg",
    badge: "Custom Lab",
  },
  {
    title: "Medication Reviews",
    desc: "In-depth one-on-one consultation, free for eligible BC Fair PharmaCare patients.",
    href: "/services/med-review",
    icon: ClipboardCheck,
    image: "/services/med-review.jpg",
    badge: "1-on-1 Consult",
  },
  {
    title: "Free Prescription Delivery",
    desc: "Complimentary same-day home delivery across Abbotsford for orders over $25.",
    href: "/services/delivery",
    icon: Truck,
    image: "/services/delivery.jpg",
    badge: "Free over $25",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "They texted me before I even got home — my refill was ready for pickup. The staff is always so courteous and genuinely knows our family.",
    name: "Jasmin P.",
    location: "Abbotsford, BC",
    rating: 5,
  },
  {
    quote:
      "The pharmacist remembered my mother's allergy without having to look it up. That level of personal attention is rare today.",
    name: "Daniel O.",
    location: "Clearbrook, Abbotsford",
    rating: 5,
  },
  {
    quote:
      "Transferring my prescription took one quick message. They handled everything with my old clinic and delivered my blister packs the next day.",
    name: "Margaret L.",
    location: "Aldergrove / Abbotsford",
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
          className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-white"
          aria-labelledby="hero-heading"
        >
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
                Your neighborhood independent pharmacy in Abbotsford. Fast prescription refills, 21 prescribable minor ailments on walk-in, and free same-day local delivery.
              </p>

              {/* Dual Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3.5">
                <MagneticButton>
                  <Link
                    href="/prescription-refills"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-hover)] active:scale-[0.98]"
                  >
                    Request Refill
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/transfer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-2xs transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                  >
                    Transfer to iHealth
                  </Link>
                </MagneticButton>
              </div>

              {/* WhatsApp & Hours Helper */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Clock size={14} className="text-[var(--brand)]" />
                  <span>Open Mon–Fri 9am–6pm · Sat 10am–3pm</span>
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

            {/* Hero 3D Graphic & Happy Customer Float */}
            <SectionReveal className="relative mx-auto w-full max-w-lg md:mx-0">
              <FloatingPills3D showHappyCustomerCard />
            </SectionReveal>
          </div>
        </section>

        {/* 2. Trust Metrics Counter Bar */}
        <TrustMetricsBar />

        {/* 3. Services Section ("What We Offer") */}
        <section id="services" className="bg-slate-100/80 pt-20 pb-12 lg:pt-28 lg:pb-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionReveal className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-slate-200 px-3 py-1 mb-4 shadow-2xs">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-mono font-bold text-white">
                  01
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                  What We Offer
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                Reliable Medicine, Expert Guidance
              </h2>
              <p className="mt-3 text-base text-slate-600 sm:text-lg">
                Clinical assessments, specialized compounding, vaccinations, and free Abbotsford delivery — explore our full suite of pharmacy services.
              </p>
            </SectionReveal>

            <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <StaggerItem key={s.title}>
                    <HoverCard className="h-full">
                      <Link
                        href={s.href}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                      >
                        {/* Featured Service Image */}
                        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.image}
                            alt={s.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                          {/* Floating Category Icon */}
                          <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-[var(--brand)] shadow-sm backdrop-blur-xs transition duration-300 group-hover:scale-110 group-hover:bg-[var(--brand)] group-hover:text-white">
                            <Icon size={18} />
                          </div>

                          {/* Feature Badge */}
                          <div className="absolute bottom-2.5 left-3">
                            <span className="inline-flex items-center rounded-md bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-slate-800 shadow-2xs backdrop-blur-xs">
                              {s.badge}
                            </span>
                          </div>

                          {/* Hover Arrow */}
                          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow-sm backdrop-blur-xs transition duration-300 group-hover:opacity-100 group-hover:bg-[var(--brand)] group-hover:text-white">
                            <ArrowUpRight size={16} />
                          </span>
                        </div>

                        {/* Body */}
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-base font-bold text-slate-900 transition group-hover:text-[var(--brand)]">
                            {s.title}
                          </h3>
                          <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-600">
                            {s.desc}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)]">
                            Learn more
                            <span className="transition group-hover:translate-x-0.5">→</span>
                          </span>
                        </div>
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Concept 2 Organic Wave Divider: Transitioning from Services (slate-100) to About (white) */}
        <SectionWaveDivider
          fillColor="text-white"
          backgroundColor="bg-slate-100/80"
          className="h-10 sm:h-16 lg:h-20"
        />

        {/* 4. About Us — "Committed to Quality Care" */}
        <section id="about" className="bg-white pt-6 pb-20 lg:pt-8 lg:pb-28 border-b border-slate-200/60">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-6">
                <SectionReveal>
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200/80 px-3 py-1 mb-4 shadow-2xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-mono font-bold text-white">
                      02
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                      About Our Community Practice
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                    Committed to Quality Community Care
                  </h2>
                  <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
                    iHealth Pharmacy is an independent community pharmacy in Abbotsford, BC. We believe healthcare is fundamentally human — where patients are recognized by name, questions are answered thoroughly, and your health comes first.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {/* Vision Card */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Eye size={18} className="text-[var(--brand)]" />
                        Our Vision
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        To empower every Abbotsford resident with accessible, personalized clinical care that improves quality of life.
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
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <span className="text-xs font-semibold text-[var(--brand)] uppercase tracking-wider">
                          Compliance Packaging
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">
                          Carousel Automatic Pill Dispenser
                        </h3>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                        Senior Friendly
                      </span>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                      <Image
                        src="/carousel-dispenser.jpg"
                        alt="Carousel automatic pill dispenser for senior medication safety"
                        width={600}
                        height={450}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Wave 2: Transitioning from About (white) to Patient Care Program (slate-100) */}
        <SectionWaveDivider
          fillColor="text-slate-100/80"
          backgroundColor="bg-white"
          className="h-10 sm:h-14 lg:h-18"
          flipX={true}
        />

        {/* 5. Patient Care Program ("Membership That Cares More") */}
        <PatientCareProgramSection />

        {/* Wave 3: Transitioning from Patient Care Program (slate-100) to Team (white) */}
        <SectionWaveDivider
          fillColor="text-white"
          backgroundColor="bg-slate-100/80"
          className="h-10 sm:h-14 lg:h-18"
        />

        {/* 6. The Pharmacist ("Meet Our Caring Experts") */}
        <PharmacistTeamSection />

        {/* Wave 4: Transitioning from Team (white) to Why Choose Us (slate-100) */}
        <SectionWaveDivider
          fillColor="text-slate-100/80"
          backgroundColor="bg-white"
          className="h-10 sm:h-14 lg:h-18"
          flipX={true}
        />

        {/* 7. Why Choose Us / Trust Pillars */}
        <section id="why-us" className="bg-slate-100/80 pt-10 pb-16 lg:pt-14 lg:pb-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionReveal className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-slate-200 px-3 py-1 mb-4 shadow-2xs">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-mono font-bold text-white">
                  05
                </span>
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
                  We liaise directly with your Abbotsford family doctor or specialist for renewals and dosage adjustments.
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
                  Free prescription delivery across Abbotsford for orders over $25. Same-day service on weekdays.
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

        {/* 8. Blog / Health Tips ("Stay Informed, Stay Healthy") */}
        <HomeBlogSection />

        {/* Wave 6: Transitioning from Blog (white) to Testimonials (slate-100) */}
        <SectionWaveDivider
          fillColor="text-slate-100/80"
          backgroundColor="bg-white"
          className="h-10 sm:h-14 lg:h-18"
          flipX={true}
        />

        {/* 9. Testimonials ("Healing Stories, Shared Honestly") */}
        <section id="testimonials" className="bg-slate-100/80 pt-10 pb-16 lg:pt-14 lg:pb-20">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <SectionReveal className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-slate-200 px-3 py-1 mb-4 shadow-2xs">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-mono font-bold text-white">
                  07
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                  Patient Testimonials
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Healing Stories, Shared Honestly
              </h2>
              <p className="mt-3 text-base text-slate-600">
                What Abbotsford families, seniors, and caregivers say about their care at iHealth Pharmacy.
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

        {/* 10. FAQ Section */}
        <FAQSection />

        {/* Wave 8: Transitioning from FAQ (white) to Newsletter (slate-100) */}
        <SectionWaveDivider
          fillColor="text-slate-100/80"
          backgroundColor="bg-white"
          className="h-10 sm:h-14 lg:h-18"
          flipX={true}
        />

        {/* 11. Newsletter */}
        <section id="newsletter" className="bg-slate-100/80 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-slate-200 px-3 py-1 mb-4 shadow-2xs">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-mono font-bold text-white">
                  09
                </span>
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

        {/* 12. Contact Hub & Map */}
        <section id="contact" className="bg-white pt-10 pb-20 lg:pt-14 lg:pb-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <SectionReveal>
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200/80 px-3 py-1 mb-4 shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-mono font-bold text-white shadow-2xs">
                    10
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                    Get in Touch
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Come Say Hello.
                </h2>
              <p className="mt-3 text-base text-slate-600">
                Drop by our Clearbrook location, call our clinical desk, or message us directly on WhatsApp.
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
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-dark)] transition"
                >
                  <Phone size={16} />
                  Call {PHARMACY_INFO.phoneDisplay}
                </a>
                <a
                  href={getWhatsAppUrl("Hi iHealth Pharmacy, I have a question about my medication or services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#20bd5a] transition"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </SectionReveal>

            <SectionReveal className="h-full">
              <div className="h-full min-h-[360px] lg:min-h-[440px] flex flex-col overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  title="iHealth Pharmacy Abbotsford location"
                  src="https://maps.google.com/maps?q=2825%20Clearbrook%20Rd%2C%20Abbotsford%2C%20BC%20V2T%206S3&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
