"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
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

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PHARMACIST";
  isActive: boolean;
  createdAt: string;
}

interface UsersSectionProps {
  onToast: (kind: "success" | "error" | "info", message: string) => void;
}

export function UsersSection({ onToast }: UsersSectionProps) {
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "PHARMACIST">("PHARMACIST");

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const res = await fetch("/api/admin/users");
        if (!res.ok) throw new Error("Failed to load users");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        }
      } catch {
        if (!ignore) {
          onToast("error", "Failed to load staff user accounts.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      ignore = true;
    };
  }, [onToast]);

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      onToast("error", "All fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create user.");
      }

      setUsers((prev) => [data.user, ...prev]);
      onToast("success", `Staff member ${data.user.name} created.`);
      setModalOpen(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("PHARMACIST");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error creating staff account.";
      onToast("error", msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Staff User Management
            </h2>
            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs">
              ADMIN ONLY
            </Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            Control access roles (Admin vs Pharmacist), view active accounts, and manage 2FA staff credentials.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="gap-1.5 bg-teal-700 text-white hover:bg-teal-800 text-xs self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Add Staff Account</span>
        </Button>
      </div>

      {loading && users.length === 0 ? (
        <div className="flex items-center justify-center p-12 text-slate-500 text-sm">
          <RefreshCw size={18} className="animate-spin mr-2" />
          Loading staff user list...
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-600">
                <tr>
                  <th className="p-3.5 pl-4">Staff Member</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-4">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700 font-semibold text-xs border border-teal-200">
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono text-xs">{u.email}</td>
                    <td className="p-3.5">
                      {u.role === "ADMIN" ? (
                        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold">
                          ADMIN
                        </Badge>
                      ) : (
                        <Badge className="bg-teal-50 text-teal-700 border-teal-200 font-semibold">
                          PHARMACIST
                        </Badge>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        Active
                      </span>
                    </td>
                    <td className="p-3.5 pr-4 text-xs text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Staff Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Staff User</DialogTitle>
            <DialogDescription>
              Create an administrative or clinical pharmacist staff account with 2FA email authentication.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddUser} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="staff-name" className="text-xs font-semibold text-slate-700">
                Full Name
              </Label>
              <Input
                id="staff-name"
                required
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="staff-email" className="text-xs font-semibold text-slate-700">
                Staff Email Address
              </Label>
              <Input
                id="staff-email"
                type="email"
                required
                placeholder="sjenkins@ihealthpharmacy.ca"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="staff-password" className="text-xs font-semibold text-slate-700">
                Initial Password
              </Label>
              <Input
                id="staff-password"
                type="password"
                required
                placeholder="Create secure temporary password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700">Role & Access Level</Label>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setRole("PHARMACIST")}
                  className={`p-3 rounded-lg border text-left transition flex flex-col gap-1 ${
                    role === "PHARMACIST"
                      ? "border-teal-600 bg-teal-50/50 text-teal-900"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span className="text-xs font-bold">PHARMACIST</span>
                  <span className="text-[11px] text-slate-500">
                    Operational access to appointments, articles, flyers.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("ADMIN")}
                  className={`p-3 rounded-lg border text-left transition flex flex-col gap-1 ${
                    role === "ADMIN"
                      ? "border-indigo-600 bg-indigo-50/50 text-indigo-900"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span className="text-xs font-bold">ADMIN</span>
                  <span className="text-[11px] text-slate-500">
                    Full access including user management and system settings.
                  </span>
                </button>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={submitting || !name || !email || !password}
                className="bg-teal-700 text-white hover:bg-teal-800 gap-1.5"
              >
                {submitting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus size={13} />
                    <span>Create Staff Account</span>
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
