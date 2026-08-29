import type { Metadata } from "next";
import Header from "./components/Header";
import HeroCTA from "./components/HeroCTA";

export const metadata: Metadata = {
  title: "iHealth Pharmacy — Concierge Care, Abbotsford BC",
  description:
    "An independent neighborhood pharmacy offering concierge-level care: refills, transfers, compounding, home delivery, and a pharmacist who knows your name.",
};

const serif = { fontFamily: "'Cormorant Garamond', serif" };

const services = [
  {
    title: "Immunizations",
    copy: "Flu, shingles, pneumonia, and travel vaccines — administered privately, with records forwarded straight to your physician.",
  },
  {
    title: "Home Delivery",
    copy: "Same-day courier across Abbotsford, discreetly packaged and hand-delivered. Your schedule, not ours.",
  },
  {
    title: "Compounding",
    copy: "Custom strengths, flavors, and allergen-free formulations prepared in-house to your prescriber's exact specification.",
  },
  {
    title: "Medication Sync",
    copy: "Every prescription aligned to one convenient monthly pickup. One trip, one conversation, zero clutter.",
  },
];

const testimonials = [
  {
    quote:
      "They call me by name, they remember my father's medication history, and they once stayed open late so I wouldn't miss a dose. This is what a pharmacy should be.",
    name: "Margaret H.",
    detail: "Patient for 8 years · Hyde Park",
  },
  {
    quote:
      "Transferred three prescriptions in one phone call. The pharmacist personally reviewed everything with my cardiologist's office before the first fill.",
    name: "Daniel R.",
    detail: "New patient · Westlake",
  },
  {
    quote:
      "The compounded formula they made for my daughter's allergy medication actually tastes fine to her. After years of battles at the chain store, that's a small miracle.",
    name: "Priya S.",
    detail: "Patient for 3 years · Mueller",
  },
];

function Divider() {
  return <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[#c9a35f44] to-transparent" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9a35f]">
      {children}
    </p>
  );
}

export default function ConciergePage() {
  return (
    <main
      id="top"
      className="min-h-screen bg-[#0e0e10] text-[16px] leading-relaxed text-[#ece9e4]"
    >
      {/* Fonts: Google Fonts links (no layout edits permitted) */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Marcellus&display=swap"
        rel="stylesheet"
      />

      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-28 pt-40 md:pt-48">
        {/* radial glow behind the hero stand-in */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-[8%] h-[520px] w-[520px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, #c9a35f26, transparent 70%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionLabel>Independent · Est. 2012</SectionLabel>
            <h1
              className="mt-6 text-5xl font-light leading-[1.08] md:text-6xl"
              style={serif}
            >
              Pharmacy care,
              <br />
              offered the way{" "}
              <em className="text-[#c9a35f]">it should be.</em>
            </h1>
            <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-[#ece9e4]/75">
              iHealth is a neighborhood pharmacy with the temperament of a
              private clinic. Unhurried consultations, same-day delivery, and a
              pharmacist who actually knows your name — all on the corner of
              45th &amp; Duval, Abbotsford.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <HeroCTA />
              <a
                href="#refill"
                className="border border-[#ece9e4]/20 px-8 py-4 text-[12px] uppercase tracking-[0.3em] text-[#ece9e4]/85 transition-colors hover:border-[#c9a35f] hover:text-[#c9a35f]"
              >
                Refill RX
              </a>
              <a
                href="#transfer"
                className="text-[12px] uppercase tracking-[0.3em] text-[#ece9e4]/50 underline decoration-[#c9a35f66] underline-offset-8 transition-colors hover:text-[#c9a35f]"
              >
                Transfer a prescription
              </a>
            </div>
          </div>

          {/* hero image stand-in: apothecary SVG vignette */}
          <div className="relative hidden justify-center md:flex">
            <div className="relative flex h-[380px] w-[300px] items-center justify-center border border-[#c9a35f33] bg-[#141416]">
              <div className="absolute inset-3 border border-[#c9a35f22]" />
              <svg
                viewBox="0 0 120 160"
                className="h-48 w-36 text-[#c9a35f]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M45 30h30M48 30v14l-14 62a10 10 0 0 0 10 13h32a10 10 0 0 0 10-13L72 44V30" />
                <path d="M40 90h40M44 105h32" />
                <circle cx="60" cy="76" r="6" />
              </svg>
              <p className="absolute bottom-8 text-[10px] uppercase tracking-[0.4em] text-[#ece9e4]/40">
                The Apothecary
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────── */}
      <section className="border-y border-[#c9a35f22] bg-[#121214]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-[#c9a35f22] px-6 sm:grid-cols-4 sm:divide-x">
          {[
            ["Licensed in BC", "TSBP #28471"],
            ["4.9 ★", "412 patient reviews"],
            ["12 Years", "Serving Abbotsford"],
            ["Same-Day", "Home delivery"],
          ].map(([top, bottom]) => (
            <div key={top} className="py-7 text-center">
              <p className="text-lg text-[#c9a35f]" style={serif}>
                {top}
              </p>
              <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-[#ece9e4]/50">
                {bottom}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section id="services" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Our Practice</SectionLabel>
          <h2
            className="mt-5 max-w-xl text-4xl font-light leading-tight md:text-5xl"
            style={serif}
          >
            Four quiet rooms of care.
          </h2>
          <div className="mt-14 grid gap-px bg-[#c9a35f22] sm:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.title}
                className="group bg-[#121214] p-10 transition-colors hover:bg-[#17171a]"
              >
                <h3
                  className="text-2xl font-light text-[#ece9e4] transition-colors group-hover:text-[#c9a35f]"
                  style={serif}
                >
                  {s.title}
                </h3>
                <div className="mt-4 h-px w-10 bg-[#c9a35f66] transition-all group-hover:w-16" />
                <p className="mt-5 text-[15px] leading-relaxed text-[#ece9e4]/70">
                  {s.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 3-STEP REFILL ────────────────────────────────── */}
      <section id="refill" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel>Refill RX</SectionLabel>
              <h2
                className="mt-5 text-4xl font-light leading-tight md:text-5xl"
                style={serif}
              >
                Refills, handled in three moves.
              </h2>
              <p className="mt-6 max-w-md text-[16px] text-[#ece9e4]/70">
                No app downloads, no account passwords you&apos;ll forget. A
                refill at iHealth takes under a minute — and we text you the
                moment it&apos;s ready.
              </p>
            </div>
            <ol className="space-y-0">
              {[
                [
                  "01",
                  "Send us the bottle",
                  "Text a photo of your label to (604) 555-0199, or call and read us the Rx number. That's genuinely all we need.",
                ],
                [
                  "02",
                  "We verify and prepare",
                  "Your pharmacist confirms the fill with your prescriber, checks for interactions, and prepares it — usually within the hour.",
                ],
                [
                  "03",
                  "Pickup or door-delivery",
                  "Collect it at the counter with a proper consultation, or have it couriered to your door the same day. Your preference, every time.",
                ],
              ].map(([n, title, copy], i) => (
                <li
                  key={n}
                  className={`flex gap-8 py-9 ${i < 2 ? "border-b border-[#c9a35f22]" : ""}`}
                >
                  <span
                    className="text-3xl font-light text-[#c9a35f]"
                    style={serif}
                  >
                    {n}
                  </span>
                  <div>
                    <h3
                      className="text-2xl font-light text-[#ece9e4]"
                      style={serif}
                    >
                      {title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#ece9e4]/65">
                      {copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── TRANSFER ─────────────────────────────────────── */}
      <section id="transfer" className="border-y border-[#c9a35f22] bg-[#121214] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <SectionLabel>Transfer</SectionLabel>
          <h2
            className="mx-auto mt-5 max-w-2xl text-4xl font-light leading-tight md:text-5xl"
            style={serif}
          >
            Leaving the big chain? We&apos;ll carry everything over.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] text-[#ece9e4]/70">
            One phone call moves every prescription, insurance detail, and
            prescriber contact. We handle the paperwork and the hold music —
            you&apos;ll simply get one text when it&apos;s done.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+15125550134"
              className="border border-[#c9a35f] bg-[#c9a35f] px-8 py-4 text-[12px] uppercase tracking-[0.3em] text-[#0e0e10] transition-all hover:bg-transparent hover:text-[#c9a35f]"
            >
              Call to Transfer
            </a>
            <p className="text-[13px] tracking-wide text-[#ece9e4]/50">
              Average transfer time: 2 working hours
            </p>
          </div>
        </div>
      </section>

      {/* ── PHARMACIST ───────────────────────────────────── */}
      <section id="pharmacist" className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
          {/* portrait stand-in */}
          <div className="mx-auto flex h-[340px] w-[270px] flex-col items-center justify-center border border-[#c9a35f33] bg-[#141416]">
            <svg
              viewBox="0 0 80 100"
              className="h-32 w-24 text-[#c9a35f]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <circle cx="40" cy="32" r="14" />
              <path d="M16 88c0-16 10-24 24-24s24 8 24 24M40 46v10M34 58h12" />
            </svg>
            <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[#ece9e4]/40">
              Dr. Elena Ruiz, PharmD
            </p>
          </div>
          <div>
            <SectionLabel>Your Pharmacist</SectionLabel>
            <h2
              className="mt-5 text-4xl font-light leading-tight md:text-5xl"
              style={serif}
            >
              “I opened iHealth because medicine deserves a longer
              conversation.”
            </h2>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-[#ece9e4]/75">
              Dr. Elena Ruiz spent a decade behind the counter at a national
              chain, watching patients get ninety seconds with a pharmacist who
              didn&apos;t know their name. In 2012 she opened iHealth with a
              simple rule: every patient gets the time their health actually
              requires.
            </p>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#ece9e4]/75">
              Today, she personally reviews every new transfer, sits down for
              each immunization herself, and still answers the phone on
              Tuesday afternoons.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Kind Words</SectionLabel>
          <h2
            className="mt-5 max-w-xl text-4xl font-light leading-tight md:text-5xl"
            style={serif}
          >
            What the neighborhood says.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="border border-[#c9a35f33] bg-[#121214] p-9 transition-colors hover:border-[#c9a35f66]"
              >
                <span className="text-4xl text-[#c9a35f]" style={serif}>
                  “
                </span>
                <blockquote className="text-[15px] leading-relaxed text-[#ece9e4]/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-[#c9a35f22] pt-5">
                  <p className="text-[15px] text-[#c9a35f]" style={serif}>
                    {t.name}
                  </p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-[#ece9e4]/45">
                    {t.detail}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION / HOURS / CONTACT ───────────────────── */}
      <section id="visit" className="border-t border-[#c9a35f22] bg-[#121214] px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-3">
          <div>
            <SectionLabel>Visit</SectionLabel>
            <h3 className="mt-4 text-3xl font-light" style={serif}>
              The Corner
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-[#ece9e4]/70">
              4500 Duval Street
              <br />
              Abbotsford, BC 78751
              <br />
              <span className="text-[#ece9e4]/50">
                Free parking behind the building
              </span>
            </p>
          </div>
          <div>
            <SectionLabel>Hours</SectionLabel>
            <h3 className="mt-4 text-3xl font-light" style={serif}>
              Open Daily
            </h3>
            <ul className="mt-5 space-y-2 text-[15px] text-[#ece9e4]/70">
              <li className="flex justify-between gap-6">
                <span>Mon – Fri</span>
                <span>8:30a – 7:00p</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Saturday</span>
                <span>9:00a – 5:00p</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Sunday</span>
                <span>10:00a – 2:00p</span>
              </li>
            </ul>
          </div>
          <div>
            <SectionLabel>Contact</SectionLabel>
            <h3 className="mt-4 text-3xl font-light" style={serif}>
              Reach Us
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-[#ece9e4]/70">
              Phone ·{" "}
              <a
                href="tel:+15125550134"
                className="text-[#c9a35f] hover:underline"
              >
                (604) 555-0199
              </a>
              <br />
              Text refills · (604) 555-0199
              <br />
              Fax · (604) 555-0136
              <br />
              care@medcornerpharmacy.com
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-[#c9a35f22] px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <p className="text-xl font-light" style={serif}>
            iHealth<span className="text-[#c9a35f]">&nbsp;Pharmacy</span>
          </p>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#ece9e4]/40">
            Independent &amp; licensed by the BC College of Pharmacists
          </p>
          <p className="text-[12px] tracking-wide text-[#ece9e4]/40">
            © {new Date().getFullYear()} iHealth Pharmacy · Abbotsford, BC
          </p>
        </div>
      </footer>
    </main>
  );
}
