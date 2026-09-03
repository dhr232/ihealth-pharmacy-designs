import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import { ShieldCheck, Mail, FileText, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — iHealth Pharmacy Abbotsford",
  description:
    "How iHealth Pharmacy collects, uses, and protects your personal information. PIPEDA and BC PIPA aligned, written in plain English.",
};

const LAST_UPDATED = "September 3, 2026";

const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "collect",
    title: "Information we collect",
    body: (
      <>
        <p>
          To fill your prescriptions and provide pharmacy care, we collect the information you give
          us directly: your name, date of birth, contact details, health card number, medication
          and allergy history, and notes from your pharmacist consultations.
        </p>
        <p>
          If you use our website, we also collect basic technical information like your IP address
          and the pages you visit, only when you have given consent for analytics cookies.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "How we use your information",
    body: (
      <>
        <p>
          We use your information to fill and manage your prescriptions, communicate with you and
          your other healthcare providers, deliver services you have requested (including delivery
          and reminders), and meet our legal obligations as a licensed pharmacy in British Columbia.
        </p>
        <p>
          We never sell your personal information, and we do not use it for advertising.
        </p>
      </>
    ),
  },
  {
    id: "share",
    title: "Sharing your information",
    body: (
      <>
        <p>
          We only share your information with parties you would expect: your prescribing doctor or
          nurse practitioner, your insurance provider (with your consent), the delivery service
          handling a delivery to you, and regulatory bodies when required by law.
        </p>
        <p>
          We do not share your information with marketers, data brokers, or social media companies.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <>
        <p>
          Our website uses a small number of cookies. Necessary cookies keep the site working.
          Analytics cookies help us understand which pages are useful. Marketing cookies are not
          used. You can change your preferences anytime using the cookie banner.
        </p>
        <p>
          For full details, see our{" "}
          <a
            href="/cookies"
            className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
          >
            cookies policy
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>
          Under Canadian privacy law (PIPEDA and BC&apos;s PIPA), you have the right to access the
          personal information we hold about you, request corrections, and withdraw your consent
          for optional uses at any time.
        </p>
        <p>
          To exercise any of these rights, contact us using the details below. We will respond
          within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us about privacy",
    body: (
      <>
        <p>
          Questions, concerns, or access requests can be sent to our privacy officer. We take all
          privacy inquiries seriously and respond promptly.
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:hello@ihealthpharmacy.ca"
            className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
          >
            hello@ihealthpharmacy.ca
          </a>
          <br />
          Phone:{" "}
          <a
            href="tel:+160****0199"
            className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
          >
            (604) 555-0199
          </a>
          <br />
          In person: 101 - 45619 Yale Road, Abbotsford, BC V2P 2N1
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--brand-subtle)]">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <BlurReveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                <ShieldCheck size={16} />
                Privacy
              </span>
            </BlurReveal>
            <BlurReveal className="mt-5">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Your privacy, plainly stated.
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
                We collect only what we need to care for you, we protect it carefully, and we
                explain it in plain English. No legalese walls of text.
              </p>
            </BlurReveal>
            <BlurReveal className="mt-6">
              <p className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                <Calendar size={14} />
                Last updated: {LAST_UPDATED}
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Sections */}
        <SectionReveal className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                    <FileText size={18} />
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {section.title}
                  </h2>
                </div>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--foreground)]">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-start gap-3">
              <Mail size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
              <div>
                <p className="font-semibold text-[var(--foreground)]">Still have questions?</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Email us at{" "}
                  <a
                    href="mailto:hello@ihealthpharmacy.ca"
                    className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
                  >
                    hello@ihealthpharmacy.ca
                  </a>{" "}
                  and we&apos;ll get back to you within two business days.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
