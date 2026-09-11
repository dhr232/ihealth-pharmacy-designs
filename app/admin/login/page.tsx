"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  Pill,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

// NOTE: 2FA (OTP email step) is temporarily disabled.
// The login form goes directly from credentials -> admin dashboard.
// To re-enable 2FA, restore the OTP step in this component and in /api/auth/login/route.ts.

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Redirect if session already valid
  useEffect(() => {
    let cancelled = false;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok && !cancelled) {
          router.replace("/admin");
        }
      } catch {
        // Not authenticated
      }
    }
    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to sign in. Please verify your credentials.");
        setBusy(false);
        return;
      }

      // Success: go straight to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch {
      setError("A network error occurred. Please try again.");
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-slate-200 bg-white">
          <CardHeader className="space-y-2 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                <Pill size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  iHealth Pharmacy Abbotsford
                </p>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Staff Portal Sign In
                </CardTitle>
              </div>
            </div>

            <CardDescription className="text-slate-600 text-sm">
              Enter your staff email and password to access the dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            {error && (
              <div
                className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800"
                role="alert"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="staff-email" className="text-xs font-semibold text-slate-700">
                  Staff Email Address
                </Label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    id="staff-email"
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="admin@ihealthpharmacy.ca"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="staff-password" className="text-xs font-semibold text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    id="staff-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="Enter your staff password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={busy || !email || !password}
                className="w-full bg-teal-700 text-white hover:bg-teal-800 gap-2 font-medium"
              >
                {busy ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </Button>

              <div className="pt-2 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
                >
                  <ArrowLeft size={13} />
                  <span>Return to public website</span>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
