"use client";

import { useState } from "react";
import { ImageIcon, Upload, Sparkles, Check } from "lucide-react";
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

const PHOTO_PRESETS = [
  { name: "Dr. Anika", url: "/pharmacists/anika.jpg" },
  { name: "Marcus", url: "/pharmacists/marcus.jpg" },
  { name: "Priya", url: "/pharmacists/priya.jpg" },
  { name: "Daniel", url: "/pharmacists/daniel.jpg" },
  { name: "Placeholder", url: "/pharmacists/placeholder.jpg" },
];

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

function sameDraft(a: Pharmacist, b: Pharmacist): boolean {
  return (
    a.id === b.id &&
    a.name === b.name &&
    a.role === b.role &&
    a.bio === b.bio &&
    a.photoUrl === b.photoUrl &&
    a.yearsExperience === b.yearsExperience &&
    a.displayOrder === b.displayOrder &&
    a.credentials.join(",") === b.credentials.join(",") &&
    a.languages.join(",") === b.languages.join(",")
  );
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
  const [draft, setDraft] = useState<Pharmacist>(() => buildDraft(initial, nextOrder));
  const [credentialsText, setCredentialsText] = useState(() =>
    toTextList(buildDraft(initial, nextOrder).credentials)
  );
  const [languagesText, setLanguagesText] = useState(() =>
    toTextList(buildDraft(initial, nextOrder).languages)
  );

  const seed = open ? buildDraft(initial, nextOrder) : null;
  if (seed && !sameDraft(seed, draft)) {
    setDraft(seed);
    setCredentialsText(toTextList(seed.credentials));
    setLanguagesText(toTextList(seed.languages));
  }

  function update<K extends keyof Pharmacist>(key: K, value: Pharmacist[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

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
    if (!draft.name.trim()) {
      onError("Pharmacist name is required.");
      return;
    }
    const cleaned: Pharmacist = {
      ...draft,
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
          {/* Full Name & Role */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pharm-name">
                Full Name <span className="text-[var(--brand)]">*</span>
              </Label>
              <Input
                id="pharm-name"
                value={draft.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Dr. Anika Sharma"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pharm-role">Clinical Role / Title</Label>
              <Input
                id="pharm-role"
                value={draft.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder="Pharmacy Manager & Owner"
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
                value={Number.isFinite(draft.yearsExperience) ? draft.yearsExperience : 0}
                onChange={(e) => update("yearsExperience", Number(e.target.value))}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pharm-order">Display Order (Homepage sorting)</Label>
              <Input
                id="pharm-order"
                type="number"
                value={draft.displayOrder}
                onChange={(e) => update("displayOrder", Number(e.target.value))}
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
            <Label>Pharmacist Photo</Label>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="text-xs text-slate-500 mr-1 inline-flex items-center gap-1">
                <Sparkles size={12} className="text-[var(--brand)]" /> Quick Presets:
              </span>
              {PHOTO_PRESETS.map((preset) => {
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
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
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
                  placeholder="/pharmacists/anika.jpg or image URL"
                />
                <div className="flex items-center gap-2">
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