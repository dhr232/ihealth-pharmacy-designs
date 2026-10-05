"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Phone, MapPin, Clock, Star } from "lucide-react";
import { PHARMACY_INFO, getOpenStatus } from "@/data/pharmacy-info";

const EASE = [0.16, 1, 0.3, 1] as const;

// Text column: each line glides in from the left, one after another
const textContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const glideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

// Rotating hero headlines: a different one on each page load (never the same twice in a row).
const HEADLINES = [
  { lead: "A Pharmacist Who Knows You", accent: "By Name." },
  { lead: "Care That Knows Your Name,", accent: "Today And Tomorrow." },
  { lead: "Real Pharmacists. Real Answers.", accent: "Right Here In Chilliwack." },
  { lead: "Your Neighbourhood Pharmacy,", accent: "Where Health Gets Personal." },
];
const LAST_HEADLINE_KEY = "ihealth_last_hero_headline";

let pickedHeadline: number | null = null;

function pickHeadline(): number {
  if (pickedHeadline !== null) return pickedHeadline;
  let last = -1;
  try {
    last = Number(window.localStorage.getItem(LAST_HEADLINE_KEY) ?? -1);
  } catch {
    /* storage unavailable */
  }
  const choices = HEADLINES.map((_, i) => i).filter((i) => i !== last);
  pickedHeadline = choices[Math.floor(Math.random() * choices.length)];
  try {
    window.localStorage.setItem(LAST_HEADLINE_KEY, String(pickedHeadline));
  } catch {
    /* storage unavailable */
  }
  return pickedHeadline;
}

const subscribeNever = () => () => {};

// Re-evaluate the open/closed state once a minute; the server snapshot is null so
// SSR and hydration agree, then the live status fills in on the client.
function subscribeToMinuteTick(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

function getStatusSnapshot() {
  const { isOpen, detail } = getOpenStatus();
  return `${isOpen ? "1" : "0"}|${detail}`;
}

function OpenTodayCard() {
  const snapshot = useSyncExternalStore(subscribeToMinuteTick, getStatusSnapshot, () => null);
  const [flag, detail] = snapshot ? snapshot.split("|") : ["", ""];
  const isOpen = flag === "1";

  return (
    <div
      className="absolute bottom-0 right-0 flex max-w-[19rem] flex-col gap-0.5 rounded-tl-[4.5rem] bg-white py-5 pr-6 pl-9 shadow-[0_8px_30px_rgba(20,40,30,0.08)] sm:max-w-sm sm:py-6 sm:pr-8 sm:pl-12"
      aria-live="polite"
    >
      <p
        className={`inline-flex items-center gap-2 text-sm font-semibold ${
          isOpen ? "text-[var(--brand-secondary-hover)]" : snapshot === null ? "text-slate-500" : "text-[#B45309]"
        }`}
      >
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${isOpen ? "bg-[var(--brand-secondary)]" : snapshot === null ? "bg-slate-400" : "bg-[#F59E0B]"}`}
          aria-hidden="true"
        />
        {snapshot === null ? "Walk-ins Welcome" : isOpen ? "Open Today • Walk-ins Welcome" : "Closed Now"}
      </p>
      {snapshot !== null && <p className="pl-4 text-sm text-slate-500">{detail}</p>}
    </div>
  );
}

export default function HomeHero() {
  const shouldReduceMotion = useReducedMotion();
  // Server and first client render use headline 0; the rotating pick applies right after hydration.
  const headline = HEADLINES[useSyncExternalStore(subscribeNever, pickHeadline, () => 0)];
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center px-5 pt-14 pb-10 md:pt-20 lg:min-h-[620px] lg:grid-cols-2 lg:py-20 lg:px-8">
        {/* Left: wording */}
        <motion.div
          initial={initial}
          animate="visible"
          variants={textContainer}
          className="relative z-10 lg:max-w-[34rem]"
        >
          <motion.p
            variants={glideFromLeft}
            className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-2 text-sm font-medium text-[var(--foreground)] shadow-[0_3px_12px_rgba(30,42,68,0.08)] ring-1 ring-black/5"
          >
            <svg viewBox="0 0 40 40" className="h-6 w-6 shrink-0" aria-hidden="true">
              <defs>
                <clipPath id="ca-flag-clip">
                  <circle cx="20" cy="20" r="20" />
                </clipPath>
              </defs>
              <g clipPath="url(#ca-flag-clip)">
                <rect width="40" height="40" fill="#fff" />
                <rect width="10" height="40" fill="#D52B1E" />
                <rect x="30" width="10" height="40" fill="#D52B1E" />
                <path
                  fill="#D52B1E"
                  d="M20 8.5 22.2 13.2 24.6 12 23.9 17.4 28 15.8 27 19 31 20.2 27 24 28 26.2 21.2 25 21.2 31.5 18.8 31.5 18.8 25 12 26.2 13 24 9 20.2 13 19 12 15.8 16.1 17.4 15.4 12 17.8 13.2Z"
                />
              </g>
            </svg>
            Proudly Canadian
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={glideFromLeft}
            className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-[var(--foreground)] md:text-5xl xl:text-[3.5rem]"
          >
            {headline.lead} <span className="text-[var(--brand)]">{headline.accent}</span>
          </motion.h1>

          <motion.p variants={glideFromLeft} className="mt-5 text-lg leading-relaxed text-slate-600">
            Prescriptions, minor-ailment care, vaccines, medication reviews and free same-day
            delivery across Chilliwack, from a family-run team that takes the time to explain.
          </motion.p>

          <motion.div variants={glideFromLeft} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/transfer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[var(--brand)] px-6 py-4 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Transfer your prescription
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[var(--border)] bg-white px-6 py-4 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              Book an appointment
            </Link>
          </motion.div>

          <motion.div
            variants={glideFromLeft}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600"
          >
            <a
              href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 font-semibold text-[var(--foreground)] underline-offset-4 hover:text-[var(--brand)] hover:underline"
            >
              <Phone size={16} className="text-[var(--brand)]" />
              Call {PHARMACY_INFO.phoneDisplay}
            </a>
            <a
              href={PHARMACY_INFO.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[var(--foreground)] underline-offset-4 hover:text-[var(--brand)] hover:underline"
            >
              <MapPin size={16} className="text-[var(--brand)]" />
              Get directions
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock size={16} className="text-[var(--brand)]" />
              {PHARMACY_INFO.hoursShort}
            </span>
          </motion.div>

          <motion.a
            variants={glideFromLeft}
            href={PHARMACY_INFO.address.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-[var(--foreground)]"
          >
            <Star size={16} className="text-amber-400" fill="currentColor" />
            <span className="font-semibold text-[var(--foreground)]">
              {PHARMACY_INFO.address.googleRating}
            </span>
            on Google, read our reviews
          </motion.a>
        </motion.div>

      </div>

      {/* Right: consult photo bleeds to the screen edge and fades into the wording */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[2/1] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[58%]">
        <figure className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%)] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]">
          <Image
            src="/hero-consult.jpg"
            alt="An iHealth pharmacist handing a patient their medication at the counter"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[62%_center]"
          />
        </figure>
        <OpenTodayCard />
      </div>
    </section>
  );
}
