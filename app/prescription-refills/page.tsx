import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrescriptionFlow from "../components/prescriptions/PrescriptionFlow";
import PhipaBadge from "../components/PhipaBadge";
import {
  Clock,
  Truck,
  ShieldCheck,
  CheckCircle,
  Phone,
  MessageCircle,
  Camera,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

export const metadata: Metadata = {
  title: "Prescription Refills — iHealth Pharmacy Chilliwack",
  description:
    "Request your prescription refill online with direct email confirmation. Usually ready within the hour, with free delivery across Chilliwack.",
};

const STEPS = [
  {
    title: "1. Submit Refill Request",
    body: "Enter your Rx numbers or upload a photo of your pill bottle label.",
  },
  {
    title: "2. Pharmacist Review",
    body: "Our licensed pharmacist checks dosages, repeats, and safety in BC PharmaNet.",
  },
  {
    title: "3. Pick Up or Free Delivery",
    body: "Receive an email confirmation when packaged. Free delivery across Chilliwack.",
  },
];

const PERKS = [
  { icon: Clock, text: "Usually ready within the hour" },
  { icon: Truck, text: "Free delivery across Chilliwack" },
  { icon: ShieldCheck, text: "Pharmacist reviews every prescription" },
  { icon: CheckCircle, text: "Blister packaging available upon request" },
];

export default function PrescriptionRefillsPage() {
  const photoRefillUrl = getWhatsAppUrl(
    PHARMACY_INFO.whatsapp.presets.photoRefill
  );

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
            <span className="font-semibold text-slate-900">Prescription Refills</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Main Interactive Refill Flow */}
            <div className="lg:col-span-8">
              <PrescriptionFlow mode="refill" />
            </div>

            {/* Sidebar with Senior Reassurance, WhatsApp & Pharmacist Contact */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Senior / Caregiver WhatsApp Photo Refill Callout */}
              <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/60 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md">
                    <Camera className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Need Help? Send Photo on WhatsApp
                    </h2>
                    <span className="text-xs text-slate-600">English &bull; Punjabi &bull; Hindi</span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-700">
                  Prefer messaging? Snap a clear photo of your prescription bottle label and text it directly to our dispensary staff on WhatsApp.
                </p>

                <div className="mt-4">
                  <a
                    href={photoRefillUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1ea952]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Open WhatsApp Dispensary
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* How it works */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  How Refills Work
                </h3>
                <ol className="space-y-4">
                  {STEPS.map((step) => (
                    <li key={step.title} className="text-sm">
                      <div className="font-bold text-slate-900">{step.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {step.body}
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                  {PERKS.map((perk) => {
                    const Icon = perk.icon;
                    return (
                      <div key={perk.text} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                        <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                        <span>{perk.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pharmacist Consultation Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pharmacists/anika.jpg"
                  alt="Dr. Anika Sharma - Pharmacy Manager"
                  className="h-16 w-16 rounded-xl border border-slate-200 object-cover bg-slate-100 shrink-0"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">Questions about your refill?</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Our pharmacists review every request before dispensing.
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
