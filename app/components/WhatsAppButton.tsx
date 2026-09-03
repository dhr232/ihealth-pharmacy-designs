"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PHONE = "16045550199"; // E.164 without +; update to real iHealth number
const DEFAULT_MSG =
  "Hi iHealth Pharmacy, I would like to ask a question about...";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const link = `https://wa.me/${PHONE}?text=${encodeURIComponent(DEFAULT_MSG)}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-72 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3 text-white">
              <MessageCircle size={20} />
              <div className="flex-1">
                <p className="text-sm font-semibold">Chat with iHealth</p>
                <p className="text-xs opacity-90">
                  We typically reply within an hour
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded p-1 hover:bg-white/20"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-[var(--foreground)]">
                Have a quick question about your prescription, hours, or
                services? Send us a message on WhatsApp and our team will help.
              </p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ea952]"
              >
                <MessageCircle size={16} />
                Open WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-[var(--muted)]">
                Mon–Fri 8am–9pm, Sat–Sun 9am–6pm
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:bg-[#1ea952]"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </motion.button>
    </div>
  );
}