// Shared TypeScript types for the iHealth admin panel.
// All shapes are JSON-serializable so they can be persisted to localStorage
// and exported to disk.

export type UUID = string;

export type PostStatus = "draft" | "published" | "scheduled";

export type BlogLayoutVariant = "standard" | "editorial";

export type ThemeName =
  | "pharmacy-red"
  | "sage-care"
  | "ocean-calm"
  | "sunset-wellness"
  | "forest-pharmacy"
  | "lavender-trust"
  | "citrus-vitality"
  | "slate-professional"
  | "berry-warmth"
  | "midnight-modern";

export type FontPairingName =
  | "inter-tight"
  | "editorial-serif"
  | "geometric-humanist"
  | "medical-mono"
  | "friendly-sans"
  | "bold-display"
  | "clean-roboto"
  | "charcoal-grotesk"
  | "warm-manrope"
  | "classic-plus-jakarta";

export interface Pharmacist {
  id: UUID;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  credentials: string[];
  languages: string[];
  yearsExperience: number;
  displayOrder: number;
  directPhone?: string;
  directPhoneRaw?: string;
}

export interface BlogPost {
  id: UUID;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string; // ISO date
  tags: string[];
  imageUrl: string;
  status: PostStatus;
  themeUsed: ThemeName;
  readTimeMinutes: number;
  category: string;
  layoutVariant?: BlogLayoutVariant;
  keyTakeaways?: string[];
}

export type AnnouncementIcon =
  | "clock"
  | "syringe"
  | "truck"
  | "alert"
  | "megaphone"
  | "heart";

export interface AnnouncementItem {
  id: UUID;
  text: string;
  icon: AnnouncementIcon;
  enabled: boolean;
  urgent?: boolean;
  link?: string;
  displayOrder: number;
}

export const SEED_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-001",
    text: "Walk-in flu shots available — no appointment needed",
    icon: "syringe",
    enabled: true,
    urgent: false,
    displayOrder: 1,
  },
  {
    id: "ann-002",
    text: "Free prescription delivery anywhere in Chilliwack",
    icon: "truck",
    enabled: true,
    urgent: false,
    displayOrder: 2,
  },
  {
    id: "ann-003",
    text: "Open Mon–Fri 8:30am–5pm and Sat 9am–12pm",
    icon: "clock",
    enabled: true,
    urgent: false,
    displayOrder: 3,
  },
  {
    id: "ann-004",
    text: "Shingles and pneumonia vaccines now in stock — book online",
    icon: "alert",
    enabled: true,
    urgent: false,
    displayOrder: 4,
  },
];

export interface AuthSession {
  auth: true;
  ts: number;
}

export const SEED_PHARMACISTS: Pharmacist[] = [
  {
    id: "seed-pharm-001",
    name: "Dev Patel",
    role: "Primary Pharmacist & Pharmacy Manager",
    bio: "Dev became a Pharmacist because of his love and passion for medicine paired with the opportunity to make a direct impact in patient care. His mission is to improve an individual's quality of life by giving excellent personal care using the best of his knowledge and skills.",
    photoUrl: "/pharmacists/dev-patel.png",
    credentials: ["BSc Pharm", "RPh"],
    languages: ["English", "Gujarati", "Hindi"],
    yearsExperience: 10,
    displayOrder: 1,
    directPhone: "+1 (778) 714-2307",
    directPhoneRaw: "+17787142307",
  },
  {
    id: "seed-pharm-002",
    name: "Dr. Rutu Patel",
    role: "Primary Pharmacist & Owner",
    bio: "Rutu has been serving Chilliwack families for over 15 years. She specialises in geriatric care and medication reviews, and is passionate about making sure every patient feels heard.",
    photoUrl: "/pharmacists/anika.jpg",
    credentials: ["BSc Pharm", "RPh", "APA"],
    languages: ["English", "Punjabi", "Hindi"],
    yearsExperience: 15,
    displayOrder: 2,
  },
  {
    id: "seed-pharm-003",
    name: "Marcus Chen",
    role: "Clinical Pharmacist",
    bio: "Marcus focuses on minor ailment consultations and chronic disease management. He runs our travel vaccine clinic and is certified in injectable administration.",
    photoUrl: "/pharmacists/marcus.jpg",
    credentials: ["PharmD", "RPh", "CDE"],
    languages: ["English", "Mandarin", "Cantonese"],
    yearsExperience: 9,
    displayOrder: 3,
  },
  {
    id: "seed-pharm-004",
    name: "Priya Patel",
    role: "Compounding & MyHealthPack Lead",
    bio: "Priya runs our compounding lab and MyHealthPack compliance packaging service. She loves solving tricky prescription problems and helping caregivers manage complex regimens.",
    photoUrl: "/pharmacists/priya.jpg",
    credentials: ["BSc Pharm", "RPh"],
    languages: ["English", "Gujarati", "Hindi"],
    yearsExperience: 7,
    displayOrder: 4,
  },
  {
    id: "seed-pharm-005",
    name: "Daniel Okafor",
    role: "Community Pharmacist",
    bio: "Daniel is the friendly face at our front counter. He oversees prescription transfers, flu-shot clinics, and delivery logistics — and somehow remembers everyone's dog's name.",
    photoUrl: "/pharmacists/daniel.jpg",
    credentials: ["BSc Pharm", "RPh"],
    languages: ["English", "Yoruba", "French"],
    yearsExperience: 4,
    displayOrder: 5,
  },
];

export const THEMES: { value: ThemeName; label: string }[] = [
  { value: "pharmacy-red", label: "Pharmacy Red" },
  { value: "sage-care", label: "Sage Care" },
  { value: "ocean-calm", label: "Ocean Calm" },
  { value: "sunset-wellness", label: "Sunset Wellness" },
  { value: "forest-pharmacy", label: "Forest Pharmacy" },
  { value: "lavender-trust", label: "Lavender Trust" },
  { value: "citrus-vitality", label: "Citrus Vitality" },
  { value: "slate-professional", label: "Slate Professional" },
  { value: "berry-warmth", label: "Berry Warmth" },
  { value: "midnight-modern", label: "Midnight Modern" },
];

export const FONT_PAIRINGS: { value: FontPairingName; label: string }[] = [
  { value: "inter-tight", label: "Inter Tight" },
  { value: "editorial-serif", label: "Editorial Serif" },
  { value: "geometric-humanist", label: "Geometric Humanist" },
  { value: "medical-mono", label: "Medical Mono" },
  { value: "friendly-sans", label: "Friendly Sans" },
  { value: "bold-display", label: "Bold Display" },
  { value: "clean-roboto", label: "Clean Roboto" },
  { value: "charcoal-grotesk", label: "Charcoal Grotesk" },
  { value: "warm-manrope", label: "Warm Manrope" },
  { value: "classic-plus-jakarta", label: "Classic Plus Jakarta" },
];