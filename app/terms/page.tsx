import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import { Scale, FileText, Calendar, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use — iHealth Pharmacy Abbotsford",
  description:
    "Terms of use for the iHealth Pharmacy website and online services. Plain-English summary of your rights and ours.",
};

const LAST_UPDATED = "September 3, 2026";

const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <p>
        By using the iHealth Pharmacy website, you agree to these terms. If you do not agree,
        please do not use the site. We may update these terms from time to time, and the version
        posted on this page is the one that applies.
      </p>
    ),
  },
  {
    id: "medical",
    title: "Not medical advice",
    body: (
      <>
        <p>
          The content on this website is for general information only. It is not a substitute for
          professional medical advice, diagnosis, or treatment from a qualified healthcare
          provider.
        </p>
        <p>
          Always seek the advice of your pharmacist, physician, or other qualified provider with
          any questions you may have regarding a medical condition. Never disregard professional
          medical advice or delay seeking it because of something you have read on this website.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Pharmacy services",
    body: (
      <p>
        Prescription and clinical services described on this site are subject to assessment by a
        licensed BC pharmacist. Not all services are appropriate for every patient, and
        availability may vary. Service descriptions on this site do not create a patient-provider
        relationship.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        All content on this site — including text, graphics, logos, and images — is the property
        of iHealth Pharmacy or its content providers and is protected by Canadian copyright law.
        You may view and download a single copy of materials for personal, non-commercial use.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, iHealth Pharmacy is not liable for any indirect,
        incidental, or consequential damages arising from your use of this website. We strive to
        keep information accurate and up to date but make no warranties as to its completeness or
        fitness for a particular purpose.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the Province of British Columbia and the federal
        laws of Canada applicable therein. Any disputes will be resolved in the courts of British
        Columbia.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms occasionally. The &quot;Last updated&quot; date at the top of this
        page will always reflect when changes were made. Continued use of the site after changes
        are posted constitutes your acceptance of the new terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>Questions about these terms? Reach out to us.</p>
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
          Address: 101 - 45619 Yale Road, Abbotsford, BC V2P 2N1
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--brand-subtle)]">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <BlurReveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                <Scale size={16} />
                Terms
              </span>
            </BlurReveal>
            <BlurReveal className="mt-5">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Terms of use.
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
                The rules of the road for using the iHealth Pharmacy website. Written to be
                readable, not to confuse.
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
                <p className="font-semibold text-[var(--foreground)]">Questions about these terms?</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Email us at{" "}
                  <a
                    href="mailto:hello@ihealthpharmacy.ca"
                    className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
                  >
                    hello@ihealthpharmacy.ca
                  </a>{" "}
                  and we&apos;ll get back to you.
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
