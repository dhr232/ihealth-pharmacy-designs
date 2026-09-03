"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImageIcon, X, Upload } from "lucide-react";
import type { Pharmacist } from "../lib/types";
import { slugify, uuid } from "../lib/storage";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MAX_IMAGE_BYTES = 500 * 1024;

function emptyPharmacist(displayOrder: number): Pharmacist {
  return {
    id: uuid(),
    name: "",
    role: "",
    bio: "",
    photoUrl: "",
    credentials: [],
    languages: [],
    yearsExperience: 0,
    displayOrder,
  };
}

function toTextList(arr: string[]): string {
  return arr.join(", ");
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
  const [draft, setDraft] = useState<Pharmacist>(
    initial ?? emptyPharmacist(nextOrder),
  );
  const [credentialsText, setCredentialsText] = useState(
    toTextList(initial?.credentials ?? []),
  );
  const [languagesText, setLanguagesText] = useState(
    toTextList(initial?.languages ?? []),
  );

  useEffect(() => {
    if (open) {
      const seed = initial ?? emptyPharmacist(nextOrder);
      setDraft(seed);
      setCredentialsText(toTextList(seed.credentials));
      setLanguagesText(toTextList(seed.languages));
    }
  }, [open, initial, nextOrder]);

  function update<K extends keyof Pharmacist>(key: K, value: Pharmacist[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      onError(
        `Image is ${(file.size / 1024).toFixed(0)}KB. Compression recommended before upload.`,
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
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={initial ? "Edit pharmacist" : "Add pharmacist"}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                  {initial ? "Edit" : "Add"} Pharmacist
                </p>
                <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  {initial?.name || "New team member"}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--surface)]"
                aria-label="Close editor"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="flex flex-col gap-4">
                <Field label="Name" required>
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Dr. Anika Sharma"
                    className={inputClass}
                  />
                </Field>

                <Field label="Role / title">
                  <input
                    type="text"
                    value={draft.role}
                    onChange={(e) => update("role", e.target.value)}
                    placeholder="Pharmacy Manager"
                    className={inputClass}
                  />
                </Field>

                <Field label="Bio">
                  <textarea
                    value={draft.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    rows={4}
                    placeholder="Two or three sentences about this pharmacist."
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                <Field
                  label="Credentials"
                  hint="Comma-separated, e.g. BSc Pharm, RPh, APA"
                >
                  <input
                    type="text"
                    value={credentialsText}
                    onChange={(e) => setCredentialsText(e.target.value)}
                    placeholder="BSc Pharm, RPh"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Languages"
                  hint="Comma-separated, e.g. English, Punjabi, Hindi"
                >
                  <input
                    type="text"
                    value={languagesText}
                    onChange={(e) => setLanguagesText(e.target.value)}
                    placeholder="English, Punjabi"
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Years experience">
                    <input
                      type="number"
                      min={0}
                      value={Number.isFinite(draft.yearsExperience) ? draft.yearsExperience : 0}
                      onChange={(e) =>
                        update("yearsExperience", Number(e.target.value))
                      }
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Display order">
                    <input
                      type="number"
                      value={draft.displayOrder}
                      onChange={(e) =>
                        update("displayOrder", Number(e.target.value))
                      }
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field
                  label="Photo"
                  hint="Upload an image (max 500KB) or paste a URL/path."
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]">
                        <Upload size={14} />
                        Upload image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFile}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={draft.photoUrl}
                        onChange={(e) => update("photoUrl", e.target.value)}
                        placeholder="/pharmacists/name.jpg or data:image/..."
                        className={`${inputClass} flex-1`}
                      />
                    </div>
                    <PhotoPreview url={draft.photoUrl} />
                  </div>
                </Field>
              </div>
            </div>

            <footer className="flex items-center justify-end gap-2 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-hover)]"
              >
                {initial ? "Save changes" : "Add pharmacist"}
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] shadow-sm placeholder:text-[var(--muted)]/70 focus:border-[var(--brand)] focus:outline-none";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--foreground)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--brand)]">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-[var(--muted)]">{hint}</span>}
    </label>
  );
}

function PhotoPreview({ url }: { url: string }) {
  if (!url) {
    return (
      <div className="flex aspect-[3/4] w-32 items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]">
        <ImageIcon size={20} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt="Pharmacist preview"
      className="h-32 w-32 rounded-lg border border-[var(--border)] object-cover"
    />
  );
}

// slugify is re-exported so editor files stay self-contained; not used here yet.
export const _slugify = slugify;