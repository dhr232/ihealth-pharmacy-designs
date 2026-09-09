"use client";

import { useState, useMemo } from "react";
import {
  BOOKING_CATEGORIES,
  BookingService,
} from "@/data/booking-services";
import {
  Search,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Info,
} from "lucide-react";

interface ServiceSelectorProps {
  selectedService: BookingService | null;
  onSelectService: (service: BookingService) => void;
  partySize: number;
  onChangePartySize: (size: number) => void;
  onProceed: () => void;
}

export default function ServiceSelector({
  selectedService,
  onSelectService,
  partySize,
  onChangePartySize,
  onProceed,
}: ServiceSelectorProps) {
  const [activeTab, setActiveTab] = useState<string>("minor_ailments");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  // Filter services by search query or active category
  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      return BOOKING_CATEGORIES.flatMap((c) => c.services).filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.shortName?.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.clinicalIndications.some((ind) => ind.toLowerCase().includes(query))
      );
    }

    const currentCat = BOOKING_CATEGORIES.find((c) => c.slug === activeTab);
    return currentCat ? currentCat.services : [];
  }, [searchQuery, activeTab]);

  const currentCategoryObj = BOOKING_CATEGORIES.find((c) => c.slug === activeTab);

  return (
    <div className="space-y-8">
      {/* Category Tabs & Party Size */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              1. Choose a Clinical Service
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Select an authorized clinical pharmacy service, injection, or prescribing consultation.
            </p>
          </div>

          {/* Party Size Selector */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
            <div className="flex items-center gap-2 text-slate-700">
              <Users size={18} className="text-emerald-700" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Party Size:
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => onChangePartySize(num)}
                  className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                    partySize === num
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                  aria-label={`Party size ${num} person${num > 1 ? "s" : ""}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {partySize > 1 && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200/80 px-3.5 py-2 text-xs font-medium text-emerald-900">
            <Info size={15} className="shrink-0 text-emerald-700" />
            <span>
              Booking for <strong>{partySize} people</strong>. Consecutive 15-minute appointment slots will be reserved automatically.
            </span>
          </div>
        )}

        {/* Search Input */}
        <div className="mt-6 relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 21 minor ailments, vaccines, or symptoms (e.g. UTI, allergy, cold sore, flu shot)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Navigation Pills (hidden if searching) */}
        {!searchQuery && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {BOOKING_CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(cat.slug)}
                    className={`flex flex-col items-start rounded-xl p-3 text-left transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                        : "bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight">{cat.name}</span>
                    <span
                      className={`mt-1 line-clamp-1 text-[11px] font-medium ${
                        isActive ? "text-emerald-400" : "text-slate-500"
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {currentCategoryObj && (
              <p className="mt-3 text-xs text-slate-500">
                {currentCategoryObj.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Services List Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {searchQuery
              ? `Search Results (${filteredServices.length})`
              : `${currentCategoryObj?.name} (${filteredServices.length} options)`}
          </span>
          {selectedService && (
            <span className="text-xs font-semibold text-emerald-700">
              1 Service Selected
            </span>
          )}
        </div>

        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-slate-800">
              No clinical services match your query.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Try searching for &quot;UTI&quot;, &quot;shingles&quot;, &quot;flu&quot;, or &quot;allergy&quot;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredServices.map((service) => {
              const isSelected = selectedService?.id === service.id;
              const isExpanded = expandedDetailsId === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service)}
                  className={`group relative flex flex-col justify-between rounded-xl border p-4.5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-600/30"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                  }`}
                >
                  <div>
                    {/* Top Badges & Selection Indicator */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                            service.mspCovered
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {service.coverageBadge}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                          <Clock size={12} className="text-slate-400" />
                          {service.durationMinutes * partySize} mins
                        </span>
                      </div>

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white text-transparent group-hover:border-slate-400"
                        }`}
                      >
                        <CheckCircle2 size={14} className="stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="mt-2.5 text-sm font-bold leading-snug text-slate-900 group-hover:text-emerald-800">
                      {service.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Clinical Indications preview / toggle */}
                    {service.clinicalIndications.length > 0 && (
                      <div className="mt-3">
                        {isExpanded ? (
                          <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Clinical Indications:
                            </p>
                            <ul className="mt-1 space-y-1">
                              {service.clinicalIndications.map((ind, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-1.5 text-[11px] text-slate-700"
                                >
                                  <ShieldCheck
                                    size={12}
                                    className="shrink-0 mt-0.5 text-emerald-600"
                                  />
                                  <span>{ind}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDetailsId(isExpanded ? null : service.id);
                          }}
                          className="mt-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                        >
                          {isExpanded ? "Hide clinical details" : "View clinical indications"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {service.categoryName}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? "text-emerald-700" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {isSelected ? "Selected" : "Select &rarr;"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating / Sticky Footer Action */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Selected Service
          </p>
          <p className="text-sm font-bold text-slate-900 sm:text-base">
            {selectedService ? selectedService.name : "None selected yet"}
          </p>
        </div>

        <button
          type="button"
          disabled={!selectedService}
          onClick={onProceed}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>Continue to Patient Details</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
