export interface ConditionMenuItem {
  id: string;
  serviceId: string;
  name: string;
  shortName: string;
  iconPath: string;
  category: "digestive" | "ent" | "skin" | "urinary" | "other";
  categoryTitle: string;
}

export const MINOR_AILMENTS_MENU_CATEGORIES = [
  {
    id: "digestive",
    title: "Digestive Conditions",
    items: [
      {
        id: "hemorrhoids",
        serviceId: "hemorrhoids",
        name: "Hemorrhoids",
        shortName: "Hemorrhoids",
        iconPath: "/icons/minor-ailments/hemorrhoids.png",
        category: "digestive" as const,
        categoryTitle: "Digestive Conditions",
      },
      {
        id: "heartburn",
        serviceId: "gerd-acid-reflux",
        name: "Heartburn",
        shortName: "Heartburn / Acid Reflux",
        iconPath: "/icons/minor-ailments/heartburn.png",
        category: "digestive" as const,
        categoryTitle: "Digestive Conditions",
      },
      {
        id: "pinworms",
        serviceId: "pinworms-and-threadworms",
        name: "Pinworms and Threadworms",
        shortName: "Pinworms & Threadworms",
        iconPath: "/icons/minor-ailments/pinworms.png",
        category: "digestive" as const,
        categoryTitle: "Digestive Conditions",
      },
    ],
  },
  {
    id: "ent",
    title: "Eyes, Ears, Nose, or Mouth",
    items: [
      {
        id: "cankerSores",
        serviceId: "aphthous-ulcers-canker-sores",
        name: "Canker Sores",
        shortName: "Canker Sores",
        iconPath: "/icons/minor-ailments/cankerSores.png",
        category: "ent" as const,
        categoryTitle: "Eyes, Ears, Nose, or Mouth",
      },
      {
        id: "coldSores",
        serviceId: "herpes-labialis-cold-sores",
        name: "Cold Sores",
        shortName: "Cold Sores",
        iconPath: "/icons/minor-ailments/coldSores.png",
        category: "ent" as const,
        categoryTitle: "Eyes, Ears, Nose, or Mouth",
      },
      {
        id: "oralThrush",
        serviceId: "oral-fungal-infection-thrush",
        name: "Oral Thrush",
        shortName: "Oral Thrush",
        iconPath: "/icons/minor-ailments/oralThrush.png",
        category: "ent" as const,
        categoryTitle: "Eyes, Ears, Nose, or Mouth",
      },
      {
        id: "allergies",
        serviceId: "allergic-rhinitis",
        name: "Allergies",
        shortName: "Allergies & Hay Fever",
        iconPath: "/icons/minor-ailments/allergicRhinitis.png",
        category: "ent" as const,
        categoryTitle: "Eyes, Ears, Nose, or Mouth",
      },
      {
        id: "pinkEye",
        serviceId: "conjunctivitis-pink-eye",
        name: "Pink Eye or Eye Allergies",
        shortName: "Pink Eye (Conjunctivitis)",
        iconPath: "/icons/minor-ailments/pinkEye.png",
        category: "ent" as const,
        categoryTitle: "Eyes, Ears, Nose, or Mouth",
      },
    ],
  },
  {
    id: "skin",
    title: "Skin Conditions",
    items: [
      {
        id: "jockItch",
        serviceId: "jock-itch-tinea-cruris",
        name: "Jock Itch",
        shortName: "Jock Itch",
        iconPath: "/icons/minor-ailments/jockItch.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "athletesFoot",
        serviceId: "athletes-foot-tinea-pedis",
        name: "Athlete's Foot",
        shortName: "Athlete's Foot",
        iconPath: "/icons/minor-ailments/athletesFoot.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "dandruff",
        serviceId: "seborrheic-dermatitis",
        name: "Dandruff",
        shortName: "Dandruff & Seborrheic Dermatitis",
        iconPath: "/icons/minor-ailments/dandruff.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "dermatitis",
        serviceId: "contact-dermatitis",
        name: "Skin Irritations (Dermatitis)",
        shortName: "Dermatitis & Eczema",
        iconPath: "/icons/minor-ailments/dermatitis.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "nailFungus",
        serviceId: "onychomycosis-nail-fungus",
        name: "Nail Fungus",
        shortName: "Fungal Nail Infection",
        iconPath: "/icons/minor-ailments/nailFungus.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "shinglesTreatment",
        serviceId: "shingles-herpes-zoster",
        name: "Shingles Treatment",
        shortName: "Shingles (Herpes Zoster)",
        iconPath: "/icons/minor-ailments/shinglesTreatment.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "acne",
        serviceId: "mild-acne",
        name: "Acne",
        shortName: "Mild Acne",
        iconPath: "/icons/minor-ailments/acne.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "diaperRash",
        serviceId: "diaper-dermatitis",
        name: "Diaper Rash",
        shortName: "Diaper Rash",
        iconPath: "/icons/minor-ailments/diaperRash.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "hives",
        serviceId: "insect-bites-urticaria-hives",
        name: "Insect Bites and Hives",
        shortName: "Insect Bites & Hives",
        iconPath: "/icons/minor-ailments/hives.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "impetigo",
        serviceId: "impetigo",
        name: "Skin Infections (Impetigo)",
        shortName: "Impetigo",
        iconPath: "/icons/minor-ailments/impetigo.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
      {
        id: "ringworm",
        serviceId: "ringworm-tinea-corporis",
        name: "Ringworm",
        shortName: "Ringworm",
        iconPath: "/icons/minor-ailments/ringworm.png",
        category: "skin" as const,
        categoryTitle: "Skin Conditions",
      },
    ],
  },
  {
    id: "urinary",
    title: "Urinary and Reproductive Conditions",
    items: [
      {
        id: "emergencyContraceptive",
        serviceId: "emergency-contraception",
        name: "Emergency Contraception (Morning-After Pill)",
        shortName: "Emergency Contraception",
        iconPath: "/icons/minor-ailments/emergencyContraceptive.png",
        category: "urinary" as const,
        categoryTitle: "Urinary and Reproductive Conditions",
      },
      {
        id: "uti",
        serviceId: "uncomplicated-urinary-tract-infection",
        name: "Urinary Tract Infection",
        shortName: "Urinary Tract Infection (UTI)",
        iconPath: "/icons/minor-ailments/uti.png",
        category: "urinary" as const,
        categoryTitle: "Urinary and Reproductive Conditions",
      },
      {
        id: "yeastInfection",
        serviceId: "vaginal-candidiasis-yeast-infection",
        name: "Vaginal Yeast Infection",
        shortName: "Yeast Infection",
        iconPath: "/icons/minor-ailments/vaginalCandidiasis.png",
        category: "urinary" as const,
        categoryTitle: "Urinary and Reproductive Conditions",
      },
    ],
  },
  {
    id: "other",
    title: "Other BC Pharmacist Prescribing",
    items: [
      {
        id: "dysmenorrhea",
        serviceId: "dysmenorrhea-menstrual-cramps",
        name: "Menstrual Cramps (Dysmenorrhea)",
        shortName: "Menstrual Cramps",
        iconPath: "/icons/minor-ailments/cramps.png",
        category: "other" as const,
        categoryTitle: "Other BC Pharmacist Prescribing",
      },
      {
        id: "sprain",
        serviceId: "musculoskeletal-sprains-strains",
        name: "Sprains & Strains",
        shortName: "Sprains & Strains",
        iconPath: "/icons/minor-ailments/sprain.png",
        category: "other" as const,
        categoryTitle: "Other BC Pharmacist Prescribing",
      },
      {
        id: "headache",
        serviceId: "headache-assessment",
        name: "Headache & Mild Migraine",
        shortName: "Headache Assessment",
        iconPath: "/icons/minor-ailments/headache.png",
        category: "other" as const,
        categoryTitle: "Other BC Pharmacist Prescribing",
      },
      {
        id: "smokingCessation",
        serviceId: "nicotine-dependence-smoking-cessation",
        name: "Smoking Cessation Consultation",
        shortName: "Smoking Cessation",
        iconPath: "/icons/minor-ailments/prep.png",
        category: "other" as const,
        categoryTitle: "Other BC Pharmacist Prescribing",
      },
    ],
  },
];

export const VACCINES_MENU_ITEMS = [
  {
    id: "annual-influenza-immunization",
    serviceId: "annual-influenza-immunization",
    name: "Annual Influenza Immunization (Flu Shot)",
    shortName: "Flu Shot",
    iconPath: "/icons/minor-ailments/influenza.png",
    description: "Publicly funded seasonal influenza immunization for eligible BC residents.",
  },
  {
    id: "covid-19-vaccination",
    serviceId: "covid-19-vaccination",
    name: "COVID-19 Vaccination / Booster",
    shortName: "COVID-19 Booster",
    iconPath: "/icons/minor-ailments/covidVaccine.png",
    description: "Updated provincial COVID-19 mRNA vaccine administered by certified pharmacist.",
  },
  {
    id: "covid-flu-dual",
    serviceId: "annual-influenza-immunization",
    name: "COVID-19 + Flu Dual Immunization",
    shortName: "Dual Shot",
    iconPath: "/icons/minor-ailments/covidVaccineFlu.png",
    description: "Receive both your seasonal influenza and COVID-19 vaccines in a single appointment.",
  },
  {
    id: "shingles-immunization-shingrix",
    serviceId: "shingles-immunization-shingrix",
    name: "Shingles Immunization (Shingrix)",
    shortName: "Shingles Vaccine",
    iconPath: "/icons/minor-ailments/shingles.png",
    description: "Recombinant shingles vaccine for adults 50+ with direct insurance billing.",
  },
  {
    id: "travel-immunizations-consult",
    serviceId: "travel-immunizations-consult",
    name: "Travel Vaccines & Pre-Travel Consult",
    shortName: "Travel Health",
    iconPath: "/icons/minor-ailments/travelHealth.png",
    description: "Destination-specific immunizations, Twinrix, Typhoid, and travel prescriptions.",
  },
  {
    id: "tetanus-diphtheria-pertussis-tdap",
    serviceId: "tetanus-diphtheria-pertussis-tdap",
    name: "Tetanus, Diphtheria & Pertussis (Tdap)",
    shortName: "Tetanus / Pertussis",
    iconPath: "/icons/minor-ailments/vaccine.png",
    description: "Routine 10-year booster or pregnancy pertussis immunization.",
  },
];

export const CONSULTATIONS_MENU_ITEMS = [
  {
    id: "medication-review-service",
    serviceId: "medication-review-service",
    name: "Comprehensive Medication Review",
    shortName: "Medication Review",
    iconPath: "/icons/minor-ailments/prep.png",
    description: "100% BC PharmaCare covered 30-min one-on-one regimen optimization.",
  },
  {
    id: "diabetes-assessment-care",
    serviceId: "diabetes-assessment-care",
    name: "Diabetes Assessment & Glucometer Care",
    shortName: "Diabetes Care",
    iconPath: "/icons/minor-ailments/diabetesSupplies.png",
    description: "Meter technique, A1C target guidance, insulin management, and lifestyle counseling.",
  },
  {
    id: "chronic-disease-care",
    serviceId: "chronic-disease-care",
    name: "Chronic Care Consultation",
    shortName: "Hypertension & Asthma Care",
    iconPath: "/icons/minor-ailments/sprain.png",
    description: "Personalized blood pressure monitoring, inhaler technique, and COPD action planning.",
  },
  {
    id: "injection-administration-fee",
    serviceId: "injection-administration-fee",
    name: "Prescribed Injection Administration",
    shortName: "Injection Service",
    iconPath: "/icons/minor-ailments/vaccine.png",
    description: "Certified administration of Vitamin B12, Prolia, or other physician-prescribed shots.",
  },
  {
    id: "myhealthpack-blister-setup",
    serviceId: "myhealthpack-blister-setup",
    name: "MyHealthPack Blister Packaging Setup",
    shortName: "Blister Pack Setup",
    iconPath: "/icons/minor-ailments/customIcon.png",
    description: "Complimentary setup of custom organized morning, noon, evening, and bed blister cards.",
  },
  {
    id: "prescription-adaptation-renewal",
    serviceId: "prescription-adaptation-renewal",
    name: "Prescription Renewal & Emergency Refill",
    shortName: "Emergency Supply",
    iconPath: "/icons/minor-ailments/customIcon.png",
    description: "Assessment to renew maintenance prescriptions and avoid therapy interruptions.",
  },
];

export function getConditionIconPath(serviceIdOrName: string): string {
  const norm = (serviceIdOrName || "").toLowerCase();
  
  for (const cat of MINOR_AILMENTS_MENU_CATEGORIES) {
    for (const item of cat.items) {
      if (item.serviceId === norm || item.id === norm || item.name.toLowerCase() === norm || item.shortName.toLowerCase() === norm) {
        return item.iconPath;
      }
    }
  }
  for (const item of VACCINES_MENU_ITEMS) {
    if (item.serviceId === norm || item.id === norm || item.name.toLowerCase() === norm || item.shortName.toLowerCase() === norm) {
      return item.iconPath;
    }
  }
  for (const item of CONSULTATIONS_MENU_ITEMS) {
    if (item.serviceId === norm || item.id === norm || item.name.toLowerCase() === norm || item.shortName.toLowerCase() === norm) {
      return item.iconPath;
    }
  }

  if (norm.includes("uti") || norm.includes("urinary")) return "/icons/minor-ailments/uti.png";
  if (norm.includes("heartburn") || norm.includes("gerd") || norm.includes("acid")) return "/icons/minor-ailments/heartburn.png";
  if (norm.includes("hemorrhoid")) return "/icons/minor-ailments/hemorrhoids.png";
  if (norm.includes("canker")) return "/icons/minor-ailments/cankerSores.png";
  if (norm.includes("cold sore") || norm.includes("herpes")) return "/icons/minor-ailments/coldSores.png";
  if (norm.includes("thrush") || norm.includes("candidal")) return "/icons/minor-ailments/oralThrush.png";
  if (norm.includes("allerg") || norm.includes("rhinitis")) return "/icons/minor-ailments/allergicRhinitis.png";
  if (norm.includes("eye") || norm.includes("conjunctivitis") || norm.includes("pink")) return "/icons/minor-ailments/pinkEye.png";
  if (norm.includes("jock")) return "/icons/minor-ailments/jockItch.png";
  if (norm.includes("foot") || norm.includes("athlete")) return "/icons/minor-ailments/athletesFoot.png";
  if (norm.includes("dandruff") || norm.includes("seborrheic")) return "/icons/minor-ailments/dandruff.png";
  if (norm.includes("dermatitis") || norm.includes("eczema") || norm.includes("skin irrit")) return "/icons/minor-ailments/dermatitis.png";
  if (norm.includes("nail") || norm.includes("onychomycosis")) return "/icons/minor-ailments/nailFungus.png";
  if (norm.includes("shingles") || norm.includes("zoster")) return "/icons/minor-ailments/shinglesTreatment.png";
  if (norm.includes("acne")) return "/icons/minor-ailments/acne.png";
  if (norm.includes("diaper")) return "/icons/minor-ailments/diaperRash.png";
  if (norm.includes("hive") || norm.includes("bite") || norm.includes("urticaria")) return "/icons/minor-ailments/hives.png";
  if (norm.includes("impetigo")) return "/icons/minor-ailments/impetigo.png";
  if (norm.includes("ringworm")) return "/icons/minor-ailments/ringworm.png";
  if (norm.includes("yeast")) return "/icons/minor-ailments/vaginalCandidiasis.png";
  if (norm.includes("pinworm")) return "/icons/minor-ailments/pinworms.png";
  if (norm.includes("flu") || norm.includes("influenza")) return "/icons/minor-ailments/influenza.png";
  if (norm.includes("covid")) return "/icons/minor-ailments/covidVaccine.png";
  if (norm.includes("vaccin")) return "/icons/minor-ailments/vaccine.png";
  if (norm.includes("new-prescription") || norm.includes("new prescription") || norm.includes("new rx")) return "/icons/minor-ailments/newPrescription.png";
  if (norm.includes("refill")) return "/icons/minor-ailments/refill.png";
  if (norm.includes("transfer")) return "/icons/minor-ailments/transfer.png";

  return "/icons/minor-ailments/customIcon.png";
}
