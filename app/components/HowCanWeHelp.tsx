"use client";

import Link from "next/link";
import {
  FilePlus,
  Pill,
  ArrowLeftRight,
  Stethoscope,
  Syringe,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "./MotionKit";
import { CARD_TONES, type CardTone } from "./cardTones";

const ACTIONS: {
  label: string;
  href: string;
  icon: LucideIcon;
  tone: CardTone;
  external?: boolean;
}[] = [
  { label: "Submit a New Prescription", href: "/new-prescription", icon: FilePlus, tone: "blue" },
  { label: "Refill a Prescription", href: "/prescription-refills", icon: Pill, tone: "teal" },
  { label: "Transfer to iHealth", href: "/transfer", icon: ArrowLeftRight, tone: "green" },
  { label: "Minor Ailment Visit", href: "/book?category=minor_ailments", icon: Stethoscope, tone: "purple" },
  { label: "Book a Vaccine", href: "/book?service=routine-vaccination", icon: Syringe, tone: "peach" },
  // Off-site doctor booking (avee.health), same destination as the header nav
  { label: "Book a Doctor", href: "https://booking.avee.health/ATZ41", icon: UserRoundCheck, tone: "rose", external: true },
];

export default function HowCanWeHelp() {
  return (
    <section id="how-can-we-help" className="bg-white pt-10 pb-14 lg:pt-12 lg:pb-16" aria-labelledby="help-heading">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2
          id="help-heading"
          className="text-center text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl"
        >
          How can we help you today?
        </h2>

        {/* Mobile 2 cols (3 rows); tablet 3 cols (2 rows); desktop 6 cols (1 row) */}
        <StaggerContainer className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            const tone = CARD_TONES[action.tone];
            return (
              <StaggerItem key={action.label} className="h-full">
                <Link
                  href={action.href}
                  {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group relative flex h-full min-h-[150px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border px-3 py-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 sm:px-4 ${tone.card}`}
                >
                  <span
                    className={`pointer-events-none absolute -top-10 -right-8 h-24 w-24 rounded-full opacity-80 ${tone.blob}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`pointer-events-none absolute top-5 -right-2 h-12 w-12 rounded-full opacity-45 ${tone.blob}`}
                    aria-hidden="true"
                  />
                  <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${tone.icon}`}>
                    <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="relative text-base font-semibold leading-snug text-[var(--foreground)]">
                    {action.label}
                    {action.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
