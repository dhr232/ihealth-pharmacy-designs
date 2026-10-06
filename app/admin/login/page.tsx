"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  KeyRound,
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
import { PHARMACY_INFO } from "@/data/pharmacy-info";

const CODE_LIFETIME_SECONDS = 120; // matches OTP_TTL_MINUTES on the server
const RESEND_AFTER_SECONDS = 60;

function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sentAt, setSentAt] = useState(0);
  const [now, setNow] = useState(0);
  const [devCode, setDevCode] = useState<string | null>(null);

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

  // Tick once a second while waiting for the code so the countdown and resend timer update
  useEffect(() => {
    if (step !== "code") return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [step]);

  const elapsed = sentAt ? Math.floor((now - sentAt) / 1000) : 0;
  const secondsLeft = Math.max(0, CODE_LIFETIME_SECONDS - elapsed);
  const resendIn = Math.max(0, RESEND_AFTER_SECONDS - elapsed);

  async function requestCode() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || "We could not send a code. Please try again.");
        return;
      }

      const t = Date.now();
      setSentAt(t);
      setNow(t);
      setCode("");
      setDevCode(typeof data.debugCode === "string" ? data.debugCode : null);
      setStep("code");
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await requestCode();
  }

  async function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || "That code did not work. Please try again.");
        setBusy(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("A network error occurred. Please try again.");
      setBusy(false);
    }
  }

  function backToEmail() {
    setStep("email");
    setCode("");
    setError(null);
    setDevCode(null);
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
                  iHealth Pharmacy Chilliwack
                </p>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Staff Portal Sign In
                </CardTitle>
              </div>
            </div>

            <CardDescription className="text-slate-600 text-base">
              {step === "email"
                ? "Enter the pharmacy email address. We will email you a 6-digit code to confirm it is you."
                : `We emailed a 6-digit code to ${email.trim()}. Enter it below.`}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            {error && (
              <div
                className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                role="alert"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="staff-email" className="text-sm font-semibold text-slate-700">
                    Pharmacy email address
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
                      placeholder={PHARMACY_INFO.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-9 text-base"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={busy || !email}
                  className="min-h-12 w-full bg-teal-700 text-white hover:bg-teal-800 gap-2 text-base font-medium"
                >
                  {busy ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Sending code...</span>
                    </>
                  ) : (
                    <>
                      <span>Email me a code</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="staff-code" className="text-sm font-semibold text-slate-700">
                    6-digit code
                  </Label>
                  <div className="relative">
                    <KeyRound
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <Input
                      id="staff-code"
                      type="text"
                      required
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="123456"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="h-12 pl-9 text-center text-2xl font-semibold tracking-[0.4em]"
                    />
                  </div>
                  <p
                    className={`text-sm ${secondsLeft === 0 ? "font-semibold text-red-700" : "text-slate-600"}`}
                    aria-live="polite"
                  >
                    {secondsLeft > 0
                      ? `Code expires in ${formatClock(secondsLeft)}`
                      : "This code has expired. Request a new one."}
                  </p>
                  {devCode && (
                    <p className="text-sm text-amber-700">
                      Development mode: your code is <strong>{devCode}</strong>
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={busy || code.length !== 6 || secondsLeft === 0}
                  className="min-h-12 w-full bg-teal-700 text-white hover:bg-teal-800 gap-2 text-base font-medium"
                >
                  {busy ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </Button>

                <div className="flex flex-col items-center gap-1 text-sm">
                  <button
                    type="button"
                    onClick={requestCode}
                    disabled={busy || resendIn > 0}
                    className="min-h-11 font-semibold text-teal-800 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
                  >
                    {resendIn > 0 ? `Send a new code in ${resendIn}s` : "Send a new code"}
                  </button>
                  <button
                    type="button"
                    onClick={backToEmail}
                    className="min-h-11 font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                  >
                    Use a different email
                  </button>
                </div>
              </form>
            )}

            <div className="pt-3 text-center">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition"
              >
                <ArrowLeft size={13} />
                <span>Return to public website</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
