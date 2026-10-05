"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceSelector from "./components/ServiceSelector";
import PatientForm, { PatientFormData } from "./components/PatientForm";
import AppointmentCalendar from "./components/AppointmentCalendar";
import BookingReview from "./components/BookingReview";
import {
  BookingService,
  BOOKING_CATEGORIES,
  ALL_BOOKING_SERVICES,
  getServiceByIdOrSlug,
} from "@/data/booking-services";
import { getConditionIconPath } from "@/data/condition-registry";
import {
  Stethoscope,
  User,
  Calendar,
  CheckCircle2,
  Phone,
  Clock,
} from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";
import { getMainSiteUrl } from "@/lib/routes";

const STEPS = [
  { id: 1, title: "Select Service", icon: Stethoscope },
  { id: 2, title: "Patient Details", icon: User },
  { id: 3, title: "Date & Time", icon: Calendar },
  { id: 4, title: "Confirm", icon: CheckCircle2 },
];

function BookingWizard() {
  const searchParams = useSearchParams();

  // ?service=<slug> (e.g. a condition picked on the Minor Ailments page) skips step 1
  // and opens straight on Patient Details. ?category=<slug> just opens that section.
  const serviceParam = searchParams.get("service") || searchParams.get("serviceId");
  const categoryParam = searchParams.get("category");
  const initialCategory = categoryParam
    ? BOOKING_CATEGORIES.find((c) => c.slug === categoryParam.toLowerCase().replace(/-/g, "_"))?.slug
    : undefined;

  const [selectedService, setSelectedService] = useState<BookingService | null>(() =>
    serviceParam ? getServiceByIdOrSlug(serviceParam) ?? null : null
  );
  const [currentStep, setCurrentStep] = useState<number>(() =>
    serviceParam && getServiceByIdOrSlug(serviceParam) ? 2 : 1
  );

  // Follow later ?service= changes while the page stays mounted (adjusted during render, not in an effect)
  const [prevServiceParam, setPrevServiceParam] = useState(serviceParam);
  if (serviceParam !== prevServiceParam) {
    setPrevServiceParam(serviceParam);
    const match = serviceParam ? getServiceByIdOrSlug(serviceParam) : undefined;
    if (match) {
      setSelectedService(match);
      setCurrentStep(2);
    }
  }
  const partySize = 1;

  const [patientData, setPatientData] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    phn: "",
    reasonForVisit: "",
    caslConsent: false,
  });

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTimeLabel, setSelectedTimeLabel] = useState<string>("");

  function handleReset() {
    setCurrentStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedTimeLabel("");
    setPatientData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      phn: "",
      reasonForVisit: "",
      caslConsent: false,
    });
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-slate-900 antialiased flex flex-col justify-between">
      <div>
        <Header logoHref={getMainSiteUrl("/")} />

        {/* Hero Banner */}
        <section className="border-b border-slate-200 bg-white py-3 sm:py-5">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  Book Your Pharmacy Appointment
                </h1>
                <p className="hidden sm:block mt-0.5 text-xs text-slate-600">
                  Assessments for minor ailments, seasonal vaccines, and medication reviews in Chilliwack.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Dispensary Phone Quick Badge */}
                <div className="hidden sm:flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--brand)] text-white shadow-xs">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500">Book by phone:</p>
                    <a
                      href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                      className="font-bold text-slate-900 hover:text-[var(--brand)] transition-colors"
                    >
                      {PHARMACY_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="mt-2.5 sm:mt-4">
              {/* Desktop Connected Stepper */}
              <div className="hidden sm:block">
                <ol className="grid grid-cols-4 items-center">
                  {STEPS.map((s, index) => {
                    const Icon = s.icon;
                    const isCompleted = currentStep > s.id;
                    const isCurrent = currentStep === s.id;

                    return (
                      <li
                        key={s.id}
                        className={`relative flex flex-col ${
                          index !== STEPS.length - 1
                            ? "after:content-[''] after:w-full after:h-0.5 after:bg-slate-200 after:inline-block after:absolute after:top-4.5 after:left-1/2"
                            : ""
                        } ${isCompleted ? "after:!bg-[var(--brand)]" : ""}`}
                      >
                        <button
                          type="button"
                          disabled={!isCompleted}
                          onClick={() => {
                            if (isCompleted) setCurrentStep(s.id);
                          }}
                          className={`group z-10 flex flex-col items-center text-center transition-all ${
                            isCompleted ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition ${
                              isCompleted
                                ? "bg-[var(--brand)] text-white ring-4 ring-[#E8ECFB] group-hover:bg-[var(--brand-hover)]"
                                : isCurrent
                                ? "bg-[var(--brand)] text-white ring-4 ring-[#3D5FE0]/20"
                                : "bg-slate-100 text-slate-400 border border-slate-200"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={16} className="stroke-[2.5]" />
                            ) : (
                              <Icon size={15} />
                            )}
                          </div>
                          <span
                            className={`mt-2 text-xs font-bold tracking-tight transition-colors ${
                              isCurrent
                                ? "text-slate-900 font-extrabold"
                                : isCompleted
                                ? "text-slate-700 group-hover:text-[var(--brand)]"
                                : "text-slate-400"
                            }`}
                          >
                            {s.title}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Mobile Progress Bar & Counter */}
              <div className="sm:hidden space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="font-bold text-[#1E2A44]">
                    Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1]?.title}
                  </span>
                  <span className="text-slate-500">{Math.round((currentStep / STEPS.length) * 100)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[var(--brand)] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Step Container */}
        <main className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {currentStep === 1 && (
                <ServiceSelector
                  selectedService={selectedService}
                  initialCategory={initialCategory}
                  onSelectService={(service) => setSelectedService(service)}
                  onProceed={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 2 && selectedService && (
                <SelectedServiceSummary service={selectedService} onChange={() => setCurrentStep(1)} />
              )}

              {currentStep === 2 && (
                <PatientForm
                  initialData={patientData}
                  onSubmit={(data) => {
                    setPatientData(data);
                    setCurrentStep(3);
                  }}
                  onBack={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 3 && selectedService && (
                <AppointmentCalendar
                  serviceId={selectedService.id}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedTimeLabel={selectedTimeLabel}
                  onSelectDateTime={(date, time, label) => {
                    setSelectedDate(date);
                    setSelectedTime(time);
                    setSelectedTimeLabel(label);
                  }}
                  onProceed={() => setCurrentStep(4)}
                  onBack={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 4 && selectedService && (
                <BookingReview
                  service={selectedService}
                  partySize={partySize}
                  patient={patientData}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onBack={() => setCurrentStep(3)}
                  onReset={handleReset}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer logoHref={getMainSiteUrl("/")} />
    </div>
  );
}

// Compact "Booking for ..." card shown above Patient Details, with a way back to the service list
function SelectedServiceSummary({ service, onChange }: { service: BookingService; onChange: () => void }) {
  return (
    <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getConditionIconPath(service.id)}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-lg border border-slate-100 bg-slate-50 object-contain p-1"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500">Booking for</p>
          <p className="truncate text-base font-semibold text-slate-900">{service.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
            <Clock size={12} />
            {service.durationMinutes} min with a pharmacist
          </p>
        </div>
        <button
          type="button"
          onClick={onChange}
          className="shrink-0 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
        >
          Change
        </button>
      </div>

      {(service.clinicalIndications.length > 0 || service.preparationNotes.length > 0) && (
        <details className="group mt-3 border-t border-slate-100 pt-3">
          <summary className="cursor-pointer text-sm font-medium text-[var(--brand)] hover:underline">
            What this covers and what to bring
          </summary>
          <div className="mt-3 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            {service.clinicalIndications.length > 0 && (
              <div>
                <p className="font-medium text-slate-900">Covers</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-5">
                  {service.clinicalIndications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {service.preparationNotes.length > 0 && (
              <div>
                <p className="font-medium text-slate-900">Please bring</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-5">
                  {service.preparationNotes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-r-transparent" />
            <p className="mt-3 text-xs font-semibold text-slate-600">
              Loading booking system...
            </p>
          </div>
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
