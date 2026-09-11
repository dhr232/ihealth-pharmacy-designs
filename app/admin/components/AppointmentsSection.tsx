"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Phone,
  RefreshCw,
  Search,
  User,
  XCircle,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";

export interface AppointmentItem {
  id: string;
  confirmationCode: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceName: string;
  pharmacistName: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  reasonForVisit?: string | null;
}

interface AppointmentsSectionProps {
  onToast: (kind: "success" | "error" | "info", message: string) => void;
}

export function AppointmentsSection({ onToast }: AppointmentsSectionProps) {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "CONFIRMED" | "COMPLETED" | "CANCELLED">("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadAppointments() {
      try {
        const res = await fetch("/api/admin/appointments");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
        }
      } catch {
        if (!ignore) {
          onToast("error", "Failed to fetch appointments.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadAppointments();

    return () => {
      ignore = true;
    };
  }, [onToast]);

  async function handleRefresh() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/appointments");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
        }
      }
    } catch {
      onToast("error", "Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(id: string, newStatus: "COMPLETED" | "CANCELLED") {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
      );

      const label = newStatus === "COMPLETED" ? "completed" : "cancelled";
      onToast("success", `Appointment marked as ${label}.`);
    } catch {
      onToast("error", "Could not update appointment status. Please try again.");
    } finally {
      setActionLoadingId(null);
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (statusFilter !== "ALL" && apt.status !== statusFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      apt.patientName.toLowerCase().includes(q) ||
      apt.patientPhone.toLowerCase().includes(q) ||
      apt.serviceName.toLowerCase().includes(q) ||
      apt.confirmationCode.toLowerCase().includes(q) ||
      apt.pharmacistName.toLowerCase().includes(q)
    );
  });

  const formatDateTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat("en-CA", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status: "CONFIRMED" | "COMPLETED" | "CANCELLED") => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 font-medium">
            CONFIRMED
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 font-medium">
            COMPLETED
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 font-medium">
            CANCELLED
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Appointments Calendar & Patient Queue
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage clinical consultations, vaccination visits, and PPMAC minor ailment appointments.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
          className="gap-1.5 self-start sm:self-auto text-xs"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          <span>Refresh Queue</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                placeholder="Search by patient name, phone, code, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1 mr-1">
                <Filter size={13} />
                Status:
              </span>
              {(["ALL", "CONFIRMED", "COMPLETED", "CANCELLED"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    statusFilter === st
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      {loading && appointments.length === 0 ? (
        <div className="flex items-center justify-center p-12 text-slate-500 text-sm">
          <RefreshCw size={18} className="animate-spin mr-2" />
          Loading patient appointments...
        </div>
      ) : filteredAppointments.length === 0 ? (
        <Card className="border-dashed border-slate-200 p-8 text-center">
          <Calendar size={32} className="mx-auto text-slate-400 mb-2" />
          <h3 className="font-semibold text-slate-800 text-sm">No appointments found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your search criteria or status filter."
              : "No upcoming patient bookings are currently registered in the queue."}
          </p>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filteredAppointments.map((apt) => {
            const isActionLoading = actionLoadingId === apt.id;
            return (
              <Card
                key={apt.id}
                className="border-slate-200 shadow-sm hover:border-slate-300 transition"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {apt.confirmationCode}
                      </span>
                      {getStatusBadge(apt.status)}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={12} />
                        {formatDateTime(apt.startTime)}
                      </span>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      {apt.status === "CONFIRMED" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isActionLoading}
                            onClick={() => handleUpdateStatus(apt.id, "COMPLETED")}
                            className="h-8 gap-1 border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 text-xs"
                          >
                            <CheckCircle2 size={13} />
                            <span>Mark Completed</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isActionLoading}
                            onClick={() => handleUpdateStatus(apt.id, "CANCELLED")}
                            className="h-8 gap-1 border-rose-200 bg-rose-50/50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 text-xs"
                          >
                            <XCircle size={13} />
                            <span>Cancel</span>
                          </Button>
                        </>
                      )}
                      {apt.status === "COMPLETED" && (
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 size={13} />
                          Visit finalized
                        </span>
                      )}
                      {apt.status === "CANCELLED" && (
                        <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                          <XCircle size={13} />
                          Visit cancelled
                        </span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold text-slate-900 mt-1">
                    {apt.serviceName}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-100 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <User size={13} className="text-slate-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-800">{apt.patientName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Phone size={13} className="text-slate-400 shrink-0" />
                      <span>{apt.patientPhone || "No phone provided"}</span>
                    </div>

                    <div>
                      <span className="text-slate-400">Pharmacist: </span>
                      <span className="font-medium text-slate-700">{apt.pharmacistName}</span>
                    </div>
                  </div>

                  {apt.reasonForVisit && (
                    <div className="mt-2 text-xs text-slate-500 bg-slate-50 rounded p-2 border border-slate-100">
                      <span className="font-medium text-slate-700">Patient Notes: </span>
                      {apt.reasonForVisit}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
