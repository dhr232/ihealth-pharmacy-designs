"use client";

import Image from "next/image";
import Header from "./components/Header";
import RefillForm from "./components/RefillForm";
import NewsletterForm from "./components/NewsletterForm";
import Hero3DBackground from "./components/Hero3DBackground";
import PharmacyIcon3D from "./components/PharmacyIcon3D";
import TiltCard from "./components/TiltCard";
import { SectionReveal, StaggerContainer, StaggerItem, ImagePlaceholder } from "./components/MotionKit";
import {
  Pill,
  ArrowLeftRight,
  Stethoscope,
  ClipboardList,
  Video,
  Mail,
  Syringe,
  ShieldCheck,
  Package,
  Smartphone,
  Thermometer,
  Truck,
  HeartPulse,
  Activity,
  Star,
  Phone,
  Clock,
  MapPin,
  Download,
  PlayCircle,
  CheckCircle,
  User,
} from "lucide-react";

const QUICK_ACTIONS = [
  { icon: Pill, label: "Fill a Prescription", href: "#refill", desc: "Request a refill" },
  { icon: ArrowLeftRight, label: "Transfer to iHealth", href: "#transfer", desc: "Switch today" },
  { icon: Stethoscope, label: "Minor Ailment", href: "#minor-ailments", desc: "Book a walk-in" },
  { icon: ClipboardList, label: "Med Review / Injection", href: "#med-review", desc: "Book clinical time" },
  { icon: Video, label: "Virtual Doctor", href: "#virtual-doctor", desc: "See a doctor online" },
  { icon: Mail, label: "Contact Us", href: "#contact", desc: "Send a message" },
];

const SERVICES = [
  { icon: Pill, title: "Online Prescriptions", body: "Refill existing prescriptions or send new ones through our secure patient portal." },
  { icon: ArrowLeftRight, title: "Transfer to iHealth", body: "Switching is seamless. Give us your current pharmacy name and we handle the rest." },
  { icon: Stethoscope, title: "Minor Ailment Clinic", body: "Our pharmacists can assess and prescribe for common minor ailments, women’s health, and skin conditions." },
  { icon: ClipboardList, title: "Med Review / Injection", body: "One-on-one medication reviews plus professional injections administered in a private room." },
  { icon: Video, title: "Virtual Doctor", body: "Connect with a licensed physician online for non-urgent consultations and prescriptions." },
  { icon: Mail, title: "Contact & Advice", body: "Ask a pharmacist by phone, text, email, or in person. We respond the same business day." },
  { icon: Syringe, title: "Vaccinations", body: "Flu shots, travel vaccines, shingles, and routine immunizations — no appointment needed." },
  { icon: Package, title: "MyHealthPack", body: "Blister packs and compliance packaging sorted by day and time, with automatic refills." },
  { icon: Smartphone, title: "Download our App", body: "Manage refills, reminders, and family profiles from your smartphone." },
  { icon: Thermometer, title: "Flu Shots", body: "Walk-in seasonal influenza immunizations for adults and children." },
  { icon: Truck, title: "Prescription Delivery", body: "Free same-day delivery across Abbotsford for qualifying prescriptions." },
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

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionReveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How can we help you today?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            Everything a modern pharmacy should do — prescriptions, clinical services, and everyday health support.
          </p>
        </SectionReveal>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <TiltCard className="h-full">
                <article className="h-full rounded-xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--brand)] hover:shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                    <s.icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[var(--muted)]">{s.body}</p>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* App / Direct refill portal */}
      <section id="app" className="bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center lg:px-8">
          <SectionReveal>
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
              iHealth Direct
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Manage your meds from your phone.</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Request refills, track orders, set reminders, and manage family profiles in one secure app.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Refill in two taps",
                "Real-time order status",
                "Automatic pickup and delivery reminders",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--foreground)]">
                  <CheckCircle size={18} className="shrink-0 text-[var(--brand)]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#refill"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
              >
                <Download size={18} />
                Use on Browser
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)]"
              >
                <PlayCircle size={18} />
                Download the App
              </a>
            </div>
          </SectionReveal>

          <SectionReveal className="mx-auto w-full max-w-sm md:mx-0">
            <ImagePlaceholder label="iHealth Direct app" icon={Smartphone} className="aspect-[3/4] w-full" />
          </SectionReveal>
        </div>
      </section>

      {/* Minor Ailments */}
      <section id="minor-ailments" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
                Walk-in Clinic
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Minor Ailments Clinic</h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Our licensed pharmacists can now assess and prescribe for common minor ailments, women&apos;s health concerns, and certain skin conditions — no doctor&apos;s appointment needed.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Urinary tract infections",
                  "Cold sores & allergies",
                  "Pink eye & skin rashes",
                  "Emergency contraception",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[var(--foreground)]">
                    <CheckCircle size={16} className="shrink-0 text-[var(--brand)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
              >
                Book an Appointment
              </a>
            </SectionReveal>

            <SectionReveal className="mx-auto w-full max-w-xs">
              <ImagePlaceholder label="Consultation room" icon={Stethoscope} className="aspect-square w-full" />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* MyHealthPack */}
      <section id="myhealthpack" className="bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center lg:px-8">
          <SectionReveal className="order-2 md:order-1 mx-auto w-full max-w-sm md:mx-0">
            <ImagePlaceholder label="Compliance packaging" icon={Package} className="aspect-square w-full" />
          </SectionReveal>

          <SectionReveal className="order-1 md:order-2">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
              Compliance Packaging
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">MyHealthPack</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              We package your medications and vitamins by date and time, then automatically refill them so you never miss a dose or run out.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Pills sorted by day & time",
                "Automatic refill coordination",
                "Ideal for seniors, caregivers, and complex regimens",
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

      {/* Clinical services: Med Review / Injection / Virtual Doctor */}
      <section id="med-review" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionReveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Personalized clinical services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            Book one-on-one time with a pharmacist or physician for reviews, injections, and virtual care.
          </p>
        </SectionReveal>

        <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <div className="rounded-xl border border-[var(--border)] bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                <ClipboardList size={22} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Medication Review</h3>
              <p className="mt-2 text-[var(--muted)]">
                A 20–30 minute private review of all your medications, interactions, and dosing schedule.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-xl border border-[var(--border)] bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                <Syringe size={22} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Injections</h3>
              <p className="mt-2 text-[var(--muted)]">
                Vaccines, vitamin B12, and other injections administered by a trained pharmacist in a private room.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem id="virtual-doctor">
            <div className="rounded-xl border border-[var(--border)] bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                <Video size={22} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Virtual Doctor</h3>
              <p className="mt-2 text-[var(--muted)]">
                Speak with a licensed physician by video for non-urgent issues and new prescriptions.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* About / Pharmacist */}
      <section id="about" className="bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center lg:px-8">
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
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
              About Us
            </span>
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

        <SectionReveal className="mt-10 text-center">
          <a
            href="https://www.google.com/search?q=ihealth+pharmacy+abbotsford+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)]"
          >
            <Star size={18} className="text-amber-500" fill="currentColor" />
            View latest Google Reviews
          </a>
        </SectionReveal>
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

      {/* Contact / Location */}
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
                <a href="tel:+160****0199" className="text-[var(--foreground)] underline underline-offset-4 transition hover:text-[var(--brand)]">
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

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/ihealth-logo.png" alt="" width={40} height={40} className="rounded-full bg-white" />
              <span className="text-lg font-semibold">iHealth Pharmacy</span>
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">Your neighbourhood pharmacist, right around the corner in Abbotsford.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["Services", "#services"],
                ["Refill", "#refill"],
                ["Transfer", "#transfer"],
                ["About", "#about"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-[var(--muted)] transition hover:text-[var(--brand)]">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              <li>Refills</li>
              <li>Vaccinations</li>
              <li>Minor Ailments</li>
              <li>MyHealthPack</li>
              <li>Delivery</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Visit us</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              <li>123 Main Street, Abbotsford, BC</li>
              <li>(604) 555-0199</li>
              <li>hello@ihealthpharmacy.ca</li>
              <li>Mon–Fri 9–7 · Sat 9–5</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)]">
          <p className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-[var(--muted)]">
            © 2026 iHealth Pharmacy. All rights reserved. Licensed pharmacy operating in British Columbia, Canada.
          </p>
        </div>
      </footer>
    </div>
  );
}
