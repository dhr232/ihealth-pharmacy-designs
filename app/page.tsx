"use client";

import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsletterForm from "./components/NewsletterForm";
import HomeBlogSection from "./components/HomeBlogSection";
import HomeHero from "./components/HomeHero";
import HowCanWeHelp from "./components/HowCanWeHelp";
import FAQSection from "./components/FAQSection";
import SectionWaveDivider from "./components/SectionWaveDivider";
import { CARD_TONES, type CardTone } from "./components/cardTones";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "./components/MotionKit";
import {
  Pill,
  RefreshCw,
  ArrowLeftRight,
  Mail,
  Syringe,
  Truck,
  Phone,
  Clock,
  MapPin,
  FlaskConical,
  ArrowUpRight,
  ArrowRight,
  Heart,
  Users,
  ShieldCheck,
  Star,
  Thermometer,
  ClipboardCheck,
} from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

const SERVICE_PAIRS: {
  title: string;
  badge: string;
  badgeIcon: typeof Pill;
  status?: string;
  desc: string;
  highlights: string[];
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  icon: typeof Pill;
  tone: CardTone;
}[] = [
  {
    title: "Minor Ailments Prescribing",
    badge: "Walk-In Clinical Care",
    badgeIcon: Heart,
    status: "No Wait Required",
    desc: "Skip long walk-in clinic waits. Consult directly with our certified prescribing pharmacists for common minor ailments with prescriptions written on-site.",
    highlights: ["Zero Doctor Wait", "Walk-Ins Welcome", "On-Site Prescriptions"],
    href: "/services/minor-ailments",
    cta: "Consult Pharmacist",
    image: "/services/minor-ailments-consult.jpg",
    imageAlt: "Pharmacist consulting a patient about minor ailments",
    icon: Thermometer,
    tone: "blue",
  },
  {
    title: "Medication Review Consultation",
    badge: "One-on-One Pharmacist Care",
    badgeIcon: ShieldCheck,
    status: "30-Minute Visit",
    desc: "Sit down privately with a pharmacist to go over everything you take, check for interactions, and make sure your medications are working well together.",
    highlights: ["Private Consultation", "Interaction Check", "Plain-Language Advice"],
    href: "/services/med-review",
    cta: "Learn More",
    image: "/services/med-review.jpg",
    imageAlt: "Pharmacist reviewing medications with a patient in a private consultation",
    icon: ClipboardCheck,
    tone: "green",
  },
  {
    title: "Prescription Refills",
    badge: "Ready in 30m",
    badgeIcon: Clock,
    desc: "Ready in 30 minutes for counter pickup, or requested online.",
    highlights: ["Counter Pickup", "Online Requests", "WhatsApp Photo Refills"],
    href: "/prescription-refills",
    cta: "Get Started",
    image: "/services/refills.jpg",
    imageAlt: "Pharmacist preparing a prescription refill",
    icon: RefreshCw,
    tone: "purple",
  },
  {
    title: "1-Step Transfer",
    badge: "Zero Hassle",
    badgeIcon: ArrowLeftRight,
    desc: "Switch pharmacies in 1 step \u2014 our team handles all prior files.",
    highlights: ["One Simple Step", "We Contact Your Old Pharmacy"],
    href: "/transfer",
    cta: "Transfer Now",
    image: "/services/transfer.jpg",
    imageAlt: "Pharmacy team member helping a patient transfer a prescription",
    icon: ArrowLeftRight,
    tone: "peach",
  },
  {
    title: "Vaccines & Boosters",
    badge: "Walk-In Ready",
    badgeIcon: Syringe,
    desc: "Walk-in COVID-19, Shingrix, flu shots, routine vaccinations, and travel vaccines.",
    highlights: ["Flu & COVID-19", "Routine Vaccinations", "Shingrix", "Travel Vaccines"],
    href: "/vaccinations",
    cta: "Get Started",
    image: "/services/vaccinations.jpg",
    imageAlt: "Pharmacist giving a vaccine to a patient",
    icon: Syringe,
    tone: "teal",
  },
  {
    title: "Automatic Pill Dispenser",
    badge: "Compliance Packaging",
    badgeIcon: Clock,
    status: "Senior Friendly",
    desc: "A carousel automatic pill dispenser with timed audio and visual alerts and a tamper-resistant safety lock. Available for home medication management and caregiver peace of mind.",
    highlights: ["28 Compartments", "Pharmacist Pre-Filled", "Prevents Double Doses"],
    href: "/contact",
    cta: "Ask About the Dispenser",
    image: "/carousel-dispenser.jpg",
    imageAlt: "Carousel automatic pill dispenser with 28 compartments on a kitchen counter",
    icon: Pill,
    tone: "rose",
  },
];

const ABOUT_STATS = [
  { value: PHARMACY_INFO.address.googleRating, label: "Google Rating", star: true },
  { value: String(PHARMACY_INFO.languages.length), label: "Languages Spoken", star: false },
  { value: "Free", label: "Same-Day Delivery", star: false },
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
      "Transferring my prescription took one quick message. They handled everything with my old clinic and delivered my prescriptions the next day.",
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
        {/* 1. Hero */}
        <HomeHero />

        {/* 2. How can we help */}
        <HowCanWeHelp />

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
                Direct pharmacist access, walk-in prescribing, and one-on-one medication reviews, right here in Chilliwack.
              </p>
            </SectionReveal>

            {/* One row per service: a photo tile and an info tile (alternating sides on desktop) */}
            <div className="mt-10 space-y-5 lg:space-y-6">
              {SERVICE_PAIRS.map((item, i) => {
                const tone = CARD_TONES[item.tone];
                const Icon = item.icon;
                const BadgeIcon = item.badgeIcon;
                return (
                  <SectionReveal key={item.title}>
                    <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-6">
                      {/* Tile 1: photo */}
                      <Link
                        href={item.href}
                        tabIndex={-1}
                        aria-hidden="true"
                        className={`group relative block aspect-[16/10] overflow-hidden rounded-3xl border bg-slate-100 shadow-xs lg:aspect-auto lg:min-h-[19rem] ${tone.pill} ${
                          i % 2 === 1 ? "lg:order-2" : ""
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-3 top-3 flex flex-wrap items-start gap-1.5 sm:inset-x-4 sm:top-4 sm:gap-2">
                          <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-xs font-bold ${tone.badge}`}>
                            <BadgeIcon size={13} />
                            {item.badge}
                          </span>
                          {item.status && (
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--foreground)] px-3 py-1 text-xs font-bold text-white">
                              <Clock size={13} />
                              {item.status}
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Tile 2: info */}
                      <div className={`relative flex flex-col overflow-hidden rounded-3xl border p-5 shadow-xs sm:p-7 ${tone.card}`}>
                        <span className={`pointer-events-none absolute -top-10 -right-8 h-28 w-28 rounded-full opacity-80 ${tone.blob}`} aria-hidden="true" />
                        <span className={`pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full opacity-60 ${tone.blob}`} aria-hidden="true" />

                        <div className="relative flex items-center gap-3">
                          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm ${tone.icon}`}>
                            <Icon size={20} />
                          </span>
                          <h3 className="text-xl font-bold leading-tight text-[var(--foreground)] sm:text-2xl">{item.title}</h3>
                        </div>
                        <p className="relative mt-3 text-base leading-relaxed text-slate-600">{item.desc}</p>

                        <div className="relative mt-4 flex flex-wrap gap-2">
                          {item.highlights.map((h) => (
                            <span
                              key={h}
                              className={`rounded-full border bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 sm:text-sm ${tone.pill}`}
                            >
                              {h}
                            </span>
                          ))}
                        </div>

                        <div className="relative mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
                          <Link
                            href={item.href}
                            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${tone.btn}`}
                          >
                            {item.cta}
                            <ArrowRight size={16} />
                          </Link>
                          <Link
                            href={item.href}
                            className={`inline-flex min-h-11 items-center gap-1 text-sm font-semibold ${tone.link}`}
                          >
                            Service details
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>

            {/* Utility Strip: Specialized Services */}
            <SectionReveal className="mt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white px-5 py-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <FlaskConical size={18} />
                  </div>
                  <div className="text-sm text-slate-700">
                    <span className="font-bold text-slate-900">Looking for specialized clinical care?</span>{" "}
                    We also formulate custom compounded therapies, and deliver prescriptions free across Chilliwack and Sardis.
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/services/compounding"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 min-h-11 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition"
                  >
                    <span>Custom Compounding</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <Link
                    href="/services/delivery"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 min-h-11 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition"
                  >
                    <Truck size={13} />
                    <span>Free Delivery</span>
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

        {/* 4. About Us: "Committed to Quality Community Care" */}
        <section id="about" className="bg-white pt-6 pb-16 lg:pt-8 lg:pb-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionReveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F4F8FF] via-[#F8FBFF] to-[#EAF1FF] px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
                <span className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-[#D9E6FF]/70" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-[#E4EDFF]/80" aria-hidden="true" />

                <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white border border-[#C7D2F7] px-3.5 py-1 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                        About Our Community Practice
                      </span>
                    </div>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                      Committed to Quality Community Care
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                      iHealth Pharmacy is an independent community pharmacy in Chilliwack, BC. We believe healthcare is fundamentally human &mdash; where patients are recognized by name, questions are answered thoroughly, and your health comes first.
                    </p>
                    <Link
                      href="/about"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#152238]"
                    >
                      <span>Learn More About Us</span>
                      <ArrowRight size={16} />
                    </Link>

                    <dl className="mt-8 grid grid-cols-3 gap-4">
                      {ABOUT_STATS.map((stat) => (
                        <div key={stat.label}>
                          <dt className="flex items-center gap-1 text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">
                            {stat.value}
                            {stat.star && <Star size={20} className="text-amber-400" fill="currentColor" />}
                          </dt>
                          <dd className="mt-1 text-sm text-slate-600">{stat.label}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="relative">
                    <span className="pointer-events-none absolute -top-6 -left-5 h-24 w-28 rounded-full bg-[#D5E4FF]" aria-hidden="true" />
                    <span className="pointer-events-none absolute -right-4 -bottom-7 h-28 w-36 rounded-full bg-[#D5E4FF]" aria-hidden="true" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/community-care.jpg"
                      alt="Pharmacist handing medication to a patient at iHealth"
                      loading="lazy"
                      className="relative h-72 w-full object-cover object-center sm:h-80 [border-radius:7.5rem_1.5rem_7.5rem_1.5rem]"
                    />
                    <div className="absolute bottom-5 left-4 flex max-w-[16rem] items-center gap-3 rounded-2xl bg-white/95 px-3 py-3 shadow-lg">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
                        <Users size={20} />
                      </span>
                      <p className="text-sm font-semibold leading-snug text-[var(--foreground)]">
                        Your Health
                        <span className="block text-[var(--brand)]">Stronger Communities</span>
                        Brighter Tomorrows
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

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
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[var(--brand-hover)] transition"
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
