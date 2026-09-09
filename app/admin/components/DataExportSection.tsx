"use client";

import { Download, FileSpreadsheet, FileText, Shield } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface DataExportSectionProps {
  onToast?: (kind: "success" | "error" | "info", message: string) => void;
  exportAllData: () => void;
}

export function DataExportSection({ exportAllData }: DataExportSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              System Data & Records Export
            </h2>
            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs">
              ADMIN ONLY
            </Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            Export structured patient appointment logs, clinician profiles, blog publications, and announcement archives.
          </p>
        </div>

        <Button
          onClick={exportAllData}
          className="gap-1.5 bg-teal-700 text-white hover:bg-teal-800 text-xs self-start sm:self-auto"
        >
          <Download size={14} />
          <span>Export Master JSON Package</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-teal-700">
              <FileSpreadsheet size={18} />
              <CardTitle className="text-sm font-bold text-slate-900">
                Clinical Appointments Log
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Export patient bookings, confirmation codes, and statuses.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportAllData}
              className="w-full text-xs gap-1.5"
            >
              <Download size={13} />
              <span>Download Appointments</span>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-teal-700">
              <FileText size={18} />
              <CardTitle className="text-sm font-bold text-slate-900">
                Health Articles & Blog Archive
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Export all published, draft, and scheduled clinical articles.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportAllData}
              className="w-full text-xs gap-1.5"
            >
              <Download size={13} />
              <span>Download Blog Archive</span>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-teal-700">
              <Shield size={18} />
              <CardTitle className="text-sm font-bold text-slate-900">
                Audit & Staff Registry
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Export active clinicians and security configurations.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportAllData}
              className="w-full text-xs gap-1.5"
            >
              <Download size={13} />
              <span>Download Registry</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
