"use client";

import { useState } from "react";
import {
  AlertCircle,
  Clock,
  Heart,
  Megaphone,
  Sparkles,
  Syringe,
  Truck,
} from "lucide-react";
import type { AnnouncementIcon, AnnouncementItem } from "../lib/types";
import { uuid } from "../lib/storage";
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
import { Badge } from "@/app/components/ui/badge";

interface AnnouncementEditorProps {
  open: boolean;
  initial: AnnouncementItem | null;
  nextOrder: number;
  onClose: () => void;
  onSave: (item: AnnouncementItem) => void;
  onError?: (message: string) => void;
}

const ICON_OPTIONS: {
  id: AnnouncementIcon;
  label: string;
  icon: typeof Megaphone;
  colorClass: string;
}[] = [
  { id: "megaphone", label: "News / General", icon: Megaphone, colorClass: "text-amber-500" },
  { id: "syringe", label: "Vaccines & Flu", icon: Syringe, colorClass: "text-red-500" },
  { id: "truck", label: "Delivery & Shipping", icon: Truck, colorClass: "text-sky-500" },
  { id: "clock", label: "Hours & Schedule", icon: Clock, colorClass: "text-emerald-500" },
  { id: "alert", label: "Important Alert", icon: AlertCircle, colorClass: "text-rose-500" },
  { id: "heart", label: "Wellness & Care", icon: Heart, colorClass: "text-pink-500" },
];

const TEMPLATES: { title: string; text: string; icon: AnnouncementIcon; urgent: boolean }[] = [
  {
    title: "Holiday Hours",
    text: "Holiday Hours: Open 10am–4pm on upcoming statutory holiday. Emergency refills available.",
    icon: "clock",
    urgent: false,
  },
  {
    title: "Flu & COVID Clinic",
    text: "Walk-in flu & COVID-19 booster shots available daily — no appointment needed.",
    icon: "syringe",
    urgent: false,
  },
  {
    title: "Free Delivery",
    text: "Free prescription & OTC home delivery in Abbotsford for orders over $25.",
    icon: "truck",
    urgent: false,
  },
  {
    title: "Severe Weather Notice",
    text: "Severe weather advisory: Pharmacy open normal hours; courier deliveries may have slight delays.",
    icon: "alert",
    urgent: true,
  },
];

export function AnnouncementEditor({
  open,
  initial,
  nextOrder,
  onClose,
  onSave,
  onError,
}: AnnouncementEditorProps) {
  const [text, setText] = useState(() => initial?.text ?? "");
  const [icon, setIcon] = useState<AnnouncementIcon>(() => initial?.icon ?? "megaphone");
  const [urgent, setUrgent] = useState(() => Boolean(initial?.urgent));
  const [enabled, setEnabled] = useState(() => initial?.enabled !== false);
  const [link, setLink] = useState(() => initial?.link ?? "");
  const [errors, setErrors] = useState<{ text?: string }>({});

  function applyTemplate(tpl: (typeof TEMPLATES)[number]) {
    setText(tpl.text);
    setIcon(tpl.icon);
    setUrgent(tpl.urgent);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) {
      setErrors({ text: "Announcement message cannot be empty." });
      onError?.("Announcement message cannot be empty.");
      return;
    }

    const item: AnnouncementItem = {
      id: initial?.id ?? uuid(),
      text: cleanText,
      icon,
      urgent,
      enabled,
      link: link.trim() || undefined,
      displayOrder: initial?.displayOrder ?? nextOrder,
    };

    onSave(item);
  }

  const SelectedIcon = ICON_OPTIONS.find((opt) => opt.id === icon)?.icon || Megaphone;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
              <Megaphone size={16} />
            </div>
            <DialogTitle>
              {initial ? "Edit Announcement" : "Create New Announcement"}
            </DialogTitle>
          </div>
          <DialogDescription>
            Publish live banner announcements, urgent health notices, and clinic updates to the top ticker across all website pages.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-5 py-2">
          {/* Quick Templates */}
          {!initial && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
                <Sparkles size={13} className="text-amber-500" />
                <span>Quick Preset Templates</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.title}
                    type="button"
                    onClick={() => applyTemplate(tpl)}
                    className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-100 transition-colors"
                  >
                    {tpl.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Text */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="announcement-text" className="text-sm font-semibold text-slate-900">
                Announcement Message <span className="text-red-500">*</span>
              </Label>
              <span className="text-xs text-slate-400">{text.length} characters</span>
            </div>
            <Textarea
              id="announcement-text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (errors.text) setErrors({});
              }}
              placeholder="e.g. Walk-in flu shots available daily — no appointment needed"
              rows={3}
              className={errors.text ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.text && (
              <p className="text-xs font-medium text-red-600">{errors.text}</p>
            )}
          </div>

          {/* Icon Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-900">
              Badge Icon
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ICON_OPTIONS.map((opt) => {
                const IconComp = opt.icon;
                const isSelected = icon === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIcon(opt.id)}
                    className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-left text-xs font-medium transition-all ${
                      isSelected
                        ? "border-red-600 bg-red-50/50 text-red-950 ring-1 ring-red-600 shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <IconComp size={16} className={opt.colorClass} />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Link / URL (Optional) */}
          <div className="space-y-1.5">
            <Label htmlFor="announcement-link" className="text-sm font-semibold text-slate-900">
              Target Link (Optional)
            </Label>
            <Input
              id="announcement-link"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g. /services or /contact or https://..."
              className="text-xs sm:text-sm font-mono"
            />
            <p className="text-xs text-slate-500">
              Optional page destination if patients click on this alert ticker.
            </p>
          </div>

          {/* Flags / Switches */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 block">Urgent Notice</span>
                <span className="text-slate-500 block mt-0.5">
                  Highlights with high-contrast badge in the ticker to draw attention.
                </span>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 block">Active Status</span>
                <span className="text-slate-500 block mt-0.5">
                  Display on public website. Uncheck to save draft for later.
                </span>
              </div>
            </label>
          </div>

          {/* Live Bar Preview */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Live Public Bar Preview
              </span>
              <Badge variant={enabled ? "outline" : "secondary"} className="text-[10px]">
                {enabled ? "Will show on site" : "Hidden (Inactive)"}
              </Badge>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-slate-200 shadow-inner">
              <div className="flex items-center gap-2 text-xs">
                <SelectedIcon size={14} className="text-red-400 shrink-0" />
                {urgent && (
                  <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300 border border-rose-500/30 shrink-0">
                    Urgent
                  </span>
                )}
                <span className="font-medium tracking-tight truncate">
                  {text || "Enter an announcement message above to preview..."}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]"
            >
              {initial ? "Save Changes" : "Add Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
