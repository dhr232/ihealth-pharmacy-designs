"use client";

import Link from "next/link";
import {
  Pill,
  ArrowLeftRight,
  Stethoscope,
  Syringe,
  UserRoundCheck,
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "./MotionKit";
import { CARD_TONES, type CardTone } from "./cardTones";

const ACTIONS: {
  label: string;
  href: string;
  icon: typeof Pill;
  tone: CardTone;
  external?: boolean;
}[] = [
  { label: "Refill a Prescription", href: "/prescription-refills", icon: Pill, tone: "blue" },
  { label: "Transfer to iHealth", href: "/transfer", icon: ArrowLeftRight, tone: "green" },
  { label: "Minor Ailment Visit", href: "/book?category=minor_ailments", icon: Stethoscope, tone: "purple" },
  { label: "Book a Vaccine", href: "/book?service=routine-vaccination", icon: Syringe, tone: "peach" },
  // Off-site doctor booking (avee.health), same destination as the header nav
  { label: "Book a Doctor", href: "https://booking.avee.health/MQX39", icon: UserRoundCheck, tone: "rose", external: true },
];

export default function HowCanWeHelp() {
  return (
    <section id="how-can-we-help" className="bg-white pt-10 pb-14 lg:pt-12 lg:pb-16" aria-labelledby="help-heading">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <h2
          id="help-heading"
          className="text-center text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl"
        >
          How can we help you today?
        </h2>

        {/* Mobile 2+2+1 (last full width); tablet 3+2 centred on a 6-col grid; desktop one row of 5 */}
        <StaggerContainer className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-5">
          {ACTIONS.map((action, i) => {
            const Icon = action.icon;
            const tone = CARD_TONES[action.tone];
            const span =
              i === ACTIONS.length - 1
                ? "col-span-2 sm:col-span-2 sm:col-start-auto lg:col-span-1"
                : i === 3
                  ? "sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-auto"
                  : "sm:col-span-2 lg:col-span-1";
            return (
              <StaggerItem key={action.label} className={span}>
                <Link
                  href={action.href}
                  {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group relative flex h-full min-h-[150px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border px-4 py-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 ${tone.card}`}
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
