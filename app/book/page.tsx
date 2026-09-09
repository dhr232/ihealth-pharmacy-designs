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
  const [partySize, setPartySize] = useState<number>(1);

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
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
                    <ShieldCheck size={13} className="text-emerald-700" />
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
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-xs">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-500">Prefer to book by phone?</p>
                  <a
                    href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                    className="font-bold text-slate-900 hover:text-emerald-700"
                  >
                    {PHARMACY_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="mt-8">
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {STEPS.map((s) => {
                  const Icon = s.icon;
                  const isCompleted = currentStep > s.id;
                  const isCurrent = currentStep === s.id;

                  return (
                    <div
                      key={s.id}
                      className={`flex flex-col items-center sm:items-start rounded-xl p-2.5 transition-all ${
                        isCurrent
                          ? "border border-emerald-600 bg-emerald-50/80"
                          : isCompleted
                          ? "border border-slate-200 bg-white"
                          : "border border-transparent opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all ${
                            isCompleted
                              ? "bg-emerald-700 text-white"
                              : isCurrent
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={14} className="stroke-[2.5]" />
                          ) : (
                            <Icon size={12} />
                          )}
                        </div>
                        <span className="hidden text-xs font-bold sm:inline text-slate-900">
                          {s.title}
                        </span>
                      </div>
                      <span className="mt-1 text-[11px] font-medium text-slate-500 sm:hidden">
                        {s.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Main Step Container */}
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {currentStep === 1 && (
            <ServiceSelector
              selectedService={selectedService}
              onSelectService={(service) => setSelectedService(service)}
              partySize={partySize}
              onChangePartySize={(size) => setPartySize(size)}
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
              partySize={partySize}
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
