import MobileMenu from "./components/MobileMenu";
import RefillAccordion from "./components/RefillAccordion";

const serif = "Georgia, 'Times New Roman', serif";

const SERVICES = [
  { title: "Prescription Refills & Transfers", body: "Refill online or move your prescriptions over in minutes. We handle the paperwork — you just pick up, or we'll deliver." },
  { title: "Vaccinations & Immunizations", body: "Flu shots, travel vaccines, shingles, and more — right here, no appointment stress. Walk in, roll up your sleeve, done." },
  { title: "Medication Reviews", body: "A free one-on-one sit-down with your pharmacist. We go through everything you take, spot problems, and make sure it all works together." },
  { title: "Minor Ailment Consultations", body: "Cold sores, allergies, UTIs, skin rashes — our pharmacists can assess and prescribe for many minor conditions. Skip the clinic wait." },
  { title: "Compounding", body: "Need a custom dose, a cream, or a medication that's been discontinued? We make it fresh, right here, to your doctor's exact specs." },
  { title: "Free Local Delivery", body: "Can't make it in? Your medications come to your door, free of charge, anywhere in Abbotsford." },
];

const TESTIMONIALS = [
  { quote: "My old pharmacy made me wait two weeks for my medication. iHealth had it ready the next morning — and they delivered it to my door before lunch. I switched everything over the same day.", name: "Sarah M.", area: "Central Abbotsford" },
  { quote: "The pharmacist sat down with me for half an hour to go over all my medications. Nobody has ever done that before. It turned out two of them didn't mix well. That conversation probably saved me a hospital trip.", name: "Robert K.", area: "Clearbrook" },
  { quote: "They know my kids by name. When my daughter needed a special cream that wasn't available anywhere, they made it themselves. That's a pharmacy.", name: "Priya D.", area: "McMillan" },
];

export default function HeritagePage() {
  return (
    <div className="bg-[#faf7f2] text-[#1f2d33]" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 border-b border-dashed border-[#1f3d2b]/15 bg-[#faf7f2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#top" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ihealth-logo.png" alt="iHealth Pharmacy logo" className="h-11 w-11 rounded-full object-contain ring-1 ring-[#1f3d2b]/10" />
            <span className="leading-tight">
              <span className="block text-lg font-semibold" style={{ fontFamily: serif }}>iHealth Pharmacy</span>
              <span className="block text-[11px] uppercase tracking-[0.16em] text-[#1f3d2b]/60">Abbotsford, BC</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {[["Services","#services"],["Refills","#refills"],["Transfer","#transfer"],["Our Story","#pharmacist"],["Visit Us","#visit"]].map(([l,h]) => (
              <a key={h} href={h} className="text-[15px] text-[#1f3d2b]/80 transition-colors hover:text-[#c01d16]" style={{ fontFamily: serif }}>{l}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+16045550199" className="text-sm font-semibold text-[#1f3d2b] hover:text-[#c01d16]">(604) 555-0199</a>
            <a href="#refills" className="rounded-full bg-[#1f3d2b] px-5 py-2.5 text-sm font-semibold text-[#faf7f2] transition hover:bg-[#c01d16]">Refill RX</a>
          </div>
          <MobileMenu />
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:items-center md:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#c01d16]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#c01d16]">
              ✳ Your neighbourhood pharmacy since day one
            </span>
            <h1 className="mt-6 text-5xl leading-[1.05] md:text-6xl" style={{ fontFamily: serif }}>
              The pharmacist who knows <em className="text-[#c01d16] not-italic underline decoration-[#1f3d2b]/30 underline-offset-8">your name</em>.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#1f2d33]/75">
              You're not a number here. You're our neighbour. Real conversations. Real advice. Care that follows you home.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#refills" className="rounded-full bg-[#c01d16] px-7 py-3.5 font-semibold text-white shadow-[0_4px_0_#8f130e] transition hover:-translate-y-0.5">Become a Patient</a>
              <a href="#visit" className="rounded-full border-2 border-[#1f3d2b] px-7 py-3.5 font-semibold text-[#1f3d2b] transition hover:bg-[#1f3d2b] hover:text-[#faf7f2]">Book a Free Chat</a>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-gradient-to-br from-[#1f3d2b] via-[#2b5741] to-[#c01d16] opacity-90" />
            <div className="absolute inset-6 grid place-items-center rounded-[45%_55%_50%_50%/55%_50%_50%_45%] bg-[#faf7f2]/95">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ihealth-logo.png" alt="iHealth Pharmacy" className="w-2/3 rounded-full" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-[-3deg] rounded-lg border border-[#c01d16]/40 bg-[#faf7f2] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c01d16] shadow-sm">
              Est. in Abbotsford
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section className="border-y border-dashed border-[#1f3d2b]/20 bg-[#1f3d2b]/[0.04]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {[["Licensed BC Pharmacists","⚕"],["Same-Day Transfers","↔"],["Free Local Delivery","🚐"],["Direct Insurance Billing","✓"]].map(([label, icon]) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-dashed border-[#c01d16]/50 text-lg">{icon}</span>
              <span className="text-sm font-semibold text-[#1f3d2b]" style={{ fontFamily: serif }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c01d16]">Services</p>
        <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: serif }}>Everything your pharmacy should do for you.</h2>
        <p className="mt-4 max-w-xl text-lg text-[#1f2d33]/70">One team. One neighbourhood. All the care you need.</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-[#1f3d2b]/15 bg-white p-7 shadow-[0_1px_3px_rgba(31,61,43,0.06)] transition hover:-translate-y-1 hover:border-[#c01d16]/50 hover:shadow-[0_14px_34px_rgba(31,61,43,0.12)]">
              <h3 className="text-xl text-[#1f3d2b] group-hover:text-[#c01d16]" style={{ fontFamily: serif }}>{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#1f2d33]/70">{s.body}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#c01d16]">Learn more →</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How refills work ===== */}
      <section id="refills" className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c01d16]">How it works</p>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: serif }}>Becoming a patient is easy.</h2>
          <p className="mt-4 text-lg text-[#1f2d33]/70">Three steps. Five minutes. A lifetime of better care.</p>
          <div className="mt-10">
            <RefillAccordion />
          </div>
        </div>
      </section>

      {/* ===== Transfer ===== */}
      <section id="transfer" className="bg-[#1f3d2b] text-[#faf7f2]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a29a]">Switching is free</p>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: serif }}>Ready to make the switch?</h2>
            <p className="mt-4 text-lg text-[#faf7f2]/80">We handle the whole transfer — you just say the word. Most transfers are done the same day, and we'll even deliver your first fill.</p>
          </div>
          <a href="#visit" className="shrink-0 rounded-full bg-[#c01d16] px-8 py-4 text-lg font-semibold text-white shadow-[0_5px_0_#8f130e] transition hover:-translate-y-0.5">Start Your Transfer</a>
        </div>
      </section>

      {/* ===== Pharmacist ===== */}
      <section id="pharmacist" className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div className="grid aspect-[4/3] place-items-center rounded-3xl border border-dashed border-[#1f3d2b]/25 bg-gradient-to-br from-[#faf7f2] to-[#e8f0ec]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ihealth-logo.png" alt="Your iHealth pharmacist" className="w-1/2 rounded-full shadow-lg" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c01d16]">Our promise</p>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: serif }}>Big-box convenience. Corner-store care.</h2>
          <p className="mt-2 text-lg italic text-[#1f2d33]/60" style={{ fontFamily: serif }}>We left the lineup-and-rush model behind.</p>
          <p className="mt-5 leading-relaxed text-[#1f2d33]/80">At iHealth Pharmacy, you get a pharmacist who actually sits down with you. Someone who knows your medications, your health history, and how you take your coffee.</p>
          <p className="mt-4 leading-relaxed text-[#1f2d33]/80">That's our promise: one-on-one care, every single visit.</p>
          <div className="mt-8 flex gap-10 border-t border-dashed border-[#1f3d2b]/20 pt-6">
            {[["12+","Years serving Abbotsford"],["20k+","Prescriptions filled"],["4.9★","Patient rating"]].map(([n,l]) => (
              <div key={l}>
                <p className="text-3xl font-semibold text-[#c01d16]" style={{ fontFamily: serif }}>{n}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#1f2d33]/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c01d16]">Testimonials</p>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: serif }}>What your neighbours say.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-[#1f3d2b]/15 bg-white p-7 shadow-[0_1px_3px_rgba(31,61,43,0.06)]">
                <div className="text-3xl text-[#c01d16]" style={{ fontFamily: serif }}>&ldquo;</div>
                <blockquote className="text-[15px] leading-relaxed text-[#1f2d33]/80">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-dashed border-[#1f3d2b]/15 pt-4 text-sm font-semibold text-[#1f3d2b]">
                  {t.name} <span className="font-normal text-[#1f2d33]/50">· {t.area}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#1f2d33]/50">* Placeholder testimonials — real patient stories replace these before launch.</p>
        </div>
      </section>

      {/* ===== Visit / contact ===== */}
      <section id="visit" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
          <div className="grid min-h-[320px] place-items-center rounded-3xl bg-gradient-to-br from-[#1f3d2b] to-[#2b5741] text-[#faf7f2]">
            <div className="text-center">
              <span className="text-5xl">📍</span>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#faf7f2]/70">Find us in Abbotsford</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c01d16]">Visit us</p>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: serif }}>Come say hello.</h2>
            <p className="mt-4 text-lg text-[#1f2d33]/70">Drop by, give us a call, or send us a note. Real person, real answer, real fast.</p>
            <dl className="mt-8 space-y-4 text-[15px]">
              <div className="flex gap-3"><dt className="w-20 font-semibold text-[#1f3d2b]">Address</dt><dd className="text-[#1f2d33]/75">123 Main Street, Abbotsford, BC V2T 0A1</dd></div>
              <div className="flex gap-3"><dt className="w-20 font-semibold text-[#1f3d2b]">Phone</dt><dd className="text-[#1f2d33]/75">(604) 555-0199</dd></div>
              <div className="flex gap-3"><dt className="w-20 font-semibold text-[#1f3d2b]">Email</dt><dd className="text-[#1f2d33]/75">hello@ihealthpharmacy.ca</dd></div>
              <div className="flex gap-3"><dt className="w-20 font-semibold text-[#1f3d2b]">Hours</dt><dd className="text-[#1f2d33]/75">Mon–Fri 9am–7pm · Sat 9am–5pm · Sun Closed</dd></div>
            </dl>
            <p className="mt-4 text-sm italic text-[#1f2d33]/55">Free parking behind the building.</p>
            <a href="tel:+16045550199" className="mt-8 inline-block rounded-full bg-[#c01d16] px-7 py-3.5 font-semibold text-white shadow-[0_4px_0_#8f130e] transition hover:-translate-y-0.5">Book a Free Consultation</a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#16281f] text-[#faf7f2]/85">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ihealth-logo.png" alt="" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
              <span className="font-semibold text-white" style={{ fontFamily: serif }}>iHealth Pharmacy</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#faf7f2]/60">Your neighbourhood pharmacist, right around the corner.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8a29a]">Quick links</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[["Services","#services"],["Refills","#refills"],["Transfer","#transfer"],["Our Story","#pharmacist"],["Visit Us","#visit"]].map(([l,h]) => (
                <li key={h}><a href={h} className="transition-colors hover:text-[#e8a29a]">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8a29a]">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#faf7f2]/70">
              <li>Refills & Transfers</li><li>Vaccinations</li><li>Compounding</li><li>Blister Packs</li><li>Free Delivery</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8a29a]">Visit us</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#faf7f2]/70">
              <li>123 Main Street, Abbotsford, BC</li><li>(604) 555-0199</li><li>Mon–Fri 9–7 · Sat 9–5</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-[#faf7f2]/45 sm:flex-row">
            <p>© 2026 iHealth Pharmacy. All rights reserved. Licensed pharmacy operating in British Columbia, Canada.</p>
            <p><a href="#top" className="hover:text-[#e8a29a]">Privacy</a> · <a href="#top" className="hover:text-[#e8a29a]">Terms</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
