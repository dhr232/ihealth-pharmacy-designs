"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const VARIANTS = [
  {
    slug: "heritage",
    num: "01",
    name: "Warm Heritage",
    tagline: "Trusted neighborhood institution",
    desc: "Cream, forest green & terracotta. Serif warmth, since-2012 credibility.",
    dot: "#1f3d2b",
  },
  {
    slug: "clinical",
    num: "02",
    name: "Clinical Modern",
    tagline: "Digital-first trusted care",
    desc: "Crisp white & medical teal. Swiss grid, calm and precise.",
    dot: "#0f766e",
  },
  {
    slug: "editorial",
    num: "03",
    name: "Editorial Bold",
    tagline: "Wellness magazine energy",
    desc: "Paper, ink & one loud accent. Huge type, numbered sections.",
    dot: "#c8f04a",
  },
  {
    slug: "friendly",
    num: "04",
    name: "Friendly & Playful",
    tagline: "Approachable, colorful wellness",
    desc: "Bright and cheerful. Rounded, soft, makes healthcare less intimidating.",
    dot: "#16a34a",
  },
  {
    slug: "concierge",
    num: "05",
    name: "Premium Dark",
    tagline: "Concierge-level care",
    desc: "Charcoal & muted gold. Boutique, cinematic, quietly luxurious.",
    dot: "#c9a35f",
  },
];

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [preview]);

  const active = VARIANTS.find((v) => v.slug === preview) ?? null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-emerald-400 selection:text-black">
      {/* top bar */}
      <header className="border-b border-neutral-800 px-6 md:px-10 py-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            iHealth Pharmacy
          </p>
          <h1 className="text-lg md:text-xl font-semibold text-white mt-1">
            Design explorer
          </h1>
        </div>
        <p className="text-xs text-neutral-500 hidden sm:block">
          5 directions · pick one to go live
        </p>
      </header>

      <div className="grid lg:grid-cols-[380px_1fr] min-h-[calc(100vh-73px)]">
        {/* variant list */}
        <aside className="border-b lg:border-b-0 lg:border-r border-neutral-800 p-4 md:p-6 space-y-2 overflow-y-auto">
          {VARIANTS.map((v) => {
            const isActive = preview === v.slug;
            return (
              <div
                key={v.slug}
                onMouseEnter={() => setPreview(v.slug)}
                className={`group rounded-xl border p-4 transition-colors ${
                  isActive
                    ? "border-neutral-600 bg-neutral-900"
                    : "border-neutral-800 bg-transparent hover:border-neutral-700 hover:bg-neutral-900/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: v.dot }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-mono text-neutral-600">
                        {v.num}
                      </span>
                      <h2 className="font-semibold text-white">{v.name}</h2>
                    </div>
                    <p className="text-xs text-emerald-400/90 mt-0.5">
                      {v.tagline}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                      {v.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs">
                      <button
                        onClick={() => setPreview(v.slug)}
                        className="text-neutral-400 hover:text-white underline-offset-4 hover:underline"
                      >
                        {isActive ? "Previewing" : "Preview"}
                      </button>
                      <Link
                        href={`/variants/${v.slug}`}
                        className="text-neutral-400 hover:text-white underline-offset-4 hover:underline"
                      >
                        Open full page →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <p className="text-[11px] text-neutral-600 pt-2 px-1 leading-relaxed">
            Hover a card to preview on the right. Each variant is a full route at
            /variants/&lt;name&gt;.
          </p>
        </aside>

        {/* preview panel */}
        <section className="relative bg-neutral-900">
          {active ? (
            <div className="absolute inset-0 flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 text-xs text-neutral-400">
                <span className="truncate">
                  Preview — {active.name}{" "}
                  <span className="text-neutral-600">/variants/{active.slug}</span>
                </span>
                {!loaded && <span className="text-neutral-500">loading…</span>}
              </div>
              <iframe
                key={active.slug}
                src={`/variants/${active.slug}`}
                onLoad={() => setLoaded(true)}
                className="flex-1 w-full bg-white"
                title={active.name}
              />
            </div>
          ) : (
            <div className="absolute inset-0 grid place-items-center p-10 text-center">
              <div>
                <p className="text-5xl mb-4">💊</p>
                <h2 className="text-xl font-semibold text-white">
                  Hover a variant to preview it here
                </h2>
                <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto">
                  Five distinct design directions for iHealth Pharmacy — from warm
                  neighborhood heritage to premium concierge dark. Pick the one that
                  fits your brand and we take it live.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
