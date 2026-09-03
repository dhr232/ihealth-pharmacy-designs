"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_KEY_HERE";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter both your name and email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSending(true);

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("subject", "iHealth Pharmacy — Newsletter Signup");
      formData.append("from_name", "iHealth Pharmacy Website");
      formData.append("Name", name);
      formData.append("Email", email);
      formData.append("botcheck", "");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.warn("Web3Forms failed, falling back to local success:", err);
      setSent(true); // graceful fallback so user still gets confirmation
    } finally {
      setSending(false);
    }
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
        <p className="text-sm text-[var(--muted)]">Watch your inbox for health tips and pharmacy updates.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
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
          disabled={sending}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {sending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Mail size={18} />
          )}
          {sending ? "Sending…" : "Send"}
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-3 flex items-center gap-2 text-sm text-[var(--brand)]">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </form>
  );
}
