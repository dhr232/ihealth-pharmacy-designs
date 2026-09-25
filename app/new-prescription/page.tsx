import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrescriptionFlow from "../components/prescriptions/PrescriptionFlow";
import PhipaBadge from "../components/PhipaBadge";
import { ShieldCheck, Clock, Truck, Phone, ChevronRight, AlertCircle } from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

export const metadata: Metadata = {
  title: "Submit New Prescription — iHealth Pharmacy Chilliwack",
  description:
    "Upload a photo of your new doctor prescription online. Prepared promptly by licensed pharmacists with in-store pickup or free delivery across Chilliwack.",
};

const BENEFITS = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Submit online before heading over. Most prescriptions ready within 30 to 60 minutes.",
  },
  {
    icon: Truck,
    title: "Free Chilliwack Delivery",
    description: "Can't make it to the dispensary? We deliver directly to your home at no extra charge.",
  },
  {
    icon: ShieldCheck,
    title: "Complete Safety Check",
    description: "Every prescription is reviewed against your BC PharmaNet profile for drug interactions.",
  },
];

export default function NewPrescriptionPage() {
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
            <Link href="/prescription-refills" className="hover:text-blue-600 transition">
              Prescriptions
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-slate-900">Submit New Prescription</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Main Interactive Flow Column */}
            <div className="lg:col-span-8">
              <PrescriptionFlow mode="new" />
            </div>

            {/* Sidebar Reassurance & Information */}
            <aside className="lg:col-span-4 space-y-6">
              {/* PHIPA Compliant Privacy Card */}
              <PhipaBadge variant="card" />

              {/* Important Legal Notice for New Scripts */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-amber-900">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-950 mb-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
                  Prescription Note
                </div>
                <p className="text-xs leading-relaxed text-amber-800">
                  By BC College of Pharmacists regulations, please retain your original signed paper prescription. You will need to surrender the physical copy upon pickup or delivery handoff.
                </p>
              </div>

              {/* Benefits Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Why Submit Online to iHealth?
                </h3>
                <div className="space-y-4">
                  {BENEFITS.map((b, idx) => {
                    const Icon = b.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{b.title}</div>
                          <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {b.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Need help / Direct Phone Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
                <h3 className="text-base font-bold text-white mb-1">
                  Prefer to Order by Phone?
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  Our pharmacists in Chilliwack are here Monday to Friday from 9:00 AM to 5:00 PM.
                </p>
                <a
                  href={`tel:${PHARMACY_INFO.phoneClean}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 transition"
                >
                  <Phone className="h-4 w-4" />
                  Call {PHARMACY_INFO.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
