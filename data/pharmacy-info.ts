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
    parkingNotes: "Free customer parking available directly in front of the pharmacy on Yale Road.",
  },

  // Operating hours
  hours: [
    { days: "Monday – Friday", time: "9:00 am – 5:00 pm" },
    { days: "Saturday", time: "Closed" },
    { days: "Sunday", time: "Closed" },
    { days: "Holidays", time: "Closed" },
  ],
  hoursSummary: "Mon–Fri 9:00 am – 5:00 pm, Sat–Sun Closed",

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

