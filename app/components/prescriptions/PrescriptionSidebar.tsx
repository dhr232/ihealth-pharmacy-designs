import { Phone, MessageCircle, Info } from "lucide-react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";
import { CARD_TONES, PRESCRIPTION_MODE_TONES as MODE_TONES } from "@/app/components/cardTones";
import type { PrescriptionWorkflowMode } from "./PrescriptionFlow";

// Shared sidebar for /prescription-refills, /transfer and /new-prescription.
// Copy sticks to the verified claims in .agents/product-marketing.md.

const STEPS: Record<PrescriptionWorkflowMode, { title: string; body: string }[]> = {
  refill: [
    { title: "Send your request", body: "Enter the Rx number from your label, or upload a photo of it." },
    { title: "A pharmacist reviews it", body: "We check your refills remaining and your medication history." },
    { title: "We let you know", body: "You hear from us by phone call or text when it is ready for pickup or delivery." },
  ],
  transfer: [
    { title: "Tell us your pharmacy", body: "Just the name, and the phone number if you have it." },
    { title: "We contact them for you", body: "Our pharmacist requests your prescriptions directly. You do not need to call." },
    { title: "We let you know", body: "You hear from us by phone call or text once your prescriptions are with us." },
  ],
  new: [
    { title: "Send your prescription", body: "Upload a photo of it, or enter the medication details." },
    { title: "A pharmacist reviews it", body: "We check it against your medication history before filling it." },
    { title: "We let you know", body: "You hear from us by phone call or text when it is ready for pickup or delivery." },
  ],
};

const TRANSFER_FAQS = [
  {
    q: "Do I need to call my old pharmacy?",
    a: "No. Once you send this form, our pharmacist contacts your previous pharmacy for you.",
  },
  {
    q: "Will my PharmaCare and insurance still work?",
    a: "Yes. We bill BC PharmaCare and many other plans directly. See the full list on our About page.",
  },
  {
    q: "How long does a transfer take?",
    a: "It depends on how quickly your previous pharmacy sends your records. We will keep you updated.",
  },
];

function Card({ mode, children }: { mode: PrescriptionWorkflowMode; children: React.ReactNode }) {
  return <div className={`rounded-xl border p-5 sm:p-6 ${CARD_TONES[MODE_TONES[mode]].card}`}>{children}</div>;
}

export default function PrescriptionSidebar({ mode }: { mode: PrescriptionWorkflowMode }) {
  const pharmacist = PHARMACY_INFO.devPatel;

  return (
    <aside className="space-y-5">
      <Card mode={mode}>
        <h2 className="text-base font-semibold text-slate-900">How it works</h2>
        <ol className="mt-4 space-y-4">
          {STEPS[mode].map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-600">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900">{step.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="mt-5 space-y-1.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
          {mode === "refill" && <li>Many in-stock refills are ready in under 30 minutes.</li>}
          <li>Free delivery anywhere in Chilliwack.</li>
          <li>Direct billing to BC PharmaCare and many other plans.</li>
        </ul>
      </Card>

      {mode === "new" && (
        <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <p>
            <span className="font-medium text-slate-900">Keep your original paper prescription.</span> We need the
            signed original when you pick up, or when our driver delivers your medication.
          </p>
        </div>
      )}

      {mode === "transfer" && (
        <Card mode={mode}>
          <h2 className="text-base font-semibold text-slate-900">Common questions</h2>
          <dl className="mt-3 divide-y divide-slate-100">
            {TRANSFER_FAQS.map((faq) => (
              <div key={faq.q} className="py-3 first:pt-0 last:pb-0">
                <dt className="text-sm font-medium text-slate-900">{faq.q}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-600">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}

      <Card mode={mode}>
        <div className="flex items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pharmacists/dev-patel.jpg"
            alt={pharmacist.name}
            className="h-12 w-12 shrink-0 rounded-full border border-slate-200 bg-slate-100 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">Questions? Talk to a pharmacist</p>
            <p className="text-sm text-slate-500">{PHARMACY_INFO.languagesSummary}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          <a
            href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            <Phone className="h-4 w-4" />
            Call {PHARMACY_INFO.phoneDisplay}
          </a>
          <a
            href={getWhatsAppUrl(
              mode === "transfer"
                ? PHARMACY_INFO.whatsapp.presets.transfer
                : PHARMACY_INFO.whatsapp.presets.photoRefill
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            <MessageCircle className="h-4 w-4" />
            Message us on WhatsApp
          </a>
        </div>
        <p className="mt-3 text-xs text-slate-500">{PHARMACY_INFO.hoursSummary}</p>
      </Card>
    </aside>
  );
}
