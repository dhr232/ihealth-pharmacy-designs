import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrescriptionFlow from "../components/prescriptions/PrescriptionFlow";
import PhipaBadge from "../components/PhipaBadge";
import { CheckCircle, ShieldCheck, Clock, Truck, Phone, ChevronRight } from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

export const metadata: Metadata = {
  title: "Transfer Prescriptions — iHealth Pharmacy Chilliwack",
  description:
    "Switching pharmacies is easy and 100% free. Provide your current pharmacy's name and our licensed pharmacists transfer all your files directly.",
};

const POINTS = [
  "We request your files directly — no phone calls or awkward conversations for you",
  "Same-day prescription transfers handled by licensed BC pharmacists",
  "All insurance, coverage, and dosing history safely preserved in BC PharmaNet",
  "Free prescription delivery across Chilliwack once you are set up",
];

const FAQS = [
  {
    q: "Do I have to contact my old pharmacy?",
    a: "Not at all. Once you submit this form, our pharmacist contacts your previous pharmacy directly to transfer your records.",
  },
  {
    q: "Will my insurance or Fair PharmaCare remain active?",
    a: "Yes. Your coverage, deductibles, and PharmaNet records transfer seamlessly without any interruption.",
  },
  {
    q: "How long does a transfer take?",
    a: "Most transfers are completed the same day or within 24 business hours, depending on how quickly the previous pharmacy releases your profile.",
  },
];

export default function TransferPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Header />

      <main className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-slate-900">Transfer Prescriptions</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Main Interactive Transfer Flow */}
            <div className="lg:col-span-8">
              <PrescriptionFlow mode="transfer" />
            </div>

            {/* Sidebar with Transfer FAQs & Reassurance */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Transfer Guarantee Card */}
              <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-6 shadow-sm">
                <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-800">
                  100% Free &amp; Seamless
                </span>
                <h3 className="mt-2 text-base font-bold text-slate-900">
                  Switch to iHealth in Minutes
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  You never have to sit on hold or explain why you are leaving. We take care of everything.
                </p>

                <ul className="mt-4 space-y-3">
                  {POINTS.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Common Questions
                </h3>
                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                      <div className="text-xs font-bold text-slate-900">{faq.q}</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pharmacist Overseeing Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pharmacists/priya.jpg"
                  alt="Priya Patel, PharmD"
                  className="h-16 w-16 rounded-xl border border-slate-200 object-cover bg-slate-100 shrink-0"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">Pharmacist Supervised</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Priya Patel reviews every transfer to ensure no duplicate therapies.
                  </div>
                  <a
                    href={`tel:${PHARMACY_INFO.phoneClean}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call {PHARMACY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Low-key privacy note -- intentionally last, not highlighted */}
              <PhipaBadge variant="card" />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
