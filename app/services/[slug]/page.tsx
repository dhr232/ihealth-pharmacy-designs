import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SectionReveal } from "../../components/MotionKit";
import { CheckCircle, ArrowLeft, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/data/pharmacy-info";

const SERVICES: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    image: string;
    points: string[];
    cta: { label: string; href: string };
  }
> = {
  "minor-ailments": {
    title: "Minor Ailments Clinic",
    tagline: "Walk-in care for common health conditions",
    description:
      "Under British Columbia's expanded clinical pharmacist prescribing authority, our licensed pharmacists can assess your symptoms and prescribe prescription medications directly for 21 common minor ailments and contraception — no doctor's appointment or walk-in clinic wait times needed.",
    image: "/services/minor-ailments.jpg",
    points: [
      "Uncomplicated Urinary Tract Infections (UTIs)",
      "Allergies, Hay Fever & Allergic Rhinitis",
      "Cold Sores & Oral Ulcers",
      "Pink Eye (Bacterial & Allergic Conjunctivitis)",
      "Heartburn, Acid Reflux & Indigestion (GERD)",
      "Shingles (Herpes Zoster assessment & antivirals)",
      "Mild Acne & Rosacea",
      "Eczema, Dermatitis & Skin Rashes",
      "Insect Bites, Stings & Hives",
      "Fungal Infections (Athlete's Foot, Ringworm, Jock Itch)",
      "Musculoskeletal Sprains, Strains & Joint Aches",
      "Contraceptive Management & Emergency Contraception",
    ],
    cta: { label: "Book Assessment Online", href: "/book?service=minor_ailments" },
  },
  compounding: {
    title: "Custom Compounding",
    tagline: "Custom medications made specifically for you",
    description:
      "We specialize in preparing personalized medications when standard prescriptions are not the right fit. Our compounding lab creates custom dosages, flavours, and dosage forms for adults, children, and pets.",
    image: "/services/compounding.jpg",
    points: [
      "Pain creams and topical therapies",
      "Hormone replacement therapy",
      "Pediatric preparations and flavoured medications",
      "Veterinary compounding for pets",
      "Allergy-friendly and preservative-free formulations",
      "Custom strengths and dosage forms",
    ],
    cta: { label: "Ask about compounding", href: "/contact" },
  },
  vaccinations: {
    title: "Vaccinations & Injections",
    tagline: "Stay protected with convenient immunizations",
    description:
      "We offer a full range of vaccines to help keep you and your family healthy. Walk in or book ahead — our trained pharmacists provide safe, professional immunizations in a private setting.",
    image: "/services/vaccinations.jpg",
    points: [
      "Seasonal flu shots",
      "Travel vaccines and consultations",
      "Shingles vaccine",
      "Routine immunizations",
      "Vaccines for adults and seniors",
      "Vaccination records and reminders",
    ],
    cta: { label: "Book a Vaccination Online", href: "/book?service=annual-influenza-immunization" },
  },
  myhealthpack: {
    title: "MyHealthPack Blister Packs",
    tagline: "Medication organization made simple",
    description:
      "We package your daily medications and vitamins into custom blister cards organized by date and time (Morning, Noon, Evening, Bedtime). We automatically synchronize refills with your prescriber so you or your loved ones never miss a dose.",
    image: "/services/blister-packs.jpg",
    points: [
      "Pills organized by Morning, Noon, Evening & Bedtime",
      "Easy-to-open sealed blister bubbles (no tight bottle caps)",
      "High-contrast printed schedule with medication pictures",
      "Automatic refill synchronization with doctors",
      "Direct billing to BC Fair PharmaCare and private insurance",
      "Free same-day delivery across Abbotsford",
    ],
    cta: { label: "Set up MyHealthPack", href: "/contact" },
  },
  "med-review": {
    title: "Medication Review & Injections",
    tagline: "One-on-one pharmacist care",
    description:
      "Book a private consultation with a pharmacist to review all your medications, check for interactions, and optimize your therapy. We also provide professional injections in a comfortable, private room.",
    image: "/services/med-review.jpg",
    points: [
      "Full medication review and interaction check",
      "Personalized dosing schedule",
      "Vitamin B12 and other injections",
      "Vaccine administration",
      "Private consultation room",
      "Free medication review appointments",
    ],
    cta: { label: "Book a Consultation Online", href: "/book?service=medication-review-service" },
  },
  delivery: {
    title: "Free Prescription Delivery",
    tagline: "Your medications delivered to your door",
    description:
      "Can’t make it in? We offer free same-day delivery across Abbotsford for qualifying prescriptions. We text you when your order is on its way.",
    image: "/services/delivery.jpg",
    points: [
      "Free same-day local delivery",
      "Real-time delivery notifications",
      "Safe and discreet packaging",
      "Ideal for seniors and busy families",
      "Scheduled delivery options",
      "Delivery across Abbotsford",
    ],
    cta: { label: "Set up delivery", href: "#contact" },
  },
};

type Params = Promise<{ slug: string }>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [
    { slug: "minor-ailments" },
    { slug: "compounding" },
    { slug: "vaccinations" },
    { slug: "myhealthpack" },
    { slug: "med-review" },
    { slug: "delivery" },
  ];
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.title} — iHealth Pharmacy`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return notFound();

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
        <SectionReveal>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--brand)]"
          >
            <ArrowLeft size={16} />
            Back to all services
          </Link>
        </SectionReveal>

        {/* Hero Section with Professional Photography */}
        <section className="mt-8 grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-3.5 py-1 text-xs font-semibold text-[var(--brand)]">
                Clinical Pharmacy Services
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-3 text-lg font-medium text-[var(--brand)]">
                {service.tagline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                {service.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-hover)]"
                >
                  {service.cta.label}
                </Link>
                <a
                  href={getWhatsAppUrl(`Hi iHealth Pharmacy, I would like to inquire about your ${service.title} service.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                >
                  <MessageCircle size={17} className="text-emerald-600" />
                  Ask Pharmacist on WhatsApp
                </a>
              </div>
            </SectionReveal>
          </div>

          {/* Service Feature Photography Card */}
          <div className="lg:col-span-5">
            <SectionReveal>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-72 w-full object-cover sm:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-xs">
                    <CheckCircle size={14} className="text-emerald-600" />
                    Licensed BC Clinical Pharmacists
                  </span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* What We Offer Checklist */}
        <SectionReveal className="mt-14">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">What we offer</h2>
            <p className="mt-1 text-sm text-slate-600">
              Our patient-centered approach ensures personalized care with zero unnecessary wait times.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-800">
                  <CheckCircle size={17} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
