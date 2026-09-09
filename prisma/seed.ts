import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const CANONICAL_CATEGORIES = [
  {
    slug: "minor_ailments",
    name: "Minor Ailments",
    description:
      "Direct pharmacist assessment and prescribing for 21 common conditions under BC PPMAC regulations without waiting for a doctor.",
    sortOrder: 1,
  },
  {
    slug: "vaccines",
    name: "Vaccines & Injections",
    description:
      "Routine, seasonal, and travel vaccinations certified and administered on-site by certified immunizing pharmacists.",
    sortOrder: 2,
  },
  {
    slug: "consultations",
    name: "Clinical Consultations",
    description:
      "Comprehensive one-on-one medication reviews, chronic disease care, and wellness consultations.",
    sortOrder: 3,
  },
  {
    slug: "prescriptions",
    name: "Prescriptions & Dispensing",
    description:
      "Prescription transfers, refills, adaptations, compliance packaging (MyHealthPack), and custom compounding.",
    sortOrder: 4,
  },
];

export const BC_MINOR_AILMENTS_CONDITIONS = [
  {
    name: "Uncomplicated Urinary Tract Infection (UTI)",
    slug: "uncomplicated-urinary-tract-infection",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Clinical assessment and antibiotic prescribing for uncomplicated lower urinary tract infections in eligible patients.",
    preparationNotes:
      "Bring your BC Services Card / Personal Health Number (PHN). A fresh urine sample may be requested on-site.",
  },
  {
    name: "Allergic Rhinitis (Allergies & Hay Fever)",
    slug: "allergic-rhinitis",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Assessment of seasonal and environmental allergy symptoms with prescription antihistamines or corticosteroid nasal sprays.",
    preparationNotes:
      "Note down any known triggers and current over-the-counter allergy medications you have tried.",
  },
  {
    name: "Herpes Labialis (Cold Sores)",
    slug: "herpes-labialis-cold-sores",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Prompt antiviral assessment and prescribing to reduce duration and severity of recurrent oral herpes outbreaks.",
    preparationNotes:
      "Early assessment within 24 to 48 hours of initial tingling or blister onset yields the most effective results.",
  },
  {
    name: "Conjunctivitis (Pink Eye)",
    slug: "conjunctivitis-pink-eye",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Evaluation of eye redness, discharge, and irritation to determine bacterial, viral, or allergic conjunctivitis and prescribe drops.",
    preparationNotes:
      "Remove contact lenses prior to visit. Note onset time and whether symptoms affect one or both eyes.",
  },
  {
    name: "Gastroesophageal Reflux Disease (GERD & Acid Reflux)",
    slug: "gerd-acid-reflux",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Assessment of heartburn and acid reflux symptoms with prescription proton pump inhibitors or H2 blockers.",
    preparationNotes:
      "List typical food triggers and any antacids or acid reducers taken recently.",
  },
  {
    name: "Shingles (Herpes Zoster)",
    slug: "shingles-herpes-zoster",
    durationMinutes: 20,
    priceCents: 0,
    mspCovered: true,
    description:
      "Rapid clinical evaluation for localized painful blistering rash and initiation of targeted oral antivirals within the 72-hour window.",
    preparationNotes:
      "Seek care promptly upon rash appearance. Antivirals are most effective when initiated within 72 hours.",
  },
  {
    name: "Mild Acne",
    slug: "mild-acne",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Skin assessment and tailored topical prescription regimens including retinoids, benzoyl peroxide, and topical antibiotics.",
    preparationNotes:
      "Arrive with clean skin free of heavy makeup. Bring names of current skincare products and treatments.",
  },
  {
    name: "Atopic Dermatitis (Eczema)",
    slug: "atopic-dermatitis-eczema",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Evaluation of dry, itchy, inflamed skin flares with prescription topical corticosteroids or calcineurin inhibitors.",
    preparationNotes:
      "Note location of rash flare-ups and any known contact irritants or temperature triggers.",
  },
  {
    name: "Contact & Irritant Dermatitis",
    slug: "contact-dermatitis",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Diagnosis and management of localized skin inflammation caused by allergens, chemicals, cosmetics, or plants.",
    preparationNotes:
      "Bring or photograph any suspect detergents, soaps, cosmetics, or materials that came into skin contact.",
  },
  {
    name: "Fungal Skin Infections (Tinea Pedis, Cruris, Corporis)",
    slug: "fungal-skin-infections",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Assessment of athlete's foot, jock itch, or ringworm with prescription topical or oral antifungal therapies.",
    preparationNotes:
      "Keep affected area clean and dry. Avoid applying thick occlusive ointments immediately before the visit.",
  },
  {
    name: "Vaginal Candidiasis (Yeast Infection)",
    slug: "vaginal-candidiasis-yeast-infection",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Confidential evaluation of itching, burning, and discharge with prescription oral or vaginal antifungal therapies.",
    preparationNotes:
      "Prepare details of previous episodes and any over-the-counter treatments used in the last 7 days.",
  },
  {
    name: "Dysmenorrhea (Menstrual Cramps)",
    slug: "dysmenorrhea-menstrual-cramps",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Management of painful menstruation with targeted prescription NSAIDs or hormonal symptom support.",
    preparationNotes:
      "Track cycle dates, severity of cramping, and previous pain medications used.",
  },
  {
    name: "Dyspepsia (Indigestion & Stomach Upset)",
    slug: "dyspepsia-indigestion",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Evaluation of persistent upper abdominal discomfort, bloating, and early fullness with medical therapy recommendations.",
    preparationNotes:
      "Record meal habits, onset of symptoms, and any red flag warning signs (such as unintentional weight loss).",
  },
  {
    name: "Hemorrhoids",
    slug: "hemorrhoids",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Private consultation and prescription for topical corticosteroid, local anesthetic, and anti-inflammatory formulations.",
    preparationNotes:
      "Be prepared to discuss symptom duration, pain level, and bowel movement regularity.",
  },
  {
    name: "Impetigo",
    slug: "impetigo",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Identification of superficial honey-crusted bacterial skin sores and prescription of targeted topical or oral antibiotics.",
    preparationNotes:
      "Avoid touching or picking sores to prevent spreading. Bring along recent health history.",
  },
  {
    name: "Insect Bites & Urticaria (Hives)",
    slug: "insect-bites-urticaria-hives",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Relief of localized bite reactions, severe itching, and allergic hive eruptions using prescription antihistamines and topicals.",
    preparationNotes:
      "Note the time and setting of exposure. If you experience difficulty breathing, seek immediate emergency care (911).",
  },
  {
    name: "Musculoskeletal Sprains & Strains",
    slug: "musculoskeletal-sprains-strains",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Assessment of acute soft tissue injuries, tendon strains, and joint sprains with prescription anti-inflammatories.",
    preparationNotes:
      "Rest and elevate the injured area before the appointment. Bring details regarding how the injury occurred.",
  },
  {
    name: "Nicotine Dependence (Smoking Cessation)",
    slug: "nicotine-dependence-smoking-cessation",
    durationMinutes: 20,
    priceCents: 0,
    mspCovered: true,
    description:
      "Personalized quit smoking planning, BC Smoking Cessation Program enrollment, and prescription cessation therapies.",
    preparationNotes:
      "Eligible BC residents can receive up to 12 weeks of covered nicotine replacement therapy or prescription aids per calendar year.",
  },
  {
    name: "Aphthous Ulcers (Canker Sores)",
    slug: "aphthous-ulcers-canker-sores",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Assessment of painful inner oral ulcers with prescription topical anti-inflammatory pastes and protective coatings.",
    preparationNotes:
      "Avoid eating spicy or acidic foods right before examination. Note frequency and recurrence pattern.",
  },
  {
    name: "Oral Fungal Infection (Thrush / Candidal Stomatitis)",
    slug: "oral-fungal-infection-thrush",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Assessment of creamy white oral mucosal patches and prescribing of oral antifungal suspensions or lozenges.",
    preparationNotes:
      "Bring details of inhalers or antibiotics recently used, as steroid inhalers without rinsing can contribute to thrush.",
  },
  {
    name: "Contraception Management & Emergency Contraception",
    slug: "contraception-management",
    durationMinutes: 20,
    priceCents: 0,
    mspCovered: true,
    description:
      "Comprehensive consultation and prescription for BC covered oral contraceptives, injections, rings, patches, and emergency pills.",
    preparationNotes:
      "BC Fair PharmaCare covers many prescription contraceptives for BC residents with active MSP coverage.",
  },
];

export const OTHER_CANONICAL_SERVICES = [
  {
    categorySlug: "vaccines",
    name: "Annual Influenza Immunization (Flu Shot)",
    slug: "annual-influenza-immunization",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "BC publicly funded seasonal flu vaccination for individuals 6 months of age and older.",
    preparationNotes: "Wear clothing with easy access to upper arm.",
  },
  {
    categorySlug: "vaccines",
    name: "COVID-19 Vaccination / Booster",
    slug: "covid-19-vaccination",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: true,
    description:
      "Updated COVID-19 mRNA immunization administered according to current BC provincial health guidelines.",
    preparationNotes: "Bring your BC Personal Health Number (PHN).",
  },
  {
    categorySlug: "vaccines",
    name: "Shingles Immunization (Shingrix)",
    slug: "shingles-immunization-shingrix",
    durationMinutes: 15,
    priceCents: 0,
    mspCovered: false,
    description:
      "Two-dose recombinant shingles vaccine series to protect adults against painful herpes zoster reactivation.",
    preparationNotes: "Third-party insurance direct billing is available.",
  },
  {
    categorySlug: "consultations",
    name: "Medication Review Service (BC PharmaCare funded)",
    slug: "medication-review-service",
    durationMinutes: 30,
    priceCents: 0,
    mspCovered: true,
    description:
      "Comprehensive 30-minute one-on-one review with a clinical pharmacist to optimize regimen and check drug interactions.",
    preparationNotes:
      "Bring all current prescription bottles, over-the-counter products, and vitamins.",
  },
  {
    categorySlug: "prescriptions",
    name: "MyHealthPack Compliance Blister Packaging",
    slug: "myhealthpack-blister-packaging",
    durationMinutes: 20,
    priceCents: 0,
    mspCovered: true,
    description:
      "Organized multi-dose weekly blister packaging tailored to morning, noon, evening, and bedtime dosage times.",
    preparationNotes: "Consultation covers synchronizing all refills onto a regular schedule.",
  },
];

export const PHARMACISTS = [
  {
    name: "Dr. Anika Sharma",
    title: "Pharmacy Manager & Owner",
    licenseNumber: "BC-PHARM-20184",
    bio: "Anika has been serving Abbotsford families for over 15 years. She specialises in geriatric care and medication reviews, and is passionate about making sure every patient feels heard.",
    avatarUrl: "/pharmacists/anika.jpg",
    acceptsAppointments: true,
    active: true,
    schedules: [
      { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 4, startTime: "09:00", endTime: "17:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 5, startTime: "09:00", endTime: "17:00", slotIntervalMinutes: 15 },
    ],
  },
  {
    name: "Marcus Chen",
    title: "Clinical Pharmacist",
    licenseNumber: "BC-PHARM-24812",
    bio: "Marcus focuses on minor ailment consultations and chronic disease management. He runs our travel vaccine clinic and is certified in injectable administration.",
    avatarUrl: "/pharmacists/marcus.jpg",
    acceptsAppointments: true,
    active: true,
    schedules: [
      { dayOfWeek: 2, startTime: "10:00", endTime: "18:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 3, startTime: "10:00", endTime: "18:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 4, startTime: "10:00", endTime: "18:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 5, startTime: "10:00", endTime: "18:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 6, startTime: "09:00", endTime: "17:00", slotIntervalMinutes: 15 },
    ],
  },
  {
    name: "Priya Patel",
    title: "Compounding & MyHealthPack Lead",
    licenseNumber: "BC-PHARM-27351",
    bio: "Priya runs our compounding lab and MyHealthPack compliance packaging service. She loves solving tricky prescription problems and helping caregivers manage complex regimens.",
    avatarUrl: "/pharmacists/priya.jpg",
    acceptsAppointments: true,
    active: true,
    schedules: [
      { dayOfWeek: 1, startTime: "08:30", endTime: "16:30", slotIntervalMinutes: 15 },
      { dayOfWeek: 2, startTime: "08:30", endTime: "16:30", slotIntervalMinutes: 15 },
      { dayOfWeek: 3, startTime: "08:30", endTime: "16:30", slotIntervalMinutes: 15 },
      { dayOfWeek: 4, startTime: "08:30", endTime: "16:30", slotIntervalMinutes: 15 },
    ],
  },
  {
    name: "Daniel Okafor",
    title: "Community Pharmacist",
    licenseNumber: "BC-PHARM-31904",
    bio: "Daniel is the friendly face at our front counter. He oversees prescription transfers, flu-shot clinics, and delivery logistics.",
    avatarUrl: "/pharmacists/daniel.jpg",
    acceptsAppointments: true,
    active: true,
    schedules: [
      { dayOfWeek: 3, startTime: "11:00", endTime: "19:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 4, startTime: "11:00", endTime: "19:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 5, startTime: "11:00", endTime: "19:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 6, startTime: "09:00", endTime: "17:00", slotIntervalMinutes: 15 },
      { dayOfWeek: 0, startTime: "10:00", endTime: "16:00", slotIntervalMinutes: 15 },
    ],
  },
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    text: "Walk-in flu shots available — no appointment needed",
    icon: "syringe",
    urgent: false,
    enabled: true,
    displayOrder: 1,
  },
  {
    text: "Free prescription delivery in Abbotsford for orders over $25",
    icon: "truck",
    urgent: false,
    enabled: true,
    displayOrder: 2,
  },
  {
    text: "Open 7 days a week: Mon–Fri 8am–9pm, Sat–Sun 9am–6pm",
    icon: "clock",
    urgent: false,
    enabled: true,
    displayOrder: 3,
  },
  {
    text: "Shingles and pneumonia vaccines now in stock — book online",
    icon: "alert",
    urgent: false,
    enabled: true,
    displayOrder: 4,
  },
];

export async function main() {
  // Seed Canonical Categories
  for (const cat of CANONICAL_CATEGORIES) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        sortOrder: cat.sortOrder,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        sortOrder: cat.sortOrder,
      },
    });
  }

  const minorAilmentsCategory = await prisma.serviceCategory.findUnique({
    where: { slug: "minor_ailments" },
  });

  if (!minorAilmentsCategory) {
    throw new Error("Failed to find minor_ailments category");
  }

  // Seed 21 BC Minor Ailments Conditions
  for (const condition of BC_MINOR_AILMENTS_CONDITIONS) {
    await prisma.service.upsert({
      where: { slug: condition.slug },
      update: {
        name: condition.name,
        durationMinutes: condition.durationMinutes,
        priceCents: condition.priceCents,
        mspCovered: condition.mspCovered,
        description: condition.description,
        preparationNotes: condition.preparationNotes,
        categoryId: minorAilmentsCategory.id,
      },
      create: {
        slug: condition.slug,
        name: condition.name,
        durationMinutes: condition.durationMinutes,
        priceCents: condition.priceCents,
        mspCovered: condition.mspCovered,
        description: condition.description,
        preparationNotes: condition.preparationNotes,
        categoryId: minorAilmentsCategory.id,
      },
    });
  }

  // Seed other canonical services
  for (const item of OTHER_CANONICAL_SERVICES) {
    const parentCategory = await prisma.serviceCategory.findUnique({
      where: { slug: item.categorySlug },
    });
    if (parentCategory) {
      await prisma.service.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          durationMinutes: item.durationMinutes,
          priceCents: item.priceCents,
          mspCovered: item.mspCovered,
          description: item.description,
          preparationNotes: item.preparationNotes,
          categoryId: parentCategory.id,
        },
        create: {
          slug: item.slug,
          name: item.name,
          durationMinutes: item.durationMinutes,
          priceCents: item.priceCents,
          mspCovered: item.mspCovered,
          description: item.description,
          preparationNotes: item.preparationNotes,
          categoryId: parentCategory.id,
        },
      });
    }
  }

  // Seed Pharmacists and Schedules
  for (const pharm of PHARMACISTS) {
    const existing = await prisma.pharmacist.findFirst({
      where: { licenseNumber: pharm.licenseNumber },
    });

    let pharmacistRecord;
    if (existing) {
      pharmacistRecord = await prisma.pharmacist.update({
        where: { id: existing.id },
        data: {
          name: pharm.name,
          title: pharm.title,
          bio: pharm.bio,
          avatarUrl: pharm.avatarUrl,
          acceptsAppointments: pharm.acceptsAppointments,
          active: pharm.active,
        },
      });
    } else {
      pharmacistRecord = await prisma.pharmacist.create({
        data: {
          name: pharm.name,
          title: pharm.title,
          licenseNumber: pharm.licenseNumber,
          bio: pharm.bio,
          avatarUrl: pharm.avatarUrl,
          acceptsAppointments: pharm.acceptsAppointments,
          active: pharm.active,
        },
      });
    }

    // Refresh schedules
    await prisma.pharmacistSchedule.deleteMany({
      where: { pharmacistId: pharmacistRecord.id },
    });

    for (const sch of pharm.schedules) {
      await prisma.pharmacistSchedule.create({
        data: {
          pharmacistId: pharmacistRecord.id,
          dayOfWeek: sch.dayOfWeek,
          startTime: sch.startTime,
          endTime: sch.endTime,
          slotIntervalMinutes: sch.slotIntervalMinutes,
        },
      });
    }
  }

  // Seed Initial Announcements
  for (const ann of INITIAL_ANNOUNCEMENTS) {
    const existingAnn = await prisma.announcement.findFirst({
      where: { text: ann.text },
    });
    if (existingAnn) {
      await prisma.announcement.update({
        where: { id: existingAnn.id },
        data: {
          icon: ann.icon,
          urgent: ann.urgent,
          enabled: ann.enabled,
          displayOrder: ann.displayOrder,
        },
      });
    } else {
      await prisma.announcement.create({
        data: {
          text: ann.text,
          icon: ann.icon,
          urgent: ann.urgent,
          enabled: ann.enabled,
          displayOrder: ann.displayOrder,
        },
      });
    }
  }

  // Seed Staff Users
  const adminPasswordHash = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD || "Admin2026!", 10);
  const pharmacistPasswordHash = await bcrypt.hash(process.env.PHARMACIST_INITIAL_PASSWORD || "Pharmacist2026!", 10);

  await prisma.user.upsert({
    where: { email: "admin@ihealthpharmacy.ca" },
    update: {
      name: "System Administrator",
      role: Role.ADMIN,
      isActive: true,
      hashedPassword: adminPasswordHash,
    },
    create: {
      name: "System Administrator",
      email: "admin@ihealthpharmacy.ca",
      role: Role.ADMIN,
      isActive: true,
      hashedPassword: adminPasswordHash,
    },
  });

  await prisma.user.upsert({
    where: { email: "pharmacist@ihealthpharmacy.ca" },
    update: {
      name: "Staff Pharmacist",
      role: Role.PHARMACIST,
      isActive: true,
      hashedPassword: pharmacistPasswordHash,
    },
    create: {
      name: "Staff Pharmacist",
      email: "pharmacist@ihealthpharmacy.ca",
      role: Role.PHARMACIST,
      isActive: true,
      hashedPassword: pharmacistPasswordHash,
    },
  });
}

if (process.env.NODE_ENV !== "test") {
  main()
    .catch((e) => {
      // Allow running export without connection if database is not reachable during build
      if (process.env.DATABASE_URL?.includes("localhost:5432") || process.env.PRISMA_SEED_DRY_RUN) {
        console.warn("Prisma seed: database unreachable or dry run, exported seed data successfully.");
        process.exit(0);
      }
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
