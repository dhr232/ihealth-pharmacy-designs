// Central source of truth for iHealth Pharmacy store info, contacts,
// WhatsApp settings, and regulatory accreditation.
// Values can be overridden via environment variables if needed.

export const PHARMACY_INFO = {
  name: "iHealth Pharmacy",
  tagline: "Your Neighbourhood Pharmacy in Chilliwack, BC",
  legalName: "iHealth Pharmacy Ltd.",

  // Contact numbers
  phone: process.env.NEXT_PUBLIC_PHARMACY_PHONE || "604-392-8393",
  phoneRaw: process.env.NEXT_PUBLIC_PHARMACY_PHONE_RAW || "6043928393",
  phoneClean: "6043928393",
  phoneDisplay: "604-392-8393",
  fax: "(604) 392-8394",
  email: "info@ihealthpharmacy.ca",

  // WhatsApp configuration
  whatsapp: {
    // E.164 format without '+' symbol for wa.me links
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "16043928393",
    displayNumber: "604-392-8393",
    defaultMessage:
      "Hi iHealth Pharmacy, I have a question about my medication or pharmacy services.",
    presets: {
      photoRefill:
        "Hi iHealth Pharmacy, I would like to refill my prescription by sending a photo of my pill bottle label. Please confirm when you receive this.",
      refill:
        "Hi iHealth Pharmacy, I would like to request a prescription refill. My Rx number is: ",
      newPrescription:
        "Hi iHealth Pharmacy, I have a new prescription from my doctor and would like to submit it for fulfillment. I can send a photo or my doctor's details.",
      transfer:
        "Hi iHealth Pharmacy, I would like to transfer my prescriptions from my current pharmacy.",
      delivery:
        "Hi iHealth Pharmacy, I would like to check on the status of my medication delivery.",
      question:
        "Hi iHealth Pharmacy, I have a question for the pharmacist on duty.",
      blisterPack:
        "Hi iHealth Pharmacy, I would like more information about your MyHealthPack blister / compliance packaging for seniors.",
    },
  },

  // Primary Pharmacist Dev Patel direct mobile contact
  devPatel: {
    name: "Dev Patel",
    title: "Primary Pharmacist & Pharmacy Manager",
    phoneDisplay: "+1 (778) 714-2307",
    phoneRaw: "+17787142307",
  },

  // Address and location
  address: {
    street: "45619 Yale Rd #101",
    city: "Chilliwack",
    province: "BC",
    postalCode: "V2P 2N1",
    country: "Canada",
    full: "45619 Yale Rd #101, Chilliwack, BC V2P 2N1",
    mapUrl:
      "https://www.google.com/maps/place/IHealth+Pharmacy/@49.1543464,-121.96252,15z/data=!4m15!1m8!3m7!1s0x54843f277357382f:0x450b007856108ecd!2sIHealth+Pharmacy!8m2!3d49.1543712!4d-121.9625737!10e5!16s%2Fg%2F11lf4ld660!3m5!1s0x54843f277357382f:0x450b007856108ecd!8m2!3d49.1543712!4d-121.9625737!16s%2Fg%2F11lf4ld660?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D",
    googleListingUrl:
      "https://www.google.com/maps/place/IHealth+Pharmacy/@49.1543464,-121.96252,15z/data=!4m15!1m8!3m7!1s0x54843f277357382f:0x450b007856108ecd!2sIHealth+Pharmacy!8m2!3d49.1543712!4d-121.9625737!10e5!16s%2Fg%2F11lf4ld660!3m5!1s0x54843f277357382f:0x450b007856108ecd!8m2!3d49.1543712!4d-121.9625737!16s%2Fg%2F11lf4ld660?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D",
    // Google Business Profile reviews (rating confirmed by owner 2026-09-25 -- update if it changes)
    googleRating: "4.7",
    googleReviewsUrl:
      "https://www.google.com/maps/place/IHealth+Pharmacy/@49.1543464,-121.96252,15z/data=!4m17!1m8!3m7!1s0x54843f277357382f:0x450b007856108ecd!2sIHealth+Pharmacy!8m2!3d49.1543712!4d-121.9625737!10e5!16s%2Fg%2F11lf4ld660!3m7!1s0x54843f277357382f:0x450b007856108ecd!8m2!3d49.1543712!4d-121.9625737!9m1!1b1!16s%2Fg%2F11lf4ld660",
    parkingNotes: "Free customer parking available directly in front of the pharmacy on Yale Road.",
  },

  // Operating hours -- single source of truth (matches Google Business Profile).
  // `schedule` drives live open/closed status and schema.org; the rest is display text.
  schedule: [
    { day: "Sunday", short: "Sun", opens: null, closes: null },
    { day: "Monday", short: "Mon", opens: "08:30", closes: "17:00" },
    { day: "Tuesday", short: "Tue", opens: "08:30", closes: "17:00" },
    { day: "Wednesday", short: "Wed", opens: "08:30", closes: "17:00" },
    { day: "Thursday", short: "Thu", opens: "08:30", closes: "17:00" },
    { day: "Friday", short: "Fri", opens: "08:30", closes: "17:00" },
    { day: "Saturday", short: "Sat", opens: "09:00", closes: "12:00" },
  ],
  hours: [
    { days: "Monday – Friday", time: "8:30 am – 5:00 pm" },
    { days: "Saturday", time: "9:00 am – 12:00 pm" },
    { days: "Sunday", time: "Closed" },
    { days: "Statutory holidays", time: "Hours may differ" },
  ],
  hoursSummary: "Mon–Fri 8:30 am – 5:00 pm, Sat 9:00 am – 12:00 pm, Sun Closed",
  hoursShort: "Mon–Fri 8:30am–5pm · Sat 9am–12pm",

  // Online appointment booking window (narrower than store hours by design).
  // `lastSlot` is the latest bookable start time.
  onlineBooking: {
    weekdays: [1, 2, 3, 4, 5], // 0 = Sunday
    firstSlot: "09:00",
    lastSlot: "14:30",
    slotMinutes: 15,
    summary: "Mon–Fri 9:00 am – 2:30 pm",
  },

  // Supported languages
  languages: ["English", "Punjabi (ਪੰਜਾਬੀ)", "Hindi (हिन्दी)"],
  languagesSummary: "English, Punjabi, and Hindi spoken",

  // Professional accreditation & regulatory bodies
  accreditation: {
    college: "College of Pharmacists of British Columbia (CPBC)",
    association: "British Columbia Pharmacy Association (BCPhA)",
    licenseNotice: "Licensed Community Pharmacy under the Health Professions Act of BC",
    directBilling: [
      "Pacific Blue Cross",
      "BC Fair PharmaCare",
      "GreenShield Canada",
      "Sun Life",
      "Manulife",
      "Canada Life",
    ],
  },

  // Medical emergency disclaimer
  disclaimers: {
    emergency:
      "If you are experiencing a medical emergency, please call 911 or visit the nearest emergency department immediately.",
    telehealth811:
      "For 24/7 free, confidential non-emergency health advice from a registered nurse or pharmacist in British Columbia, call HealthLink BC at 811.",
  },
} as const;

/** "08:30" -> "8:30 AM", "12:00" -> "12:00 PM" */
export function formatHour(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/**
 * Whether a date (YYYY-MM-DD) and 24h time (HH:MM) fall inside the online booking window.
 * Used by both the slot list and the booking POST so they cannot drift apart.
 */
export function isBookableSlot(date: string, time24: string): boolean {
  const { weekdays, firstSlot, lastSlot, slotMinutes } = PHARMACY_INFO.onlineBooking;
  const [y, mo, d] = date.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  if (!(weekdays as readonly number[]).includes(weekday)) return false;
  if (!/^\d{1,2}:\d{2}$/.test(time24)) return false;
  const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const t = toMinutes(time24);
  return (
    t >= toMinutes(firstSlot) &&
    t <= toMinutes(lastSlot) &&
    (t - toMinutes(firstSlot)) % slotMinutes === 0
  );
}

/**
 * Live open/closed status in Pacific time, derived from PHARMACY_INFO.schedule.
 * Does not account for statutory holidays.
 */
export function getOpenStatus(now: Date = new Date()): {
  isOpen: boolean;
  detail: string;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Vancouver",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const schedule = PHARMACY_INFO.schedule;
  const todayIndex = schedule.findIndex((d) => d.short === get("weekday"));
  const minutesNow = Number(get("hour")) * 60 + Number(get("minute"));
  const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  const today = schedule[todayIndex];
  if (today?.opens && today.closes) {
    if (minutesNow >= toMinutes(today.opens) && minutesNow < toMinutes(today.closes)) {
      return { isOpen: true, detail: `Open until ${formatHour(today.closes)}` };
    }
    if (minutesNow < toMinutes(today.opens)) {
      return { isOpen: false, detail: `Opens today at ${formatHour(today.opens)}` };
    }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = schedule[(todayIndex + offset) % 7];
    if (next.opens) {
      const when = offset === 1 ? "tomorrow" : next.short;
      return { isOpen: false, detail: `Opens ${when} at ${formatHour(next.opens)}` };
    }
  }
  return { isOpen: false, detail: PHARMACY_INFO.hoursSummary };
}

/**
 * Helper to build WhatsApp chat link with optional pre-filled text
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const msg = customMessage || PHARMACY_INFO.whatsapp.defaultMessage;
  return `https://wa.me/${PHARMACY_INFO.whatsapp.number}?text=${encodeURIComponent(msg)}`;
}

/**
 * Helper to build mobile SMS link to open native messaging app on phone
 */
export function getSmsUrl(phoneRaw: string = PHARMACY_INFO.devPatel.phoneRaw, customMessage?: string): string {
  const cleanNumber = phoneRaw.startsWith("+") ? phoneRaw : `+${phoneRaw}`;
  const defaultMsg = "Hello Dev, I have a question regarding my prescription.";
  const msg = customMessage || defaultMsg;
  return `sms:${cleanNumber}?body=${encodeURIComponent(msg)}`;
}

