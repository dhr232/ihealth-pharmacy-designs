import { ExternalLink } from "lucide-react";
import { GET_VACCINATED_URL } from "@/data/booking-services";

// Flu and COVID-19 vaccines must be booked through the BC Government site, so these two services
// show this instead of our own booking form (see isProvincialBookingOnly).
export default function ProvincialBookingNotice() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 sm:p-5">
      <p className="text-base font-semibold text-slate-900">
        Flu and COVID-19 vaccines are booked through the BC Government
      </p>
      <p className="mt-1 text-base text-slate-700">
        Book your appointment on the Get Vaccinated site, then come see us at the pharmacy.
      </p>
      <a
        href={GET_VACCINATED_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-base font-bold text-white transition hover:bg-[var(--brand-hover)] sm:w-auto"
      >
        Book on the BC Government site
        <ExternalLink size={16} aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
