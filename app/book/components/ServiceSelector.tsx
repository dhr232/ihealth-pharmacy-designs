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
  Stethoscope,
  Syringe,
  Pill,
  Sparkles,
  HeartPulse,
  LucideIcon,
} from "lucide-react";

interface ServiceSelectorProps {
  selectedService: BookingService | null;
  onSelectService: (service: BookingService) => void;
  partySize: number;
  onChangePartySize: (size: number) => void;
  onProceed: () => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  minor_ailments: Stethoscope,
  vaccines: Syringe,
  consultations: HeartPulse,
  prescriptions: Pill,
};

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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Category Tabs & Party Size */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200/80 mb-2">
              <Sparkles size={12} className="text-emerald-700" />
              <span>Direct Pharmacist Access</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              1. Choose a Clinical Service
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Select an authorized clinical pharmacy service, injection, or prescribing consultation.
            </p>
          </div>

          {/* Party Size Selector */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-2 sm:px-4 sm:py-2.5">
            <div className="flex items-center gap-2 text-slate-700">
              <Users size={17} className="text-emerald-700" />
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
                  className={`h-8 w-8 rounded-xl text-xs font-bold transition-all duration-150 ${
                    partySize === num
                      ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30 scale-105"
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
          <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 px-4 py-2.5 text-xs font-medium text-emerald-950 animate-in fade-in">
            <Info size={16} className="shrink-0 text-emerald-700" />
            <span>
              Booking for <strong>{partySize} people</strong>. Consecutive 15-minute appointment slots will be reserved automatically.
            </span>
          </div>
        )}

        {/* Search Input */}
        <div className="mt-6 relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 21 minor ailments, vaccines, or symptoms (e.g. UTI, allergy, cold sore, flu shot)..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-xs font-bold text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Navigation Pills (hidden if searching) */}
        {!searchQuery && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {BOOKING_CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.slug;
                const CatIcon = CATEGORY_ICONS[cat.slug] || Stethoscope;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(cat.slug)}
                    className={`flex flex-col items-start rounded-2xl p-3.5 text-left transition-all duration-200 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 ring-2 ring-slate-900 scale-[1.02]"
                        : "bg-slate-50/70 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                          isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-white text-emerald-700 border border-slate-200"
                        }`}
                      >
                        <CatIcon size={14} />
                      </div>
                      <span className="text-xs font-bold leading-tight">{cat.name}</span>
                    </div>
                    <span
                      className={`mt-auto line-clamp-1 text-[11px] font-medium ${
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
              <p className="mt-3.5 text-xs text-slate-500 leading-relaxed">
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
                  className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/50 shadow-md shadow-emerald-700/10 ring-2 ring-emerald-600/30 -translate-y-0.5"
                      : "border-slate-200/90 bg-white hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div>
                    {/* Top Badges & Selection Indicator */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                            service.mspCovered
                              ? "bg-emerald-100/90 text-emerald-900 border border-emerald-200/80"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {service.coverageBadge}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600 border border-slate-100">
                          <Clock size={12} className="text-slate-400" />
                          {service.durationMinutes * partySize} mins
                        </span>
                      </div>

                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-150 ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-600 text-white shadow-xs scale-105"
                            : "border-slate-300 bg-white text-transparent group-hover:border-slate-400"
                        }`}
                      >
                        <CheckCircle2 size={15} className="stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3
                      className={`mt-3 text-base font-bold leading-snug transition-colors ${
                        isSelected ? "text-emerald-950" : "text-slate-900 group-hover:text-emerald-800"
                      }`}
                    >
                      {service.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Clinical Indications preview / toggle */}
                    {service.clinicalIndications.length > 0 && (
                      <div className="mt-3.5">
                        {isExpanded && (
                          <div className="rounded-xl bg-slate-50/90 p-3 border border-slate-200/70 animate-in fade-in duration-200">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Clinical Indications & Symptoms:
                            </p>
                            <ul className="mt-1.5 space-y-1">
                              {service.clinicalIndications.map((ind, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-1.5 text-xs text-slate-700"
                                >
                                  <ShieldCheck
                                    size={13}
                                    className="shrink-0 mt-0.5 text-emerald-600"
                                  />
                                  <span>{ind}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDetailsId(isExpanded ? null : service.id);
                          }}
                          className="mt-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
                        >
                          <span>{isExpanded ? "Hide clinical indications" : "View clinical indications"}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {service.categoryName}
                    </span>
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isSelected ? "text-emerald-700" : "text-slate-400 group-hover:text-emerald-700"
                      }`}
                    >
                      {isSelected ? "Selected" : "Select Service \u2192"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating / Sticky Footer Action */}
      <div className="sticky bottom-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:px-6 sm:py-4 shadow-xl shadow-slate-900/10">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
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
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all duration-150 hover:bg-emerald-800 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <span>Continue to Patient Details</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
