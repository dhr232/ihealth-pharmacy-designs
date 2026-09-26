"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Stethoscope,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Flame,
  Droplet,
  Eye,
  Wind,
  Smile,
  Sparkles,
  Zap,
  Bug,
  Target,
  Pill,
  Calendar,
  Activity,
  HeartPulse,
  CircleDot,
  Footprints,
  Brain,
  AlertTriangle,
  Info,
  CalendarCheck,
  MapPin,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";
import { useBookingUrl } from "@/lib/use-booking-url";
import { getConditionIconPath } from "@/data/condition-registry";

interface ConditionItem {
  id: string;
  name: string;
  category: "digestive" | "ent" | "skin" | "urinary" | "other";
  categoryTitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge: string;
  duration: string;
  desc: string;
  symptoms: string[];
  preparation: string[];
  slug: string;
  urgent?: boolean;
}

const CONDITIONS_DATA: ConditionItem[] = [
  // 1. Digestive Conditions
  {
    id: "hemorrhoids",
    name: "Hemorrhoids",
    category: "digestive",
    categoryTitle: "Digestive Conditions",
    icon: Droplet,
    iconBg: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-600",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Confidential clinical evaluation and prescription of topical hydrocortisone, astringents, or anti-inflammatory suppositories.",
    symptoms: [
      "Perianal itching, irritation, or localized swelling",
      "Discomfort or burning during and after bowel movements",
      "Sensitive external tissue or swelling around anal opening",
      "No heavy bleeding, unexplained weight loss, or high fever",
    ],
    preparation: [
      "Bring your BC Services Card (Personal Health Number / PHN).",
      "Be prepared to describe symptom duration and any over-the-counter creams tried.",
    ],
    slug: "hemorrhoids",
  },
  {
    id: "heartburn",
    name: "Heartburn & Acid Reflux (GERD)",
    category: "digestive",
    categoryTitle: "Digestive Conditions",
    icon: Flame,
    iconBg: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Assessment of persistent acid reflux, indigestion, and prescribing of proton pump inhibitors (e.g. Omeprazole, Pantoprazole) or H2 blockers.",
    symptoms: [
      "Burning retrosternal chest sensation after eating or when lying flat",
      "Acid regurgitation, sour taste, or throat irritation",
      "Over-the-counter antacid chewables provide only temporary relief",
      "No difficulty swallowing, unexplained weight loss, or radiating arm pain",
    ],
    preparation: [
      "Note specific trigger foods and whether symptoms awaken you at night.",
      "List any prior acid reflux prescriptions or antacid medications used.",
    ],
    slug: "gerd-acid-reflux",
  },
  {
    id: "pinworms",
    name: "Pinworms and Threadworms",
    category: "digestive",
    categoryTitle: "Digestive Conditions",
    icon: Bug,
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Treatment plan and anthelmintic prescription dosing (e.g. Pyrantel pamoate, Mebendazole) for the patient and household contacts.",
    symptoms: [
      "Intense anal itching, especially prominent at night or during sleep",
      "Restless sleep and irritability in children",
      "Visible small, thread-like white worms in underwear or stool",
      "Suspected exposure from school, daycare, or household members",
    ],
    preparation: [
      "Our pharmacist will calculate dosing for all household members.",
      "Guidance on bedding washing and hygiene measures provided on-site.",
    ],
    slug: "pinworms-and-threadworms",
  },

  // 2. Eyes, Ears, Nose, or Mouth
  {
    id: "canker-sores",
    name: "Canker Sores (Aphthous Ulcers)",
    category: "ent",
    categoryTitle: "Eyes, Ears, Nose, or Mouth",
    icon: Smile,
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-600",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Evaluation of non-contagious oral ulcers with prescription topical anti-inflammatory pastes (e.g. Triamcinolone) and soothing oral rinses.",
    symptoms: [
      "Small, round, painful ulcer with white/yellow center and red border inside mouth",
      "Located on inside of cheeks, lips, tongue, or base of gums",
      "Sharp pain when eating salty, spicy, or acidic foods",
      "Not located on outside of lips (canker sores are non-viral)",
    ],
    preparation: [
      "Avoid eating or drinking 15 minutes before oral inspection.",
      "Note frequency of recurrent mouth sores.",
    ],
    slug: "aphthous-ulcers-canker-sores",
  },
  {
    id: "cold-sores",
    name: "Cold Sores (Herpes Labialis)",
    category: "ent",
    categoryTitle: "Eyes, Ears, Nose, or Mouth",
    icon: Sparkles,
    iconBg: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-600",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Prompt oral antiviral assessment and prescribing (e.g. Valacyclovir) to halt viral replication and accelerate blister resolution.",
    symptoms: [
      "Tingling, burning, or itchiness around the outer lip border",
      "Cluster of small fluid-filled vesicles forming on or near lips",
      "Recurrent history of cold sore outbreaks",
      "Most effective when initiated within 24 to 48 hours of initial tingle",
    ],
    preparation: [
      "Seek assessment as soon as you notice early tingling or redness.",
      "Inform the pharmacist if you are pregnant or have kidney conditions.",
    ],
    slug: "herpes-labialis-cold-sores",
  },
  {
    id: "oral-thrush",
    name: "Oral Thrush (Candidiasis)",
    category: "ent",
    categoryTitle: "Eyes, Ears, Nose, or Mouth",
    icon: CircleDot,
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-600",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Assessment of oral fungal overgrowth and prescribing of antifungal oral suspensions (e.g. Nystatin) or oral lozenges.",
    symptoms: [
      "Creamy white patches on tongue, inner cheeks, or roof of mouth",
      "Cottage cheese-like appearance that may bleed slightly when scraped",
      "Loss of taste or cotton-like feeling in mouth",
      "Often occurs following inhaled corticosteroid or antibiotic use",
    ],
    preparation: [
      "Rinse mouth with water prior to arrival.",
      "Bring any inhalers or spacer devices you currently use.",
    ],
    slug: "oral-fungal-infection-thrush",
  },
  {
    id: "allergies",
    name: "Allergies & Hay Fever (Allergic Rhinitis)",
    category: "ent",
    categoryTitle: "Eyes, Ears, Nose, or Mouth",
    icon: Wind,
    iconBg: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Comprehensive assessment of seasonal or environmental triggers with prescription steroid nasal sprays and non-drowsy antihistamines.",
    symptoms: [
      "Repetitive sneezing, clear runny nose, or persistent nasal congestion",
      "Itchy, red, watery eyes and itchy palate or throat",
      "Triggered by tree, grass, or ragweed pollen, dust mites, or pets",
      "No purulent yellow/green sinus discharge or high fever",
    ],
    preparation: [
      "List previous over-the-counter allergy medications tried.",
      "Note whether symptoms are seasonal or year-round.",
    ],
    slug: "allergic-rhinitis",
  },
  {
    id: "pink-eye",
    name: "Pink Eye or Eye Allergies (Conjunctivitis)",
    category: "ent",
    categoryTitle: "Eyes, Ears, Nose, or Mouth",
    icon: Eye,
    iconBg: "bg-cyan-50 border-cyan-100",
    iconColor: "text-cyan-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Differentiation between bacterial, viral, and allergic conjunctivitis with prescription antibacterial or antihistamine eye drops.",
    symptoms: [
      "Redness or pink discoloration in the sclera (white of eye)",
      "Sticky yellow/green discharge or eyelids crusted shut upon waking",
      "Gritty sensation or itchy burning feeling",
      "No severe eye pain, changes in visual acuity, or sensitivity to light",
    ],
    preparation: [
      "Do not wear contact lenses to your assessment.",
      "Cleanse crusting gently with a warm, damp cloth prior to examination.",
    ],
    slug: "conjunctivitis-pink-eye",
  },

  // 3. Skin Conditions
  {
    id: "jock-itch",
    name: "Jock Itch (Tinea Cruris)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: Activity,
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Targeted assessment of groin fungal dermatophyte infections and prescribing of prescription topical antifungal therapies.",
    symptoms: [
      "Red, raised, scaly rash in the groin crease and upper thighs",
      "Intense itching, chafing, or burning sensation",
      "Sharp border that spreads outwards with normal central skin",
      "Scrotum typically spared (differentiates from candidiasis)",
    ],
    preparation: [
      "Wear loose-fitting, comfortable cotton clothing.",
      "Ensure skin is clean and free of heavy ointments prior to check.",
    ],
    slug: "jock-itch-tinea-cruris",
  },
  {
    id: "athletes-foot",
    name: "Athlete's Foot (Tinea Pedis)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: Footprints,
    iconBg: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Evaluation of fungal foot infections with prescription topical antifungals (e.g. Terbinafine, Clotrimazole) and preventative foot hygiene advice.",
    symptoms: [
      "Peeling, macerated, white, or cracked skin between the toes",
      "Intense itching and stinging, especially immediately after removing socks",
      "Dry, moccasin-type scaling on the soles and sides of the feet",
      "Possible co-occurring fungal nail involvement",
    ],
    preparation: [
      "Wear easily removable footwear and clean socks.",
      "Avoid applying powders or lotions on the morning of your visit.",
    ],
    slug: "athletes-foot-tinea-pedis",
  },
  {
    id: "dandruff",
    name: "Dandruff & Seborrheic Dermatitis",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: Sparkles,
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Clinical scalp and facial assessment with prescription antifungal shampoos (e.g. Ketoconazole 2%) and topical anti-inflammatories.",
    symptoms: [
      "Persistent white or greasy yellow flakes on scalp, eyebrows, or ears",
      "Itchy, red, inflamed skin on the scalp or around nasal folds",
      "Drugstore anti-dandruff shampoos failing to control flakes",
      "Flareups worsening during cold, dry weather or periods of stress",
    ],
    preparation: [
      "Avoid washing hair on the morning of assessment so scaling is visible.",
      "Note any medicated hair products you have previously used.",
    ],
    slug: "seborrheic-dermatitis",
  },
  {
    id: "dermatitis",
    name: "Skin Irritations (Dermatitis & Eczema)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: ShieldCheck,
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Assessment of itchy, dry skin flareups and prescribing of potent topical corticosteroids and barrier repair emollients.",
    symptoms: [
      "Dry, red, highly itchy skin patches on hands, elbows, knees, or neck",
      "Contact dermatitis following exposure to detergents, nickel, or cosmetics",
      "Thickened or cracked skin from repetitive scratching",
      "No weeping golden crusts (which could indicate bacterial infection)",
    ],
    preparation: [
      "Bring or write down names of laundry detergents or skin products used.",
      "Do not apply heavy topical cortisone right before appointment.",
    ],
    slug: "atopic-dermatitis-eczema",
  },
  {
    id: "nail-fungus",
    name: "Nail Fungus (Onychomycosis)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: Target,
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Assessment of fungal nail discoloration and thickness with prescription topical antifungal lacquers (e.g. Ciclopirox, Efinaconazole).",
    symptoms: [
      "Thickened, brittle, crumbly, or ragged toenails or fingernails",
      "Yellow, brown, or white discoloration under nail plate",
      "Nail lifting away from nail bed with debris underneath",
      "History of recurring athlete's foot",
    ],
    preparation: [
      "Remove all nail polish, gels, or acrylics before your appointment.",
      "Wash and dry feet thoroughly.",
    ],
    slug: "onychomycosis-nail-fungus",
  },
  {
    id: "shingles",
    name: "Shingles Treatment (Herpes Zoster)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: AlertTriangle,
    iconBg: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-600",
    badge: "Pharmacist Assessment",
    duration: "20 min",
    urgent: true,
    desc: "Urgent evaluation of localized burning nerve rash and immediate prescription of oral antivirals (e.g. Valacyclovir) within the crucial 72-hour window.",
    symptoms: [
      "Painful, burning, tingling band of skin on one side of torso, face, or neck",
      "Cluster of fluid-filled red vesicles that follow a specific nerve path",
      "Hypersensitivity to touch or clothing contact",
      "Urgent: Antiviral therapy must start within 72 hours of rash onset",
    ],
    preparation: [
      "Seek walk-in assessment immediately upon noticing rash or blister cluster.",
      "Wear loose clothing over the affected dermatome area.",
    ],
    slug: "shingles-herpes-zoster",
  },
  {
    id: "acne",
    name: "Acne (Mild to Moderate)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: Sparkles,
    iconBg: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Skin type evaluation and tailored topical prescription regimens including topical retinoids (Tretinoin, Adapalene), benzoyl peroxide, and clindamycin.",
    symptoms: [
      "Blackheads, whiteheads, and small inflammatory red pimples on face or back",
      "Breakouts failing to respond to standard over-the-counter washes",
      "Oily skin with clogged pore congestion",
      "No deep, painful, cystic nodule formations (requires dermatologist referral)",
    ],
    preparation: [
      "Arrive with clean facial skin free of heavy foundation or makeup.",
      "List skincare products and cleansers currently in your daily routine.",
    ],
    slug: "mild-acne",
  },
  {
    id: "diaper-rash",
    name: "Diaper Rash (Dermatitis)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: ShieldCheck,
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Assessment of infant and toddler diaper area inflammation with prescription barrier therapies, mild hydrocortisone, or topical antifungals.",
    symptoms: [
      "Red, irritated, warm skin confined to diaper contact zone",
      "Discomfort during diaper changes and urination",
      "Satellite red bumps indicating possible secondary Candida overgrowth",
      "No open ulcerations, bleeding, or high fever",
    ],
    preparation: [
      "Bring child with a fresh, clean diaper.",
      "Note brand of diapers and wipes currently used.",
    ],
    slug: "diaper-dermatitis",
  },
  {
    id: "insect-bites",
    name: "Insect Bites and Hives (Urticaria)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: Bug,
    iconBg: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-600",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Clinical triage of swollen bug bites, localized reactions, and acute hives with prescription antihistamines and potent topical anti-itch creams.",
    symptoms: [
      "Swollen, itchy, erythematous welts from mosquito, spider, or bee stings",
      "Sudden widespread itchy hives without throat swelling or breathing issues",
      "Intense localized pruritus interfering with rest or sleep",
      "No facial swelling, tongue numbness, or wheezing (emergency care required)",
    ],
    preparation: [
      "Note approximate time and geographic location of bite.",
      "Inform the pharmacist of any known bee sting allergies.",
    ],
    slug: "insect-bites-urticaria-hives",
  },
  {
    id: "impetigo",
    name: "Skin Infections (Impetigo)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: Activity,
    iconBg: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Examination of superficial bacterial skin lesions and prescribing of targeted prescription topical antibiotic ointments (e.g. Mupirocin).",
    symptoms: [
      "Red sores that quickly rupture, ooze for a few days, then form honey-coloured crusts",
      "Commonly clustered around the nose, mouth, hands, and forearms",
      "Mild itchiness without significant deep skin pain",
      "No spreading red streaks, cellulitis, or high fever",
    ],
    preparation: [
      "Keep affected lesions covered with a light, clean bandage before visit.",
      "Avoid picking or scratching crusted lesions.",
    ],
    slug: "impetigo",
  },
  {
    id: "ringworm",
    name: "Ringworm (Tinea Corporis)",
    category: "skin",
    categoryTitle: "Skin Conditions",
    icon: Target,
    iconBg: "bg-red-50 border-red-100",
    iconColor: "text-red-600",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Inspection of circular fungal rash and prescribing of prescription topical antifungals (e.g. Terbinafine, Ciclopirox).",
    symptoms: [
      "Circular or ring-shaped red rash with raised, scaly edges",
      "Clear or less red skin in the center of the ring",
      "Gradually expanding ring with mild to moderate itching",
      "Possible transmission from pets (cats, dogs) or athletic equipment",
    ],
    preparation: [
      "Note if household pets or family members have similar skin patches.",
      "Wear loose, breathable clothing over the lesion.",
    ],
    slug: "ringworm-tinea-corporis",
  },

  // 4. Urinary and Reproductive Conditions
  {
    id: "uti",
    name: "Urinary Tract Infection (UTI)",
    category: "urinary",
    categoryTitle: "Urinary and Reproductive Conditions",
    icon: Droplet,
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Clinical evaluation of lower urinary symptoms and prescribing of appropriate first-line antibiotics (e.g. Nitrofurantoin) for uncomplicated cystitis.",
    symptoms: [
      "Burning sensation or sharp pain during urination (dysuria)",
      "Frequent, urgent need to urinate with small volume output",
      "Aching lower abdominal or pelvic pressure",
      "No fever, chills, flank pain, nausea, or suspected pregnancy",
    ],
    preparation: [
      "Bring your BC Services Card (Personal Health Number / PHN).",
      "A fresh urine sample may be collected on-site for rapid dipstick screening.",
    ],
    slug: "uncomplicated-urinary-tract-infection",
  },
  {
    id: "yeast-infection",
    name: "Vaginal Yeast Infection",
    category: "urinary",
    categoryTitle: "Urinary and Reproductive Conditions",
    icon: HeartPulse,
    iconBg: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Confidential assessment of uncomplicated vulvovaginal candidiasis and prescribing of single-dose oral Fluconazole or antifungal ovules.",
    symptoms: [
      "Vulvovaginal itching, burning, and soreness",
      "Thick, white, odorless vaginal discharge resembling cottage cheese",
      "Mild stinging during urination or sexual intercourse",
      "History of prior professionally diagnosed yeast infection",
    ],
    preparation: [
      "Consultation takes place in our private clinical consultation room.",
      "Inform the pharmacist if you are currently pregnant or nursing.",
    ],
    slug: "vaginal-candidiasis-yeast-infection",
  },
  {
    id: "menstrual-cramps",
    name: "Menstrual (Period) Cramps (Dysmenorrhea)",
    category: "urinary",
    categoryTitle: "Urinary and Reproductive Conditions",
    icon: Activity,
    iconBg: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Assessment of primary dysmenorrhea and prescribing of high-potency prescription NSAIDs or hormonal cycle management.",
    symptoms: [
      "Severe cramping or throbbing pain in lower abdomen and pelvis",
      "Pain beginning 1 to 2 days before or at the start of menstruation",
      "Lower back discomfort, headache, or mild nausea during menses",
      "Standard over-the-counter pain medications providing inadequate relief",
    ],
    preparation: [
      "Note the first day of your last menstrual period.",
      "List pain relievers currently used and their dosages.",
    ],
    slug: "dysmenorrhea-menstrual-cramps",
  },
  {
    id: "birth-control",
    name: "Birth Control & Contraception",
    category: "urinary",
    categoryTitle: "Urinary and Reproductive Conditions",
    icon: CalendarCheck,
    iconBg: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-700",
    badge: "100% PharmaCare Covered",
    duration: "15 min",
    desc: "Initiation, renewal, and switching of oral contraceptive pills, contraceptive patch, vaginal ring, or Depo-Provera injection.",
    symptoms: [
      "Starting a new hormonal birth control method",
      "Renewing or adjusting current contraceptive prescription",
      "Experiencing unwanted side effects (spotting, nausea) and wanting to switch",
      "Prescription contraceptives are 100% covered for all BC residents with MSP",
    ],
    preparation: [
      "Bring your BC Services Card.",
      "Our pharmacist will check your blood pressure on-site during your visit.",
    ],
    slug: "contraception-management",
  },
  {
    id: "emergency-contraception",
    name: "Emergency Contraception (Morning-After Pill)",
    category: "urinary",
    categoryTitle: "Urinary and Reproductive Conditions",
    icon: Pill,
    iconBg: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-700",
    badge: "Pharmacist Prescribed",
    duration: "15 min",
    desc: "Immediate, non-judgmental private consultation and dispensing of emergency oral contraception (Plan B / Ella) following unprotected intercourse.",
    symptoms: [
      "Unprotected intercourse or barrier contraception failure (broken condom)",
      "Missed consecutive birth control pills",
      "Most effective when taken within 72 hours (Plan B) or up to 120 hours (Ella)",
      "Available walk-in with zero advance appointment necessary",
    ],
    preparation: [
      "Walk directly into our dispensary or call for immediate priority access.",
      "Private consultation room guarantees complete discretion.",
    ],
    slug: "emergency-contraception",
  },

  // 5. Other Conditions
  {
    id: "headache",
    name: "Headache (Mild to Moderate)",
    category: "other",
    categoryTitle: "Other Conditions",
    icon: Brain,
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Triage and clinical evaluation of tension-type headaches or mild migraine with targeted prescription therapies.",
    symptoms: [
      "Dull, aching head pain or tight band-like sensation across forehead",
      "Mild migraine headache with sensitivity to light or sound",
      "Headache triggered by stress, screen fatigue, or poor sleep",
      "No sudden 'thunderclap' onset, neurological deficits, or neck stiffness",
    ],
    preparation: [
      "Note frequency and duration of typical headache episodes.",
      "List medications you currently take when a headache begins.",
    ],
    slug: "headache-assessment",
  },
  {
    id: "muscle-strains",
    name: "Muscle Strains or Sprains",
    category: "other",
    categoryTitle: "Other Conditions",
    icon: Activity,
    iconBg: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-700",
    badge: "Pharmacist Assessment",
    duration: "15 min",
    desc: "Assessment of acute minor athletic or lifting injuries with prescription topical anti-inflammatories (e.g. Diclofenac gel) and joint recovery guidance.",
    symptoms: [
      "Pain, tenderness, and localized swelling following activity or lifting",
      "Mild ligament sprain (ankle, wrist) or muscle strain (back, hamstring)",
      "Retained ability to bear weight and move joint through normal range",
      "No visible bone deformity, severe bruising, or joint instability",
    ],
    preparation: [
      "Wear loose clothing that allows easy inspection of the affected joint.",
      "Inform the pharmacist if you take blood thinners or oral NSAIDs.",
    ],
    slug: "musculoskeletal-sprains-strains",
  },
  {
    id: "smoking-cessation",
    name: "Smoking Cessation (BC Smoking Program)",
    category: "other",
    categoryTitle: "Other Conditions",
    icon: HeartPulse,
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-700",
    badge: "100% Free Under PharmaCare",
    duration: "20 min",
    desc: "Enrolment in the BC Smoking Cessation Program with a 100% free 12-week supply of nicotine patches, gum, lozenges, or prescription oral medications.",
    symptoms: [
      "Desire to quit or reduce smoking tobacco or commercial vaping products",
      "Active BC resident with valid Personal Health Number (PHN)",
      "Eligible for 12 continuous weeks of 100% free nicotine replacement therapy per year",
      "One-on-one personalized craving coaching from our pharmacist",
    ],
    preparation: [
      "Bring your BC Services Card.",
      "Think about your target quit date and past quit attempts.",
    ],
    slug: "nicotine-dependence-smoking-cessation",
  },
];

export default function MinorAilmentsPage() {
  const [selectedConditionId, setSelectedConditionId] = useState<string>("uti");
  // Categories start collapsed except the one holding the default selection
  const [openCategories, setOpenCategories] = useState<string[]>(["urinary"]);
  const prefersReducedMotion = useReducedMotion();

  const selectedCondition =
    CONDITIONS_DATA.find((c) => c.id === selectedConditionId) || CONDITIONS_DATA[0];
  const bookingUrl = useBookingUrl(`?service=${selectedCondition.slug}`);

  const toggleCategory = (key: string) => {
    setOpenCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Group conditions by category
  const categories = [
    { key: "digestive", title: "Digestive Conditions" },
    { key: "ent", title: "Eyes, Ears, Nose, or Mouth" },
    { key: "skin", title: "Skin Conditions" },
    { key: "urinary", title: "Urinary and Reproductive Conditions" },
    { key: "other", title: "Other Conditions" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Header />

      <main className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/services" className="hover:text-blue-600 transition">
              Clinical Services
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-slate-900">Minor Ailments Clinic</span>
          </nav>

          {/* Hero Header Section */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm mb-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                  Walk-In Prescribing Clinic
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Minor Ailments and Conditions
                </h1>
                <p className="text-base text-slate-600 leading-relaxed">
                  Our licensed pharmacists in Chilliwack are certified to assess your symptoms and prescribe prescription medications directly on-site for {CONDITIONS_DATA.length} common conditions — with zero walk-in clinic wait times.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg">
                    <ShieldCheck className="h-4 w-4 text-teal-600" />
                    Covered 100% Under BC MSP
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Walk-Ins Welcome &bull; {PHARMACY_INFO.hoursShort}
                  </span>
                </div>
              </div>

              {/* Consultation Clinic Photo Card */}
              <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm aspect-4/3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/services/minor-ailments.jpg"
                  alt="Pharmacist consulting patient for minor ailments"
                  className="h-full w-full object-cover"
                />
              </div>

            </div>

            {/* Official BC Government Self-Assessment Callout Banner (From User Reference Image) */}
            <div className="mt-8 rounded-2xl border-2 border-blue-600/40 bg-blue-50/70 p-5 sm:p-6 transition hover:border-blue-600">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      Not sure if your condition qualifies for a pharmacist prescription?
                    </div>
                    <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
                      Complete the official BC Government HealthLinkBC checklist to verify your eligibility before visiting.
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.healthlinkbc.ca/find-care/pharmacy-services-bc#Self-assessment%20checklist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 shrink-0"
                >
                  <span>HealthLinkBC Self-Assessment</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Prescription Action Bar */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/90 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-700">
              <span className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Need to fill an existing doctor prescription or order a refill? Skip the wait with online submission.</span>
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/new-prescription"
                  className="font-bold text-blue-700 hover:text-blue-800 hover:underline"
                >
                  Submit New Prescription &rarr;
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  href="/prescription-refills"
                  className="font-bold text-slate-600 hover:text-blue-700 hover:underline"
                >
                  Refill Rx &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Main 2-Column Section (Option 2 Layout with Small Icons & Sticky Inspector) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Categorized Condition Directory with Small Icons */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Select a Condition to View Details
                </h2>
                <span className="text-xs text-slate-500">
                  {CONDITIONS_DATA.length} Prescribable Conditions
                </span>
              </div>

              {categories.map((cat) => {
                const itemsInCat = CONDITIONS_DATA.filter((c) => c.category === cat.key);
                if (itemsInCat.length === 0) return null;

                const isOpen = openCategories.includes(cat.key);
                const selectedInCat = itemsInCat.find((c) => c.id === selectedConditionId);
                const panelId = `category-panel-${cat.key}`;

                return (
                  <div
                    key={cat.key}
                    className={`rounded-2xl border bg-white shadow-xs transition-colors ${
                      isOpen ? "border-slate-300" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat.key)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
                      >
                        <span className="min-w-0">
                          <span className="block font-extrabold text-sm text-slate-900 tracking-tight">
                            {cat.title}
                          </span>
                          {!isOpen && selectedInCat && (
                            <span className="mt-0.5 block truncate text-xs font-semibold text-blue-700">
                              Selected: {selectedInCat.name}
                            </span>
                          )}
                        </span>
                        <span className="flex shrink-0 items-center gap-3">
                          <span className="text-xs text-slate-400 font-medium">
                            {itemsInCat.length} conditions
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-slate-100 px-5 pb-5 pt-3">
                      {itemsInCat.map((item) => {
                        const isSelected = selectedConditionId === item.id;
                        const ItemIcon = item.icon;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedConditionId(item.id)}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all min-h-[58px] cursor-pointer ${
                              isSelected
                                ? "border-blue-600 bg-blue-50/90 text-blue-950 font-bold ring-2 ring-blue-600/20 shadow-xs"
                                : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50/60"
                            }`}
                          >
                            {/* Exact BookMyPharmacy icon */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 p-1">
                              <img
                                src={getConditionIconPath(item.slug || item.id)}
                                alt=""
                                width={32}
                                height={32}
                                className="h-7 w-7 object-contain drop-shadow-2xs"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold leading-snug truncate">
                                {item.name}
                              </div>
                              {item.urgent && (
                                <span className="inline-block mt-0.5 rounded px-1.5 py-0.2 bg-rose-100 text-rose-800 text-[9px] font-extrabold uppercase">
                                  Urgent (72h)
                                </span>
                              )}
                            </div>

                            {isSelected && (
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Clinical Inspector Card (The Client-Favorite Format) */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="rounded-3xl border-2 border-blue-600 bg-white p-6 sm:p-7 shadow-xl space-y-5">
                
                {/* Header with Condition Icon */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 p-2 shadow-xs">
                    <img
                      src={getConditionIconPath(selectedCondition.slug || selectedCondition.id)}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain drop-shadow-2xs"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800">
                        {selectedCondition.badge}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {selectedCondition.duration}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-lg font-extrabold text-slate-900 leading-snug">
                      {selectedCondition.name}
                    </h3>
                  </div>
                </div>

                {/* Clinical Assessment Scope */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedCondition.desc}
                </p>

                {/* Covered Symptoms Block with Blue Shield Checkmarks */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
                    COVERED SYMPTOMS:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedCondition.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation & What to bring */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    WHAT TO BRING:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {selectedCondition.preparation.map((prep, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons with Fade-to-Light Gradient */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    href={bookingUrl}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-200"
                  >
                    <span>Book Appointment for This Condition</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={`tel:${PHARMACY_INFO.phoneClean}`}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 transition"
                  >
                    <Phone className="h-3.5 w-3.5 text-blue-600" />
                    <span>Walk-In Inquiries: Call {PHARMACY_INFO.phone}</span>
                  </a>
                </div>

              </div>

              {/* BC Eligibility Helper Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Chilliwack Community Dispensary
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  #101 - 45619 Yale Rd, Chilliwack, BC V2P 2N1<br />
                  <strong>Hours:</strong> {PHARMACY_INFO.hoursSummary}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
