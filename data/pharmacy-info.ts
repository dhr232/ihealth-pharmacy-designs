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

  // Address and location
  address: {
    street: "45619 Yale Rd #101",
    city: "Chilliwack",
    province: "BC",
    postalCode: "V2P 0B1",
    country: "Canada",
    full: "45619 Yale Rd #101, Chilliwack, BC V2P 0B1",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=iHealth+Pharmacy+45619+Yale+Rd+%23101+Chilliwack+BC+V2P+0B1",
    parkingNotes: "Free customer parking available directly in front of the pharmacy on Yale Road.",
  },

  // Operating hours
  hours: [
    { days: "Monday – Friday", time: "8:00 am – 9:00 pm" },
    { days: "Saturday – Sunday", time: "9:00 am – 6:00 pm" },
    { days: "Holidays", time: "10:00 am – 5:00 pm" },
  ],
  hoursSummary: "Mon–Fri 8am–9pm, Sat–Sun 9am–6pm",

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
