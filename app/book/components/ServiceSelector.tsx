"use client";

import { useState, useMemo } from "react";
import {
  BOOKING_CATEGORIES,
  BookingService,
} from "@/data/booking-services";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  Stethoscope,
  Syringe,
  Pill,
  HeartPulse,
  ArrowRight,
  ShieldCheck,
  LucideIcon,
  ChevronDown,
} from "lucide-react";

interface ServiceSelectorProps {
  selectedService: BookingService | null;
  onSelectService: (service: BookingService) => void;
  onProceed: () => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  minor_ailments: Stethoscope,
  vaccines: Syringe,
  consultations: HeartPulse,
};

const POPULAR_QUICK_PICKS = [
  { id: "uncomplicated-urinary-tract-infection", label: "UTI" },
  { id: "allergic-rhinitis", label: "Allergies / Hay Fever" },
  { id: "cold-sores-herpes-labialis", label: "Cold Sores" },
  { id: "annual-influenza-immunization", label: "Flu Shot" },
  { id: "shingles-herpes-zoster", label: "Shingles" },
  { id: "contraception-management", label: "Contraception" },
  { id: "medication-review-pharmacare", label: "Med Review" },
];

export default function ServiceSelector({
  selectedService,
  onSelectService,
  onProceed,
}: ServiceSelectorProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  const allServices = useMemo(() => {
    return BOOKING_CATEGORIES.flatMap((c) => c.services);
  }, []);

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      return allServices.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.shortName?.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.clinicalIndications.some((ind) => ind.toLowerCase().includes(query))
      );
    }

    if (activeTab === "all") {
      return allServices;
    }

    const currentCat = BOOKING_CATEGORIES.find((c) => c.slug === activeTab);
    return currentCat ? currentCat.services : allServices;
  }, [searchQuery, activeTab, allServices]);

  const currentCategoryObj = BOOKING_CATEGORIES.find((c) => c.slug === activeTab);

  return (
    <div className="space-y-3.5 animate-in fade-in duration-200">
      {/* Slim 1-line Refill / Transfer Notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-teal-200/80 bg-teal-50/70 px-3.5 py-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Pill size={15} className="text-teal-700 shrink-0" />
          <span>
            <strong className="font-semibold text-slate-900">Need a prescription refill or transfer?</strong> No appointment needed.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/prescription-refills"
            className="font-bold text-teal-800 hover:text-teal-900 underline inline-flex items-center gap-1"
          >
            <span>Quick Refill</span>
            <ArrowRight size={11} />
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/transfer"
            className="font-bold text-teal-800 hover:text-teal-900 underline"
          >
            Transfer Rx
          </Link>
        </div>
      </div>

      {/* Control Bar: Compact Category Pills & Fast Search */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xs space-y-2.5">
        {/* Category Segmented Tabs - Single horizontal strip on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar sm:flex-wrap flex-nowrap">
          <button
            type="button"
            onClick={() => {
              setActiveTab("all");
              setSearchQuery("");
            }}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === "all" && !searchQuery
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span>All Services</span>
            <span className="rounded-md bg-white/20 px-1.5 py-0.2 text-[10px] font-semibold">
              {allServices.length}
            </span>
          </button>

          {BOOKING_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.slug && !searchQuery;
            const CatIcon = CATEGORY_ICONS[cat.slug] || Stethoscope;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveTab(cat.slug);
                  setSearchQuery("");
                }}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <CatIcon size={13} />
                <span>{cat.name}</span>
                <span className="rounded-md bg-white/20 px-1.5 py-0.2 text-[10px] font-semibold">
                  {cat.services.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Instant Search Box */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms or service (e.g. UTI, flu, allergy, cold sore, shingles)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-9 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--brand)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/10 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-xs font-bold text-slate-400 hover:bg-slate-200 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Pick Chips - Single horizontal strip on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar sm:flex-wrap flex-nowrap">
          <span className="shrink-0 text-[10px] sm:text-[11px] font-semibold text-slate-400">Popular:</span>
          {POPULAR_QUICK_PICKS.map((pick) => {
            const isMatch = selectedService?.id === pick.id;
            return (
              <button
                key={pick.id}
                type="button"
                onClick={() => {
                  const match = allServices.find((s) => s.id === pick.id);
                  if (match) {
                    onSelectService(match);
                    setSearchQuery("");
                  }
                }}
                className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  isMatch
                    ? "bg-[var(--brand)] text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {pick.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services List Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="font-bold text-slate-600">
            {searchQuery
              ? `Search Results (${filteredServices.length})`
              : activeTab === "all"
              ? `All Clinical Services (${filteredServices.length})`
              : `${currentCategoryObj?.name} (${filteredServices.length})`}
          </span>
          {selectedService && (
            <span className="font-bold text-[var(--brand)] truncate max-w-[200px] sm:max-w-none">
              Selected: {selectedService.shortName || selectedService.name}
            </span>
          )}
        </div>

        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-800">
              No clinical services match your search.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Try searching for &quot;UTI&quot;, &quot;flu&quot;, &quot;cold sore&quot;, or &quot;allergy&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-3 inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {filteredServices.map((service) => {
              const isSelected = selectedService?.id === service.id;
              const isExpanded = expandedDetailsId === service.id;
              const CatIcon = CATEGORY_ICONS[service.categoryId.replace("cat_", "")] || Stethoscope;

              return (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service)}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-3.5 sm:p-4 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-[var(--brand)] bg-red-50/40 shadow-sm ring-2 ring-red-600/15"
                      : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-2xs"
                  }`}
                >
                  <div>
                    {/* Header Row: Category Icon + Title + Selection Indicator */}
                    <div className="flex items-start gap-2.5 justify-between">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isSelected
                              ? "bg-[var(--brand)] text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          <CatIcon size={16} />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className={`text-sm font-bold leading-snug transition-colors ${
                              isSelected ? "text-red-950 font-extrabold" : "text-slate-900 group-hover:text-[var(--brand)]"
                            }`}
                          >
                            {service.name}
                          </h3>

                          {/* Quick Badges Row */}
                          <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                service.mspCovered
                                  ? "bg-teal-50 text-teal-800 border border-teal-200"
                                  : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}
                            >
                              {service.coverageBadge}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
                              <Clock size={11} className="text-slate-400" />
                              {service.durationMinutes} min
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Selection Radio / Checkmark */}
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isSelected
                            ? "border-[var(--brand)] bg-[var(--brand)] text-white scale-105 shadow-2xs"
                            : "border-slate-300 bg-white text-transparent group-hover:border-slate-400"
                        }`}
                      >
                        <CheckCircle2 size={15} className="stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Concise Clinical Description */}
                    <p className="mt-2 text-xs text-slate-600 line-clamp-1">
                      {service.description}
                    </p>

                    {/* Expandable Symptoms / Details Accordion */}
                    {service.clinicalIndications.length > 0 && (
                      <div className="mt-2">
                        {isExpanded && (
                          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/70 mt-1 animate-in fade-in duration-150">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Covered Symptoms:
                            </p>
                            <ul className="mt-1 space-y-1">
                              {service.clinicalIndications.map((ind, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-1.5 text-[11px] text-slate-700"
                                >
                                  <ShieldCheck
                                    size={12}
                                    className="shrink-0 mt-0.5 text-[var(--brand)]"
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
                          className="text-[11px] font-semibold text-slate-500 hover:text-[var(--brand)] inline-flex items-center gap-0.5"
                        >
                          <span>{isExpanded ? "Hide symptoms" : "Symptoms & details"}</span>
                          <ChevronDown size={12} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Fast Action Footer on Selected Card */}
                  {isSelected && (
                    <div className="mt-2.5 pt-2.5 border-t border-red-200/60 flex items-center justify-between animate-in fade-in duration-150">
                      <span className="text-[11px] font-bold text-[var(--brand)]">
                        Service Selected
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onProceed();
                        }}
                        className="inline-flex items-center gap-1 rounded-xl bg-[var(--brand)] px-3 py-1 text-xs font-bold text-white shadow-2xs hover:bg-[var(--brand-hover)] active:scale-95 transition-all"
                      >
                        <span>Next Step</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Glass Bottom Bar - Always Visible */}
      <div className="sticky bottom-3 z-30 flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3 sm:px-5 shadow-lg shadow-slate-900/10">
        <div className="min-w-0 pr-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Selected Service
          </p>
          <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
            {selectedService ? selectedService.name : "Please select a service above"}
          </p>
        </div>

        <button
          type="button"
          disabled={!selectedService}
          onClick={onProceed}
          className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--brand)] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[var(--brand-hover)] active:scale-95 transition-all disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>Continue</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
