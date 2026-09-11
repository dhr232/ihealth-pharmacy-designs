"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BlurReveal, StaggerContainer, StaggerItem, HoverCard } from "../components/MotionKit";
import {
  Stethoscope,
  FlaskConical,
  Syringe,
  Package,
  HeartPulse,
  Truck,
  ArrowRight,
} from "lucide-react";

const ALL_SERVICES = [
  {
    title: "Minor Ailments Clinic",
    slug: "minor-ailments",
    desc: "Direct assessment and prescription for 21 common ailments including UTIs, shingles, cold sores, acid reflux, allergies, and conjunctivitis without needing a doctor appointment.",
    icon: Stethoscope,
    badge: "Walk-ins Welcome",
    image: "/services/minor-ailments.jpg",
  },
  {
    title: "Custom Compounding",
    slug: "compounding",
    desc: "Customized medication formulations tailored to your exact strength, allergy-free excipients, paediatric liquids, veterinary meds, and topical pain creams.",
    icon: FlaskConical,
    badge: "Custom Lab",
    image: "/services/compounding.jpg",
  },
  {
    title: "Vaccinations & Injections",
    slug: "vaccinations",
    desc: "Publicly funded flu shots, COVID-19 boosters, shingles, pneumonia, HPV, and travel vaccines administered safely by certified pharmacists.",
    icon: Syringe,
    badge: "Walk-ins & Booking",
    image: "/services/vaccinations.jpg",
  },
  {
    title: "MyHealthPack Blister Packaging",
    slug: "myhealthpack",
    desc: "Pre-sorted medication blister cards organized by date and time (morning, noon, evening, bedtime) to make managing daily medications effortless and safe.",
    icon: Package,
    badge: "Complimentary Service",
    image: "/services/blister-packs.jpg",
  },
  {
    title: "Medication Review & Injections",
    slug: "med-review",
    desc: "Comprehensive one-on-one review of all your prescription drugs, over-the-counter supplements, and chronic condition management under BC PharmaCare.",
    icon: HeartPulse,
    badge: "1-on-1 Consult",
    image: "/services/med-review.jpg",
  },
  {
    title: "Free Prescription Delivery",
    slug: "delivery",
    desc: "Fast, reliable same-day prescription delivery anywhere in Abbotsford for orders over $25. Place requests before 2:00 PM for afternoon delivery.",
    icon: Truck,
    badge: "Free over $25",
    image: "/services/delivery.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-slate-50/70 py-16 lg:py-20 border-b border-slate-200/60">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <BlurReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-3.5 py-1 text-xs font-semibold text-[var(--brand)]">
                Clinical Pharmacy Care
              </span>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Comprehensive Healthcare Services
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-3">
              <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
                From walk-in minor ailment prescribing and custom compounding to blister packs and free home delivery in Abbotsford.
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 max-w-7xl mx-auto px-5 lg:px-8">
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ALL_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.slug} className="flex flex-col">
                  <HoverCard className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition duration-200 hover:border-slate-300 hover:shadow-md">
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                      <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-[var(--brand)] shadow-sm backdrop-blur-xs">
                        <Icon size={20} />
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-2xs backdrop-blur-xs">
                          {s.badge}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/services/${s.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand)] hover:underline"
                        >
                          <span>Learn details & clinical criteria</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      </main>

      <Footer />
    </div>
  );
}
