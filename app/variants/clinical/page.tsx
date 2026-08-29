import { Header } from "./components/Header";
import { RefillSteps } from "./components/RefillSteps";

const SERVICES = [
  { title: "Refills & Transfers", desc: "Online, app, or phone. Transfers handled same-day with full prescriber outreach.", tag: "Same-day" },
  { title: "Immunizations", desc: "Flu, COVID-19, shingles, Tdap and travel vaccines. Walk-ins accepted 7 days a week.", tag: "Walk-in" },
  { title: "Medication Reviews", desc: "A structured one-on-one with your pharmacist. Interaction check on every medication.", tag: "Free" },
  { title: "Compounding", desc: "Custom strengths, allergen-free formulas, pediatric liquids, topical pain gels.", tag: "48-hr" },
  { title: "Home Delivery", desc: "Free same-day delivery across our service zone. Refrigerated items in insulated totes.", tag: "Free" },
  { title: "Med Sync", desc: "All maintenance medications aligned to one monthly pickup date. Zero gaps.", tag: "Monthly" },
];

const STATS = [
  { n: "12", label: "Years serving BC" },
  { n: "20k+", label: "Prescriptions filled" },
  { n: "4.9", label: "Patient rating / 5" },
  { n: "<4h", label: "Typical refill time" },
];

const TESTIMONIALS = [
  { quote: "Texts when ready, no line at pickup, and the pharmacist flagged an interaction my doctor missed. Efficient and careful.", name: "Eleanor V.", role: "Med sync patient" },
  { quote: "Transferred four prescriptions in one call. Everything was ready that afternoon with receipts for my insurer.", name: "Marcus H.", role: "Transferred patient" },
  { quote: "The refill app took 40 seconds. Delivery arrived the same evening. This is how pharmacy should work.", name: "Anita S.", role: "Delivery patient" },
];

export default function ClinicalPage() {
  return (
    <div className="bg-white text-slate-900">
      <Header />

      {/* ===== Hero ===== */}
      <section id="top" className="border-b border-slate-200">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:items-center md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-semibold text-teal-800">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600" /> Accepting new patients &amp; transfers
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Pharmacy care, engineered around{" "}
              <span className="text-teal-700">you</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              iHealth Pharmacy combines the efficiency of a digital-first pharmacy with the judgment of a pharmacist who knows your file.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#refills" className="rounded-md bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800">
                Refill a Prescription
              </a>
              <a href="#transfer" className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-teal-600 hover:text-teal-700">
                Transfer to iHealth →
              </a>
            </div>
            {/* stats row */}
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="order-2 text-xs font-medium uppercase tracking-wider text-slate-500">{s.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-slate-900">{s.n}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* hero visual */}
          <div className="relative hidden md:block">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ihealth-logo.png" alt="iHealth Pharmacy" className="mx-auto w-40 rounded-full ring-1 ring-slate-200" />
              <div className="mt-8 space-y-3">
                {[
                  ["Rx #7042318 — filled", "teal"],
                  ["Refill reminder sent — SMS", "slate"],
                  ["Delivery scheduled — today 4pm", "teal"],
                ].map(([row, tone], i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm">
                    <span className={`h-2 w-2 rounded-full ${tone === "teal" ? "bg-teal-600" : "bg-slate-400"}`} />
                    <span className="font-medium text-slate-700">{row}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-2">⚕ Licensed BC Pharmacists</span>
          <span className="h-3 w-px bg-slate-300" />
          <span>Same-day transfers</span>
          <span className="h-3 w-px bg-slate-300" />
          <span>Free local delivery</span>
          <span className="h-3 w-px bg-slate-300" />
          <span>Direct insurance billing</span>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Services</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Complete pharmacy services</h2>
          <p className="mt-4 text-lg text-slate-600">One team. One neighbourhood. All the care you need.</p>
        </div>
        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="group grid grid-cols-[auto_1fr] items-baseline gap-6 py-6 sm:grid-cols-[64px_1fr_220px_auto]">
              <span className="text-sm font-semibold tabular-nums text-slate-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-teal-700">{s.title}</h3>
              <p className="col-span-2 mt-1 text-sm leading-relaxed text-slate-600 sm:col-span-1 sm:mt-0">{s.desc}</p>
              <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:inline">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Refills stepper ===== */}
      <section id="refills" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">How refills work</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">From request to ready — in hours, not days</h2>
          <div className="mt-10">
            <RefillSteps />
          </div>
        </div>
      </section>

      {/* ===== Transfer ===== */}
      <section id="transfer" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-10 rounded-lg border border-slate-200 bg-white p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Transfer in one call</h2>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Give us your current pharmacy's name. We contact them directly, handle all paperwork, and notify you when everything's moved — usually the same day.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><span className="text-teal-700">✓</span> No need to contact your old pharmacy</li>
              <li className="flex items-center gap-2"><span className="text-teal-700">✓</span> Prescriber renewals handled automatically</li>
              <li className="flex items-center gap-2"><span className="text-teal-700">✓</span> First fill eligible for free delivery</li>
            </ul>
          </div>
          <a href="#visit" className="rounded-md bg-teal-700 px-8 py-4 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800">
            Start your transfer
          </a>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Patients</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Measured by outcomes</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-md border border-slate-200 p-6">
                <blockquote className="text-[15px] leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 border-t border-slate-100 pt-4 text-sm">
                  <span className="font-semibold text-slate-900">{t.name}</span>
                  <span className="block text-xs text-slate-500">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">* Placeholder testimonials — real patient stories replace these before launch.</p>
        </div>
      </section>

      {/* ===== Visit ===== */}
      <section id="visit" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Visit</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Find us in Abbotsford</h2>
            <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200 text-sm">
              {[
                ["Address", "123 Main Street, Abbotsford, BC V2T 0A1"],
                ["Phone", "(604) 555-0199"],
                ["Email", "hello@ihealthpharmacy.ca"],
                ["Hours", "Mon–Fri 9am–7pm · Sat 9am–5pm · Sun Closed"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3.5">
                  <dt className="font-semibold text-slate-900">{k}</dt>
                  <dd className="text-slate-600">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-slate-500">Free parking behind the building · Wheelchair accessible</p>
          </div>
          <div className="grid min-h-[320px] place-items-center rounded-md border border-slate-200 bg-white">
            <div className="text-center text-slate-400">
              <svg className="mx-auto h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <p className="mt-3 text-sm font-medium">Map embed placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ihealth-logo.png" alt="" className="h-9 w-9 rounded-full ring-1 ring-slate-200" />
              <span className="text-sm font-semibold tracking-tight">iHealth Pharmacy</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">Your neighbourhood pharmacist, right around the corner.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-900">Navigate</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {[["Services","#services"],["Refills","#refills"],["Transfer","#transfer"],["Visit","#visit"]].map(([l,h]) => (
                <li key={h}><a href={h} className="transition-colors hover:text-teal-700">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-900">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>Refills & Transfers</li><li>Immunizations</li><li>Compounding</li><li>Home Delivery</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-900">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>123 Main Street, Abbotsford, BC</li><li>(604) 555-0199</li><li>Mon–Fri 9–7 · Sat 9–5</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-slate-500 sm:flex-row">
            <p>© 2026 iHealth Pharmacy. Licensed pharmacy operating in British Columbia, Canada.</p>
            <p>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
