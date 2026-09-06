import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--border)] bg-[#1a1e23] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Identity & Multilingual */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-lg font-bold text-white">
                iH
              </span>
              <span className="text-lg font-semibold">{PHARMACY_INFO.name}</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Independent, community pharmacy in Abbotsford, BC. Personalized
              medication reviews, blister packaging, minor ailments prescribing,
              and free local delivery.
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-medium text-white/90">Multilingual Care</p>
              <p className="mt-0.5 text-xs text-white/60">
                English • ਪੰਜਾਬੀ (Punjabi) • हिन्दी (Hindi)
              </p>
            </div>
          </div>

          {/* Col 2: Direct Contact & WhatsApp */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={PHARMACY_INFO.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/80 transition hover:text-white"
                >
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <span>{PHARMACY_INFO.address.full}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                  className="flex items-center gap-2 text-white/80 transition hover:text-white"
                >
                  <Phone size={16} className="shrink-0 text-[var(--brand)]" />
                  <span>{PHARMACY_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] transition hover:text-green-300"
                >
                  <MessageCircle size={16} className="shrink-0" />
                  <span>WhatsApp: {PHARMACY_INFO.whatsapp.displayNumber}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PHARMACY_INFO.email}`}
                  className="flex items-center gap-2 text-white/80 transition hover:text-white"
                >
                  <Mail size={16} className="shrink-0 text-[var(--brand)]" />
                  <span>{PHARMACY_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <Clock size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                <span>{PHARMACY_INFO.hoursSummary}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Patient Care */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/prescription-refills"
                  className="text-white/80 transition hover:text-white"
                >
                  Prescription Refills
                </Link>
              </li>
              <li>
                <Link
                  href="/transfer"
                  className="text-white/80 transition hover:text-white"
                >
                  Transfer Prescription
                </Link>
              </li>
              <li>
                <Link
                  href="/services/myhealthpack"
                  className="text-white/80 transition hover:text-white"
                >
                  MyHealthPack Blister Packs
                </Link>
              </li>
              <li>
                <Link
                  href="/services/minor-ailments"
                  className="text-white/80 transition hover:text-white"
                >
                  Minor Ailments Clinic
                </Link>
              </li>
              <li>
                <Link
                  href="/vaccinations"
                  className="text-white/80 transition hover:text-white"
                >
                  Vaccinations & Injections
                </Link>
              </li>
              <li>
                <Link
                  href="/services/compounding"
                  className="text-white/80 transition hover:text-white"
                >
                  Custom Compounding
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Accreditation & Direct Billing */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Accreditation & Direct Billing
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-white/70">
              Licensed community pharmacy with the{" "}
              <strong className="text-white/90">
                {PHARMACY_INFO.accreditation.college}
              </strong>
              .
            </p>
            <div className="mt-3">
              <p className="text-xs font-semibold text-white/80">Direct billing for:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PHARMACY_INFO.accreditation.directBilling.map((insurer) => (
                  <span
                    key={insurer}
                    className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-white/80"
                  >
                    {insurer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/70">
          <div className="flex items-start gap-2">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
            <div>
              <span className="font-semibold text-white/90">Medical Advisory: </span>
              {PHARMACY_INFO.disclaimers.emergency} {PHARMACY_INFO.disclaimers.telehealth811}
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {PHARMACY_INFO.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
