"use client";

import { useState, useEffect } from "react";
import { Languages, MessageCircle, PhoneCall, UserCheck } from "lucide-react";
import { SectionReveal, HoverCard, StaggerContainer, StaggerItem } from "./MotionKit";
import { SEED_PHARMACISTS, type Pharmacist } from "@/app/admin/lib/types";
import { getWhatsAppUrl, PHARMACY_INFO } from "@/data/pharmacy-info";

const STORAGE_KEY = "ihealth_admin_pharmacists";

export default function PharmacistTeamSection() {
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>(SEED_PHARMACISTS);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function loadPharmacists() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPharmacists(parsed.sort((a: Pharmacist, b: Pharmacist) => a.displayOrder - b.displayOrder));
            return;
          }
        }
      } catch {
        /* ignore */
      }
      setPharmacists(SEED_PHARMACISTS);
    }

    loadPharmacists();

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) loadPharmacists();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("ihealth_pharmacists_updated", loadPharmacists);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ihealth_pharmacists_updated", loadPharmacists);
    };
  }, []);

  return (
    <section id="team" className="bg-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center rounded-full bg-red-50 border border-red-200/80 px-3.5 py-1 mb-4 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                Our Clinical Team
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Meet Our Caring Experts
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
              Experienced, licensed community pharmacists in Abbotsford dedicated to personalized patient guidance, minor ailments prescribing, and continuous care.
            </p>
          </div>

          <a
            href={getWhatsAppUrl(PHARMACY_INFO.whatsapp.presets.question)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-[var(--brand-hover)]"
          >
            <MessageCircle size={16} />
            <span>Ask a Pharmacist</span>
          </a>
        </SectionReveal>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  <p className="text-xs font-medium text-[var(--brand)]">{p.role}</p>

                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600">
                    {p.bio}
                  </p>

                  {/* Languages */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Languages size={13} className="text-slate-400" />
                      <span>{p.languages.join(", ")}</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <a
                        href={getWhatsAppUrl(`Hello ${p.name}! I would like to ask a question regarding my prescription.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 transition"
                      >
                        <MessageCircle size={12} className="text-emerald-600" />
                        <span>Chat</span>
                      </a>
                      <a
                        href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                        className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 transition"
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
