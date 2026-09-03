"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import {
  Cookie,
  ShieldCheck,
  BarChart3,
  Megaphone,
  Settings,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";

const LAST_UPDATED = "September 3, 2026";

type Category = "necessary" | "analytics" | "marketing";

const CATEGORIES: {
  id: Category;
  title: string;
  description: string;
  bullets: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  alwaysOn?: boolean;
}[] = [
  {
    id: "necessary",
    title: "Necessary",
    description: "Required for the website to function. Cannot be turned off.",
    bullets: [
      "Session and security cookies",
      "Form submission state",
      "Cookie preference storage (localStorage on your device)",
    ],
    icon: ShieldCheck,
    alwaysOn: true,
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Help us understand which pages are useful. Aggregated, never tied to your identity.",
    bullets: [
      "Page views and traffic sources",
      "Scroll depth and time on page",
      "Aggregated device and browser stats",
    ],
    icon: BarChart3,
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "We do not currently use marketing cookies. This category stays off.",
    bullets: [
      "No ad networks are loaded on this site",
      "No retargeting pixels are placed",
      "If we add this in future, we'll ask for your consent first",
    ],
    icon: Megaphone,
  },
];

export default function CookiesPage() {
  const [status, setStatus] = useState<"idle" | "opened" | "error">("idle");

  function openPreferences() {
    if (typeof window === "undefined") return;
    // The cookie banner renders a "Customize" button (label text "Customize")
    // when the banner is visible. Programmatically click it to re-open
    // the settings dialog from anywhere on the site.
    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("button"),
    );
    const target = buttons.find((b) => b.textContent?.trim() === "Customize");
    if (target) {
      target.click();
      setStatus("opened");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--brand-subtle)]">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <BlurReveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                <Cookie size={16} />
                Cookies
              </span>
            </BlurReveal>
            <BlurReveal className="mt-5">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                How we use cookies.
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
                A short, honest explanation of the cookies we use and the ones we don&apos;t.
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

        {/* Three categories */}
        <SectionReveal className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
                      <Icon size={20} />
                    </div>
                    {cat.alwaysOn && (
                      <span className="rounded-full bg-[var(--brand-subtle)] px-2.5 py-0.5 text-xs font-semibold text-[var(--brand)]">
                        Always on
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold">{cat.title}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{cat.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--foreground)]">
                    {cat.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]"
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </SectionReveal>

        {/* localStorage note + manage button */}
        <SectionReveal className="bg-[var(--surface)]">
          <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Your preferences, on your device
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--foreground)]">
              Your cookie preferences are stored on your device, never sent to a server. We don&apos;t
              run third-party trackers, advertising networks, or analytics that follow you around
              the web. If you clear your browser data, you can set your preferences again in one
              click.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
              >
                <Settings size={16} />
                Manage preferences
              </button>
              <p className="text-sm text-[var(--muted)]">
                Re-opens the cookie banner so you can adjust your choices.
              </p>
            </div>

            {status === "opened" && (
              <div className="mt-5 flex items-start gap-2 rounded-lg border border-[var(--brand)]/30 bg-white p-3 text-sm text-[var(--foreground)]">
                <CheckCircle size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                <span>Cookie preferences panel opened.</span>
              </div>
            )}
            {status === "error" && (
              <div className="mt-5 flex items-start gap-2 rounded-lg border border-[var(--brand)]/30 bg-white p-3 text-sm text-[var(--foreground)]">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                <span>
                  The cookie banner isn&apos;t visible right now. Try scrolling or reload the page
                  to set your preferences.
                </span>
              </div>
            )}
          </div>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
