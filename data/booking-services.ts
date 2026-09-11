export interface BookingService {
  id: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  name: string;
  shortName?: string;
  durationMinutes: number;
  priceCents: number;
  mspCovered: boolean;
  coverageBadge: string;
  description: string;
  clinicalIndications: string[];
  preparationNotes: string[];
}

export interface BookingCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  badge: string;
  services: BookingService[];
}

export const BOOKING_CATEGORIES: BookingCategory[] = [
  {
    id: "cat_minor_ailments",
    slug: "minor_ailments",
    name: "Minor Ailments",
    badge: "100% Covered by BC MSP",
    description:
      "Direct pharmacist assessment and prescribing for 21 common conditions under BC PPMAC regulations without waiting for a doctor.",
    services: [
      {
        id: "uncomplicated-urinary-tract-infection",
        slug: "uncomplicated-urinary-tract-infection",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Uncomplicated Urinary Tract Infection (UTI)",
        shortName: "Urinary Tract Infection (UTI)",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Clinical assessment and antibiotic prescribing for uncomplicated lower urinary tract infections in eligible individuals.",
        clinicalIndications: [
          "Burning sensation or pain when urinating",
          "Frequent or urgent need to urinate",
          "Lower abdominal or pelvic pressure",
          "No fever, chills, flank pain, or pregnancy",
        ],
        preparationNotes: [
          "Bring your BC Services Card (Personal Health Number / PHN).",
          "A fresh urine sample may be requested on-site for rapid dipstick screening.",
        ],
      },
      {
        id: "allergic-rhinitis",
        slug: "allergic-rhinitis",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Allergic Rhinitis (Allergies & Hay Fever)",
        shortName: "Allergies & Hay Fever",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Assessment of seasonal and environmental allergy symptoms with prescription antihistamines or corticosteroid nasal sprays.",
        clinicalIndications: [
          "Sneezing, itchy nose, or congested nasal passages",
          "Watery, red, or itchy eyes",
          "Seasonal pollen or pet dander exposure triggers",
        ],
        preparationNotes: [
          "Bring a list of any over-the-counter allergy medications you have tried.",
        ],
      },
      {
        id: "herpes-labialis-cold-sores",
        slug: "herpes-labialis-cold-sores",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Herpes Labialis (Cold Sores)",
        shortName: "Cold Sores",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Prompt antiviral assessment and prescribing to reduce duration and severity of recurrent oral herpes outbreaks.",
        clinicalIndications: [
          "Tingling, burning, or blister formation on or around the lips",
          "Recurrent history of cold sore outbreaks",
        ],
        preparationNotes: [
          "Seek assessment within 24 to 48 hours of initial symptom onset for maximum antiviral efficacy.",
        ],
      },
      {
        id: "conjunctivitis-pink-eye",
        slug: "conjunctivitis-pink-eye",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Conjunctivitis (Pink Eye)",
        shortName: "Pink Eye (Conjunctivitis)",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Evaluation of eye redness, discharge, and irritation to determine bacterial, viral, or allergic conjunctivitis and prescribe drops.",
        clinicalIndications: [
          "Redness, crusting, or yellow/green discharge in one or both eyes",
          "Gritty feeling without severe eye pain or vision loss",
        ],
        preparationNotes: [
          "Remove contact lenses prior to consultation.",
          "Note whether symptoms started in one or both eyes.",
        ],
      },
      {
        id: "gerd-acid-reflux",
        slug: "gerd-acid-reflux",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Gastroesophageal Reflux Disease (GERD & Acid Reflux)",
        shortName: "Acid Reflux & Heartburn",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Assessment of heartburn and acid reflux symptoms with prescription proton pump inhibitors or H2 blockers.",
        clinicalIndications: [
          "Burning retrosternal chest sensation after meals or lying down",
          "Acid regurgitation or sour taste in throat",
        ],
        preparationNotes: [
          "List previous antacids or over-the-counter acid reducers used.",
        ],
      },
      {
        id: "shingles-herpes-zoster",
        slug: "shingles-herpes-zoster",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Shingles (Herpes Zoster)",
        shortName: "Shingles Assessment",
        durationMinutes: 20,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Rapid clinical evaluation for localized painful blistering rash and initiation of targeted oral antivirals within the 72-hour window.",
        clinicalIndications: [
          "Unilateral band or cluster of painful, stinging blisters",
          "Tingling or sharp localized nerve pain along a dermatome",
        ],
        preparationNotes: [
          "Antiviral medication is most effective when started within 72 hours of rash appearance.",
        ],
      },
      {
        id: "mild-acne",
        slug: "mild-acne",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Mild Acne",
        shortName: "Acne Management",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Skin assessment and tailored topical prescription regimens including retinoids, benzoyl peroxide, and topical antibiotics.",
        clinicalIndications: [
          "Blackheads, whiteheads, and small inflammatory papules on face or neck",
          "Inadequate response to non-prescription facial washes",
        ],
        preparationNotes: [
          "Arrive with clean facial skin free of heavy makeup or concealers.",
        ],
      },
      {
        id: "atopic-dermatitis-eczema",
        slug: "atopic-dermatitis-eczema",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Atopic Dermatitis (Eczema)",
        shortName: "Eczema Flare-ups",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Evaluation of dry, itchy, inflamed skin flares with prescription topical corticosteroids or calcineurin inhibitors.",
        clinicalIndications: [
          "Dry, itchy, erythematous patches on flexural surfaces or hands",
          "Recurrent flare-ups associated with seasonal or allergen triggers",
        ],
        preparationNotes: [
          "Note any known contact irritants, detergents, or temperature triggers.",
        ],
      },
      {
        id: "contact-dermatitis",
        slug: "contact-dermatitis",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Contact & Irritant Dermatitis",
        shortName: "Contact Dermatitis",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Diagnosis and management of localized skin inflammation caused by allergens, chemicals, cosmetics, or plants.",
        clinicalIndications: [
          "Red, itchy, or stinging skin patch confined to an area of recent chemical or substance contact",
        ],
        preparationNotes: [
          "Bring or note names of recent cosmetics, lotions, jewelry, or cleaning chemicals used.",
        ],
      },
      {
        id: "fungal-skin-infections",
        slug: "fungal-skin-infections",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Fungal Skin Infections (Athlete's Foot, Ringworm, Jock Itch)",
        shortName: "Fungal Skin Infection",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Assessment of tinea pedis, cruris, or corporis with prescription topical or oral antifungal therapies.",
        clinicalIndications: [
          "Annular red scaly plaque with raised borders (ringworm)",
          "Macerated, peeling, itchy skin between toes or groin creases",
        ],
        preparationNotes: [
          "Ensure affected area is clean and dry prior to appointment.",
        ],
      },
      {
        id: "vaginal-candidiasis-yeast-infection",
        slug: "vaginal-candidiasis-yeast-infection",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Vaginal Candidiasis (Yeast Infection)",
        shortName: "Yeast Infection",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Confidential evaluation of itching, burning, and discharge with prescription oral or vaginal antifungal therapies.",
        clinicalIndications: [
          "Vulvar itching, irritation, and thick white clumpy discharge",
          "Prior confirmed history of candidiasis",
        ],
        preparationNotes: [
          "Private consultation in our private consultation room.",
        ],
      },
      {
        id: "dysmenorrhea-menstrual-cramps",
        slug: "dysmenorrhea-menstrual-cramps",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Dysmenorrhea (Menstrual Cramps)",
        shortName: "Menstrual Cramps",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Management of painful menstruation with targeted prescription NSAIDs or hormonal symptom support.",
        clinicalIndications: [
          "Severe lower abdominal cramping or pelvic pain coinciding with menses",
        ],
        preparationNotes: [
          "Track menstrual cycle dates and previous pain medications taken.",
        ],
      },
      {
        id: "dyspepsia-indigestion",
        slug: "dyspepsia-indigestion",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Dyspepsia (Indigestion & Stomach Upset)",
        shortName: "Indigestion & Dyspepsia",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Evaluation of persistent upper abdominal discomfort, bloating, and early fullness with medical therapy recommendations.",
        clinicalIndications: [
          "Postprandial fullness, early satiety, or epigastric discomfort",
        ],
        preparationNotes: [
          "Record dietary patterns and any aggravating foods or beverages.",
        ],
      },
      {
        id: "hemorrhoids",
        slug: "hemorrhoids",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Hemorrhoids",
        shortName: "Hemorrhoid Relief",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Private consultation and prescription for topical corticosteroid, local anesthetic, and anti-inflammatory formulations.",
        clinicalIndications: [
          "Perianal itching, swelling, or discomfort during bowel movements",
        ],
        preparationNotes: [
          "All consultations take place in our confidential clinical room.",
        ],
      },
      {
        id: "impetigo",
        slug: "impetigo",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Impetigo",
        shortName: "Impetigo Skin Infection",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Identification of superficial honey-crusted bacterial skin sores and prescription of targeted topical or oral antibiotics.",
        clinicalIndications: [
          "Honey-coloured crusted lesions or fragile blisters around nose and mouth",
        ],
        preparationNotes: [
          "Avoid scratching or touching sores to avoid spreading bacteria.",
        ],
      },
      {
        id: "insect-bites-urticaria-hives",
        slug: "insect-bites-urticaria-hives",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Insect Bites & Urticaria (Hives)",
        shortName: "Insect Bites & Hives",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Relief of localized bite reactions, severe itching, and allergic hive eruptions using prescription antihistamines and topicals.",
        clinicalIndications: [
          "Intensely itchy raised wheals or localized bite reaction",
          "No facial swelling, wheezing, or anaphylaxis signs",
        ],
        preparationNotes: [
          "If experiencing lip swelling or difficulty breathing, call 911 immediately.",
        ],
      },
      {
        id: "musculoskeletal-sprains-strains",
        slug: "musculoskeletal-sprains-strains",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Musculoskeletal Sprains & Strains",
        shortName: "Sprains & Strains",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Assessment of acute soft tissue injuries, tendon strains, and joint sprains with prescription anti-inflammatories.",
        clinicalIndications: [
          "Mild to moderate ligament stretch or muscle soreness from activity",
          "Weight-bearing intact with localized tenderness and mild swelling",
        ],
        preparationNotes: [
          "Rest and elevate the affected joint before your visit.",
        ],
      },
      {
        id: "nicotine-dependence-smoking-cessation",
        slug: "nicotine-dependence-smoking-cessation",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Nicotine Dependence (Smoking Cessation)",
        shortName: "Smoking Cessation Program",
        durationMinutes: 20,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Personalized quit smoking planning, BC Smoking Cessation Program enrollment, and prescription cessation therapies.",
        clinicalIndications: [
          "Desire to quit commercial tobacco, cigarettes, or vaping products",
        ],
        preparationNotes: [
          "Eligible BC residents receive up to 12 weeks of covered NRT or prescription aids per calendar year.",
        ],
      },
      {
        id: "aphthous-ulcers-canker-sores",
        slug: "aphthous-ulcers-canker-sores",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Aphthous Ulcers (Canker Sores)",
        shortName: "Canker Sores",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Assessment of painful inner oral ulcers with prescription topical anti-inflammatory pastes and protective coatings.",
        clinicalIndications: [
          "Painful round ulcer on inner lip, cheek, or tongue with red halo",
        ],
        preparationNotes: [
          "Avoid eating hot or acidic foods immediately before the appointment.",
        ],
      },
      {
        id: "oral-fungal-infection-thrush",
        slug: "oral-fungal-infection-thrush",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Oral Fungal Infection (Thrush / Candidal Stomatitis)",
        shortName: "Oral Thrush",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Assessment of creamy white oral mucosal patches and prescribing of oral antifungal suspensions or lozenges.",
        clinicalIndications: [
          "White curd-like plaques on buccal mucosa or tongue that wipe off leaving red base",
        ],
        preparationNotes: [
          "Bring details of any steroid inhalers or recent antibiotics used.",
        ],
      },
      {
        id: "contraception-management",
        slug: "contraception-management",
        categoryId: "cat_minor_ailments",
        categoryName: "Minor Ailments",
        name: "Contraception Management & Emergency Contraception",
        shortName: "Contraception Consultation",
        durationMinutes: 20,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Comprehensive consultation and prescription for BC covered oral contraceptives, injections, rings, patches, and emergency pills.",
        clinicalIndications: [
          "Prescription initiation or renewal for oral birth control, vaginal rings, or injections",
          "Emergency contraception consultation",
        ],
        preparationNotes: [
          "Many prescription contraceptives are 100% covered under BC PharmaCare.",
        ],
      },
    ],
  },
  {
    id: "cat_vaccines",
    slug: "vaccines",
    name: "Vaccines & Injections",
    badge: "Administered by Certified Pharmacist",
    description:
      "Routine, seasonal, and travel vaccinations administered on-site in a private, sterile clinical room.",
    services: [
      {
        id: "annual-influenza-immunization",
        slug: "annual-influenza-immunization",
        categoryId: "cat_vaccines",
        categoryName: "Vaccines & Injections",
        name: "Annual Influenza Immunization (Flu Shot)",
        shortName: "Flu Shot",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "Publicly Funded by BC MSP",
        description:
          "BC publicly funded seasonal influenza immunization for individuals 6 months of age and older.",
        clinicalIndications: [
          "Annual seasonal influenza prevention for adults, seniors, and children",
        ],
        preparationNotes: [
          "Wear loose-fitting clothing with easy access to upper arm.",
          "Please plan to wait 15 minutes post-injection for routine observation.",
        ],
      },
      {
        id: "covid-19-vaccination",
        slug: "covid-19-vaccination",
        categoryId: "cat_vaccines",
        categoryName: "Vaccines & Injections",
        name: "COVID-19 Vaccination / Booster",
        shortName: "COVID-19 Booster",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "Publicly Funded by BC MSP",
        description:
          "Updated COVID-19 mRNA immunization administered according to current BC provincial health guidelines.",
        clinicalIndications: [
          "Seasonal or booster COVID-19 protection for all eligible BC residents",
        ],
        preparationNotes: [
          "Bring your BC Personal Health Number (PHN).",
          "Wear a short-sleeve shirt.",
        ],
      },
      {
        id: "shingles-immunization-shingrix",
        slug: "shingles-immunization-shingrix",
        categoryId: "cat_vaccines",
        categoryName: "Vaccines & Injections",
        name: "Shingles Immunization (Shingrix)",
        shortName: "Shingrix Shingles Vaccine",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: false,
        coverageBadge: "Direct Billing to Private Insurance",
        description:
          "Two-dose recombinant shingles vaccine series to protect adults 50+ against painful herpes zoster reactivation.",
        clinicalIndications: [
          "Prevention of herpes zoster and postherpetic neuralgia in adults 50 and older",
        ],
        preparationNotes: [
          "Direct billing to most extended health insurance plans is available on-site.",
        ],
      },
      {
        id: "travel-immunizations-consult",
        slug: "travel-immunizations-consult",
        categoryId: "cat_vaccines",
        categoryName: "Vaccines & Injections",
        name: "Travel Immunization & Pre-Travel Consult",
        shortName: "Travel Vaccine Clinic",
        durationMinutes: 30,
        priceCents: 0,
        mspCovered: false,
        coverageBadge: "Direct Billing Available",
        description:
          "Destination-specific immunization review, Twinrix (Hepatitis A & B), Typhoid, and travel health prophylaxis.",
        clinicalIndications: [
          "International travel health preparation and country-specific required immunizations",
        ],
        preparationNotes: [
          "Bring your detailed travel itinerary, dates, and previous immunization records.",
        ],
      },
      {
        id: "tetanus-diphtheria-pertussis-tdap",
        slug: "tetanus-diphtheria-pertussis-tdap",
        categoryId: "cat_vaccines",
        categoryName: "Vaccines & Injections",
        name: "Tetanus, Diphtheria & Pertussis (Td / Tdap)",
        shortName: "Tetanus / Whooping Cough",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "Publicly Funded by BC MSP",
        description:
          "10-year booster vaccination or post-wound exposure immunization for adults and pregnant individuals.",
        clinicalIndications: [
          "Routine 10-year adult tetanus booster or third-trimester pregnancy pertussis protection",
        ],
        preparationNotes: [
          "Wear loose sleeves. 15-minute observation period applies.",
        ],
      },
    ],
  },
  {
    id: "cat_consultations",
    slug: "consultations",
    name: "Consultations",
    badge: "1-on-1 Clinical Pharmacist Care",
    description:
      "Comprehensive one-on-one medication reviews, chronic disease care, and wellness consultations in a private setting.",
    services: [
      {
        id: "medication-review-service",
        slug: "medication-review-service",
        categoryId: "cat_consultations",
        categoryName: "Consultations",
        name: "Medication Review Service (BC PharmaCare funded)",
        shortName: "Comprehensive Med Review",
        durationMinutes: 30,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC PharmaCare",
        description:
          "Comprehensive 30-minute one-on-one review with a clinical pharmacist to optimize regimen, check drug interactions, and produce an official Best Possible Medication History.",
        clinicalIndications: [
          "Patients taking 5 or more qualifying medications in the last 6 months",
          "Recent hospital discharge or medication changes",
        ],
        preparationNotes: [
          "Bring all current prescription vials, over-the-counter supplements, and herbal remedies.",
        ],
      },
      {
        id: "diabetes-assessment-care",
        slug: "diabetes-assessment-care",
        categoryId: "cat_consultations",
        categoryName: "Consultations",
        name: "Diabetes Assessment & Blood Glucose Management",
        shortName: "Diabetes Assessment",
        durationMinutes: 30,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "Clinical Assessment",
        description:
          "Blood glucose meter technique training, A1C target review, insulin adjustment guidance, and lifestyle counseling.",
        clinicalIndications: [
          "Type 1, Type 2, or pre-diabetes management and glucometer training",
        ],
        preparationNotes: [
          "Bring your glucometer, logbook, or continuous glucose monitor reading history.",
        ],
      },
      {
        id: "chronic-disease-care",
        slug: "chronic-disease-care",
        categoryId: "cat_consultations",
        categoryName: "Consultations",
        name: "Chronic Care Consultation (Hypertension, Asthma, COPD)",
        shortName: "Chronic Care Consultation",
        durationMinutes: 20,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "Clinical Care",
        description:
          "Personalized disease monitoring, inhaler technique evaluation, blood pressure tracking, and action plan development.",
        clinicalIndications: [
          "High blood pressure monitoring, asthma inhaler spacer training, COPD care",
        ],
        preparationNotes: [
          "Bring your inhalers, spacers, or recent blood pressure logs.",
        ],
      },
      {
        id: "injection-administration-fee",
        slug: "injection-administration-fee",
        categoryId: "cat_consultations",
        categoryName: "Consultations",
        name: "Prescribed Injection Administration (Vitamin B12, Prolia, etc.)",
        shortName: "Prescribed Injection Service",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: false,
        coverageBadge: "Certified Administration",
        description:
          "Professional administration of physician-prescribed subcutaneous or intramuscular medications by a certified pharmacist.",
        clinicalIndications: [
          "Vitamin B12, denosumab (Prolia), methotrexate, testosterone, or biologic injections",
        ],
        preparationNotes: [
          "Bring your prescription medication vial and syringe if already dispensed.",
        ],
      },
    ],
  },
  {
    id: "cat_prescriptions",
    slug: "prescriptions",
    name: "Prescriptions",
    badge: "Fast & Convenient Dispensing",
    description:
      "Prescription transfers, refills, compliance packaging (MyHealthPack), and custom compounding.",
    services: [
      {
        id: "prescription-transfer-consult",
        slug: "prescription-transfer-consult",
        categoryId: "cat_prescriptions",
        categoryName: "Prescriptions",
        name: "Transfer Prescriptions from Another Pharmacy",
        shortName: "Prescription Transfer",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "Free Pharmacy Service",
        description:
          "We contact your former pharmacy and transfer all your active refills to iHealth Pharmacy Abbotsford seamlessly.",
        clinicalIndications: [
          "Moving care to iHealth Pharmacy Abbotsford with active prescriptions elsewhere",
        ],
        preparationNotes: [
          "Provide the name and phone number of your current pharmacy, or bring current medication bottles.",
        ],
      },
      {
        id: "refill-pickup-sync",
        slug: "refill-pickup-sync",
        categoryId: "cat_prescriptions",
        categoryName: "Prescriptions",
        name: "Prescription Refill Pickup & Synchronization",
        shortName: "Refill Pickup & Sync",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "Free Pharmacy Service",
        description:
          "Schedule a fast counter pickup for ready refills and synchronize future renewals onto a single monthly date.",
        clinicalIndications: [
          "Existing patients picking up prescriptions with pharmacist consultation",
        ],
        preparationNotes: [
          "Bring your BC Services Card.",
        ],
      },
      {
        id: "myhealthpack-blister-setup",
        slug: "myhealthpack-blister-setup",
        categoryId: "cat_prescriptions",
        categoryName: "Prescriptions",
        name: "MyHealthPack Compliance Blister Packaging Setup",
        shortName: "MyHealthPack Setup",
        durationMinutes: 20,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "Complimentary Service",
        description:
          "Consultation to organize your daily medications into custom pre-sealed morning, noon, evening, and bedtime blister cards.",
        clinicalIndications: [
          "Multiple daily medications, senior care, caregiver assistance, or complex regimens",
        ],
        preparationNotes: [
          "Bring all current medication boxes, bottles, and non-prescription vitamins.",
        ],
      },
      {
        id: "prescription-adaptation-renewal",
        slug: "prescription-adaptation-renewal",
        categoryId: "cat_prescriptions",
        categoryName: "Prescriptions",
        name: "Prescription Adaptation & Emergency Supply Renewal",
        shortName: "Emergency Refill & Adaptation",
        durationMinutes: 15,
        priceCents: 0,
        mspCovered: true,
        coverageBadge: "100% Covered by BC MSP",
        description:
          "Pharmacist assessment to renew an expired maintenance prescription or adapt dosage formulations to prevent therapy interruption.",
        clinicalIndications: [
          "Run out of refills for chronic stable conditions (e.g. blood pressure, thyroid)",
        ],
        preparationNotes: [
          "Bring your empty prescription bottle with the Rx number.",
        ],
      },
    ],
  },
];

export const ALL_BOOKING_SERVICES: BookingService[] = BOOKING_CATEGORIES.flatMap(
  (c) => c.services
);

export function getServiceByIdOrSlug(idOrSlug: string): BookingService | undefined {
  return ALL_BOOKING_SERVICES.find(
    (s) => s.id === idOrSlug || s.slug === idOrSlug
  );
}
