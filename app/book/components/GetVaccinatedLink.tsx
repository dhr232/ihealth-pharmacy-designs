import { ExternalLink } from "lucide-react";
import { GET_VACCINATED_URL } from "@/data/booking-services";

// Shown under flu and COVID-19 vaccine bookings only (see hasGetVaccinatedLink).
export default function GetVaccinatedLink() {
  return (
    <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-600">
      You can also book through the BC Government&apos;s{" "}
      <a
        href={GET_VACCINATED_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-1 font-semibold text-[var(--brand)] underline-offset-4 hover:underline sm:min-h-0"
      >
        Get Vaccinated site
        <ExternalLink size={14} aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      .
    </p>
  );
}
