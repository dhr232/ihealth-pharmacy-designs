"use client";

import { FONT_PAIRINGS, THEMES } from "../lib/types";
import type { FontPairingName, ThemeName } from "../lib/types";

export function ThemeSelector({
  theme,
  font,
  onThemeChange,
  onFontChange,
}: {
  theme: ThemeName;
  font: FontPairingName;
  onThemeChange: (next: ThemeName) => void;
  onFontChange: (next: FontPairingName) => void;
}) {
  return (
    <section
      aria-labelledby="theme-selector-heading"
      className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4">
        <h2
          id="theme-selector-heading"
          className="text-base font-semibold tracking-tight text-[var(--foreground)]"
        >
          Site Theme &amp; Font
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Pick a colour palette and font pairing. Selections are saved locally
          and will drive the live site once ADMIN-02 ships.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[var(--foreground)]">Theme</span>
          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as ThemeName)}
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] shadow-sm focus:border-[var(--brand)] focus:outline-none"
          >
            {THEMES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[var(--foreground)]">Font pairing</span>
          <select
            value={font}
            onChange={(e) => onFontChange(e.target.value as FontPairingName)}
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] shadow-sm focus:border-[var(--brand)] focus:outline-none"
          >
            {FONT_PAIRINGS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-xs text-[var(--muted)]">
        Currently selected:{" "}
        <span className="font-semibold text-[var(--foreground)]">
          {THEMES.find((t) => t.value === theme)?.label}
        </span>{" "}
        &middot;{" "}
        <span className="font-semibold text-[var(--foreground)]">
          {FONT_PAIRINGS.find((f) => f.value === font)?.label}
        </span>
      </p>
    </section>
  );
}