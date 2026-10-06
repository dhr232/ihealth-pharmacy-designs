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
    text: "Store hours: Mon–Fri 8:30am–5pm, Sat 9am–12pm",
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
    role: "Licensed Pharmacist",
    bio: "Dev became a Pharmacist because of his love and passion for medicine paired with the opportunity to make a direct impact in patient care. His mission is to improve an individual's quality of life by giving excellent personal care using the best of his knowledge and skills.",
    photoUrl: "/pharmacists/dev-patel.png",
    credentials: ["BSc Pharm", "RPh"],
    languages: ["English", "Gujarati", "Hindi"],
    yearsExperience: 10,
    displayOrder: 1,
    directPhone: "+1 (778) 714-2307",
    directPhoneRaw: "+17787142307",
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