import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RefillForm from "../components/RefillForm";
import { SectionReveal } from "../components/MotionKit";
import { CheckCircle, Clock, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Prescription Refills — iHealth Pharmacy Abbotsford",
  description:
    "Request a prescription refill online in 30 seconds. Usually ready within the hour, with free delivery across Abbotsford for qualifying orders.",
};

const STEPS = [
  { title: "Send it in", body: "Use the form, call, or walk in. 30 seconds, promise." },
  { title: "We fill it fast", body: "A pharmacist checks every detail — usually ready within the hour." },
  { title: "Pick up or we deliver", body: "We text you the moment it's ready. Free delivery across Abbotsford." },
];

const PERKS = [
  { icon: Clock, text: "Usually ready within the hour" },
  { icon: Truck, text: "Free delivery on qualifying orders" },
  { icon: ShieldCheck, text: "Pharmacist checks every prescription" },
  { icon: CheckCircle, text: "Auto-refill option available" },
];

export default function PrescriptionRefillsPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left: copy + pharmacist image */}
            <SectionReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
                Prescription Refills
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Refills in 3 easy steps.
              </h1>
              <p className="mt-4 text-lg text-[var(--muted)]">
                No account, no app, no waiting on hold. Send your refill request and
                we&apos;ll have it ready — usually within the hour.
              </p>

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
                  <li key={perk.text} className="flex items-center gap-2.5 text-sm text-[var(--foreground)]">
                    <perk.icon size={18} className="shrink-0 text-[var(--brand)]" />
                    {perk.text}
                  </li>
                ))}
              </ul>

              {/* Pharmacist image */}
              <div className="mt-10 flex items-center gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pharmacist-placeholder.svg"
                  alt="iHealth Pharmacy pharmacist ready to help with your prescription"
                  className="h-24 w-24 rounded-xl border border-[var(--border)] object-cover"
                />
                <div>
                  <p className="font-semibold">Questions about your medication?</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Our pharmacists review every request. Call{" "}
                    <a href="tel:+16045550199" className="font-medium text-[var(--brand)] hover:underline">
                      (604) 555-0199
                    </a>{" "}
                    or ask when you pick up.
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
