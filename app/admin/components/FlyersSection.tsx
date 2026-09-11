"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  ExternalLink,
  FileCheck,
  FileText,
  Plus,
  RefreshCw,
  Upload,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

export interface FlyerItem {
  id: string;
  title: string;
  pdfUrl: string;
  thumbnailUrl?: string | null;
  validFrom?: string | null;
  validTo?: string | null;
  active: boolean;
  createdAt: string;
}

interface FlyersSectionProps {
  onToast: (kind: "success" | "error" | "info", message: string) => void;
}

export function FlyersSection({ onToast }: FlyersSectionProps) {
  const [flyers, setFlyers] = useState<FlyerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let ignore = false;

    async function loadFlyers() {
      try {
        const res = await fetch("/api/admin/flyers");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.flyers)) {
          setFlyers(data.flyers);
        }
      } catch {
        if (!ignore) {
          onToast("error", "Failed to load digital flyers.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadFlyers();

    return () => {
      ignore = true;
    };
  }, [onToast]);

  async function handleCreateFlyer(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !selectedFile) {
      onToast("error", "Flyer title and PDF file are required.");
      return;
    }

    try {
      setUploading(true);

      // 1. Upload PDF to persistent Hostinger storage
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("category", "flyers");

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.error || "File upload failed.");
      }

      // 2. Save Flyer record
      const flyerRes = await fetch("/api/admin/flyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          pdfUrl: uploadData.url,
          validFrom: validFrom || null,
          validTo: validTo || null,
          active: true,
        }),
      });

      const flyerData = await flyerRes.json();
      if (!flyerRes.ok || !flyerData.success) {
        throw new Error(flyerData.error || "Failed to save flyer metadata.");
      }

      setFlyers((prev) => [flyerData.flyer, ...prev]);
      onToast("success", "Digital flyer successfully uploaded and published.");
      setModalOpen(false);
      setTitle("");
      setValidFrom("");
      setValidTo("");
      setSelectedFile(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error creating flyer.";
      onToast("error", msg);
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Digital Promotional Flyers
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Upload bi-weekly health flyers and monthly savings catalogs stored persistently on Hostinger.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="gap-1.5 bg-teal-700 text-white hover:bg-teal-800 text-xs self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Upload New Flyer</span>
        </Button>
      </div>

      {loading && flyers.length === 0 ? (
        <div className="flex items-center justify-center p-12 text-slate-500 text-sm">
          <RefreshCw size={18} className="animate-spin mr-2" />
          Loading digital flyers...
        </div>
      ) : flyers.length === 0 ? (
        <Card className="border-dashed border-slate-200 p-8 text-center">
          <FileText size={32} className="mx-auto text-slate-400 mb-2" />
          <h3 className="font-semibold text-slate-800 text-sm">No promotional flyers published</h3>
          <p className="text-xs text-slate-500 mt-1">
            Upload a PDF flyer to make it available for local Abbotsford patients.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flyers.map((flyer) => (
            <Card key={flyer.id} className="border-slate-200 shadow-sm flex flex-col justify-between">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <Badge
                    className={
                      flyer.active
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600"
                    }
                  >
                    {flyer.active ? "ACTIVE" : "ARCHIVED"}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">PDF Document</span>
                </div>
                <CardTitle className="text-base font-semibold text-slate-900 leading-snug">
                  {flyer.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-2 space-y-3">
                {(flyer.validFrom || flyer.validTo) && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar size={13} className="shrink-0 text-slate-400" />
                    <span>
                      {flyer.validFrom ? flyer.validFrom.slice(0, 10) : "Start"} to{" "}
                      {flyer.validTo ? flyer.validTo.slice(0, 10) : "Ongoing"}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={flyer.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 hover:text-teal-800 hover:underline"
                  >
                    <ExternalLink size={13} />
                    <span>View PDF Flyer</span>
                  </a>

                  <span className="text-xs text-slate-400">
                    {new Date(flyer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Flyer Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Promotional Flyer</DialogTitle>
            <DialogDescription>
              Select a PDF flyer (max 15MB) to upload directly to persistent storage.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateFlyer} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="flyer-title" className="text-xs font-semibold text-slate-700">
                Flyer Title
              </Label>
              <Input
                id="flyer-title"
                required
                placeholder="e.g. Spring Seasonal Health & Wellness Flyer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="flyer-from" className="text-xs font-semibold text-slate-700">
                  Valid From
                </Label>
                <Input
                  id="flyer-from"
                  type="date"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="flyer-to" className="text-xs font-semibold text-slate-700">
                  Valid To
                </Label>
                <Input
                  id="flyer-to"
                  type="date"
                  value={validTo}
                  onChange={(e) => setValidTo(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700">PDF Document</Label>
              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setSelectedFile(f);
                }}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-slate-200 hover:border-teal-600 rounded-lg p-4 text-center transition bg-slate-50/50"
              >
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2 text-xs text-teal-700 font-medium">
                    <FileCheck size={16} />
                    <span>{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                ) : (
                  <div className="space-y-1 text-xs text-slate-500">
                    <Upload size={20} className="mx-auto text-slate-400" />
                    <p className="font-medium text-slate-700">Click to choose PDF file</p>
                    <p className="text-slate-400">Maximum file size: 15MB</p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={uploading || !selectedFile || !title}
                className="bg-teal-700 text-white hover:bg-teal-800 gap-1.5"
              >
                {uploading ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={13} />
                    <span>Upload & Save</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
