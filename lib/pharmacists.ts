import { SEED_PHARMACISTS, type Pharmacist } from "@/app/admin/lib/types";

export interface PrismaPharmacistLike {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string | null;
  licenseNumber?: string | null;
  active?: boolean;
  acceptsAppointments?: boolean;
  credentials?: string[];
  languages?: string[];
  yearsExperience?: number;
  displayOrder?: number;
}

export function mapPrismaToPharmacist(
  item: PrismaPharmacistLike,
  index = 0
): Pharmacist {
  const seed = SEED_PHARMACISTS.find(
    (s) =>
      s.id === item.id ||
      s.name.toLowerCase() === item.name.toLowerCase() ||
      (item.avatarUrl && s.photoUrl === item.avatarUrl)
  );

  return {
    id: item.id,
    name: item.name,
    role: item.title,
    bio: item.bio,
    photoUrl: item.avatarUrl || seed?.photoUrl || "/pharmacists/placeholder.jpg",
    credentials:
      Array.isArray(item.credentials) && item.credentials.length > 0
        ? item.credentials
        : seed?.credentials && seed.credentials.length > 0
        ? seed.credentials
        : ["BSc Pharm", "RPh"],
    languages:
      Array.isArray(item.languages) && item.languages.length > 0
        ? item.languages
        : seed?.languages && seed.languages.length > 0
        ? seed.languages
        : ["English"],
    yearsExperience:
      typeof item.yearsExperience === "number"
        ? item.yearsExperience
        : seed?.yearsExperience ?? 5,
    displayOrder:
      typeof item.displayOrder === "number"
        ? item.displayOrder
        : seed?.displayOrder ?? index + 1,
  };
}
