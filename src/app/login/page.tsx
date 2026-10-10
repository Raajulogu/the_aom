"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, UserCheck, Building, ArrowRight, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth, UserRole } from "@/lib/auth-context";

export default function LoginPage() {
  const { user, isAuthenticated, isLoading, login, quickLogin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to respective portal
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "admin") router.replace("/");
      else if (user.role === "staff") router.replace("/employee");
      else if (user.role === "customer") router.replace("/portal");
    }
  }, [isLoading, isAuthenticated, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = login(email, password);
    if (!result.success) {
      setError(result.error || "Login failed");
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    setError(null);
    setIsSubmitting(true);
    quickLogin(role);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-canvas px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto grid size-12 rotate-6 place-items-center rounded-2xl bg-ink shadow-lg ring-1 ring-line">
            <span className="-rotate-6 font-display text-xl font-bold text-canvas">A</span>
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            AOM Operations Hub
          </h1>
          <p className="mt-1.5 font-mono text-xs text-muted-foreground">
            Industrial Laundry Management &bull; Multi-Portal RBAC System
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mt-8 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-line">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="label-mono">Quick Demo Sign-In</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-brand">
              <CheckCircle2 className="size-3" /> 1-Click Access
            </span>
          </div>

          <div className="mt-3.5 space-y-2">
            {/* Admin Quick Login */}
            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              className="group flex w-full items-center justify-between rounded-xl bg-canvas p-3 text-left ring-1 ring-line transition-all hover:bg-brand-soft/30 hover:ring-brand/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-sky-soft text-sky">
                  <ShieldCheck className="size-4.5" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink group-hover:text-brand">Admin Portal</div>
                  <div className="font-mono text-[11px] text-muted-foreground">admin@aomlaundry.in</div>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-brand transition-transform" />
            </button>

            {/* Staff Quick Login */}
            <button
              type="button"
              onClick={() => handleQuickLogin("staff")}
              className="group flex w-full items-center justify-between rounded-xl bg-canvas p-3 text-left ring-1 ring-line transition-all hover:bg-brand-soft/30 hover:ring-brand/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-warning-soft text-warning">
                  <UserCheck className="size-4.5" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink group-hover:text-brand">Employee / Staff Portal</div>
                  <div className="font-mono text-[11px] text-muted-foreground">staff@aomlaundry.in</div>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-brand transition-transform" />
            </button>

            {/* Hotel / Customer Quick Login */}
            <button
              type="button"
              onClick={() => handleQuickLogin("customer")}
              className="group flex w-full items-center justify-between rounded-xl bg-canvas p-3 text-left ring-1 ring-line transition-all hover:bg-brand-soft/30 hover:ring-brand/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-emerald-soft text-emerald">
                  <Building className="size-4.5" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink group-hover:text-brand">Hotel / Customer Portal</div>
                  <div className="font-mono text-[11px] text-muted-foreground">customer@hotelgranda.in</div>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-brand transition-transform" />
            </button>
          </div>
        </div>

        {/* Manual Login Form */}
        <div className="mt-6 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 rounded-lg bg-danger-soft p-3 text-xs text-danger ring-1 ring-danger/30">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="label-mono block" htmlFor="email-input">
                Email Address
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aomlaundry.in"
                  className="w-full rounded-lg bg-canvas py-2.5 pr-3 pl-9 font-mono text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="label-mono block" htmlFor="password-input">
                  Password
                </label>
                <span className="font-mono text-[10px] text-muted-foreground">Default: demo password</span>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-canvas py-2.5 pr-3 pl-9 font-mono text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-sm font-semibold text-canvas shadow transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Sign In to Portal
            </button>
          </form>

          {/* Test Credentials Reference Helper */}
          <div className="mt-5 rounded-lg bg-canvas/60 p-3 ring-1 ring-line">
            <div className="label-mono text-[10px] text-muted-foreground">Test Credentials:</div>
            <div className="mt-1.5 space-y-1 font-mono text-[11px] text-muted-foreground">
              <div>&bull; Admin: <span className="text-ink">admin@aomlaundry.in</span> / <span className="text-muted-foreground">admin123</span></div>
              <div>&bull; Staff: <span className="text-ink">staff@aomlaundry.in</span> / <span className="text-muted-foreground">staff123</span></div>
              <div>&bull; Hotel: <span className="text-ink">customer@hotelgranda.in</span> / <span className="text-muted-foreground">hotel123</span></div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground">
          The AOM Industrial Laundry &bull; Pondicherry / Auroville
        </p>
      </div>
    </div>
  );
}
