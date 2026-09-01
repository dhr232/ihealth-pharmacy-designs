"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function RefillForm() {
  const [rx, setRx] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rx.trim() || !phone.trim()) {
      setError("We need both your Rx number and a mobile phone number to process your refill.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[28px] bg-[#d1fae5] p-8 text-center shadow-[0_8px_0_#a7f3d0]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-[#16a34a] shadow-sm">
          <Icon name="sparkle" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-[#14532d]" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
          You&apos;re all set!
        </h3>
        <p className="mt-2 font-normal text-[#166534]">
          We&apos;ve got refill <strong>#{rx}</strong> in the queue. We&apos;ll text <strong>{phone}</strong> the moment it&apos;s ready — usually within the hour.
        </p>
        <p className="mt-3 text-sm font-semibold text-[#15803d]">
          Want it delivered? Just reply DELIVER to our text.
          <span className="ml-1 inline-flex align-text-bottom">
            <Icon name="truck" size={18} />
          </span>
        </p>
        <button
          onClick={() => {
            setSent(false);
            setRx("");
            setPhone("");
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_#15803d] transition duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
        >
          Request another refill
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] bg-white p-8 shadow-[0_8px_30px_rgba(22,163,74,0.12)] ring-2 ring-[#d1fae5]"
      noValidate
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffedd5] text-[#c2410c]">
          <Icon name="zap" size={22} />
        </span>
        <div>
          <h3 className="text-xl font-bold text-[#14532d]" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
            Quick refill request
          </h3>
          <p className="text-sm font-normal text-[#166534]">30 seconds. No account needed.</p>
        </div>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-[#14532d]">
          Rx number <span className="font-normal text-[#4d7c38]">(on your bottle label)</span>
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={rx}
          onChange={(e) => setRx(e.target.value)}
          placeholder="e.g. 7042318"
          aria-invalid={!!error}
          aria-describedby={error ? "refill-error" : undefined}
          className="w-full rounded-2xl border-2 border-[#d1fae5] bg-[#fffdf8] px-4 py-3 font-semibold text-[#14532d] outline-none transition duration-150 placeholder:font-normal placeholder:text-[#8daa7f] focus:border-[#16a34a] focus:ring-4 focus:ring-[#d1fae5]"
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-bold text-[#14532d]">
          Mobile phone <span className="font-normal text-[#4d7c38]">(for pickup texts)</span>
        </span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(604) 555-0123"
          aria-invalid={!!error}
          aria-describedby={error ? "refill-error" : undefined}
          className="w-full rounded-2xl border-2 border-[#d1fae5] bg-[#fffdf8] px-4 py-3 font-semibold text-[#14532d] outline-none transition duration-150 placeholder:font-normal placeholder:text-[#8daa7f] focus:border-[#16a34a] focus:ring-4 focus:ring-[#d1fae5]"
        />
      </label>

      {error && (
        <p
          id="refill-error"
          role="alert"
          className="mt-3 rounded-2xl bg-[#ffedd5] px-4 py-2.5 text-sm font-semibold text-[#9a3412]"
        >
          <span className="mr-1 inline-flex align-text-bottom">
            <Icon name="x" size={16} />
          </span>
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#16a34a] py-3.5 text-lg font-bold text-white shadow-[0_5px_0_#15803d] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_7px_0_#15803d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2 active:translate-y-0.5 active:shadow-[0_2px_0_#15803d]"
      >
        Send my refill
        <Icon name="send" size={22} />
      </button>
      <p className="mt-3 flex items-start justify-center gap-2 text-center text-xs font-semibold text-[#166534]">
        <Icon name="lock" size={14} />
        Private &amp; HIPAA-secure. We never share your info.
      </p>
    </form>
  );
}
