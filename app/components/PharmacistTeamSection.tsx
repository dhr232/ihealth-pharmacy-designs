"use client";

import { useState, useEffect } from "react";
import { GraduationCap, HeartHandshake, Languages, MessageCircle, MessageSquare, PhoneCall } from "lucide-react";
import { SectionReveal, HoverCard, StaggerContainer, StaggerItem } from "./MotionKit";
import { SEED_PHARMACISTS, type Pharmacist } from "@/app/admin/lib/types";
import { getWhatsAppUrl, getSmsUrl, PHARMACY_INFO } from "@/data/pharmacy-info";

const STORAGE_KEY = "ihealth_admin_pharmacists";

function splitBio(bio: string): { why: string; mission: string } {
  const sentences = bio.match(/[^.!?]+[.!?]+(\s|$)/g)?.map((t) => t.trim()) ?? [bio.trim()];
  return { why: sentences[0] ?? "", mission: sentences.slice(1).join(" ") };
}

export default function PharmacistTeamSection({ variant = "grid" }: { variant?: "grid" | "feature" }) {
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

  // Dev Patel is the clinic's only pharmacist; fall back to the first profile if he is not in the list
  const devProfile = pharmacists.filter((p) => /dev\s+patel/i.test(p.name));
  const featured = devProfile.length > 0 ? devProfile : pharmacists.slice(0, 1);

  if (variant === "feature") {
    return (
      <section id="team" className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionReveal>
            <div className="inline-flex items-center rounded-full bg-[#E8ECFB] border border-[#C7D2F7] px-3.5 py-1 mb-4 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                Our Clinical Team
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
              Meet Our Caring {featured.length === 1 ? "Expert" : "Experts"}
            </h2>
          </SectionReveal>

          <div className="mt-8 space-y-8 lg:space-y-10">
            {featured.map((p) => {
              const { why, mission } = splitBio(p.bio);
              const firstName = p.name.replace(/^Dr\.?\s+/i, "").split(" ")[0];
              const messageHref = p.directPhoneRaw
                ? getSmsUrl(p.directPhoneRaw, `Hello ${p.name}! I would like to ask a question regarding my prescription.`)
                : getWhatsAppUrl(`Hello ${p.name}! I would like to ask a question regarding my prescription.`);
              return (
                <SectionReveal key={p.id}>
                  <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-8">
                    {/* Pharmacist card (left) */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-[#D5E4FF] bg-gradient-to-br from-[#F7FAFF] via-[#EEF4FF] to-[#E4EEFF] p-6 shadow-sm sm:p-9 lg:col-span-7">
                      <span className="pointer-events-none absolute -top-12 -right-10 h-40 w-40 rounded-full bg-[#C5D8FF] opacity-70" aria-hidden="true" />
                      <span className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-[#C5D8FF] opacity-40" aria-hidden="true" />

                      <div className="relative">
                        <div className="flex flex-wrap items-center gap-2">
                          {p.credentials.map((cred) => (
                            <span key={cred} className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#2F5BC4] ring-1 ring-[#C9D6FF]">
                              {cred}
                            </span>
                          ))}
                          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-[#C9D6FF]">
                            {p.yearsExperience}+ years experience
                          </span>
                        </div>

                        <h3 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">{p.name}</h3>
                        <p className="mt-1 text-base font-semibold text-[var(--brand)] sm:text-lg">{p.role}</p>

                        <div className="mt-6 space-y-5">
                          {why && (
                            <div className="flex items-start gap-3.5">
                              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--brand)] shadow-sm">
                                <GraduationCap size={20} aria-hidden="true" />
                              </span>
                              <div>
                                <h4 className="text-base font-bold text-[var(--foreground)]">Why {firstName} became a pharmacist</h4>
                                <p className="mt-1 text-base leading-relaxed text-slate-700 sm:text-lg">{why}</p>
                              </div>
                            </div>
                          )}
                          {mission && (
                            <div className="flex items-start gap-3.5">
                              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#C2476A] shadow-sm">
                                <HeartHandshake size={20} aria-hidden="true" />
                              </span>
                              <div>
                                <h4 className="text-base font-bold text-[var(--foreground)]">What {firstName} loves about the work</h4>
                                <p className="mt-1 text-base leading-relaxed text-slate-700 sm:text-lg">{mission}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-600 sm:text-base">
                          <Languages size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
                          Speaks {p.languages.join(", ")}
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <a
                            href={messageHref}
                            target={p.directPhoneRaw ? undefined : "_blank"}
                            rel={p.directPhoneRaw ? undefined : "noopener noreferrer"}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[var(--brand-hover)]"
                          >
                            <MessageSquare size={18} aria-hidden="true" />
                            {p.directPhoneRaw ? "Send a message" : "Chat with " + firstName}
                          </a>
                          <a
                            href={`tel:${p.directPhoneRaw || `+1${PHARMACY_INFO.phoneRaw}`}`}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#C9D6FF] bg-white px-6 py-3 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                          >
                            <PhoneCall size={18} aria-hidden="true" />
                            Call {p.directPhone || PHARMACY_INFO.phoneDisplay}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Photo (right) */}
                    <div className="relative order-first min-h-[22rem] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm sm:min-h-[28rem] lg:order-last lg:col-span-5 lg:min-h-[32rem]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.photoUrl || "/pharmacists/placeholder.jpg"}
                        alt={`${p.name}, ${p.role}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                      />
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="bg-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center rounded-full bg-[#E8ECFB] border border-[#C7D2F7] px-3.5 py-1 mb-4 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
                Our Clinical Team
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
              Meet Our Caring Experts
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Experienced, licensed community pharmacists in Chilliwack dedicated to personalized patient guidance, minor ailments prescribing, and continuous care.
            </p>
          </div>

          <a
            href={getWhatsAppUrl(PHARMACY_INFO.whatsapp.presets.question)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            <MessageCircle size={16} />
            <span>Ask a Pharmacist</span>
          </a>
        </SectionReveal>

        <StaggerContainer
          key={pharmacists.map((p) => p.id).join("-")}
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {pharmacists.map((p) => {
            const messageHref = p.directPhoneRaw
              ? getSmsUrl(p.directPhoneRaw, `Hello ${p.name}! I would like to ask a question regarding my prescription.`)
              : getWhatsAppUrl(`Hello ${p.name}! I would like to ask a question regarding my prescription.`);
            return (
              <StaggerItem key={p.id} className="flex flex-col">
                <HoverCard className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-slate-300 hover:shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photoUrl || "/pharmacists/placeholder.jpg"}
                    alt={p.name}
                    loading="lazy"
                    className="h-64 w-full rounded-2xl object-cover object-[center_18%]"
                  />

                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {p.yearsExperience}+ Years Experience
                  </p>
                  <h3 className="mt-1 font-bold text-[var(--foreground)]">{p.name}</h3>
                  <p className="text-sm font-semibold text-[var(--brand)]">{p.role}</p>
                  {p.credentials.length > 0 && (
                    <p className="mt-0.5 text-[11px] font-medium text-slate-500">{p.credentials.join(" · ")}</p>
                  )}

                  <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-600">{p.bio}</p>

                  <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Languages size={13} className="shrink-0 text-slate-400" />
                    <span className="truncate">{p.languages.join(", ")}</span>
                  </p>

                  <div className="mt-3 flex gap-2 text-sm font-bold">
                    <a
                      href={messageHref}
                      target={p.directPhoneRaw ? undefined : "_blank"}
                      rel={p.directPhoneRaw ? undefined : "noopener noreferrer"}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 min-h-11 rounded-lg bg-slate-50 px-2 py-2 text-[var(--foreground)] transition hover:bg-[var(--brand-subtle)] hover:text-[var(--brand)]"
                      title={
                        p.directPhone
                          ? `Open message app to text ${p.name} (${p.directPhone})`
                          : `Chat with ${p.name} on WhatsApp`
                      }
                    >
                      <MessageSquare size={13} />
                      <span>{p.directPhoneRaw ? "Message" : "Chat"}</span>
                    </a>
                    <a
                      href={`tel:${p.directPhoneRaw || `+1${PHARMACY_INFO.phoneRaw}`}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 min-h-11 rounded-lg bg-slate-50 px-2 py-2 text-[var(--foreground)] transition hover:bg-[var(--brand-subtle)] hover:text-[var(--brand)]"
                      title={
                        p.directPhone
                          ? `Call ${p.name} (${p.directPhone})`
                          : `Call Dispensary (${PHARMACY_INFO.phoneDisplay})`
                      }
                    >
                      <PhoneCall size={13} />
                      <span>Call</span>
                    </a>
                  </div>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
