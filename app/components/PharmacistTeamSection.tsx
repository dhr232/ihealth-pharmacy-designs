"use client";

import { useState, useEffect } from "react";
import { Languages, MessageCircle, MessageSquare, PhoneCall, UserCheck } from "lucide-react";
import { SectionReveal, HoverCard, StaggerContainer, StaggerItem } from "./MotionKit";
import { SEED_PHARMACISTS, type Pharmacist } from "@/app/admin/lib/types";
import { getWhatsAppUrl, getSmsUrl, PHARMACY_INFO } from "@/data/pharmacy-info";

const STORAGE_KEY = "ihealth_admin_pharmacists";

export default function PharmacistTeamSection() {
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>(SEED_PHARMACISTS);

  useEffect(() => {
    let isMounted = true;

    async function fetchPharmacists() {
      try {
        const res = await fetch("/api/pharmacists", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.pharmacists;
          if (isMounted && Array.isArray(list) && list.length > 0) {
            setPharmacists(list.sort((a: Pharmacist, b: Pharmacist) => a.displayOrder - b.displayOrder));
            return;
          }
        }
      } catch {
        // Fetch failed, fall back to localStorage or seed
      }

      if (typeof window !== "undefined") {
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              if (isMounted) {
                setPharmacists(parsed.sort((a: Pharmacist, b: Pharmacist) => a.displayOrder - b.displayOrder));
                return;
              }
            }
          }
        } catch {
          /* ignore */
        }
      }

      if (isMounted) {
        setPharmacists(SEED_PHARMACISTS);
      }
    }

    fetchPharmacists();

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) fetchPharmacists();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("ihealth_pharmacists_updated", fetchPharmacists);
    return () => {
      isMounted = false;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ihealth_pharmacists_updated", fetchPharmacists);
    };
  }, []);

  return (
    <section id="team" className="bg-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center rounded-full bg-[#E8ECFB] border border-[#C7D2F7] px-3.5 py-1 mb-4 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                Our Clinical Team
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Meet Our Caring Experts
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
              Experienced, licensed community pharmacists in Chilliwack dedicated to personalized patient guidance, minor ailments prescribing, and continuous care.
            </p>
          </div>

          <a
            href={getWhatsAppUrl(PHARMACY_INFO.whatsapp.presets.question)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-700/20 transition-all duration-200 active:scale-95 shrink-0"
          >
            <MessageCircle size={16} />
            <span>Ask a Pharmacist</span>
          </a>
        </SectionReveal>

        <StaggerContainer
          key={pharmacists.map((p) => p.id).join("-")}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {pharmacists.map((p) => (
            <StaggerItem key={p.id} className="flex flex-col">
              <HoverCard className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition duration-200 hover:border-slate-300 hover:shadow-md">
                {/* Photo & Role Tag */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photoUrl || "/pharmacists/placeholder.jpg"}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-300 hover:scale-105"
                  />
                  {p.role.toLowerCase().includes("primary") && (
                    <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-blue-700 to-blue-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                      Primary Pharmacist
                    </div>
                  )}
                  <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-2xs backdrop-blur-xs">
                    <UserCheck size={12} className="text-[var(--brand)]" />
                    <span>{p.yearsExperience}+ Yrs Experience</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-1">
                    {p.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-2 text-base font-bold text-slate-900">{p.name}</h3>
                  <p className="text-xs font-semibold text-[var(--brand)]">{p.role}</p>

                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600">
                    {p.bio}
                  </p>

                  {/* Languages & Direct Contact */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between gap-1.5 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Languages size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate">{p.languages.join(", ")}</span>
                      </div>
                      {p.directPhone && (
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 shrink-0">
                          {p.directPhone}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <a
                        href={
                          p.directPhoneRaw
                            ? getSmsUrl(p.directPhoneRaw, `Hello ${p.name}! I would like to ask a question regarding my prescription.`)
                            : getWhatsAppUrl(`Hello ${p.name}! I would like to ask a question regarding my prescription.`)
                        }
                        target={p.directPhoneRaw ? undefined : "_blank"}
                        rel={p.directPhoneRaw ? undefined : "noopener noreferrer"}
                        className={`inline-flex flex-1 items-center justify-center gap-1 rounded-md border px-2.5 py-1.5 text-[11px] font-semibold transition ${
                          p.directPhoneRaw
                            ? "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100"
                            : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                        }`}
                        title={
                          p.directPhone
                            ? `Open message app to text ${p.name} (${p.directPhone})`
                            : `Chat with ${p.name} on WhatsApp`
                        }
                      >
                        {p.directPhoneRaw ? (
                          <MessageSquare size={12} className="text-blue-600" />
                        ) : (
                          <MessageCircle size={12} className="text-emerald-600" />
                        )}
                        <span>{p.directPhoneRaw ? "Message" : "Chat"}</span>
                      </a>
                      <a
                        href={`tel:${p.directPhoneRaw || `+1${PHARMACY_INFO.phoneRaw}`}`}
                        className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 transition"
                        title={
                          p.directPhone
                            ? `Call ${p.name} (${p.directPhone})`
                            : `Call Dispensary (${PHARMACY_INFO.phoneDisplay})`
                        }
                      >
                        <PhoneCall size={12} className="text-slate-500" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
