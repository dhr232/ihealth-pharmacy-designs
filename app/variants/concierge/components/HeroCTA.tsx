"use client";

import { useState } from "react";
import ConsultModal from "./ConsultModal";

export default function HeroCTA() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border border-[#c9a35f] bg-[#c9a35f] px-8 py-4 text-[12px] uppercase tracking-[0.3em] text-[#0e0e10] transition-all hover:bg-transparent hover:text-[#c9a35f]"
      >
        Book a Consult
      </button>
      <ConsultModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
