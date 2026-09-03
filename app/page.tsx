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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const NUMBERED_SERVICES = [
  { number: "01", title: "Easy Prescription Refills", body: "Request refills online, by phone, or in person — we check every detail and have it ready fast.", href: "#refill" },
  { number: "02", title: "Transfer to iHealth", body: "Give us your pharmacy name and we move your prescriptions over, often the same day.", href: "#transfer" },
  { number: "03", title: "Med & Refill Reminders", body: "Automatic texts and calls so you never miss a dose or run out unexpectedly.", href: "/ihealth-pharmacy-designs/services/myhealthpack" },
  { number: "04", title: "Minor Ailment Clinic", body: "Walk in and see a pharmacist who can assess and prescribe for common minor ailments.", href: "/ihealth-pharmacy-designs/services/minor-ailments" },
  { number: "05", title: "24/7 Pharmacist Advice", body: "Ask questions by phone, text, or email — a real pharmacist answers, real fast.", href: "#contact" },
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
  { title: "Minor Ailments Clinic", href: "/ihealth-pharmacy-designs/services/minor-ailments", desc: "Walk-in care for common conditions" },
  { title: "Compounding", href: "/ihealth-pharmacy-designs/services/compounding", desc: "Custom medications made for you" },
  { title: "Vaccinations", href: "/ihealth-pharmacy-designs/services/vaccinations", desc: "Flu shots, travel vaccines, and more" },
  { title: "MyHealthPack", href: "/ihealth-pharmacy-designs/services/myhealthpack", desc: "Compliance packaging by day and time" },
  { title: "Medication Review", href: "/ihealth-pharmacy-designs/services/med-review", desc: "One-on-one pharmacist consultation" },
  { title: "Prescription Delivery", href: "/ihealth-pharmacy-designs/services/delivery", desc: "Same-day local delivery" },
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
                <a
                  href="#refill"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
                >
                  Request Refill
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#transfer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                >
                  Transfer to iHealth
                </a>
              </MagneticButton>
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

      {/* Core Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionReveal className="text-center">
          <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">What We Do</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Main pharmacy services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            The everyday services your neighbourhood pharmacy should make effortless.
          </p>
        </SectionReveal>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <HoverCard>
                <article className="h-full rounded-2xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--brand)] hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                    <s.icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[var(--muted)]">{s.body}</p>
                </article>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal className="mt-12 text-center">
          <Link
            href="/ihealth-pharmacy-designs/services/minor-ailments"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-6 py-3 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            View all services
            <span>→</span>
          </Link>
        </SectionReveal>
      </section>

      {/* Full service menu */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Full service menu</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
              Click through for details on clinical services, compounding, compliance packaging, and more.
            </p>
          </SectionReveal>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_SERVICE_LINKS.map((s) => (
              <StaggerItem key={s.title}>
                <HoverCard>
                  <Link
                    href={s.href}
                    className="group block rounded-xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--brand)] hover:shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--brand)]">{s.title}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{s.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
                      Learn more
                      <span className="transition group-hover:translate-x-0.5">→</span>
                    </span>
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
              href="/ihealth-pharmacy-designs/services/myhealthpack"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Learn about medication packaging
            </Link>
          </SectionReveal>

          <SectionReveal className="order-1 md:order-2">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
              <Image
                src="/ihealth-pharmacy-designs/carousel-dispenser.png"
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

      {/* Refill */}
      <section id="refill" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
              Prescription Refills
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Refills in 3 easy steps</h2>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Transfer to iHealth today.</h2>
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

      {/* Bottom CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready for easier prescriptions?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--muted)]">
              Join the Abbotsford families who trust iHealth with their medications, reminders, and everyday health.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#refill"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
              >
                Make an Order
              </a>
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
