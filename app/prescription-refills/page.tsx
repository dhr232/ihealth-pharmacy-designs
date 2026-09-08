import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RefillForm from "../components/RefillForm";
import { SectionReveal } from "../components/MotionKit";
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  Truck,
  Camera,
  MessageCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

export const metadata: Metadata = {
  title: "Prescription Refills — iHealth Pharmacy Abbotsford",
  description:
    "Request a prescription refill online in 30 seconds or send a photo via WhatsApp. Usually ready within the hour, with free delivery across Abbotsford.",
};

const STEPS = [
  {
    title: "Send it in",
    body: "Use the online form, send a photo on WhatsApp, call, or walk in.",
  },
  {
    title: "We fill it fast",
    body: "A licensed pharmacist checks every detail — usually ready within the hour.",
  },
  {
    title: "Pick up or free delivery",
    body: "We text you the moment it's ready. Free prescription delivery across Abbotsford.",
  },
];

const PERKS = [
  { icon: Clock, text: "Usually ready within the hour" },
  { icon: Truck, text: "Free delivery across Abbotsford" },
  { icon: ShieldCheck, text: "Pharmacist reviews every prescription" },
  { icon: CheckCircle, text: "Blister packs / auto-refill available" },
];

export default function PrescriptionRefillsPage() {
  const photoRefillUrl = getWhatsAppUrl(
    PHARMACY_INFO.whatsapp.presets.photoRefill
  );

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left: copy + senior WhatsApp callout + pharmacist image */}
            <SectionReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
                Prescription Refills
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Refills in 3 easy steps.
              </h1>
              <p className="mt-4 text-lg text-[var(--muted)]">
                No app to download, no password to remember. Send your refill
                request and our Abbotsford pharmacy team will have it ready —
                usually within the hour.
              </p>

              {/* Senior / Caregiver WhatsApp Photo Refill Callout */}
              <div className="mt-8 rounded-2xl border-2 border-green-500/40 bg-green-50/60 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md">
                    <Camera size={22} />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--foreground)]">
                      Refill by Photo on WhatsApp
                    </h2>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
                  Don&apos;t want to type your Rx number? Just take a clear photo
                  of your medication bottle label or paper prescription, and send
                  it directly to our pharmacist on WhatsApp.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={photoRefillUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1ea952]"
                  >
                    <MessageCircle size={18} />
                    Send Prescription Photo
                    <ArrowRight size={16} />
                  </a>
                  <span className="text-xs text-[var(--muted)]">
                    English • ਪੰਜਾਬੀ • Hindi
                  </span>
                </div>
              </div>

              <ol className="mt-8 space-y-6">
                {STEPS.map((step, idx) => (
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

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {PERKS.map((perk) => (
                  <li
                    key={perk.text}
                    className="flex items-center gap-2.5 text-sm text-[var(--foreground)]"
                  >
                    <perk.icon
                      size={18}
                      className="shrink-0 text-[var(--brand)]"
                    />
                    {perk.text}
                  </li>
                ))}
              </ul>

              {/* Pharmacist consultation callout with real avatar */}
              <div className="mt-10 flex items-center gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/avatar1.webp"
                  alt="iHealth Pharmacy pharmacist ready to help with your prescription"
                  className="h-20 w-20 rounded-xl border border-[var(--border)] object-cover bg-white"
                />
                <div>
                  <p className="font-semibold">Questions about your medication?</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Our pharmacists review every request. Call{" "}
                    <a
                      href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                      className="inline-flex items-center font-semibold text-[var(--brand)] hover:underline"
                    >
                      <Phone size={14} className="mr-1" />
                      {PHARMACY_INFO.phoneDisplay}
                    </a>{" "}
                    or chat with us on WhatsApp.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Right: form */}
            <SectionReveal className="lg:sticky lg:top-24">
              <RefillForm variant="refill" />
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
