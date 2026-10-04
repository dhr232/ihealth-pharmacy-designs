import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrescriptionFlow from "../components/prescriptions/PrescriptionFlow";
import PrescriptionSidebar from "../components/prescriptions/PrescriptionSidebar";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Submit New Prescription — iHealth Pharmacy Chilliwack",
  description:
    "Upload a photo of your new prescription online. Reviewed by a pharmacist, with in-store pickup or free delivery across Chilliwack.",
};

export default function NewPrescriptionPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Header />

      <main className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[var(--brand)] transition">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/prescription-refills" className="hover:text-[var(--brand)] transition">
              Prescriptions
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-slate-900">Submit New Prescription</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-12 items-start">
            {/* Main Interactive Flow Column */}
            <div className="lg:col-span-8">
              <PrescriptionFlow mode="new" />
            </div>

            {/* Sidebar Reassurance & Information */}
            <div className="lg:col-span-4">
              <PrescriptionSidebar mode="new" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
