import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SectionReveal } from "../../components/MotionKit";
import { CheckCircle, ArrowLeft } from "lucide-react";

const SERVICES: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    points: string[];
    cta: { label: string; href: string };
  }
> = {
  "minor-ailments": {
    title: "Minor Ailments Clinic",
    tagline: "Walk-in care for common health conditions",
    description:
      "A minor ailment is a common and uncomplicated health condition that can be managed by over-the-counter treatments or medications your pharmacist can prescribe. These are often short-term issues. Our licensed pharmacists can assess and prescribe for a range of minor ailments, women’s health concerns, and certain skin conditions — no doctor’s appointment needed.",
    points: [
      "Allergies and hay fever",
      "Cold sores",
      "Urinary tract infections",
      "Pink eye and skin rashes",
      "Emergency contraception",
      "Heartburn and indigestion",
      "Coughs, colds, and sore throats",
    ],
    cta: { label: "Book your appointment", href: "#contact" },
  },
  compounding: {
    title: "Compounding",
    tagline: "Custom medications made specifically for you",
    description:
      "We specialize in preparing personalized medications when standard prescriptions are not the right fit. Our compounding lab creates custom dosages, flavours, and dosage forms for adults, children, and pets.",
    points: [
      "Pain creams and topical therapies",
      "Hormone replacement therapy",
      "Pediatric preparations and flavoured medications",
      "Veterinary compounding for pets",
      "Allergy-friendly and preservative-free formulations",
      "Custom strengths and dosage forms",
    ],
    cta: { label: "Ask about compounding", href: "#contact" },
  },
  vaccinations: {
    title: "Vaccinations",
    tagline: "Stay protected with convenient immunizations",
    description:
      "We offer a full range of vaccines to help keep you and your family healthy. Walk in or book ahead — our trained pharmacists provide safe, professional immunizations in a private setting.",
    points: [
      "Seasonal flu shots",
      "Travel vaccines and consultations",
      "Shingles vaccine",
      "Routine immunizations",
      "Vaccines for adults and seniors",
      "Vaccination records and reminders",
    ],
    cta: { label: "Book a vaccination", href: "#contact" },
  },
  myhealthpack: {
    title: "MyHealthPack",
    tagline: "Medication organization made simple",
    description:
      "We package your medications and vitamins by date and time, then coordinate automatic refills so you never miss a dose or run out. Ideal for seniors, caregivers, and anyone managing multiple medications.",
    points: [
      "Pills sorted by day and time",
      "Blister packs and compliance packaging",
      "Automatic refill coordination",
      "Ideal for complex medication regimens",
      "Family and caregiver friendly",
      "Free delivery options available",
    ],
    cta: { label: "Learn more about MyHealthPack", href: "#contact" },
  },
  "med-review": {
    title: "Medication Review & Injections",
    tagline: "One-on-one pharmacist care",
    description:
      "Book a private consultation with a pharmacist to review all your medications, check for interactions, and optimize your therapy. We also provide professional injections in a comfortable, private room.",
    points: [
      "Full medication review and interaction check",
      "Personalized dosing schedule",
      "Vitamin B12 and other injections",
      "Vaccine administration",
      "Private consultation room",
      "Free medication review appointments",
    ],
    cta: { label: "Book a consultation", href: "#contact" },
  },
  delivery: {
    title: "Prescription Delivery",
    tagline: "Your medications delivered to your door",
    description:
      "Can’t make it in? We offer free same-day delivery across Abbotsford for qualifying prescriptions. We text you when your order is on its way.",
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

      <main className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <SectionReveal>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--brand)]"
          >
            <ArrowLeft size={16} />
            Back to services
          </Link>

          <span className="mt-6 inline-block rounded-full bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
            Our Services
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{service.title}</h1>
          <p className="mt-3 text-xl text-[var(--muted)]">{service.tagline}</p>
          <p className="mt-6 text-lg text-[var(--foreground)]">{service.description}</p>
        </SectionReveal>

        <SectionReveal className="mt-10">
          <div className="rounded-xl border border-[var(--border)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-semibold">What we offer</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10">
          <a
            href={service.cta.href}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
          >
            {service.cta.label}
          </a>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
