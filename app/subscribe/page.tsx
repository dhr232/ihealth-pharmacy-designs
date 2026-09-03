"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import {
  Mail,
  Bell,
  Tag,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

type Interest = "tips" | "flu" | "offers" | "events";

const INTERESTS: { id: Interest; label: string; description: string }[] = [
  {
    id: "tips",
    label: "Monthly Health Tips",
    description: "Seasonal wellness, condition management, and preventive care.",
  },
  {
    id: "flu",
    label: "Flu Shot Reminders",
    description: "Get notified when flu and other vaccine clinics open.",
  },
  {
    id: "offers",
    label: "Exclusive Offers",
    description: "Member-only discounts on OTC, vitamins, and personal care.",
  },
  {
    id: "events",
    label: "Wellness Events",
    description: "Health screenings, info sessions, and community events.",
  },
];

const VALUE_PROPS = [
  {
    icon: Mail,
    title: "Monthly curated health tips",
    body: "Short, evidence-based emails written by our pharmacists — never spammy, always useful.",
  },
  {
    icon: Bell,
    title: "Priority booking for flu shots & clinics",
    body: "Subscribers hear about vaccination clinics and bookings before the general public.",
  },
  {
    icon: Tag,
    title: "Member-only offers",
    body: "Periodic promotions on vitamins, OTC essentials, and personal care items.",
  },
];

export default function SubscribePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<Set<Interest>>(new Set(["tips"]));
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggle(id: Interest) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    if (!name.trim() || !email.trim()) {
      setStatus("error");
      setErrorMsg("Please enter both your name and email address.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("access_key", "YOUR_WEB3FORMS_KEY_HERE");
      formData.append("from_name", "iHealth Pharmacy Newsletter");
      formData.append("subject", "New newsletter subscriber");
      formData.append("name", name);
      formData.append("email", email);
      formData.append(
        "interests",
        Array.from(selected)
          .map((id) => INTERESTS.find((i) => i.id === id)?.label)
          .filter(Boolean)
          .join(", "),
      );

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setSelected(new Set(["tips"]));
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please try again later.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--brand-subtle)]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <BlurReveal>
              <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                Newsletter
              </span>
            </BlurReveal>
            <BlurReveal className="mt-5">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Stay in the loop on what matters for your health.
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
                Get monthly health tips, flu shot reminders, exclusive offers, and wellness events
                straight to your inbox. Unsubscribe anytime.
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Form + value props */}
        <SectionReveal className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form column */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Subscribe to our newsletter
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Free, no spam, and one-click unsubscribe in every email.
                </p>

                {status === "success" ? (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand-subtle)] p-5">
                    <CheckCircle size={22} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                    <div>
                      <p className="text-lg font-semibold text-[var(--foreground)]">
                        You&apos;re in. Check your inbox for a welcome note.
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        You can update your preferences or unsubscribe at any time using the link in
                        any of our emails.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                    <input
                      type="text"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="sub-name"
                          className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                        >
                          Name
                        </label>
                        <input
                          id="sub-name"
                          name="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sub-email"
                          className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                        >
                          Email
                        </label>
                        <input
                          id="sub-email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <fieldset>
                      <legend className="mb-3 text-sm font-medium text-[var(--foreground)]">
                        What would you like to receive?
                      </legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {INTERESTS.map((interest) => {
                          const isChecked = selected.has(interest.id);
                          return (
                            <label
                              key={interest.id}
                              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                                isChecked
                                  ? "border-[var(--brand)] bg-[var(--brand-subtle)]"
                                  : "border-[var(--border)] bg-white hover:border-[var(--brand)]/40"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggle(interest.id)}
                                className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--brand)] accent-[var(--brand)]"
                              />
                              <span>
                                <span className="block text-sm font-semibold text-[var(--foreground)]">
                                  {interest.label}
                                </span>
                                <span className="mt-0.5 block text-xs text-[var(--muted)]">
                                  {interest.description}
                                </span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    {status === "error" && (
                      <div className="flex items-start gap-2 rounded-lg border border-[var(--brand)]/30 bg-[var(--brand-subtle)] p-3 text-sm text-[var(--brand)]">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)] disabled:opacity-60"
                    >
                      {status === "sending" ? "Subscribing..." : "Subscribe"}
                    </button>

                    <p className="text-xs text-[var(--muted)]">
                      We never sell your data. Unsubscribe in 1 click. See our{" "}
                      <Link
                        href="/ihealth-pharmacy-designs/privacy"
                        className="underline-offset-2 hover:underline"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>
                  </form>
                )}
              </div>

              {/* Privacy reassurance */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">
                    We never sell your data. Unsubscribe in 1 click.
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Your email is used only to deliver the content you opted into. We don&apos;t
                    share it with third parties, ever.
                  </p>
                </div>
              </div>
            </div>

            {/* Value props column */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                Why subscribe?
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Three reasons our subscribers stick around.
              </p>
              <ul className="mt-6 space-y-5">
                {VALUE_PROPS.map((vp) => {
                  const Icon = vp.icon;
                  return (
                    <li key={vp.title} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--foreground)]">{vp.title}</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">{vp.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
