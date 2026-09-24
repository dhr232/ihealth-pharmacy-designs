"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  X,
  FileText,
  Pill,
  Shield,
} from "lucide-react";
import {
  BookingService,
  ALL_BOOKING_SERVICES,
  getServiceByIdOrSlug,
} from "@/data/booking-services";
import {
  MINOR_AILMENTS_MENU_CATEGORIES,
  VACCINES_MENU_ITEMS,
  CONSULTATIONS_MENU_ITEMS,
  getConditionIconPath,
} from "@/data/condition-registry";

interface ServiceSelectorProps {
  selectedService: BookingService | null;
  onSelectService: (service: BookingService) => void;
  onProceed: () => void;
}

export default function ServiceSelector({
  selectedService,
  onSelectService,
  onProceed,
}: ServiceSelectorProps) {
  // Independent open state for each of the 4 accordion categories
  // If a service was pre-selected (e.g. from URL), open its category; otherwise start all closed matching the screenshot
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    if (selectedService?.categoryId) {
      return {
        prescriptions: selectedService.categoryId === "cat_prescriptions",
        minor_ailments: selectedService.categoryId === "cat_minor_ailments",
        vaccines: selectedService.categoryId === "cat_vaccines",
        consultations: selectedService.categoryId === "cat_consultations",
      };
    }
    // Default: minor ailments open for quick access or can be toggled
    return {
      prescriptions: false,
      minor_ailments: true,
      vaccines: false,
      consultations: false,
    };
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  // Only auto-open a category when selectedService ID changes from outside (e.g. URL param)
  const prevSelectedId = useRef<string | undefined>(selectedService?.id);
  useEffect(() => {
    if (selectedService?.id && selectedService.id !== prevSelectedId.current) {
      prevSelectedId.current = selectedService.id;
      if (selectedService.categoryId === "cat_minor_ailments") {
        setOpenCategories((prev) => ({ ...prev, minor_ailments: true }));
      } else if (selectedService.categoryId === "cat_vaccines") {
        setOpenCategories((prev) => ({ ...prev, vaccines: true }));
      } else if (selectedService.categoryId === "cat_consultations") {
        setOpenCategories((prev) => ({ ...prev, consultations: true }));
      }
    }
  }, [selectedService]);

  // Robust category toggle function: user can toggle ANY category open or closed independently
  const toggleCategory = (catKey: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catKey]: !prev[catKey],
    }));
  };

  // Search filtering
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    return ALL_BOOKING_SERVICES.filter((s) => {
      const matchName = s.name.toLowerCase().includes(q);
      const matchShort = s.shortName?.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      const matchIndications = s.clinicalIndications.some((ind) => ind.toLowerCase().includes(q));
      return matchName || matchShort || matchDesc || matchIndications;
    });
  }, [searchQuery]);

  // Helper to select an item
  const handleItemClick = (serviceId: string) => {
    const found = getServiceByIdOrSlug(serviceId);
    if (found) {
      onSelectService(found);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Search Bar (Exact layout from screenshot) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E3A8A] sm:leading-tight">
            Select a Service
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-normal">
            Choose from the list of services to get started
          </p>
        </div>

        {/* Search input with right magnifying glass */}
        <div className="relative w-full md:w-80 lg:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services and conditions we treat"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Clear search"
            >
              <X size={16} />
            </button>
          ) : (
            <Search
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          )}
        </div>
      </div>

      {/* If Search is Active: Show Search Results directly */}
      {searchResults !== null ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Search Results ({searchResults.length})
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Clear search & view all categories
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-8 text-center text-slate-500 space-y-2">
              <p className="text-sm font-semibold">No services or conditions matched &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-400">
                Try searching for UTI, allergies, shingles, cold sores, flu shot, or medication review.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {searchResults.map((srv) => {
                const isSelected = selectedService?.id === srv.id;
                const iconPath = getConditionIconPath(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => onSelectService(srv)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 shadow-2xs ring-2 ring-blue-500/20"
                        : "border-slate-100 bg-slate-50/40 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <img
                      src={iconPath}
                      alt=""
                      width={36}
                      height={36}
                      className="shrink-0 object-contain h-9 w-9 drop-shadow-2xs"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {srv.shortName || srv.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {srv.categoryName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* The 4 Main Accordion Services (matching screenshot) */
        <div className="space-y-4">
          {/* SERVICE 1: PRESCRIPTIONS */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all">
            <button
              type="button"
              onClick={() => toggleCategory("prescriptions")}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50/80 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Pill bottle icon with cross */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="4" width="14" height="17" rx="3" fill="#0F172A" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 1H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 9V15M9 12H15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Prescriptions
                  </h2>
                  <p className="text-xs text-slate-500 font-normal">
                    Refill, transfer, or submit new doctor prescriptions
                  </p>
                </div>
              </div>
              <div className="text-slate-400 p-1">
                {openCategories.prescriptions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            {openCategories.prescriptions && (
              <div className="border-t border-slate-100 bg-slate-50/50 p-6 animate-in slide-in-from-top-2 duration-200">
                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Refill card */}
                  <div
                    className={`rounded-xl border p-4 shadow-2xs transition flex flex-col justify-between ${
                      selectedService?.id === "prescription-refill"
                        ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50/40"
                        : "border-slate-200 bg-white hover:border-blue-400"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 text-blue-700 font-bold text-sm">
                        <img
                          src="/icons/minor-ailments/refill.png"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                        <span>Prescription Refill</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        Refill existing medications for quick pickup or free delivery in Chilliwack.
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href="/prescription-refills"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 py-2 px-3 text-xs font-bold text-white shadow-2xs transition"
                      >
                        <span>Order Refill</span>
                        <ArrowRight size={13} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleItemClick("prescription-refill")}
                        className="text-[11px] font-semibold text-slate-500 hover:text-blue-700 hover:underline text-center cursor-pointer py-0.5"
                      >
                        Or book pickup consult &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Transfer card */}
                  <div
                    className={`rounded-xl border p-4 shadow-2xs transition flex flex-col justify-between ${
                      selectedService?.id === "prescription-transfer"
                        ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50/40"
                        : "border-slate-200 bg-white hover:border-blue-400"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 text-blue-700 font-bold text-sm">
                        <img
                          src="/icons/minor-ailments/transfer.png"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                        <span>Transfer Prescription</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        Switch your medications to iHealth Pharmacy from any other Canadian pharmacy.
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href="/transfer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 py-2 px-3 text-xs font-bold text-white shadow-2xs transition"
                      >
                        <span>Transfer Now</span>
                        <ArrowRight size={13} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleItemClick("prescription-transfer")}
                        className="text-[11px] font-semibold text-slate-500 hover:text-blue-700 hover:underline text-center cursor-pointer py-0.5"
                      >
                        Or book transfer consult &rarr;
                      </button>
                    </div>
                  </div>

                  {/* New Rx card */}
                  <div
                    className={`rounded-xl border p-4 shadow-2xs transition flex flex-col justify-between ${
                      selectedService?.id === "submit-new-prescription"
                        ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50/40"
                        : "border-slate-200 bg-white hover:border-blue-400"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 text-blue-700 font-bold text-sm">
                        <img
                          src="/icons/minor-ailments/newPrescription.png"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                        <span>Submit New Prescription</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        Upload a photo of your doctor&apos;s paper script or clinic discharge prescription.
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href="/new-prescription"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 py-2 px-3 text-xs font-bold text-white shadow-2xs transition"
                      >
                        <span>Upload Prescription</span>
                        <ArrowRight size={13} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleItemClick("submit-new-prescription")}
                        className="text-[11px] font-semibold text-slate-500 hover:text-blue-700 hover:underline text-center cursor-pointer py-0.5"
                      >
                        Or book in-person drop-off &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50/80 p-3 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span>
                    <strong>Note:</strong> Prescription refills, transfers, and new prescription submissions do not require an appointment booking. We process them same-day!
                  </span>
                  <button
                    type="button"
                    onClick={() => handleItemClick("prescription-adaptation-renewal")}
                    className="font-bold text-blue-700 hover:underline shrink-0 cursor-pointer"
                  >
                    Or book consultation &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SERVICE 2: MINOR AILMENTS AND CONDITIONS (EXACT SUB-MENU MATCHING SCREENSHOT) */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all">
            <button
              type="button"
              onClick={() => toggleCategory("minor_ailments")}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50/80 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Face unwell icon (matching BookMyPharmacy icon) */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#0F172A"/>
                    <path d="M7 10L10 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17 10L14 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 16C10 14.5 14 14.5 15 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="6.5" cy="5.5" r="1.5" fill="#38BDF8"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Minor Ailments and Conditions
                  </h2>
                  <p className="text-xs text-slate-500 font-normal">
                    Direct pharmacist prescribing for common conditions under BC MSP
                  </p>
                </div>
              </div>
              <div className="text-slate-400 p-1">
                {openCategories.minor_ailments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            {openCategories.minor_ailments && (
              <div className="border-t border-slate-100 bg-white p-6 sm:p-8 space-y-8 animate-in slide-in-from-top-2 duration-200">
                {/* Subcategories (Exact layout and items from media_1790221590700.png) */}
                {MINOR_AILMENTS_MENU_CATEGORIES.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
                      {category.title}
                    </h3>

                    {/* 3-column grid matching BookMyPharmacy screenshot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6">
                      {category.items.map((item) => {
                        const isSelected = selectedService?.id === item.serviceId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleItemClick(item.serviceId)}
                            className={`group flex items-center gap-3.5 rounded-xl p-2.5 text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-blue-50/80 border border-blue-400 shadow-2xs ring-2 ring-blue-500/20"
                                : "hover:bg-slate-50/90 border border-transparent hover:border-slate-200"
                            }`}
                          >
                            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 p-1 group-hover:bg-white transition-colors">
                              <img
                                src={item.iconPath}
                                alt={item.name}
                                width={32}
                                height={32}
                                className="h-8 w-8 object-contain drop-shadow-2xs transition-transform group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <span
                              className={`text-xs sm:text-sm font-semibold transition-colors ${
                                isSelected ? "text-blue-900 font-bold" : "text-slate-700 group-hover:text-blue-700"
                              }`}
                            >
                              {item.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SERVICE 3: VACCINES / INJECTIONS */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all">
            <button
              type="button"
              onClick={() => toggleCategory("vaccines")}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50/80 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Shield with medical cross (matching screenshot) */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 5V11C4 16.5 7.5 21.5 12 23C16.5 21.5 20 16.5 20 11V5L12 2Z" fill="#0F172A" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7V17M7 12H17" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Vaccines / Injections
                  </h2>
                  <p className="text-xs text-slate-500 font-normal">
                    Flu shot, COVID-19, Shingrix, Travel immunizations, and routine shots
                  </p>
                </div>
              </div>
              <div className="text-slate-400 p-1">
                {openCategories.vaccines ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            {openCategories.vaccines && (
              <div className="border-t border-slate-100 bg-white p-6 sm:p-8 space-y-4 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6">
                  {VACCINES_MENU_ITEMS.map((item) => {
                    const isSelected = selectedService?.id === item.serviceId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemClick(item.serviceId)}
                        className={`group flex items-center gap-3.5 rounded-xl p-2.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50/80 border border-blue-400 shadow-2xs ring-2 ring-blue-500/20"
                            : "hover:bg-slate-50/90 border border-transparent hover:border-slate-200"
                        }`}
                      >
                        <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 p-1 group-hover:bg-white transition-colors">
                          <img
                            src={item.iconPath}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain drop-shadow-2xs transition-transform group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`text-xs sm:text-sm font-semibold transition-colors block leading-tight ${
                              isSelected ? "text-blue-900 font-bold" : "text-slate-700 group-hover:text-blue-700"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* SERVICE 4: CONSULTATIONS */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all">
            <button
              type="button"
              onClick={() => toggleCategory("consultations")}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50/80 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Speech/Chat bubble (matching screenshot) */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V16C22 17.1 21.1 18 20 18H7L2 22V6C2 4.9 2.9 4 4 4Z" fill="#0F172A" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 10H17M7 14H13" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Consultations
                  </h2>
                  <p className="text-xs text-slate-500 font-normal">
                    Medication reviews, diabetes education, chronic care, and blister packs
                  </p>
                </div>
              </div>
              <div className="text-slate-400 p-1">
                {openCategories.consultations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            {openCategories.consultations && (
              <div className="border-t border-slate-100 bg-white p-6 sm:p-8 space-y-4 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6">
                  {CONSULTATIONS_MENU_ITEMS.map((item) => {
                    const isSelected = selectedService?.id === item.serviceId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemClick(item.serviceId)}
                        className={`group flex items-center gap-3.5 rounded-xl p-2.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50/80 border border-blue-400 shadow-2xs ring-2 ring-blue-500/20"
                            : "hover:bg-slate-50/90 border border-transparent hover:border-slate-200"
                        }`}
                      >
                        <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 p-1 group-hover:bg-white transition-colors">
                          <img
                            src={item.iconPath}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain drop-shadow-2xs transition-transform group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`text-xs sm:text-sm font-semibold transition-colors block leading-tight ${
                              isSelected ? "text-blue-900 font-bold" : "text-slate-700 group-hover:text-blue-700"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SELECTED SERVICE DETAILS PANEL (The details the client loves!) */}
      {selectedService && (
        <div className="rounded-3xl border border-blue-200/90 bg-gradient-to-b from-blue-50/60 via-white to-white p-6 sm:p-8 shadow-sm space-y-5 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-white border border-blue-100 p-1.5 shadow-xs">
                <img
                  src={getConditionIconPath(selectedService.id)}
                  alt=""
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {selectedService.name}
                  </h3>
                  <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[11px] font-bold text-teal-800 border border-teal-200">
                    {selectedService.coverageBadge}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-blue-600" />
                    <span>{selectedService.durationMinutes} Minutes Consultation</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick forward button */}
            <button
              type="button"
              onClick={onProceed}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Continue with this Service</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {selectedService.description}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 pt-2 border-t border-slate-100">
            {/* Clinical Indications / Symptoms */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Eligible Symptoms & Indications
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedService.clinicalIndications.map((ind, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-teal-600 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation & Self Assessment */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  What to Bring
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedService.preparationNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-blue-600 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BC Government Self-Assessment checklist link */}
              {selectedService.categoryId === "cat_minor_ailments" && (
                <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-2.5">
                  <a
                    href="https://www.healthlinkbc.ca/find-care/pharmacy-services-bc#Self-assessment%20checklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-900 hover:underline"
                  >
                    <span>HealthLink BC Minor Ailment Self-Assessment Checklist</span>
                    <ExternalLink size={12} />
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Review official eligibility criteria prior to your consultation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Glass Bottom Bar - Always Visible */}
      <div className="sticky bottom-3 z-30 flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3 sm:px-5 shadow-lg shadow-slate-900/10">
        <div className="min-w-0 pr-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Selected Service
          </p>
          <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
            {selectedService ? selectedService.name : "Please click on a service above"}
          </p>
        </div>

        <button
          type="button"
          disabled={!selectedService}
          onClick={onProceed}
          className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-900/20 active:scale-95 transition-all disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>Continue</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
