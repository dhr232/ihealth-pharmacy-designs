"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Truck,
  ShieldCheck,
  Syringe,
  FlaskConical,
  Car,
  Building2,
} from "lucide-react";

// Note: metadata on a client component is supported via the route segment, but
// because this file is "use client" we expose title via a sibling-friendly
// pattern: the page itself uses a static <title> via the document title below.
// (Next.js will use the layout's title; this keeps things simple for static export.)

const HOURS = [
  { day: "Monday", hours: "8:00 am – 9:00 pm" },
  { day: "Tuesday", hours: "8:00 am – 9:00 pm" },
  { day: "Wednesday", hours: "8:00 am – 9:00 pm" },
  { day: "Thursday", hours: "8:00 am – 9:00 pm" },
  { day: "Friday", hours: "8:00 am – 9:00 pm" },
  { day: "Saturday", hours: "9:00 am – 6:00 pm" },
  { day: "Sunday", hours: "9:00 am – 6:00 pm" },
];

const FAQ = [
  {
    icon: Truck,
    q: "Do you offer delivery?",
    a: "Yes. We offer free same-day delivery across Abbotsford for prescriptions and OTC essentials. Same-day cut-off is 3:00 pm, Mon–Fri. Scheduled delivery is also available.",
  },
  {
    icon: ShieldCheck,
    q: "Do you accept my insurance?",
    a: "We bill most Canadian insurance plans directly, including Pacific Blue Cross, Sun Life, Manulife, Canada Life, GreenShield, and more. Bring your card and we'll set it up on your first visit.",
  },
  {
    icon: Syringe,
    q: "Can I walk in for a flu shot?",
    a: "Absolutely. Walk-ins are welcome for flu and most other publicly-funded vaccines. For travel vaccines or injection services, a quick call ahead helps us prepare.",
  },
  {
    icon: FlaskConical,
    q: "Do you do compounding?",
    a: "Yes — our on-site lab prepares custom dosages, flavours, and dosage forms for adults, children, and pets. Call us to discuss your prescription and we'll confirm feasibility.",
  },
  {
    icon: Building2,
    q: "How long does a transfer take?",
    a: "Most prescription transfers are completed within 24 hours. Give us your old pharmacy's name and prescription numbers, and we handle the rest.",
  },
  {
    icon: Car,
    q: "Is there parking?",
    a: "Yes — free customer parking is available directly in front of the pharmacy on Yale Road, with accessible spots close to the entrance.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "YOUR_WEB3FORMS_KEY_HERE");
      formData.append("from_name", "iHealth Pharmacy Website");
      formData.append("subject", `Contact form: ${form.subject}`);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "General", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please call us instead.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please call us at (604) 555-0199.");
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
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                We&apos;re here when you need us.
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
                Call, email, drop in, or send a quick message. We&apos;ll get back to you within one
                business day.
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Two-column: contact info + form */}
        <SectionReveal className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: contact info */}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Reach us directly
              </h2>
              <p className="mt-3 text-[var(--muted)]">
                For urgent refill or transfer requests, calling is fastest.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted)]">Phone</p>
                    <a
                      href="tel:+160****0199"
                      className="text-lg font-semibold text-[var(--foreground)] transition hover:text-[var(--brand)]"
                    >
                      (604) 555-0199
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted)]">Email</p>
                    <a
                      href="mailto:hello@ihealthpharmacy.ca"
                      className="text-lg font-semibold text-[var(--foreground)] transition hover:text-[var(--brand)]"
                    >
                      hello@ihealthpharmacy.ca
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted)]">Address</p>
                    <p className="text-lg font-semibold text-[var(--foreground)]">
                      101 - 45619 Yale Road
                    </p>
                    <p className="text-[var(--muted)]">Abbotsford, BC V2P 2N1</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                    <Clock size={18} />
                  </div>
                    <div className="w-full">
                      <p className="text-sm font-medium text-[var(--muted)]">Hours</p>
                      <div className="mt-1 overflow-hidden rounded-lg border border-[var(--border)]">
                        <table className="w-full text-sm">
                          <tbody>
                            {HOURS.map((row, idx) => (
                              <tr
                                key={row.day}
                                className={idx % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}
                              >
                                <td className="px-3 py-2 font-medium text-[var(--foreground)]">
                                  {row.day}
                                </td>
                                <td className="px-3 py-2 text-right text-[var(--muted)]">
                                  {row.hours}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                </li>
              </ul>
            </div>

            {/* Right: form */}
            <div>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Send a message</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  We&apos;ll reply within 1 business day. For urgent requests, please call.
                </p>

                {status === "success" ? (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand-subtle)] p-5">
                    <CheckCircle size={20} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                    <div>
                      <p className="font-semibold text-[var(--foreground)]">
                        Thanks — we&apos;ll reply within 1 business day.
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        If it&apos;s urgent, please call us at{" "}
                        <a
                          href="tel:+160****0199"
                          className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
                        >
                          (604) 555-0199
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
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
                          htmlFor="name"
                          className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                        >
                          Phone <span className="text-[var(--muted)]">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
                          placeholder="(604) 555-0000"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--brand)]"
                        >
                          <option value="Refill">Refill</option>
                          <option value="Transfer">Transfer</option>
                          <option value="Clinical">Clinical</option>
                          <option value="General">General</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
                        placeholder="How can we help?"
                      />
                    </div>

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
                      {status === "sending" ? "Sending..." : "Send message"}
                    </button>

                    <p className="text-xs text-[var(--muted)]">
                      By submitting, you agree to our{" "}
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
            </div>
          </div>
        </SectionReveal>

        {/* FAQ */}
        <SectionReveal className="bg-[var(--surface)]">
          <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-3">
              {FAQ.map((item, idx) => {
                const Icon = item.icon;
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="overflow-hidden rounded-xl border border-[var(--border)] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                          <Icon size={18} />
                        </span>
                        <span className="text-base font-semibold text-[var(--foreground)]">
                          {item.q}
                        </span>
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[var(--muted)] transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pl-[4.25rem] text-[var(--muted)]">{item.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
