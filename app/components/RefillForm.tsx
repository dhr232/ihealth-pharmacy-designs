"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Pill, Phone, CheckCircle, AlertCircle } from "lucide-react";

type Props = {
  variant?: "refill" | "transfer" | "contact";
};

export default function RefillForm({ variant = "refill" }: Props) {
  const [rx, setRx] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [pharmacy, setPharmacy] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (variant === "contact" && (!name.trim() || !phone.trim())) {
      setError("Please provide your name and phone number so we can reach you.");
      return;
    }
    if ((variant === "refill" || variant === "transfer") && (!rx.trim() || !phone.trim())) {
      setError("Please provide your Rx number and phone number so we can process your request.");
      return;
    }
    setError("");
    setSent(true);
  }

  const titles = {
    refill: { heading: "Quick refill request", sub: "30 seconds. No account needed." },
    transfer: { heading: "Transfer to iHealth", sub: "We handle the paperwork — usually the same day." },
    contact: { heading: "Send us a message", sub: "A pharmacist will respond within one business day." },
  };
  const t = titles[variant];

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-[var(--border)] bg-white p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-[var(--brand)]">
          <CheckCircle size={28} />
        </div>
        <h3 className="text-xl font-semibold text-[var(--foreground)]">We&apos;ve received your request</h3>
        <p className="mt-2 text-[var(--muted)]">
          {variant === "refill" && <>We&apos;ve got refill <strong>#{rx}</strong> in the queue. We&apos;ll text <strong>{phone}</strong> when it&apos;s ready.</>}
          {variant === "transfer" && <>We&apos;ll transfer your prescriptions from <strong>{pharmacy || "your current pharmacy"}</strong> and text <strong>{phone}</strong> to confirm.</>}
          {variant === "contact" && <>Thanks <strong>{name}</strong>. A pharmacist will call or text <strong>{phone}</strong> within one business day.</>}
        </p>
        <button
          onClick={() => {
            setSent(false);
            setRx("");
            setPhone("");
            setName("");
            setPharmacy("");
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm" noValidate>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
          <Pill size={22} />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">{t.heading}</h3>
          <p className="text-sm text-[var(--muted)]">{t.sub}</p>
        </div>
      </div>

      {(variant === "transfer" || variant === "contact") && (
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
            {variant === "transfer" ? "Current pharmacy" : "Your name"}
          </span>
          <input
            type="text"
            value={variant === "transfer" ? pharmacy : name}
            onChange={(e) => (variant === "transfer" ? setPharmacy(e.target.value) : setName(e.target.value))}
            placeholder={variant === "transfer" ? "Pharmacy name" : "Full name"}
            aria-invalid={!!error}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
          />
        </label>
      )}

      {variant !== "contact" && (
        <label className={`block ${variant === "transfer" ? "mt-4" : ""}`}>
          <span className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
            Rx number
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={rx}
            onChange={(e) => setRx(e.target.value)}
            placeholder="e.g. 7042318"
            aria-invalid={!!error}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
          />
        </label>
      )}

      <label className={`block ${variant !== "refill" ? "mt-4" : "mt-4"}`}>
        <span className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Phone number
        </span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(604) 555-0123"
          aria-invalid={!!error}
          aria-describedby={error ? "form-error" : undefined}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
        />
      </label>

      {error && (
        <p id="form-error" role="alert" className="mt-3 flex items-start gap-2 rounded-lg bg-[var(--brand-subtle)] px-4 py-2.5 text-sm font-medium text-[var(--brand)]">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] py-3 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
      >
        Submit request
        <Phone size={18} />
      </button>
    </form>
  );
}
