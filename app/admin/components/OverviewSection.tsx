"use client";

import {
  Calendar,
  FileText,
  Megaphone,
  Shield,
  Stethoscope,
  Upload,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface OverviewSectionProps {
  user: {
    name: string;
    email: string;
    role: "ADMIN" | "PHARMACIST";
  };
  stats: {
    pharmacistsCount: number;
    postsCount: number;
    announcementsCount: number;
    flyersCount: number;
    appointmentsCount: number;
  };
  onNavigateTab: (tab: string) => void;
}

export function OverviewSection({
  user,
  stats,
  onNavigateTab,
}: OverviewSectionProps) {
  const isAdmin = user.role === "ADMIN";

  return (
    <section className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-teal-900 to-slate-900 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className={isAdmin ? "bg-indigo-500/20 text-indigo-200 border-indigo-400/30" : "bg-teal-500/20 text-teal-200 border-teal-400/30"}>
                {isAdmin ? "SYSTEM ADMINISTRATOR" : "CLINICAL PHARMACIST"}
              </Badge>
              <span className="text-xs text-slate-300 font-mono">2FA Authenticated</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Welcome back, {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {isAdmin
                ? "Full administrative control enabled. You can manage staff accounts, clinical services, articles, digital flyers, and export records."
                : "Operational access enabled. You can manage patient appointments, digital flyers, clinical blog posts, and patient announcements."}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Button
              onClick={() => onNavigateTab("appointments")}
              className="bg-teal-600 text-white hover:bg-teal-500 text-xs gap-1.5"
            >
              <Calendar size={14} />
              <span>View Appointments</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card
          onClick={() => onNavigateTab("appointments")}
          className="border-slate-200 shadow-sm hover:border-teal-500/50 hover:shadow transition cursor-pointer"
        >
          <CardHeader className="p-4 pb-1">
            <div className="flex items-center justify-between text-teal-700">
              <Calendar size={18} />
              <Badge variant="secondary" className="text-[10px]">Queue</Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 pt-1">
              {stats.appointmentsCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-slate-500">Upcoming Appointments</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => onNavigateTab("posts")}
          className="border-slate-200 shadow-sm hover:border-teal-500/50 hover:shadow transition cursor-pointer"
        >
          <CardHeader className="p-4 pb-1">
            <div className="flex items-center justify-between text-teal-700">
              <FileText size={18} />
              <Badge variant="secondary" className="text-[10px]">Live</Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 pt-1">
              {stats.postsCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-slate-500">Blog Articles</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => onNavigateTab("announcements")}
          className="border-slate-200 shadow-sm hover:border-teal-500/50 hover:shadow transition cursor-pointer"
        >
          <CardHeader className="p-4 pb-1">
            <div className="flex items-center justify-between text-teal-700">
              <Megaphone size={18} />
              <Badge variant="secondary" className="text-[10px]">Banner</Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 pt-1">
              {stats.announcementsCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-slate-500">Active Announcements</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => onNavigateTab("flyers")}
          className="border-slate-200 shadow-sm hover:border-teal-500/50 hover:shadow transition cursor-pointer"
        >
          <CardHeader className="p-4 pb-1">
            <div className="flex items-center justify-between text-teal-700">
              <Upload size={18} />
              <Badge variant="secondary" className="text-[10px]">Hostinger</Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 pt-1">
              {stats.flyersCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-slate-500">Digital Flyers</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => isAdmin && onNavigateTab("pharmacists")}
          className={`border-slate-200 shadow-sm transition ${
            isAdmin
              ? "hover:border-teal-500/50 hover:shadow cursor-pointer"
              : "opacity-80"
          }`}
        >
          <CardHeader className="p-4 pb-1">
            <div className="flex items-center justify-between text-teal-700">
              <Stethoscope size={18} />
              <Badge variant="secondary" className="text-[10px]">Team</Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 pt-1">
              {stats.pharmacistsCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-slate-500">Active Pharmacists</p>
          </CardContent>
        </Card>
      </div>

      {/* Information Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Security & Access Panel */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-teal-700" />
              <CardTitle className="text-sm font-bold text-slate-900">
                Staff Authentication & RBAC Policy
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Role-Based Access Control and security details for this session.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2 text-xs space-y-2.5 text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Authenticated Staff:</span>
              <span className="font-semibold text-slate-800">{user.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Assigned Role:</span>
              <span className="font-semibold text-teal-800">{user.role}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Two-Factor Authentication:</span>
              <span className="text-emerald-700 font-medium">Verified (10-minute Resend OTP)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Cookie Security:</span>
              <span className="font-mono text-slate-700">HTTP-Only, SameSite=Lax, AES-256</span>
            </div>
          </CardContent>
        </Card>

        {/* Hostinger Storage Panel */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <Upload size={16} className="text-teal-700" />
              <CardTitle className="text-sm font-bold text-slate-900">
                Hostinger Persistent File Storage
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Dedicated directory for uploaded media and flyers.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2 text-xs space-y-2.5 text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Storage Root:</span>
              <span className="font-mono text-slate-800">public/uploads/</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Flyers Directory:</span>
              <span className="font-mono text-slate-800">public/uploads/flyers/</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Blog Images Directory:</span>
              <span className="font-mono text-slate-800">public/uploads/blog/</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Max Upload Limit:</span>
              <span className="text-slate-800 font-medium">15MB (PDF, PNG, JPEG, WEBP)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
