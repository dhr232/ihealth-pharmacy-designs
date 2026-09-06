"use client";

import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RefillForm from "./components/RefillForm";
import NewsletterForm from "./components/NewsletterForm";
import FloatingPills3D from "./components/FloatingPills3D";
import { BlurReveal, SectionReveal, StaggerContainer, StaggerItem, HoverCard, MagneticButton } from "./components/MotionKit";
import CountUp from "./components/CountUp";
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
  CheckCircle,
  FlaskConical,
  ClipboardCheck,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

const NUMBERED_SERVICES = [
  { number: "01", title: "Easy Prescription Refills", body: "Request refills online, by phone, or in person — we check every detail and have it ready fast.", href: "/prescription-refills" },
  { number: "02", title: "Transfer to iHealth", body: "Give us your pharmacy name and we move your prescriptions over, often the same day.", href: "/transfer" },
  { number: "03", title: "Med & Refill Reminders", body: "Automatic texts and calls so you never miss a dose or run out unexpectedly.", href: "/services/myhealthpack" },
  { number: "04", title: "Minor Ailment Clinic", body: "Walk in and see a pharmacist who can assess and prescribe for common minor ailments.", href: "/services/minor-ailments" },
  { number: "05", title: "Vaccinations", body: "Flu shots, COVID-19 boosters, travel vaccines, and more — walk in or book ahead.", href: "/vaccinations" },
];

const SERVICES = [
  {
    title: "Prescription Refills",
    desc: "Ready within the hour, or delivered free to your door.",
    href: "/prescription-refills",
    icon: Pill,
    gradient: "from-red-500/70 to-red-700/70",
  },
  {
    title: "Transfer to iHealth",
    desc: "Switch pharmacies in one request — we handle the paperwork.",
    href: "/transfer",
    icon: ArrowLeftRight,
    gradient: "from-slate-500/70 to-slate-700/70",
  },
  {
    title: "Vaccinations",
    desc: "Flu shots, COVID-19 boosters, shingles, and travel vaccines.",
    href: "/vaccinations",
    icon: Syringe,
    gradient: "from-teal-500/70 to-teal-700/70",
  },
  {
    title: "Minor Ailments Clinic",
    desc: "Walk-in prescribing for everyday conditions. No doctor visit.",
    href: "/services/minor-ailments",
    icon: Thermometer,
    gradient: "from-rose-500/70 to-rose-700/70",
  },
  {
    title: "MyHealthPack",
    desc: "Blister packs sorted by day and time, with automatic refills.",
    href: "/services/myhealthpack",
    icon: Package,
    gradient: "from-amber-500/70 to-amber-700/70",
  },
  {
    title: "Compounding",
    desc: "Custom dosages, flavours, and dosage forms made for you.",
    href: "/services/compounding",
    icon: FlaskConical,
    gradient: "from-indigo-500/70 to-indigo-700/70",
  },
  {
    title: "Medication Review",
    desc: "One-on-one pharmacist consultation, free with Pharmacare.",
    href: "/services/med-review",
    icon: ClipboardCheck,
    gradient: "from-emerald-500/70 to-emerald-700/70",
  },
  {
    title: "Prescription Delivery",
    desc: "Free same-day delivery across Abbotsford.",
    href: "/services/delivery",
    icon: Truck,
    gradient: "from-sky-500/70 to-sky-700/70",
  },
];

const STATS = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "k+", label: "Happy Customers" },
  { value: 50, suffix: "k+", label: "Prescriptions Filled" },
  { value: 800, suffix: "+", label: "Health Care Products" },
];

const TESTIMONIALS = [
  { quote: "They texted me before I even got home — my refill was ready for pickup.", name: "Jasmin P.", location: "Abbotsford, BC" },
  { quote: "The pharmacist remembered my son's allergy without looking it up. That kind of care is rare.", name: "Daniel O.", location: "Abbotsford, BC" },
  { quote: "Transferring took one phone call. They did everything else for me.", name: "Margaret L.", location: "Aldergrove, BC" },
];

export default function FriendlyPage() {
  return (
    <div className="bg-white text-[var(--foreground)] antialiased" id="top">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-white" aria-labelledby="hero-heading">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 pt-28 pb-16 md:grid-cols-2 md:items-center md:pt-32 md:pb-20 lg:px-8">
          <BlurReveal className="flex flex-col items-start">
            <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
              Your health, simplified
            </span>
            <h1 id="hero-heading" className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Care that knows your name,
              <br />
              today and tomorrow.
            </h1>
            <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
              Personalized pharmacy care for every member of your family — prescriptions, reminders, and trusted advice.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/prescription-refills"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
                >
                  Request Refill
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/transfer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                >
                  Transfer to iHealth
                </Link>
              </MagneticButton>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--muted)]">
              <span className="flex h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Prefer WhatsApp?</span>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#128C7E] transition hover:text-green-700 hover:underline"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                Chat with a pharmacist
              </a>
            </div>
          </BlurReveal>

          <SectionReveal className="relative mx-auto w-full max-w-lg md:mx-0">
            <FloatingPills3D showHappyCustomerCard />
          </SectionReveal>
        </div>
      </section>

      {/* Numbered Services */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionReveal className="text-center">
          <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">Our Services</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">All the services you will get</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            Everything a modern pharmacy should do — prescriptions, clinical care, and everyday health support.
          </p>
        </SectionReveal>

          <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {NUMBERED_SERVICES.map((s) => (
            <StaggerItem key={s.number}>
              <HoverCard>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--brand)] hover:shadow-lg"
                >
                  <span className="text-3xl font-bold text-[var(--brand)]/30 transition group-hover:text-[var(--brand)]">{s.number}</span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--muted)]">{s.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]">
                    Learn More
                    <span className="transition group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Why We Are Better / Stats */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center lg:px-8">
          <SectionReveal className="mx-auto w-full max-w-md md:mx-0">
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-4xl font-bold text-[var(--brand)]">iH</div>
                <p className="mt-4 text-sm font-medium text-[var(--muted)]">iHealth Pharmacy</p>
                <p className="text-xs text-[var(--muted)]">Logo placeholder</p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">Why iHealth</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Why we are better</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              We combine modern pharmacy tools with old-fashioned attention. You get convenience, accuracy, and a pharmacist who actually knows your name.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[var(--border)] bg-white p-5 text-center">
                  <p className="text-3xl font-bold text-[var(--brand)]">
                    <CountUp value={stat.value} suffix={stat.suffix} duration={1.5} />
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Services — interactive grid with photo placeholders */}
      <section id="services" className="bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionReveal className="text-center">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">What We Do</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Everything your pharmacy should do</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
              Clinical care, everyday refills, and free delivery — click any service to learn more or start a request.
            </p>
          </SectionReveal>

          <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <StaggerItem key={s.title}>
                <HoverCard>
                  <Link
                    href={s.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Photo placeholder: gradient + icon + subtle pattern */}
                    <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${s.gradient}`}>
                      {/* dot pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                          backgroundSize: "14px 14px",
                        }}
                      />
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition duration-300 group-hover:scale-110">
                        <s.icon size={32} className="text-white" />
                      </span>
                      {/* hover arrow chip */}
                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/25 opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                        <ArrowUpRight size={16} className="text-white" />
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-semibold text-[var(--foreground)] transition group-hover:text-[var(--brand)]">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                        {s.desc}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]">
                        Learn more
                        <span className="transition group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

{/* Carousel Automatic Pill Dispenser */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center lg:px-8">
          <SectionReveal className="order-2 md:order-1">
            <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
              Medication Management
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Carousel Automatic Pill Dispenser</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Remembering every dose at the right moment is hard. The Carousel dispenser sorts your medications by day and time in a secure, rotating unit that helps you take the right pills at the right time — every time.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "28 locked compartments for a full 4-week schedule",
                "Built-in reminder alerts and digital display",
                "Tamper-safe design for households with children",
                "Pre-loaded by our pharmacy team for easy home use",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--foreground)]">
                  <CheckCircle size={18} className="shrink-0 text-[var(--brand)]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/services/myhealthpack"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Learn about medication packaging
            </Link>
          </SectionReveal>

          <SectionReveal className="order-1 md:order-2">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
              <Image
                src="/carousel-dispenser.png"
                alt="Carousel automatic pill dispenser with 28 compartments and digital display"
                width={600}
                height={600}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Testimonials slider */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
          <SectionReveal className="text-center">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">Happy Customer</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">What patients say</h2>
          </SectionReveal>

          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <HoverCard>
                  <figure className="relative rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                    <div className="mb-4 text-5xl font-bold text-[var(--brand)]/20">“</div>
                    <blockquote className="text-[var(--foreground)]">{t.quote}</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-sm font-bold text-[var(--brand)]">
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-[var(--muted)]">{t.location}</p>
                      </div>
                    </figcaption>
                  </figure>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter */}
      <section id="blog" className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8">
          <SectionReveal>
            <Mail className="mx-auto h-8 w-8 text-[var(--brand)]" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Stay in the loop</h2>
            <p className="mt-3 text-lg text-[var(--muted)]">
              Get service updates, health tips, and special promotions from iHealth Pharmacy.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Refill + Transfer now live on dedicated pages: /prescription-refills and /transfer */}

      {/* Bottom CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready for easier prescriptions?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--muted)]">
              Join the Abbotsford families who trust iHealth with their medications, reminders, and everyday health.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/prescription-refills"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
              >
                Make an Order
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Contact Us
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionReveal>
            <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
              Visit Us
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Come say hello.</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Drop by, call, or send a note. A real person answers, real fast.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                <a
                  href={PHARMACY_INFO.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] underline underline-offset-4 transition hover:text-[var(--brand)]"
                >
                  {PHARMACY_INFO.address.full}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-[var(--brand)]" />
                <a
                  href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                  className="text-[var(--foreground)] underline underline-offset-4 transition hover:text-[var(--brand)]"
                >
                  {PHARMACY_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="shrink-0 text-[#25D366]" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#128C7E] underline underline-offset-4 transition hover:text-green-700"
                >
                  WhatsApp: {PHARMACY_INFO.whatsapp.displayNumber} (Chat with Pharmacist)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-[var(--brand)]" />
                <a
                  href={`mailto:${PHARMACY_INFO.email}`}
                  className="text-[var(--foreground)] underline underline-offset-4 transition hover:text-[var(--brand)]"
                >
                  {PHARMACY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                <span className="text-[var(--foreground)]">
                  {PHARMACY_INFO.hoursSummary}
                </span>
              </li>
            </ul>
          </SectionReveal>

          <SectionReveal className="flex flex-col gap-6">
            <RefillForm variant="contact" />
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              <iframe
                title="iHealth Pharmacy location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2611.0!2d-122.3!3d49.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDAzJzAwLjAiTiAxMjLCsDE4JzAwLjAiVw!5e0!3m2!1sen!2sca!4v1600000000000!5m2!1sen!2sca"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
