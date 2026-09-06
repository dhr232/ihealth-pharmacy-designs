import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RefillForm from "../components/RefillForm";
import { SectionReveal } from "../components/MotionKit";
import { Syringe, ShieldCheck, Users, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Vaccinations — iHealth Pharmacy Abbotsford",
  description:
    "Flu shots, COVID-19 boosters, shingles, travel vaccines and more. Walk in or request an appointment — trained pharmacists, private setting.",
};

const VACCINES = [
  "Seasonal flu shots",
  "COVID-19 boosters",
  "Shingles (Shingrix)",
  "Pneumococcal / pneumonia",
  "Tetanus (Td/Tdap)",
  "Travel vaccines + consultation",
];

const PERKS = [
  { icon: Syringe, text: "Trained injecting pharmacists" },
  { icon: ShieldCheck, text: "Private, comfortable setting" },
  { icon: Users, text: "Adults, seniors, and most children" },
  { icon: FileText, text: "Records reported to Public Health" },
];

export default function VaccinationsPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left: copy + pharmacist image */}
            <SectionReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
                Vaccinations
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Stay protected, no appointment drama.
              </h1>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Walk in when it works for you, or send a request and we&apos;ll
                confirm a time. Our trained pharmacists vaccinate in a private
                setting — most visits take 15 minutes.
              </p>

              <h2 className="mt-8 text-xl font-semibold">Vaccines we offer</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {VACCINES.map((v) => (
                  <li
                    key={v}
                    className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3.5 py-2.5 text-sm text-[var(--foreground)]"
                  >
                    <Syringe size={15} className="shrink-0 text-[var(--brand)]" />
                    {v}
                  </li>
                ))}
              </ul>

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
                  alt="iHealth Pharmacy injecting pharmacist"
                  className="h-24 w-24 rounded-xl border border-[var(--border)] object-cover"
                />
                <div>
                  <p className="font-semibold">Administered by a pharmacist, every time.</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    You&apos;ll be observed for 15 minutes after your shot and can
                    ask the pharmacist anything. Not sure which vaccine you need?{" "}
                    <a href="tel:+16045550199" className="font-medium text-[var(--brand)] hover:underline">
                      Call us
                    </a>{" "}
                    first.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Right: form */}
            <SectionReveal className="lg:sticky lg:top-24">
              <RefillForm variant="vaccination" />
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
