import Header from "./components/Header";
import RefillForm from "./components/RefillForm";

const quicksand = { fontFamily: "Quicksand, 'Segoe UI', sans-serif" } as const;

const SERVICES = [
  { emoji: "💉", title: "Vaccinations", body: "Flu shots, travel vaccines, shingles & more — walk in, roll up your sleeve, done!", bg: "#d1fae5" },
  { emoji: "🚚", title: "Free Delivery", body: "Order by 2pm and your meds arrive the same day — free anywhere in Abbotsford.", bg: "#ede9fe" },
  { emoji: "🧪", title: "Compounding", body: "Custom doses, creams & pediatric flavours — made fresh right here for you.", bg: "#ffedd5" },
  { emoji: "📅", title: "Blister Packs", body: "Pills sorted by day & time. Tear off a pack and go — no more guessing!", bg: "#fee2e2" },
  { emoji: "🩺", title: "Minor Ailments", body: "Allergies, cold sores, UTIs — our pharmacists can assess & prescribe on the spot.", bg: "#e0f2fe" },
  { emoji: "❤️", title: "Health Check-ins", body: "Blood pressure, diabetes support & honest advice — no appointment needed.", bg: "#fef3c7" },
];

const STEPS = [
  { n: "1", emoji: "📲", title: "Send it in", body: "Use the quick form below, call us, or walk in. 30 seconds, promise." },
  { n: "2", emoji: "⚗️", title: "We fill it fast", body: "A pharmacist checks everything and fills it — usually within the hour." },
  { n: "3", emoji: "🎉", title: "Pick up or we deliver", body: "We text you the moment it's ready. Want delivery? Just say the word!" },
];

const TESTIMONIALS = [
  { quote: "They texted me before I even got home — my refill was already ready!", name: "Jasmin P.", stars: 5 },
  { quote: "The pharmacist remembered my son's allergy without even looking it up. That kind of care is rare.", name: "Daniel O.", stars: 5 },
  { quote: "Switching took one phone call. ONE. They did everything else for me.", name: "Margaret L.", stars: 5 },
];

export default function FriendlyPage() {
  return (
    <div className="bg-[#fffdf8] text-[#14532d]" style={quicksand}>
      <Header />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d1fae5]" aria-hidden />
        <div className="absolute -left-16 top-40 h-48 w-48 rounded-full bg-[#ffedd5]" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 md:grid-cols-2 md:items-center md:pt-20">
          <div>
            <span className="inline-block rotate-[-2deg] rounded-full bg-[#16a34a] px-4 py-1.5 text-sm font-bold text-white shadow-[0_3px_0_#15803d]">
              👋 Hey neighbour, welcome to iHealth!
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.08] text-[#14532d] md:text-6xl" style={quicksand}>
              The pharmacist who knows <span className="text-[#c01d16]">your name</span> <span aria-hidden>💚</span>
            </h1>
            <p className="mt-5 max-w-md text-lg font-medium leading-relaxed text-[#166534]/80">
              You're not a number here — you're our neighbour. Real conversations, real advice, and care that follows you home.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#refill" className="rounded-full bg-[#c01d16] px-7 py-3.5 text-lg font-bold text-white shadow-[0_5px_0_#8f130e] transition hover:-translate-y-1 hover:shadow-[0_7px_0_#8f130e] active:translate-y-0 active:shadow-[0_2px_0_#8f130e]">
                Become a Patient ✨
              </a>
              <a href="#visit" className="rounded-full bg-white px-7 py-3.5 text-lg font-bold text-[#16a34a] shadow-[0_4px_0_#a7f3d0] transition hover:-translate-y-1">
                Book a Free Chat 💬
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative rounded-[36px] bg-white p-6 shadow-[0_12px_40px_rgba(22,163,74,0.15)] ring-4 ring-[#d1fae5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ihealth-logo.png" alt="iHealth Pharmacy" className="mx-auto w-2/3 rounded-full" />
              <div className="absolute -right-4 -top-4 rotate-6 rounded-2xl bg-[#fef3c7] px-4 py-2 text-sm font-bold text-[#92400e] shadow-sm">
                Same-day delivery! 🚚
              </div>
              <div className="absolute -bottom-4 -left-4 -rotate-3 rounded-2xl bg-[#ede9fe] px-4 py-2 text-sm font-bold text-[#5b21b6] shadow-sm">
                Walk-ins welcome 💉
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section className="bg-[#16a34a]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 text-sm font-bold text-white">
          <span>⚕️ Licensed BC Pharmacists</span>
          <span aria-hidden className="hidden text-white/40 sm:inline">•</span>
          <span>🔄 Same-Day Transfers</span>
          <span aria-hidden className="hidden text-white/40 sm:inline">•</span>
          <span>🚐 Free Local Delivery</span>
          <span aria-hidden className="hidden text-white/40 sm:inline">•</span>
          <span>⭐ 4.9 from 300+ neighbours</span>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold md:text-5xl" style={quicksand}>How can we help you today? 🌿</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg font-medium text-[#166534]/75">Everything your pharmacy should do for you — with a smile.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="group rounded-[28px] bg-white p-7 shadow-[0_6px_24px_rgba(22,163,74,0.10)] ring-2 ring-[#d1fae5] transition hover:-translate-y-2 hover:ring-[#16a34a]">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ background: s.bg }}>{s.emoji}</span>
              <h3 className="mt-4 text-xl font-bold" style={quicksand}>{s.title}</h3>
              <p className="mt-2 font-medium leading-relaxed text-[#166534]/75">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Refill steps + form ===== */}
      <section id="refill" className="bg-[#d1fae5]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl" style={quicksand}>Refills in 3 easy steps 🚀</h2>
            <div className="mt-10 space-y-8">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-2xl shadow-[0_4px_0_#a7f3d0]">{s.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold" style={quicksand}>{s.title}</h3>
                    <p className="mt-1 font-medium text-[#166534]/80">{s.body}</p>
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
          <span className="text-5xl" aria-hidden>🔄</span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl" style={quicksand}>Switching pharmacies? Easy.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-[#166534]/75">
            Give us your current pharmacy's name and we handle the whole thing — often the same day. You'll never sit on hold again.
          </p>
          <a href="#visit" className="mt-8 inline-block rounded-full bg-[#16a34a] px-8 py-4 text-lg font-bold text-white shadow-[0_5px_0_#15803d] transition hover:-translate-y-1">
            Start My Transfer 🏃‍♀️
          </a>
        </div>
      </section>

      {/* ===== Pharmacist ===== */}
      <section id="pharmacist" className="bg-[#ede9fe]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
          <div className="grid aspect-square place-items-center rounded-[36px] bg-white shadow-[0_10px_36px_rgba(91,33,182,0.12)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ihealth-logo.png" alt="Your iHealth pharmacist" className="w-1/2 rounded-full" />
          </div>
          <div>
            <h2 className="text-4xl font-bold md:text-5xl" style={quicksand}>Meet your pharmacist 👩‍⚕️</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-[#3f3f76]/80">
              At iHealth Pharmacy you get a pharmacist who actually sits down with you — someone who knows your medications, your history, and how you take your coffee.
            </p>
            <ul className="mt-6 space-y-3 font-semibold text-[#4c1d95]/85">
              <li className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c01d16] text-sm text-white">✓</span> One-on-one care, every single visit</li>
              <li className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c01d16] text-sm text-white">✓</span> Free medication reviews</li>
              <li className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c01d16] text-sm text-white">✓</span> A familiar face, every time</li>
            </ul>
            <a href="#visit" className="mt-8 inline-block rounded-full bg-[#5b21b6] px-7 py-3.5 font-bold text-white shadow-[0_4px_0_#4c1d95] transition hover:-translate-y-1">Say Hello 👋</a>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="bg-[#fffdf8]">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center text-4xl font-bold md:text-5xl" style={quicksand}>Neighbours love us ⭐</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-[28px] bg-white p-7 shadow-[0_6px_24px_rgba(22,163,74,0.10)] ring-2 ring-[#ffedd5]">
                <div className="text-lg tracking-widest text-[#f59e0b]">{"★".repeat(t.stars)}</div>
                <blockquote className="mt-3 font-medium leading-relaxed text-[#166534]/85">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 font-bold text-[#14532d]">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs font-semibold text-[#166534]/50">* Placeholder reviews — real patient stories replace these before launch.</p>
        </div>
      </section>

      {/* ===== Visit ===== */}
      <section id="visit" className="bg-[#14532d] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl" style={quicksand}>Come say hello 👋</h2>
            <p className="mt-4 text-lg font-medium text-[#d1fae5]/90">Drop by, call us, or send a note. A real person answers, real fast.</p>
            <ul className="mt-8 space-y-4 font-semibold">
              <li className="flex items-center gap-3">📍 123 Main Street, Abbotsford, BC</li>
              <li className="flex items-center gap-3">📞 (604) 555-0199</li>
              <li className="flex items-center gap-3">✉️ hello@ihealthpharmacy.ca</li>
              <li className="flex items-center gap-3">🕘 Mon–Fri 9–7 · Sat 9–5 · Sun closed</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-[#d1fae5]/70">🅿️ Free parking behind the building</p>
          </div>
          <div className="grid min-h-[300px] place-items-center rounded-[36px] bg-[#166534] text-center">
            <div>
              <span className="text-6xl" aria-hidden>🗺️</span>
              <p className="mt-4 font-bold text-[#d1fae5]">Map goes here</p>
              <p className="mt-1 text-sm font-medium text-[#d1fae5]/60">Right around the corner in Abbotsford</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#0c3b21] text-[#d1fae5]/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ihealth-logo.png" alt="" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
              <span className="text-lg font-bold text-white" style={quicksand}>iHealth Pharmacy</span>
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed">Your neighbourhood pharmacist, right around the corner. 💚</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm font-semibold">
              {[["Services","#services"],["Refill","#refill"],["Transfer","#transfer"],["Our Pharmacist","#pharmacist"],["Visit Us","#visit"]].map(([l,h]) => (
                <li key={h}><a href={h} className="transition hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-3 space-y-2 text-sm font-medium">
              <li>💊 Refills</li><li>💉 Vaccinations</li><li>🧪 Compounding</li><li>📅 Blister Packs</li><li>🚚 Delivery</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Visit us</h4>
            <ul className="mt-3 space-y-2 text-sm font-medium">
              <li>123 Main Street, Abbotsford, BC</li><li>(604) 555-0199</li><li>Mon–Fri 9–7 · Sat 9–5</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-5 py-5 text-center text-xs font-medium">© 2026 iHealth Pharmacy. All rights reserved. Licensed pharmacy operating in British Columbia, Canada. ❤️</p>
        </div>
      </footer>
    </div>
  );
}
