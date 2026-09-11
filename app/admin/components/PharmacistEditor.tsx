"use client";

import { useMemo, useState } from "react";
import { ImageIcon, Upload, Sparkles, Check, RefreshCw } from "lucide-react";
import type { Pharmacist } from "../lib/types";
import { slugify, uuid } from "../lib/storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";

const MAX_IMAGE_BYTES = 800 * 1024;

export const TEAM_STOCK_PRESETS = [
  { name: "Dr. Anika", url: "/pharmacists/anika.jpg" },
  { name: "Marcus", url: "/pharmacists/marcus.jpg" },
  { name: "Priya", url: "/pharmacists/priya.jpg" },
  { name: "Daniel", url: "/pharmacists/daniel.jpg" },
  { name: "Placeholder", url: "/pharmacists/placeholder.jpg" },
];

export function generateInitialsAvatar(
  firstName: string,
  lastName: string,
  variant: "red" | "navy" | "teal" = "red"
): string {
  const f = (firstName || "").replace(/^(dr\.?|mr\.?|ms\.?|mrs\.?)\s+/i, "").trim();
  const l = (lastName || "").trim();
  let initials = "";
  if (f && l) {
    initials = (f[0] + l[0]).toUpperCase();
  } else if (f) {
    initials = f.slice(0, 2).toUpperCase();
  } else if (l) {
    initials = l.slice(0, 2).toUpperCase();
  } else {
    initials = "IH";
  }

  const themes = {
    red: {
      bg1: "#C01D16",
      bg2: "#8A100B",
      accent: "#ffffff",
      ring: "rgba(255,255,255,0.25)",
      badgeBg: "#ffffff",
      badgeIcon: "#C01D16",
    },
    navy: {
      bg1: "#1e293b",
      bg2: "#0f172a",
      accent: "#ffffff",
      ring: "rgba(255,255,255,0.2)",
      badgeBg: "#38bdf8",
      badgeIcon: "#0f172a",
    },
    teal: {
      bg1: "#0d9488",
      bg2: "#115e59",
      accent: "#ffffff",
      ring: "rgba(255,255,255,0.2)",
      badgeBg: "#ffffff",
      badgeIcon: "#0d9488",
    },
  };

  const t = themes[variant] || themes.red;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="g_${variant}_${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.bg1}" />
      <stop offset="100%" stop-color="${t.bg2}" />
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="128" fill="url(#g_${variant}_${initials})" />
  <circle cx="128" cy="128" r="116" fill="none" stroke="${t.ring}" stroke-width="4" />
  <text x="128" y="136" text-anchor="middle" dominant-baseline="central" fill="${t.accent}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="88" font-weight="700" letter-spacing="2">${initials}</text>
  <g transform="translate(170, 170)">
    <circle cx="28" cy="28" r="24" fill="${t.badgeBg}" stroke="${t.bg2}" stroke-width="2" />
    <rect x="25" y="15" width="6" height="26" rx="2" fill="${t.badgeIcon}" />
    <rect x="15" y="25" width="26" height="6" rx="2" fill="${t.badgeIcon}" />
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function parseName(fullName: string): { prefix: string; firstName: string; lastName: string } {
  let name = (fullName || "").trim();
  let prefix = "";
  if (/^dr\.?\s+/i.test(name)) {
    prefix = "Dr.";
    name = name.replace(/^dr\.?\s+/i, "").trim();
  }
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { prefix, firstName: "", lastName: "" };
  }
  if (parts.length === 1) {
    return { prefix, firstName: parts[0], lastName: "" };
  }
  return {
    prefix,
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function formatFullName(prefix: string, firstName: string, lastName: string): string {
  return [prefix, firstName, lastName].filter(Boolean).join(" ").trim();
}

function emptyPharmacist(displayOrder: number): Pharmacist {
  return {
    id: uuid(),
    name: "",
    role: "",
    bio: "",
    photoUrl: "/pharmacists/placeholder.jpg",
    credentials: [],
    languages: [],
    yearsExperience: 0,
    displayOrder,
  };
}

function toTextList(arr: string[]): string {
  return arr.join(", ");
}

function buildDraft(initial: Pharmacist | null, nextOrder: number): Pharmacist {
  return initial ?? emptyPharmacist(nextOrder);
}

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function PharmacistEditor({
  open,
  initial,
  nextOrder,
  onClose,
  onSave,
  onError,
}: {
  open: boolean;
  initial: Pharmacist | null;
  nextOrder: number;
  onClose: () => void;
  onSave: (next: Pharmacist) => void;
  onError: (message: string) => void;
}) {
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevId, setPrevId] = useState<string | null>(initial?.id ?? null);

  const initialDraft = useMemo(() => {
    const d = buildDraft(initial, nextOrder);
    if (!initial && (!d.photoUrl || d.photoUrl === "/pharmacists/placeholder.jpg")) {
      d.photoUrl = generateInitialsAvatar("", "", "red");
    }
    return d;
  }, [initial, nextOrder]);

  const [draft, setDraft] = useState<Pharmacist>(initialDraft);

  const parsedInitial = useMemo(() => parseName(initialDraft.name), [initialDraft.name]);
  const [firstName, setFirstName] = useState(parsedInitial.firstName);
  const [lastName, setLastName] = useState(parsedInitial.lastName);
  const [prefix, setPrefix] = useState(parsedInitial.prefix);

  const [credentialsText, setCredentialsText] = useState(() =>
    toTextList(initialDraft.credentials)
  );
  const [languagesText, setLanguagesText] = useState(() =>
    toTextList(initialDraft.languages)
  );

  const currentId = initial?.id ?? null;

  // Re-seed when dialog opens or when switching records
  if (open !== prevOpen || (open && currentId !== prevId)) {
    setPrevOpen(open);
    setPrevId(currentId);
    const seed = buildDraft(initial, nextOrder);
    const parsed = parseName(seed.name);
    setFirstName(parsed.firstName);
    setLastName(parsed.lastName);
    setPrefix(parsed.prefix);

    if (!initial && (!seed.photoUrl || seed.photoUrl === "/pharmacists/placeholder.jpg")) {
      seed.photoUrl = generateInitialsAvatar(parsed.firstName, parsed.lastName, "red");
    }

    setDraft(seed);
    setCredentialsText(toTextList(seed.credentials));
    setLanguagesText(toTextList(seed.languages));
  }

  function update<K extends keyof Pharmacist>(key: K, value: Pharmacist[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleNameChange(newFirst: string, newLast: string, newPrefix: string) {
    setFirstName(newFirst);
    setLastName(newLast);
    setPrefix(newPrefix);

    const fullName = formatFullName(newPrefix, newFirst, newLast);
    const newRedAvatar = generateInitialsAvatar(newFirst, newLast, "red");

    setDraft((d) => {
      const isAutoOrPlaceholder =
        !d.photoUrl ||
        d.photoUrl === "/pharmacists/placeholder.jpg" ||
        d.photoUrl.startsWith("data:image/svg+xml");

      return {
        ...d,
        name: fullName,
        photoUrl: isAutoOrPlaceholder ? newRedAvatar : d.photoUrl,
      };
    });
  }

  const redAvatar = useMemo(
    () => generateInitialsAvatar(firstName, lastName, "red"),
    [firstName, lastName]
  );
  const navyAvatar = useMemo(
    () => generateInitialsAvatar(firstName, lastName, "navy"),
    [firstName, lastName]
  );
  const tealAvatar = useMemo(
    () => generateInitialsAvatar(firstName, lastName, "teal"),
    [firstName, lastName]
  );

  const personLabel = (firstName || "").replace(/^(dr\.?|mr\.?|ms\.?|mrs\.?)\s+/i, "").trim() || "Staff";

  const dynamicPresets = useMemo(() => {
    const list: { name: string; url: string }[] = [
      { name: `${personLabel} (Brand Red)`, url: redAvatar },
      { name: `${personLabel} (Navy)`, url: navyAvatar },
      { name: `${personLabel} (Teal)`, url: tealAvatar },
      { name: "Placeholder", url: "/pharmacists/placeholder.jpg" },
    ];

    if (
      initial?.photoUrl &&
      !initial.photoUrl.startsWith("data:image/svg+xml") &&
      initial.photoUrl !== "/pharmacists/placeholder.jpg"
    ) {
      list.unshift({
        name: `${personLabel} (Photo)`,
        url: initial.photoUrl,
      });
    }

    return list;
  }, [personLabel, redAvatar, navyAvatar, tealAvatar, initial]);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError("Please choose an image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      onError(
        `Image is ${(file.size / 1024).toFixed(0)}KB. Maximum recommended upload size is 800KB.`,
      );
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") update("photoUrl", result);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    const fullName = formatFullName(prefix, firstName, lastName);
    if (!fullName.trim()) {
      onError("Pharmacist first and last name are required.");
      return;
    }
    const cleaned: Pharmacist = {
      ...draft,
      name: fullName,
      photoUrl: draft.photoUrl || redAvatar,
      credentials: parseList(credentialsText),
      languages: parseList(languagesText),
      yearsExperience:
        Number.isFinite(draft.yearsExperience) && draft.yearsExperience >= 0
          ? Math.floor(draft.yearsExperience)
          : 0,
    };
    onSave(cleaned);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Pharmacist" : "Add New Pharmacist"}</DialogTitle>
          <DialogDescription>
            Configure staff profile details. Changes will update the homepage clinical team section immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* First Name, Last Name & Clinical Role */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pharm-first-name">
                  First Name <span className="text-[var(--brand)]">*</span>
                </Label>
                <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={prefix === "Dr."}
                    onChange={(e) =>
                      handleNameChange(firstName, lastName, e.target.checked ? "Dr." : "")
                    }
                    className="rounded border-slate-300 text-[var(--brand)] focus:ring-[var(--brand)]"
                  />
                  <span>Dr. Title</span>
                </label>
              </div>
              <Input
                id="pharm-first-name"
                value={firstName}
                onChange={(e) => handleNameChange(e.target.value, lastName, prefix)}
                placeholder="Anika"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pharm-last-name">
                Last Name <span className="text-[var(--brand)]">*</span>
              </Label>
              <Input
                id="pharm-last-name"
                value={lastName}
                onChange={(e) => handleNameChange(firstName, e.target.value, prefix)}
                placeholder="Sharma"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pharm-role">Clinical Role / Title</Label>
              <Input
                id="pharm-role"
                value={draft.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder="Pharmacy Manager & Owner"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pharm-name" className="text-slate-500">
                Full Name (Auto-Generated)
              </Label>
              <Input
                id="pharm-name"
                value={draft.name || "(Auto-derived from first & last name)"}
                readOnly
                className="bg-slate-50 text-slate-700 font-medium cursor-default"
              />
            </div>
          </div>

          {/* Credentials & Languages */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pharm-creds">
                Credentials <span className="text-xs font-normal text-slate-500">(comma-separated)</span>
              </Label>
              <Input
                id="pharm-creds"
                value={credentialsText}
                onChange={(e) => setCredentialsText(e.target.value)}
                placeholder="BSc Pharm, RPh, APA"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pharm-lang">
                Languages Spoken <span className="text-xs font-normal text-slate-500">(comma-separated)</span>
              </Label>
              <Input
                id="pharm-lang"
                value={languagesText}
                onChange={(e) => setLanguagesText(e.target.value)}
                placeholder="English, Punjabi, Hindi"
              />
            </div>
          </div>

          {/* Experience & Display Order */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pharm-exp">Years of Experience</Label>
              <Input
                id="pharm-exp"
                type="number"
                min={0}
                value={Number.isFinite(draft.yearsExperience) ? draft.yearsExperience : ""}
                onChange={(e) => update("yearsExperience", e.target.value === "" ? 0 : Number(e.target.value))}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pharm-order">Display Order (Homepage sorting)</Label>
              <Input
                id="pharm-order"
                type="number"
                value={Number.isFinite(draft.displayOrder) ? draft.displayOrder : ""}
                onChange={(e) => update("displayOrder", e.target.value === "" ? 1 : Number(e.target.value))}
              />
            </div>
          </div>

          {/* Professional Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="pharm-bio">Professional Bio</Label>
            <Textarea
              id="pharm-bio"
              value={draft.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={3}
              placeholder="Clinical experience, patient care focus, community roots in Abbotsford..."
            />
          </div>

          {/* Photo URL & Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Pharmacist Photo</Label>
              <span className="text-[11px] text-slate-500">Auto-generates as you type name</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="text-xs text-slate-500 mr-1 inline-flex items-center gap-1">
                <Sparkles size={12} className="text-[var(--brand)]" /> Quick Presets:
              </span>
              {dynamicPresets.map((preset) => {
                const isSelected = draft.photoUrl === preset.url;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => update("photoUrl", preset.url)}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium border transition cursor-pointer ${
                      isSelected
                        ? "border-[var(--brand)] bg-[var(--brand-subtle)] text-[var(--brand)] font-semibold"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected && <Check size={12} />}
                    <span>{preset.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-xs">
                {draft.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={draft.photoUrl}
                    alt="Pharmacist preview"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    <ImageIcon size={20} />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Input
                  value={draft.photoUrl}
                  onChange={(e) => update("photoUrl", e.target.value)}
                  placeholder="/pharmacists/anika.jpg or generated avatar data URI"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50">
                    <Upload size={13} />
                    Upload from computer
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1"
                    onClick={() => update("photoUrl", redAvatar)}
                  >
                    <RefreshCw size={12} className="text-[var(--brand)]" />
                    Reset to Generated Avatar
                  </Button>
                  <span className="text-[11px] text-slate-400">Max 800KB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="brand" type="button" onClick={handleSave}>
            {initial ? "Save Changes" : "Add to Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const _slugify = slugify;