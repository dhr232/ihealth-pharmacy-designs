"use client";

import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RefillForm from "./components/RefillForm";
import NewsletterForm from "./components/NewsletterForm";
import Hero3DBackground from "./components/Hero3DBackground";
import PharmacyIcon3D from "./components/PharmacyIcon3D";
import CarouselDispenser3D from "./components/CarouselDispenser3D";
import { SectionReveal, StaggerContainer, StaggerItem, ImagePlaceholder } from "./components/MotionKit";
import {
  Pill,
  ArrowLeftRight,
  Stethoscope,
  ClipboardList,
  Video,
  Mail,
  Syringe,
  Package,
  Thermometer,
  Truck,
  HeartPulse,
  Activity,
  Star,
  Phone,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const QUICK_ACTIONS = [
  { icon: Pill, label: "Fill a Prescription", href: "#refill", desc: "Request a refill" },
  { icon: ArrowLeftRight, label: "Transfer to iHealth", href: "#transfer", desc: "Switch today" },
  { icon: Stethoscope, label: "Minor Ailment", href: "/variants/friendly/services/minor-ailments", desc: "Book a walk-in" },
  { icon: ClipboardList, label: "Med Review / Injection", href: "/variants/friendly/services/med-review", desc: "Book clinical time" },
  { icon: Video, label: "Virtual Doctor", href: "#virtual-doctor", desc: "See a doctor online" },
  { icon: Mail, label: "Contact Us", href: "#contact", desc: "Send a message" },
];

const CORE_SERVICES = [
  { icon: Pill, title: "Prescription Refills", body: "Refill existing prescriptions or send new ones through our secure patient portal." },
  { icon: ArrowLeftRight, title: "Transfer to iHealth", body: "Switching is seamless. Give us your current pharmacy name and we handle the rest." },
  { icon: Syringe, title: "Vaccinations", body: "Flu shots, travel vaccines, shingles, and routine immunizations." },
  { icon: Package, title: "MyHealthPack", body: "Blister packs and compliance packaging sorted by day and time, with automatic refills." },
  { icon: Thermometer, title: "Flu Shots", body: "Walk-in seasonal influenza immunizations for adults and children." },
  { icon: Truck, title: "Prescription Delivery", body: "Free same-day delivery across Abbotsford for qualifying prescriptions." },
];

const ALL_SERVICE_LINKS = [
  { title: "Minor Ailments Clinic", href: "/variants/friendly/services/minor-ailments", desc: "Walk-in care for common conditions" },
  { title: "Compounding", href: "/variants/friendly/services/compounding", desc: "Custom medications made for you" },
  { title: "Vaccinations", href: "/variants/friendly/services/vaccinations", desc: "Flu shots, travel vaccines, and more" },
  { title: "MyHealthPack", href: "/variants/friendly/services/myhealthpack", desc: "Compliance packaging by day and time" },
  { title: "Medication Review", href: "/variants/friendly/services/med-review", desc: "One-on-one pharmacist consultation" },
  { title: "Prescription Delivery", href: "/variants/friendly/services/delivery", desc: "Same-day local delivery" },
];

const TRUST_STATS = [
  { icon: Star, label: "4.9 / 5", sub: "from 300+ patients" },
  { icon: Activity, label: "15+ years", sub: "serving Abbotsford" },
  { icon: HeartPulse, label: "500K+", sub: "prescriptions filled" },
  { icon: Truck, label: "Same-day", sub: "local delivery" },
];

const TESTIMONIALS = [
  { quote: "They texted me before I even got home — my refill was ready for pickup.", name: "Jasmin P." },
  { quote: "The pharmacist remembered my son's allergy without looking it up. That kind of care is rare.", name: "Daniel O." },
  { quote: "Transferring took one phone call. They did everything else for me.", name: "Margaret L." },
];

export default function FriendlyPage() {
  return (
    <div className="bg-white text-[var(--foreground)] antialiased" id="top">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]" aria-labelledby="hero-heading">
        <Hero3DBackground />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24 lg:px-8">
          <SectionReveal>
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
              Independent pharmacy in Abbotsford, BC
            </span>
            <h1 id="hero-heading" className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              Care that knows your name.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-[var(--muted)]">
              You&apos;re not a number here. Get real conversations, honest advice, and pharmacy services that follow you home.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#refill"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
              >
                Request Refill
              </a>
              <a
                href="#transfer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Transfer Now
              </a>
            </div>
          </SectionReveal>

          <SectionReveal className="mx-auto w-full max-w-md md:mx-0">
            <div className="relative">
              <PharmacyIcon3D />
              <div className="absolute -bottom-5 -left-5 rounded-xl border border-[var(--border)] bg-white px-4 py-3 shadow-sm">
                <p className="text-sm font-semibold text-[var(--foreground)]">Trusted by 300+ neighbours</p>
                <div className="mt-1 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="ml-1 text-xs font-medium text-[var(--muted)]">4.9 / 5</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_ACTIONS.map((a) => (
            <StaggerItem key={a.label}>
              <a
                href={a.href}
                className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                  <a.icon size={24} />
                </span>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">{a.label}</p>
                  <p className="text-sm text-[var(--muted)]">{a.desc}</p>
                </div>
                <span className="ml-auto text-[var(--muted)] transition group-hover:text-[var(--brand)]">
                  →
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Trust bar */}
      <section className="border-y border-[var(--border)] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--muted)]">
                <stat.icon size={22} />
              </span>
              <div>
                <p className="text-lg font-semibold leading-none text-[var(--foreground)]">{stat.label}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionReveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Main pharmacy services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            The everyday services your neighbourhood pharmacy should make effortless.
          </p>
        </SectionReveal>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <article className="h-full rounded-xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--brand)] hover:shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                  <s.icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[var(--muted)]">{s.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal className="mt-12 text-center">
          <Link
            href="/variants/friendly/services/minor-ailments"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-6 py-3 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            View all services
            <span>→</span>
          </Link>
        </SectionReveal>
      </section>

      {/* All services overview */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Full service menu</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
              Click through for details on clinical services, compounding, compliance packaging, and more.
            </p>
          </SectionReveal>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_SERVICE_LINKS.map((s) => (
              <StaggerItem key={s.title}>
                <Link
                  href={s.href}
                  className="group block rounded-xl border border-[var(--border)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--brand)]">{s.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
                    Learn more <span className="transition group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Carousel Automatic Pill Dispenser */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center lg:px-8">
          <SectionReveal className="order-2 md:order-1">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
              Medication Management
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Carousel Automatic Pill Dispenser</h2>
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
              href="/variants/friendly/services/myhealthpack"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Learn about medication packaging
            </Link>
          </SectionReveal>

          <SectionReveal className="order-1 md:order-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <CarouselDispenser3D />
              <p className="mt-2 text-center text-xs text-[var(--muted)]">Interactive 3D model — drag or hover to rotate</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <SectionReveal className="mx-auto w-full max-w-sm md:mx-0">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <Image
                src="/ihealth-logo.png"
                alt="iHealth Pharmacy logo"
                width={160}
                height={160}
                className="mx-auto rounded-full"
              />
              <p className="mt-4 text-center text-sm font-medium text-[var(--muted)]">Client logo placeholder</p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">About Us</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Your neighbourhood pharmacist.</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              At iHealth Pharmacy, you get a pharmacist who sits down with you — someone who knows your medications, your history, and how to keep your care simple.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "One-on-one care, every visit",
                "Free medication reviews",
                "A familiar face in Abbotsford",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--foreground)]">
                  <CheckCircle size={18} className="shrink-0 text-[var(--brand)]" />
                  {item}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionReveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What patients say</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--muted)]">
            Real Abbotsford families trust iHealth with their everyday health.
          </p>
        </SectionReveal>

        <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="rounded-xl border border-[var(--border)] bg-white p-6">
                <div className="flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-3 text-[var(--foreground)]">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-[var(--foreground)]">— {t.name}</figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Newsletter */}
      <section id="blog" className="bg-[var(--brand-subtle)]">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8">
          <SectionReveal>
            <Mail className="mx-auto h-8 w-8 text-[var(--brand)]" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Stay in the loop</h2>
            <p className="mt-3 text-lg text-[var(--muted)]">
              Get service updates, health tips, and special promotions from iHealth Pharmacy.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Refill */}
      <section id="refill" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
              Prescription Refills
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Refills in 3 easy steps</h2>
            <ol className="mt-8 space-y-6">
              {[
                { title: "Send it in", body: "Use the form, call, or walk in. 30 seconds, promise." },
                { title: "We fill it fast", body: "A pharmacist checks every detail — usually ready within the hour." },
                { title: "Pick up or we deliver", body: "We text you the moment it’s ready. Delivery available across Abbotsford." },
              ].map((step, idx) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white text-sm font-semibold text-[var(--brand)]">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-[var(--muted)]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionReveal>

          <SectionReveal className="flex items-start">
            <RefillForm variant="refill" />
          </SectionReveal>
        </div>
      </section>

      {/* Transfer */}
      <section id="transfer" className="bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <SectionReveal className="flex items-start">
            <RefillForm variant="transfer" />
          </SectionReveal>

          <SectionReveal className="order-first lg:order-last">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
              Switching Pharmacies
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Transfer to iHealth today.</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Give us your current pharmacy&apos;s name and we&apos;ll move your prescriptions over — often the same day. You&apos;ll never sit on hold again.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "We request your files directly",
                "Same-day transfers when possible",
                "All insurance and dosing history preserved",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--foreground)]">
                  <CheckCircle size={18} className="shrink-0 text-[var(--brand)]" />
                  {item}
                </li>
              ))}
            </ul>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Come say hello.</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Drop by, call, or send a note. A real person answers, real fast.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                <span className="text-[var(--foreground)]">123 Main Street, Abbotsford, BC V2S 8K1</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-[var(--brand)]" />
                <a href="tel:+16045550199" className="text-[var(--foreground)] underline underline-offset-4 transition hover:text-[var(--brand)]">
                  (604) 555-0199
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-[var(--brand)]" />
                <a href="mailto:hello@ihealthpharmacy.ca" className="text-[var(--foreground)] underline underline-offset-4 transition hover:text-[var(--brand)]">
                  hello@ihealthpharmacy.ca
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                <span className="text-[var(--foreground)]">
                  Mon–Fri 9am–7pm
                  <br />
                  Sat 9am–5pm · Sun closed
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
