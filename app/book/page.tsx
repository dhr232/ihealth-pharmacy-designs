"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceSelector from "./components/ServiceSelector";
import PatientForm, { PatientFormData } from "./components/PatientForm";
import AppointmentCalendar from "./components/AppointmentCalendar";
import BookingReview from "./components/BookingReview";
import {
  BookingService,
  ALL_BOOKING_SERVICES,
  getServiceByIdOrSlug,
} from "@/data/booking-services";
import {
  Stethoscope,
  User,
  Calendar,
  CheckCircle2,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

const STEPS = [
  { id: 1, title: "Select Service", icon: Stethoscope },
  { id: 2, title: "Patient Details", icon: User },
  { id: 3, title: "Date & Time", icon: Calendar },
  { id: 4, title: "Confirm", icon: CheckCircle2 },
];

function BookingWizard() {
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<BookingService | null>(
    () => ALL_BOOKING_SERVICES[0] || null
  );
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

  // Read URL params (e.g. ?service=uncomplicated-urinary-tract-infection)
  useEffect(() => {
    const serviceParam = searchParams.get("service") || searchParams.get("serviceId");
    if (serviceParam) {
      const match = getServiceByIdOrSlug(serviceParam);
      if (match) {
        queueMicrotask(() => {
          setSelectedService(match);
        });
      }
    }
  }, [searchParams]);

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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased flex flex-col justify-between">
      <div>
        <Header />

        {/* Hero Banner */}
        <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-800 border border-red-200/80">
                    <ShieldCheck size={13} className="text-[var(--brand)]" />
                    <span>Official BC Clinical Booking</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    booking.ihealthpharmacy.ca
                  </span>
                </div>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Book Your Pharmacy Appointment
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Assessments for 21 minor ailments, seasonal vaccines, and medication reviews in Abbotsford.
                </p>
              </div>

              {/* Dispensary Phone Quick Badge */}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-xs">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)] text-white shadow-xs">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-500">Prefer to book by phone?</p>
                  <a
                    href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                    className="font-bold text-slate-900 hover:text-[var(--brand)] transition-colors"
                  >
                    {PHARMACY_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="mt-8">
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
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 shadow-xs ${
                              isCompleted
                                ? "bg-[var(--brand)] text-white ring-4 ring-red-100 group-hover:bg-[var(--brand-hover)]"
                                : isCurrent
                                ? "bg-[var(--brand)] text-white ring-4 ring-red-500/20 shadow-md shadow-red-700/20"
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
                  <span className="font-bold text-red-900">
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
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          {currentStep === 1 && (
            <ServiceSelector
              selectedService={selectedService}
              onSelectService={(service) => setSelectedService(service)}
              onProceed={() => setCurrentStep(2)}
            />
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
        </main>
      </div>

      <Footer />
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
