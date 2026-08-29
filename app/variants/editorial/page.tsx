import { MobileMenuButton } from "./components/MobileMenuButton";
import { ServicesAccordion } from "./components/ServicesAccordion";

const mono = { fontFamily: "'Courier New', monospace" } as const;
const display = { fontFamily: "Georgia, 'Times New Roman', serif" } as const;

const STEPS = [
  { n: "№ 1", title: "Tell us", body: "Call, click, or walk in with your Rx number. We take it from there." },
  { n: "№ 2", title: "We handle it", body: "Verification, insurance, prescriber renewals — all in-house, all same-day." },
  { n: "№ 3", title: "Get it today", body: "Counter pickup with no line, or free delivery anywhere in Abbotsford." },
];

export default function EditorialPage() {
  return (
    <div className="bg-[#f6f4ef] text-[#0f0f0e]">
      {/* ===== Masthead ===== */}
      <header className="sticky top-0 z-50 border-b-2 border-[#0f0f0e] bg-[#f6f4ef]">
        <div className="border-b border-[#0f0f0e]/20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]" style={mono}>
            <span>Est. for Abbotsford · Licensed in BC</span>
            <span className="hidden sm:inline">(604) 555-0199</span>
          </div>
        </div>
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ihealth-logo.png" alt="iHealth Pharmacy logo" className="h-10 w-10 rounded-full object-contain ring-1 ring-[#0f0f0e]/20" />
            <span className="font-black uppercase tracking-tight text-xl sm:text-2xl" style={display}>
              iHealth<span className="text-[#c01d16]">*</span>Pharmacy
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex text-[12px] font-bold uppercase tracking-[0.18em]" style={mono}>
            {[["Services","#services"],["Refill","#refill"],["Transfer","#transfer"],["Pharmacist","#pharmacist"],["Visit","#visit"]].map(([l,h]) => (
              <a key={h} href={h} className="transition-colors hover:bg-[#c8f04a] px-1">{l}</a>
            ))}
            <a href="#refill" className="ml-2 border-2 border-[#0f0f0e] bg-[#0f0f0e] px-4 py-2 text-[#c8f04a] no-underline transition hover:bg-[#c01d16] hover:text-white hover:border-[#c01d16]">Refill RX →</a>
          </nav>
          <MobileMenuButton />
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="top" className="border-b-2 border-[#0f0f0e]">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:pt-20">
          <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={mono}>
            Vol. 01 — The Neighbourhood Issue
          </p>
          <h1 className="mt-6 max-w-5xl text-[13vw] font-black uppercase leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[104px]" style={display}>
            The pharmacist who knows{" "}
            <span className="bg-[#c8f04a] px-2">your name</span>.
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-relaxed">
              You&apos;re not a number here. You&apos;re our neighbour. Real conversations. Real advice. Care that follows you home.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#refill" className="border-2 border-[#0f0f0e] bg-[#c01d16] px-7 py-4 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#0f0f0e]" style={mono}>
                Become a Patient ↗
              </a>
              <a href="#visit" className="border-2 border-[#0f0f0e] px-7 py-4 text-sm font-black uppercase tracking-[0.15em] transition hover:bg-[#c8f04a]" style={mono}>
                Book a Free Chat
              </a>
            </div>
          </div>
        </div>
        {/* marquee-ish trust strip */}
        <div className="border-t-2 border-[#0f0f0e] bg-[#0f0f0e] text-[#f6f4ef]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.25em]" style={mono}>
            <span>⚕ Licensed BC</span><span className="text-[#c8f04a]">/</span>
            <span>Same-day transfers</span><span className="text-[#c8f04a]">/</span>
            <span>Free delivery</span><span className="text-[#c8f04a]">/</span>
            <span>4.9★ from neighbours</span>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#c01d16]" style={mono}>Section № 01</p>
            <h2 className="mt-3 text-6xl font-black uppercase tracking-tight sm:text-7xl" style={display}>Services</h2>
          </div>
          <p className="max-w-xs border-l-2 border-[#0f0f0e] pl-4 text-sm leading-relaxed">
            Everything a pharmacy should do for you. One team. One neighbourhood. All the care you need.
          </p>
        </div>
        <div className="mt-12">
          <ServicesAccordion />
        </div>
      </section>

      {/* ===== Refill ===== */}
      <section id="refill" className="border-y-2 border-[#0f0f0e] bg-[#c8f04a]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={mono}>Section № 02 — Refills</p>
          <h2 className="mt-3 text-5xl font-black uppercase tracking-tight sm:text-6xl" style={display}>
            Three steps.<br />Five minutes.
          </h2>
          <div className="mt-12 grid gap-px border-2 border-[#0f0f0e] bg-[#0f0f0e] md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-[#c8f04a] p-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.3em]" style={mono}>{s.n}</p>
                <h3 className="mt-4 text-3xl font-black uppercase tracking-tight" style={display}>{s.title}</h3>
                <p className="mt-3 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Transfer ===== */}
      <section id="transfer" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#c01d16]" style={mono}>Section № 03 — The Switch</p>
        <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl" style={display}>
          We handle <span className="bg-[#c8f04a] px-2">the whole</span> transfer.
        </h2>
        <p className="mt-8 max-w-xl text-xl leading-relaxed">
          Give us your current pharmacy&apos;s name and we handle everything — paperwork, prescriber calls, insurance. You never sit on hold. Most transfers are done the same day.
        </p>
        <a href="#visit" className="mt-10 inline-block border-2 border-[#0f0f0e] bg-[#0f0f0e] px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-[#c8f04a] transition hover:bg-[#c01d16] hover:border-[#c01d16] hover:text-white" style={mono}>
          Start your transfer →
        </a>
      </section>

      {/* ===== Pharmacist ===== */}
      <section id="pharmacist" className="border-y-2 border-[#0f0f0e] bg-[#0f0f0e] text-[#f6f4ef]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="grid aspect-square place-items-center border-2 border-[#f6f4ef]/25 bg-[#0f0f0e]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ihealth-logo.png" alt="Your iHealth pharmacist" className="w-1/2 rounded-full bg-white p-2" />
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#c8f04a]" style={mono}>Section № 04 — Our Promise</p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl" style={display}>
              Big-box convenience.<br />Corner-store care.
            </h2>
            <p className="mt-4 text-lg italic text-[#f6f4ef]/70" style={display}>We left the lineup-and-rush model behind.</p>
            <p className="mt-6 max-w-lg leading-relaxed text-[#f6f4ef]/85">
              At iHealth Pharmacy, you get a pharmacist who actually sits down with you. Someone who knows your medications, your health history, and how you take your coffee. That&apos;s our promise: one-on-one care, every single visit.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#f6f4ef]/20 pt-8">
              {[["12+","Years in BC"],["20k+","Rxs filled"],["4.9","Rating / 5"]].map(([n,l]) => (
                <div key={l}>
                  <p className="text-4xl font-black text-[#c8f04a]" style={display}>{n}</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f6f4ef]/60" style={mono}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonial pull quote ===== */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#c01d16]" style={mono}>Section № 05 — Testimony</p>
        <blockquote className="mt-8 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl" style={display}>
          &ldquo;The pharmacist sat down with me for <span className="bg-[#c8f04a] px-2">half an hour</span> to go over all my medications. Nobody has ever done that before.&rdquo;
        </blockquote>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em]" style={mono}>— Robert K. · Clearbrook · <span className="text-[#c01d16]">Placeholder review</span></p>
        <div className="mt-16 grid gap-px border-2 border-[#0f0f0e] bg-[#0f0f0e] md:grid-cols-2">
          <blockquote className="bg-[#f6f4ef] p-8 text-xl italic leading-relaxed" style={display}>
            &ldquo;iHealth had it ready the next morning — and delivered it before lunch. I switched everything over.&rdquo;
            <footer className="mt-4 text-[11px] font-bold uppercase not-italic tracking-[0.2em]" style={mono}>— Sarah M. · Central Abbotsford</footer>
          </blockquote>
          <blockquote className="bg-[#f6f4ef] p-8 text-xl italic leading-relaxed" style={display}>
            &ldquo;They know my kids by name. When my daughter needed a special cream, they made it themselves.&rdquo;
            <footer className="mt-4 text-[11px] font-bold uppercase not-italic tracking-[0.2em]" style={mono}>— Priya D. · McMillan</footer>
          </blockquote>
        </div>
      </section>

      {/* ===== Visit ===== */}
      <section id="visit" className="border-t-2 border-[#0f0f0e] bg-[#c01d16] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-white/70" style={mono}>Section № 06 — Visit</p>
            <h2 className="mt-4 text-6xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl" style={display}>Come say<br />hello.</h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/85">Drop by, give us a call, or send us a note. Real person, real answer, real fast.</p>
          </div>
          <div className="text-white">
            <dl className="divide-y divide-white/25 border-y-2 border-white text-sm" style={mono}>
              {[
                ["ADDR", "123 Main Street, Abbotsford, BC V2T 0A1"],
                ["TEL", "(604) 555-0199"],
                ["MAIL", "hello@ihealthpharmacy.ca"],
                ["HRS", "Mon–Fri 9–7 · Sat 9–5 · Sun Closed"],
                ["PARK", "Free parking behind the building"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_1fr] gap-4 py-4 font-bold uppercase tracking-[0.15em]">
                  <dt className="text-white/60">{k}</dt><dd>{v}</dd>
                </div>
              ))}
            </dl>
            <a href="tel:+16045550199" className="mt-8 inline-block border-2 border-[#0f0f0e] bg-[#0f0f0e] px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-[#c8f04a] transition hover:bg-[#f6f4ef] hover:text-[#0f0f0e]" style={mono}>
              Book a free consultation ↗
            </a>
          </div>
        </div>
      </section>

      {/* ===== Colophon footer ===== */}
      <footer className="bg-[#0f0f0e] text-[#f6f4ef]">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-16">
          <h2 className="text-[11vw] font-black uppercase leading-none tracking-tight sm:text-7xl md:text-8xl" style={display}>
            iHealth<span className="text-[#c01d16]">.</span>
          </h2>
          <div className="mt-10 grid gap-10 border-t border-[#f6f4ef]/20 pt-10 sm:grid-cols-3 text-sm">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c8f04a]" style={mono}>Index</h4>
              <ul className="mt-4 space-y-2.5">
                {[["Services","#services"],["Refill","#refill"],["Transfer","#transfer"],["Pharmacist","#pharmacist"],["Visit","#visit"]].map(([l,h]) => (
                  <li key={h}><a href={h} className="transition-colors hover:text-[#c8f04a]">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c8f04a]" style={mono}>Services</h4>
              <ul className="mt-4 space-y-2.5 text-[#f6f4ef]/75">
                <li>Refills & Transfers</li><li>Immunizations</li><li>Compounding</li><li>Blister Packs</li><li>Free Delivery</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c8f04a]" style={mono}>Visit</h4>
              <ul className="mt-4 space-y-2.5 text-[#f6f4ef]/75">
                <li>123 Main Street, Abbotsford, BC</li><li>(604) 555-0199</li><li>Mon–Fri 9–7 · Sat 9–5</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#f6f4ef]/20 pt-6 text-[11px] uppercase tracking-[0.2em] text-[#f6f4ef]/50 sm:flex-row" style={mono}>
            <p>© 2026 iHealth Pharmacy · Licensed in British Columbia, Canada</p>
            <p>Privacy / Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
