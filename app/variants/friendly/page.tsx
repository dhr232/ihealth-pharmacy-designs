import Header from "./components/Header";
import RefillForm from "./components/RefillForm";
import Icon from "./components/Icon";

const SERVICES = [
  { icon: "syringe", title: "Vaccinations", body: "Flu shots, travel vaccines, shingles & more — walk in, roll up your sleeve, done!" },
  { icon: "truck", title: "Free Delivery", body: "Order by 2pm and your meds arrive the same day — free anywhere in Abbotsford." },
  { icon: "flask", title: "Compounding", body: "Custom doses, creams & pediatric flavours — made fresh right here for you." },
  { icon: "calendar", title: "Blister Packs", body: "Pills sorted by day & time. Tear off a pack and go — no more guessing!" },
  { icon: "stethoscope", title: "Minor Ailments", body: "Allergies, cold sores, UTIs — our pharmacists can assess & prescribe on the spot." },
  { icon: "heart", title: "Health Check-ins", body: "Blood pressure, diabetes support & honest advice — no appointment needed." },
];

const STEPS = [
  { n: "1", icon: "send", title: "Send it in", body: "Use the quick form below, call us, or walk in. 30 seconds, promise." },
  { n: "2", icon: "flask", title: "We fill it fast", body: "A pharmacist checks everything and fills it — usually within the hour." },
  { n: "3", icon: "truck", title: "Pick up or we deliver", body: "We text you the moment it's ready. Want delivery? Just say the word!" },
];

const TESTIMONIALS = [
  { quote: "They texted me before I even got home — my refill was already ready!", name: "Jasmin P.", stars: 5 },
  { quote: "The pharmacist remembered my son's allergy without even looking it up. That kind of care is rare.", name: "Daniel O.", stars: 5 },
  { quote: "Switching took one phone call. ONE. They did everything else for me.", name: "Margaret L.", stars: 5 },
];

const TRUST_STATS = [
  { icon: "award", label: "15+ years", sub: "serving Abbotsford" },
  { icon: "medical", label: "500K+", sub: "prescriptions filled" },
  { icon: "star", label: "4.9 / 5", sub: "from 300+ neighbours" },
  { icon: "truck", label: "Same-day", sub: "local delivery" },
];

export const metadata = {
  title: "iHealth Pharmacy — Friendly & Playful",
  description: "Your neighbourhood pharmacy in Abbotsford, BC. Friendly care, free delivery, and a pharmacist who knows your name.",
};

export default function FriendlyPage() {
  return (
    <div className="bg-[#fffdf8] text-[#14532d] friendly-variant antialiased" style={{ fontFamily: "'Atkinson Hyperlegible', 'Segoe UI', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Quicksand:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      <Header />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d1fae5]" aria-hidden />
        <div className="absolute -left-16 top-40 h-48 w-48 rounded-full bg-[#ffedd5]" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-8 pt-14 md:grid-cols-2 md:items-center md:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rotate-[-2deg] rounded-full bg-[#16a34a] px-4 py-1.5 text-sm font-bold text-white shadow-[0_3px_0_#15803d]">
              <Icon name="hand-wave" className="text-white" size={20} ariaHidden />
              Hey neighbour, welcome to iHealth!
            </span>
            <h1 id="hero-heading" className="mt-6 text-5xl leading-[1.08] text-[#14532d] md:text-6xl" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
              The pharmacist who knows <span className="text-[#c01d16]">your name</span>
              <span className="ml-2 inline-flex align-middle text-[#16a34a]" aria-hidden>
                <Icon name="heart" size={28} />
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg font-normal leading-relaxed text-[#1f4d2f]">
              You're not a number here — you're our neighbour. Real conversations, real advice, and care that follows you home.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#refill"
                className="inline-flex items-center gap-2 rounded-full bg-[#c01d16] px-7 py-3.5 text-lg font-bold text-white shadow-[0_5px_0_#8f130e] transition duration-150 hover:-translate-y-1 hover:shadow-[0_7px_0_#8f130e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c01d16] focus-visible:ring-offset-2 active:translate-y-0 active:shadow-[0_2px_0_#8f130e]"
              >
                Become a Patient
                <Icon name="sparkle" size={22} />
              </a>
              <a
                href="#visit"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-lg font-bold text-[#16a34a] shadow-[0_4px_0_#a7f3d0] transition duration-150 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
              >
                Book a Free Chat
                <Icon name="chat" size={22} />
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative rounded-[36px] bg-white p-6 shadow-[0_12px_40px_rgba(22,163,74,0.15)] ring-4 ring-[#d1fae5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ihealth-logo.png" alt="iHealth Pharmacy" className="mx-auto w-2/3 rounded-full" />
              <div className="absolute -right-4 -top-4 rotate-6 rounded-2xl bg-[#ffedd5] px-4 py-2 text-sm font-bold text-[#92400e] shadow-sm">
                <span className="inline-flex items-center gap-1">
                  Same-day delivery!
                  <Icon name="truck" size={18} />
                </span>
              </div>
              <div className="absolute -bottom-4 -left-4 -rotate-3 rounded-2xl bg-[#d1fae5] px-4 py-2 text-sm font-bold text-[#166534] shadow-sm">
                <span className="inline-flex items-center gap-1">
                  Walk-ins welcome
                  <Icon name="syringe" size={18} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Credibility row ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 rounded-[28px] bg-white px-6 py-6 shadow-[0_6px_24px_rgba(22,163,74,0.10)] ring-2 ring-[#d1fae5] sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d1fae5] text-[#16a34a]">
                <Icon name={stat.icon as any} size={24} />
              </span>
              <div>
                <p className="text-xl font-bold leading-none text-[#14532d]">{stat.label}</p>
                <p className="mt-1 text-sm font-medium text-[#3f6212]">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section className="bg-[#16a34a]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 text-sm font-bold text-white">
          <span className="inline-flex items-center gap-2">
            <Icon name="shield" size={20} /> Licensed BC Pharmacists
          </span>
          <span aria-hidden className="hidden text-white/40 sm:inline">•</span>
          <span className="inline-flex items-center gap-2">
            <Icon name="refresh-cw" size={20} /> Same-Day Transfers
          </span>
          <span aria-hidden className="hidden text-white/40 sm:inline">•</span>
          <span className="inline-flex items-center gap-2">
            <Icon name="truck" size={20} /> Free Local Delivery
          </span>
          <span aria-hidden className="hidden text-white/40 sm:inline">•</span>
          <span className="inline-flex items-center gap-2">
            <Icon name="star" size={20} /> 4.9 from 300+ neighbours
          </span>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <h2 className="text-4xl leading-tight md:text-5xl" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
            How can we help you today?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg font-normal text-[#1f4d2f]/80">Everything your pharmacy should do for you — with a smile.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group rounded-[28px] bg-white p-7 shadow-[0_6px_24px_rgba(22,163,74,0.10)] ring-2 ring-[#d1fae5] transition duration-150 hover:-translate-y-2 hover:ring-[#16a34a] focus-within:ring-[#16a34a]"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1fae5] text-2xl text-[#16a34a]">
                <Icon name={s.icon as any} size={28} />
              </span>
              <h3 className="mt-4 text-xl font-bold" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>{s.title}</h3>
              <p className="mt-2 font-normal leading-relaxed text-[#1f4d2f]/80">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Refill steps + form ===== */}
      <section id="refill" className="bg-[#d1fae5]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl leading-tight md:text-5xl" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
              Refills in 3 easy steps
            </h2>
            <div className="mt-10 space-y-8">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#16a34a] shadow-[0_4px_0_#a7f3d0]">
                    <Icon name={s.icon as any} size={24} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>{s.title}</h3>
                    <p className="mt-1 font-normal text-[#1f4d2f]/80">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <RefillForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Transfer ===== */}
      <section id="transfer" className="bg-[#fffdf8]">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <span className="inline-flex text-5xl text-[#16a34a]" aria-hidden>
            <Icon name="refresh-cw" size={48} />
          </span>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
            Switching pharmacies? Easy.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-normal text-[#1f4d2f]/80">
            Give us your current pharmacy's name and we handle the whole thing — often the same day. You'll never sit on hold again.
          </p>
          <a
            href="#visit"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-8 py-4 text-lg font-bold text-white shadow-[0_5px_0_#15803d] transition duration-150 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2 active:translate-y-0 active:shadow-[0_2px_0_#15803d]"
          >
            Start My Transfer
            <Icon name="arrow-right" size={24} />
          </a>
        </div>
      </section>

      {/* ===== Pharmacist ===== */}
      <section id="pharmacist" className="bg-[#ffedd5]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
          <div className="grid aspect-square place-items-center rounded-[36px] bg-white shadow-[0_10px_36px_rgba(192,29,22,0.10)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ihealth-logo.png" alt="Your iHealth pharmacist" className="w-1/2 rounded-full" />
          </div>
          <div>
            <h2 className="text-4xl leading-tight md:text-5xl" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
              Meet your pharmacist
            </h2>
            <p className="mt-5 text-lg font-normal leading-relaxed text-[#5d4037]/90">
              At iHealth Pharmacy you get a pharmacist who actually sits down with you — someone who knows your medications, your history, and how you take your coffee.
            </p>
            <ul className="mt-6 space-y-3 font-semibold text-[#7c3d12]">
              {[
                "One-on-one care, every single visit",
                "Free medication reviews",
                "A familiar face, every time",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-sm text-white">
                    <Icon name="check" size={16} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#visit"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-7 py-3.5 font-bold text-white shadow-[0_4px_0_#15803d] transition duration-150 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2 active:translate-y-0 active:shadow-[0_2px_0_#15803d]"
            >
              Say Hello
              <Icon name="hand-wave" size={22} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="bg-[#fffdf8]">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center text-4xl leading-tight md:text-5xl" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
            Neighbours love us
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-[28px] bg-white p-7 shadow-[0_6px_24px_rgba(22,163,74,0.10)] ring-2 ring-[#ffedd5]">
                <div className="flex gap-1 text-[#f59e0b]" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Icon key={i} name="star" size={20} />
                  ))}
                </div>
                <blockquote className="mt-3 font-normal leading-relaxed text-[#1f4d2f]/85">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 font-bold text-[#14532d]">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs font-semibold text-[#166534]/60">* Placeholder reviews — real patient stories replace these before launch.</p>
        </div>
      </section>

      {/* ===== Visit ===== */}
      <section id="visit" className="bg-[#14532d] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-4xl leading-tight md:text-5xl" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
              Come say hello
            </h2>
            <p className="mt-4 text-lg font-normal text-[#d1fae5]/90">Drop by, call us, or send a note. A real person answers, real fast.</p>
            <ul className="mt-8 space-y-4 font-semibold">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-[#d1fae5]">
                  <Icon name="map-pin" size={20} />
                </span>
                123 Main Street, Abbotsford, BC
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#d1fae5]"><Icon name="phone" size={20} /></span>
                <a href="tel:+16045550199" className="underline underline-offset-4 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#14532d]">(604) 555-0199</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#d1fae5]"><Icon name="mail" size={20} /></span>
                hello@ihealthpharmacy.ca
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#d1fae5]"><Icon name="clock" size={20} /></span>
                Mon–Fri 9–7 · Sat 9–5 · Sun closed
              </li>
            </ul>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#d1fae5]/80">
              <Icon name="parking" size={18} />
              Free parking behind the building
            </p>
          </div>
          <div className="grid min-h-[300px] place-items-center rounded-[36px] bg-[#166534] text-center">
            <div>
              <span className="inline-flex text-6xl text-[#d1fae5]" aria-hidden>
                <Icon name="map-pin" size={64} />
              </span>
              <p className="mt-4 font-bold text-[#d1fae5]">Map goes here</p>
              <p className="mt-1 text-sm font-medium text-[#d1fae5]/60">Right around the corner in Abbotsford</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#0c3b21] text-[#d1fae5]/90">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ihealth-logo.png" alt="" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
              <span className="text-lg font-bold text-white" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>iHealth Pharmacy</span>
            </div>
            <p className="mt-3 text-sm font-normal leading-relaxed">
              Your neighbourhood pharmacist, right around the corner.
              <span className="ml-1 inline-flex align-text-bottom text-[#16a34a]" aria-hidden>
                <Icon name="heart" size={18} />
              </span>
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm font-semibold">
              {[
                ["Services", "#services"],
                ["Refill", "#refill"],
                ["Transfer", "#transfer"],
                ["Our Pharmacist", "#pharmacist"],
                ["Visit Us", "#visit"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a
                    href={h}
                    className="inline-block rounded px-1 py-0.5 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c3b21]"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-3 space-y-2 text-sm font-normal">
              <li className="flex items-center gap-2">
                <Icon name="pill" size={16} /> Refills
              </li>
              <li className="flex items-center gap-2">
                <Icon name="syringe" size={16} /> Vaccinations
              </li>
              <li className="flex items-center gap-2">
                <Icon name="flask" size={16} /> Compounding
              </li>
              <li className="flex items-center gap-2">
                <Icon name="calendar" size={16} /> Blister Packs
              </li>
              <li className="flex items-center gap-2">
                <Icon name="truck" size={16} /> Delivery
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Visit us</h4>
            <ul className="mt-3 space-y-2 text-sm font-normal">
              <li className="flex items-start gap-2">
                <Icon name="map-pin" size={16} /> 123 Main Street, Abbotsford, BC
              </li>
              <li className="flex items-center gap-2">
                <Icon name="phone" size={16} /> (604) 555-0199
              </li>
              <li className="flex items-center gap-2">
                <Icon name="clock" size={16} /> Mon–Fri 9–7 · Sat 9–5
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-5 py-5 text-center text-xs font-normal">
            © 2026 iHealth Pharmacy. All rights reserved. Licensed pharmacy operating in British Columbia, Canada.
          </p>
        </div>
      </footer>
    </div>
  );
}
