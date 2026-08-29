"use client";

import { useState } from "react";

export default function ConsultModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md border border-[#c9a35f33] bg-[#141416] p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-xl text-[#ece9e4]/50 transition-colors hover:text-[#c9a35f]"
        >
          ×
        </button>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9a35f]">
          Private Consult
        </p>
        <h3
          className="mt-3 text-3xl font-light text-[#ece9e4]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          A quiet word with your pharmacist
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#ece9e4]/70">
          Tell us what&apos;s on your mind. We&apos;ll call you back within the
          hour — no waiting room, no rush.
        </p>
        {submitted ? (
          <div className="mt-8 border border-[#c9a35f33] bg-[#0e0e10] p-6 text-center">
            <p className="text-lg text-[#c9a35f]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Consider it done.
            </p>
            <p className="mt-2 text-sm text-[#ece9e4]/70">
              A pharmacist will ring you shortly. Thank you for trusting
              iHealth.
            </p>
          </div>
        ) : (
          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              required
              type="text"
              placeholder="Your name"
              className="w-full border border-[#c9a35f33] bg-[#0e0e10] px-4 py-3 text-[15px] text-[#ece9e4] placeholder:text-[#ece9e4]/35 focus:border-[#c9a35f] focus:outline-none"
            />
            <input
              required
              type="tel"
              placeholder="Phone number"
              className="w-full border border-[#c9a35f33] bg-[#0e0e10] px-4 py-3 text-[15px] text-[#ece9e4] placeholder:text-[#ece9e4]/35 focus:border-[#c9a35f] focus:outline-none"
            />
            <textarea
              rows={3}
              placeholder="What would you like to discuss? (optional)"
              className="w-full border border-[#c9a35f33] bg-[#0e0e10] px-4 py-3 text-[15px] text-[#ece9e4] placeholder:text-[#ece9e4]/35 focus:border-[#c9a35f] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full border border-[#c9a35f] bg-[#c9a35f] px-6 py-3.5 text-[13px] uppercase tracking-[0.25em] text-[#0e0e10] transition-colors hover:bg-transparent hover:text-[#c9a35f]"
            >
              Request the call
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
