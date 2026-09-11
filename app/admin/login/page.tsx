"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  Pill,
  RefreshCw,
  ShieldCheck,
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

export default function AdminLoginPage() {
  const router = useRouter();

  // State
  const [step, setStep] = useState<"CREDENTIALS" | "OTP">("CREDENTIALS");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes
  const [isResent, setIsResent] = useState(false);

  // Check if session already valid
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

  // Countdown timer for OTP
  useEffect(() => {
    if (step !== "OTP") return;

    if (secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [step, secondsRemaining]);

  // Step 1: Submit Credentials
  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to sign in. Please verify your credentials.");
        setBusy(false);
        return;
      }

      if (data.step === "2FA_REQUIRED") {
        setStep("OTP");
        setSecondsRemaining(600);
        setError(null);
        if (data.debugCode) {
          setOtpCode(data.debugCode);
        }
      }
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  // Step 2: Verify OTP
  async function handleOtpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          code: otpCode.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid verification code.");
        setBusy(false);
        return;
      }

      // Success: redirect to admin
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Verification failed. Please try again.");
      setBusy(false);
    }
  }

  // Resend OTP
  async function handleResendCode() {
    setError(null);
    setResendBusy(true);
    setIsResent(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to resend verification code.");
      } else {
        setSecondsRemaining(600);
        setIsResent(true);
        setTimeout(() => setIsResent(false), 4000);
      }
    } catch {
      setError("Network error while resending verification code.");
    } finally {
      setResendBusy(false);
    }
  }

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
              {step === "CREDENTIALS"
                ? "Enter your staff email and password to begin two-factor authentication."
                : `A 6-digit security code was dispatched to ${email}.`}
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

            {isResent && (
              <div
                className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800"
                role="status"
              >
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>A fresh 6-digit verification code has been dispatched.</span>
              </div>
            )}

            {step === "CREDENTIALS" ? (
              /* Step 1 Form */
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="staff-password"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Password
                    </Label>
                  </div>
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
                      <span>Verifying credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to 2FA</span>
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
            ) : (
              /* Step 2 Form (OTP) */
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-medium text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-teal-600" />
                      Two-Factor Authentication
                    </span>
                    <span
                      className={`font-mono font-semibold ${
                        secondsRemaining < 60 ? "text-red-600" : "text-slate-600"
                      }`}
                    >
                      Expires in {formatTime(secondsRemaining)}
                    </span>
                  </div>
                  <p className="text-slate-500">
                    Enter the one-time code sent to your registered email address to verify identity.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="otp-code" className="text-xs font-semibold text-slate-700">
                    6-Digit Security Code
                  </Label>
                  <div className="relative">
                    <KeyRound
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <Input
                      id="otp-code"
                      type="text"
                      autoFocus
                      required
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="one-time-code"
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) =>
                        setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="pl-9 font-mono text-lg tracking-widest text-center sm:text-left"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={busy || otpCode.length !== 6 || secondsRemaining <= 0}
                  className="w-full bg-teal-700 text-white hover:bg-teal-800 gap-2 font-medium"
                >
                  {busy ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Verifying security code...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Verify & Access Dashboard</span>
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("CREDENTIALS");
                      setOtpCode("");
                      setError(null);
                    }}
                    className="text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1"
                  >
                    <ArrowLeft size={12} />
                    <span>Change email</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendBusy}
                    className="text-teal-700 hover:text-teal-800 font-semibold inline-flex items-center gap-1 disabled:opacity-50"
                  >
                    <RefreshCw size={12} className={resendBusy ? "animate-spin" : ""} />
                    <span>Resend code</span>
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
