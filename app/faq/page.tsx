"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FAQ_ITEMS } from "../components/FAQSection";
import { BlurReveal } from "../components/MotionKit";
import { HelpCircle, Search, PhoneCall, MessageCircle } from "lucide-react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-slate-50/70 py-16 lg:py-20 border-b border-slate-200/60">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <BlurReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-3.5 py-1 text-xs font-semibold text-[var(--brand)]">
                Help & Answers
              </span>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Frequently Asked Questions
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-3">
              <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
                Find clear answers regarding prescription refills, transfers, pharmacist minor ailment assessments, BC Fair PharmaCare, and free home delivery.
              </p>
            </BlurReveal>

            {/* Search Input */}
            <div className="mt-8 mx-auto max-w-lg relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by topic (e.g. PharmaCare, Minor Ailments, Delivery, Transfers)..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-xs focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
              />
            </div>
          </div>
        </section>

        {/* FAQ list */}
        <section className="py-16 lg:py-20 mx-auto max-w-4xl px-5 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle size={40} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No questions found matching &ldquo;{searchTerm}&rdquo;</h3>
              <p className="text-sm text-slate-500 mt-1">Please reach out directly and our pharmacists will be glad to assist you.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((item) => (
                <div key={item.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
                  <span className="inline-block text-[11px] font-semibold text-[var(--brand)] uppercase tracking-wider mb-1">
                    {item.category || "General"}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Strip */}
        <section className="bg-slate-900 text-white py-14">
          <div className="mx-auto max-w-5xl px-5 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl font-bold">Still have a question?</h2>
              <p className="text-sm text-slate-400 mt-1">
                Call our Abbotsford clinic directly or chat with a pharmacist on WhatsApp.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-wrap items-center gap-3 justify-center">
              <a
                href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
              >
                <PhoneCall size={16} />
                Call {PHARMACY_INFO.phoneDisplay}
              </a>
              <a
                href={getWhatsAppUrl("Hello! I have a question not covered on the website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ea952]"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
