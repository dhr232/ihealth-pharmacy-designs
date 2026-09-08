import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RefillForm from "../components/RefillForm";
import { SectionReveal } from "../components/MotionKit";
import { CheckCircle } from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

export const metadata: Metadata = {
  title: "Transfer to iHealth — iHealth Pharmacy Abbotsford",
  description:
    "Switching pharmacies is easy. Give us your current pharmacy's name and we move your prescriptions over — often the same day.",
};

const POINTS = [
  "We request your files directly — no phone calls for you",
  "Same-day transfers when possible",
  "All insurance and dosing history preserved",
  "Free delivery across Abbotsford once you're set up",
];

export default function TransferPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        <section className="bg-[var(--surface)]">
          <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
            {/* Left: form */}
            <SectionReveal className="lg:sticky lg:top-24">
              <RefillForm variant="transfer" />
            </SectionReveal>

            {/* Right: copy + pharmacist image */}
            <SectionReveal>
              <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                Switching Pharmacies
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Transfer to iHealth today.
              </h1>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Give us your current pharmacy&apos;s name and we&apos;ll move your
                prescriptions over — often the same day. You&apos;ll never sit on
                hold again.
              </p>

              <ul className="mt-8 space-y-3">
                {POINTS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--foreground)]">
                    <CheckCircle size={18} className="shrink-0 text-[var(--brand)]" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Pharmacist image */}
              <div className="mt-10 flex items-center gap-5 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pharmacists/priya.jpg"
                  alt="Priya Patel, PharmD - Pharmacist"
                  className="h-20 w-20 rounded-xl border border-[var(--border)] object-cover bg-white shadow-xs"
                />
                <div>
                  <p className="font-semibold">A pharmacist oversees every transfer.</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    We verify each prescription, check for interactions, and confirm
                    everything before your first pickup. Questions? Call{" "}
                    <a
                      href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                      className="font-semibold text-[var(--brand)] hover:underline"
                    >
                      {PHARMACY_INFO.phoneDisplay}
                    </a>{" "}
                    or message us on WhatsApp.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
