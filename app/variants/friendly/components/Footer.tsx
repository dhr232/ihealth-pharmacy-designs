import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[var(--foreground)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link href="/variants/friendly" className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-lg font-bold text-white">iH</span>
              <span className="text-lg font-semibold">iHealth Pharmacy</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Independent, community-focused pharmacy serving Abbotsford, BC with personalized care, trusted advice, and modern convenience.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <MapPin size={16} className="text-[var(--brand)]" />
                Abbotsford, BC
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone size={16} className="text-[var(--brand)]" />
                (604) 555-0199
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail size={16} className="text-[var(--brand)]" />
                info@ihealthpharmacy.ca
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Clock size={16} className="text-[var(--brand)]" />
                Mon–Fri 9am–7pm, Sat 10am–4pm
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/variants/friendly/services/minor-ailments" className="text-white/80 transition hover:text-white">Minor Ailments</Link>
              </li>
              <li>
                <Link href="/variants/friendly/services/compounding" className="text-white/80 transition hover:text-white">Compounding</Link>
              </li>
              <li>
                <Link href="/variants/friendly/services/myhealthpack" className="text-white/80 transition hover:text-white">MyHealthPack</Link>
              </li>
              <li>
                <Link href="/variants/friendly/services/vaccinations" className="text-white/80 transition hover:text-white">Vaccinations</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-xs text-white/50">
          © {new Date().getFullYear()} iHealth Pharmacy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
