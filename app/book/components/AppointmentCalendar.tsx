"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  AlertCircle,
  Loader2,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { TimeSlotItem } from "@/app/api/appointments/slots/route";

interface AppointmentCalendarProps {
  serviceId: string;
  partySize: number;
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // "09:00"
  selectedTimeLabel: string; // "9:00 AM"
  onSelectDateTime: (date: string, time: string, timeLabel: string) => void;
  onProceed: () => void;
  onBack: () => void;
}

export default function AppointmentCalendar({
  serviceId,
  partySize,
  selectedDate,
  selectedTime,
  onSelectDateTime,
  onProceed,
  onBack,
}: AppointmentCalendarProps) {
  // Calendar modes: "strip" (Mode A: 7-Day Horizontal Quick Strip) vs "month" (Mode B: Full Interactive Month)
  const [calendarMode, setCalendarMode] = useState<"strip" | "month">("strip");

  // State for horizontal strip window offset (0 = current 7-day window)
  const [stripOffset, setStripOffset] = useState<number>(0);

  // State for month view currently displayed
  const [viewMonthDate, setViewMonthDate] = useState<Date>(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date();
  });

  // Slots fetching state
  const [slots, setSlots] = useState<TimeSlotItem[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Today normalized
  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  // Format date helper (YYYY-MM-DD)
  const toDateString = useCallback((d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Initial selection if empty: pick tomorrow or next open day
  useEffect(() => {
    if (!selectedDate) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);
      // Skip Sunday if tomorrow is Sunday
      if (nextDay.getDay() === 0) {
        nextDay.setDate(nextDay.getDate() + 1);
      }
      onSelectDateTime(toDateString(nextDay), "", "");
    }
  }, [selectedDate, today, onSelectDateTime, toDateString]);

  // Mode A: 7-Day Horizontal Quick Strip Days
  const stripDays = useMemo(() => {
    const days = [];
    const baseDate = new Date(today);
    baseDate.setDate(today.getDate() + stripOffset * 7);

    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const isPast = d < today;
      const isSunday = d.getDay() === 0;
      const dateStr = toDateString(d);

      days.push({
        date: d,
        dateStr,
        dayOfWeek: d.toLocaleDateString("en-CA", { weekday: "short" }),
        dayNumber: d.getDate(),
        monthShort: d.toLocaleDateString("en-CA", { month: "short" }),
        isToday: d.getTime() === today.getTime(),
        isSunday,
        isPast,
        isDisabled: isPast || isSunday,
      });
    }
    return days;
  }, [today, stripOffset, toDateString]);

  // Mode B: Interactive Month Days
  const monthMatrix = useMemo(() => {
    const year = viewMonthDate.getFullYear();
    const month = viewMonthDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const matrix = [];
    const startDayOfWeek = firstDay.getDay(); // 0 = Sun

    // Blank slots for days before 1st of month
    for (let i = 0; i < startDayOfWeek; i++) {
      matrix.push(null);
    }

    // Days in current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const current = new Date(year, month, d);
      const isPast = current < today;
      const isSunday = current.getDay() === 0;
      const dateStr = toDateString(current);

      matrix.push({
        date: current,
        dateStr,
        dayNumber: d,
        isToday: current.getTime() === today.getTime(),
        isSunday,
        isPast,
        isDisabled: isPast || isSunday,
      });
    }

    return matrix;
  }, [viewMonthDate, today, toDateString]);

  // Auto-select first available day in strip if none selected
  useEffect(() => {
    if (!selectedDate && stripDays.length > 0) {
      const firstOpen = stripDays.find((d) => !d.isDisabled);
      if (firstOpen) {
        onSelectDateTime(firstOpen.dateStr, "", "");
      }
    }
  }, [selectedDate, stripDays, onSelectDateTime]);

  // Fetch slots whenever selectedDate or serviceId changes
  useEffect(() => {
    if (!selectedDate) return;

    let isMounted = true;

    async function loadSlots() {
      setIsLoadingSlots(true);
      setFetchError(null);

      try {
        const res = await fetch(
          `/api/appointments/slots?date=${selectedDate}&serviceId=${encodeURIComponent(
            serviceId
          )}`
        );
        const data = await res.json();

        if (!isMounted) return;

        if (data.success) {
          setSlots(data.slots || []);
        } else {
          setFetchError(data.error || "Unable to load time slots.");
          setSlots([]);
        }
      } catch {
        if (!isMounted) return;
        setFetchError("Network error checking availability. Please try again.");
        setSlots([]);
      } finally {
        if (isMounted) {
          setIsLoadingSlots(false);
        }
      }
    }

    loadSlots();

    return () => {
      isMounted = false;
    };
  }, [selectedDate, serviceId]);

  // Separate morning and afternoon slots
  const morningSlots = useMemo(
    () => slots.filter((s) => s.period === "morning"),
    [slots]
  );
  const afternoonSlots = useMemo(
    () => slots.filter((s) => s.period === "afternoon"),
    [slots]
  );

  // Month navigation helpers
  function prevMonth() {
    setViewMonthDate(
      new Date(viewMonthDate.getFullYear(), viewMonthDate.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setViewMonthDate(
      new Date(viewMonthDate.getFullYear(), viewMonthDate.getMonth() + 1, 1)
    );
  }

  // Selected date human label
  const selectedDateFormatted = useMemo(() => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-CA", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Calendar Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-red-800 border border-red-200/80 mb-2">
              <CalendarIcon size={12} className="text-[var(--brand)]" />
              <span>Real-Time Clinical Schedule</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              3. Date & Time Selection
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Choose an available appointment date and 15-minute consultation window.
              {partySize > 1 && (
                <span className="ml-1 font-semibold text-red-900">
                  (Reserving consecutive slots for {partySize} people)
                </span>
              )}
            </p>
          </div>

          {/* Mode Switcher Button */}
          <button
            type="button"
            onClick={() =>
              setCalendarMode(calendarMode === "strip" ? "month" : "strip")
            }
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-[0.98] shadow-2xs"
          >
            {calendarMode === "strip" ? (
              <>
                <CalendarDays size={16} className="text-[var(--brand)]" />
                <span>View Full Month Calendar</span>
              </>
            ) : (
              <>
                <CalendarIcon size={16} className="text-[var(--brand)]" />
                <span>Switch to 7-Day Quick Strip</span>
              </>
            )}
          </button>
        </div>

        {/* MODE A: 7-Day Horizontal Quick Strip */}
        {calendarMode === "strip" && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Day (Monday &ndash; Saturday)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={stripOffset <= 0}
                  onClick={() => setStripOffset((prev) => Math.max(0, prev - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous 7 days"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setStripOffset((prev) => prev + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                  aria-label="Next 7 days"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Horizontal 7-Day Grid */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {stripDays.map((d) => {
                const isSelected = selectedDate === d.dateStr;

                if (d.isDisabled) {
                  return (
                    <div
                      key={d.dateStr}
                      className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/40 p-2.5 sm:p-3 text-center opacity-40 cursor-not-allowed"
                    >
                      <span className="text-[11px] font-semibold text-slate-400">
                        {d.dayOfWeek}
                      </span>
                      <span className="mt-1 text-sm font-bold text-slate-400">
                        {d.dayNumber}
                      </span>
                      <span className="mt-1 text-[10px] uppercase font-bold text-slate-400">
                        {d.isSunday ? "Closed" : d.monthShort}
                      </span>
                    </div>
                  );
                }

                return (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => onSelectDateTime(d.dateStr, "", "")}
                    className={`flex flex-col items-center justify-center rounded-2xl p-2.5 sm:p-3.5 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "border-2 border-[var(--brand)] bg-[var(--brand)] text-white shadow-md shadow-red-700/20 scale-[1.03]"
                        : "border border-slate-200/90 bg-white text-slate-800 hover:border-red-400 hover:bg-red-50/30 hover:shadow-xs"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-bold ${
                        isSelected ? "text-red-100" : "text-slate-500"
                      }`}
                    >
                      {d.isToday ? "Today" : d.dayOfWeek}
                    </span>
                    <span
                      className={`mt-1 text-base font-extrabold sm:text-lg ${
                        isSelected ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {d.dayNumber}
                    </span>
                    <span
                      className={`mt-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isSelected ? "text-red-200" : "text-slate-400"
                      }`}
                    >
                      {d.monthShort}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE B: Full Interactive Month Calendar Popover / Grid */}
        {calendarMode === "month" && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                {viewMonthDate.toLocaleDateString("en-CA", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  aria-label="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* 7 Columns: Sun, Mon, Tue, Wed, Thu, Fri, Sat */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span
                  key={day}
                  className="py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  {day}
                </span>
              ))}

              {monthMatrix.map((item, idx) => {
                if (!item) {
                  return <div key={`empty-${idx}`} className="h-10" />;
                }

                const isSelected = selectedDate === item.dateStr;

                if (item.isDisabled) {
                  return (
                    <div
                      key={item.dateStr}
                      className="flex h-10 flex-col items-center justify-center rounded-lg text-xs font-semibold text-slate-300 opacity-40 cursor-not-allowed"
                    >
                      <span>{item.dayNumber}</span>
                      {item.isSunday && (
                        <span className="text-[9px] uppercase tracking-tighter text-slate-400">
                          Closed
                        </span>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.dateStr}
                    type="button"
                    onClick={() => {
                      onSelectDateTime(item.dateStr, "", "");
                      setCalendarMode("strip");
                    }}
                    className={`flex h-10 flex-col items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[var(--brand)] text-white shadow-xs"
                        : "bg-white text-slate-800 border border-slate-200/80 hover:bg-rose-50 hover:border-rose-300 hover:text-red-950"
                    }`}
                  >
                    <span>{item.dayNumber}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-[11px] text-slate-500">
              <span>* Sundays are closed. Walk-ins are also welcome Mon&ndash;Sat.</span>
              <button
                type="button"
                onClick={() => setCalendarMode("strip")}
                className="font-semibold text-[var(--brand)] hover:underline"
              >
                Close Month View
              </button>
            </div>
          </div>
        )}

        {/* Selected Date Header */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Available Times For:
              </p>
              <h3 className="text-base font-bold text-slate-900">
                {selectedDateFormatted || "Please choose a date above"}
              </h3>
            </div>
            {selectedTime && (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200/80 bg-rose-50 px-3 py-1 text-xs font-bold text-red-900">
                <CheckCircle2 size={14} className="text-[var(--brand)]" />
                <span>Selected: {selectedTime}</span>
              </div>
            )}
          </div>

          {/* Slots Loading Indicator */}
          {isLoadingSlots && (
            <div className="mt-8 flex flex-col items-center justify-center py-12 text-slate-500">
              <Loader2 size={24} className="animate-spin text-[var(--brand)]" />
              <p className="mt-2 text-xs font-semibold">
                Checking real-time dispensary calendar availability...
              </p>
            </div>
          )}

          {/* Slots Error State */}
          {!isLoadingSlots && fetchError && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800">
              <AlertCircle size={18} className="shrink-0 text-red-600" />
              <span>{fetchError}</span>
            </div>
          )}

          {/* Slots Display */}
          {!isLoadingSlots && !fetchError && (
            <div className="mt-6 space-y-6">
              {slots.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    No available time slots on this date.
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    The pharmacy may be closed or all consultation slots booked. Please select another date.
                  </p>
                </div>
              ) : (
                <>
                  {/* Morning Slots Section */}
                  {morningSlots.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3.5 text-slate-700">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200/60">
                          <Sun size={15} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Morning (9:00 AM &ndash; 12:45 PM)
                        </span>
                        <span className="ml-auto text-[11px] font-semibold text-slate-400">
                          {morningSlots.filter(s => s.available).length} open
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                        {morningSlots.map((slot) => {
                          const isSelected = selectedTime === slot.label;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.available}
                              onClick={() =>
                                onSelectDateTime(
                                  selectedDate,
                                  slot.label,
                                  slot.label
                                )
                              }
                              className={`rounded-2xl py-2.5 px-2 text-xs font-bold transition-all duration-150 ${
                                !slot.available
                                  ? "bg-slate-50 text-slate-300 line-through cursor-not-allowed border border-slate-100 opacity-40"
                                  : isSelected
                                  ? "bg-[var(--brand)] text-white shadow-md shadow-red-700/25 ring-2 ring-red-600/30 scale-105"
                                  : "bg-white text-slate-800 border border-slate-200 hover:border-red-400 hover:bg-rose-50/50 hover:scale-[1.02] hover:shadow-2xs cursor-pointer"
                              }`}
                            >
                              {slot.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Afternoon Slots Section */}
                  {afternoonSlots.length > 0 && (
                    <div className="border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-2 mb-3.5 text-slate-700">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-50 text-orange-600 border border-orange-200/60">
                          <Sunset size={15} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Afternoon (1:00 PM &ndash; 5:30 PM)
                        </span>
                        <span className="ml-auto text-[11px] font-semibold text-slate-400">
                          {afternoonSlots.filter(s => s.available).length} open
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                        {afternoonSlots.map((slot) => {
                          const isSelected = selectedTime === slot.label;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.available}
                              onClick={() =>
                                onSelectDateTime(
                                  selectedDate,
                                  slot.label,
                                  slot.label
                                )
                              }
                              className={`rounded-2xl py-2.5 px-2 text-xs font-bold transition-all duration-150 ${
                                !slot.available
                                  ? "bg-slate-50 text-slate-300 line-through cursor-not-allowed border border-slate-100 opacity-40"
                                  : isSelected
                                  ? "bg-[var(--brand)] text-white shadow-md shadow-red-700/25 ring-2 ring-red-600/30 scale-105"
                                  : "bg-white text-slate-800 border border-slate-200 hover:border-red-400 hover:bg-rose-50/50 hover:scale-[1.02] hover:shadow-2xs cursor-pointer"
                              }`}
                            >
                              {slot.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:px-6 sm:py-4 shadow-xl shadow-slate-900/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
        >
          <ChevronLeft size={16} />
          <span>Back to Demographics</span>
        </button>

        <button
          type="button"
          disabled={!selectedDate || !selectedTime}
          onClick={onProceed}
          className="inline-flex items-center gap-2 rounded-2xl bg-[var(--brand)] px-6 py-3 text-sm font-bold text-white shadow-md shadow-red-700/20 transition-all duration-150 hover:bg-[var(--brand-hover)] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <span>Review & Confirm</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
