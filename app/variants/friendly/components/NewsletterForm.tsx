"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter both your name and email address.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-[var(--border)] bg-white p-6 text-center"
      >
        <CheckCircle className="mx-auto h-8 w-8 text-[var(--brand)]" />
        <p className="mt-3 font-medium text-[var(--foreground)]">You&apos;re signed up, {name}.</p>
        <p className="text-sm text-[var(--muted)]">Watch your inbox for updates from iHealth Pharmacy.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
      <label className="sr-only" htmlFor="newsletter-name">Name</label>
      <input
        id="newsletter-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        aria-invalid={!!error}
        className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
      />
      <label className="sr-only" htmlFor="newsletter-email">Email</label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-invalid={!!error}
        aria-describedby={error ? "newsletter-error" : undefined}
        className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
      />
      <button
        type="submit"
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)] sm:w-auto"
      >
        <Mail size={18} />
        Send
      </button>
      {error && (
        <p id="newsletter-error" role="alert" className="sr-only">
          {error}
        </p>
      )}
    </form>
  );
}
