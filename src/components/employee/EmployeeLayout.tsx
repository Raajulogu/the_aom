"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  History,
  Menu,
  X,
  Bell,
  LogOut,
  Plus,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { AuthGuard } from "@/components/auth/AuthGuard";

const nav = [
  { href: "/employee", label: "Operations Dashboard", icon: LayoutDashboard },
  { href: "/employee/operations", label: "Daily Entry Sheet", icon: ClipboardList },
  { href: "/employee/customers", label: "Customer Balances", icon: Building2 },
  { href: "/employee/history", label: "Shift Activity Log", icon: History },
] as const;

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-9 rotate-6 place-items-center rounded-xl bg-ink shadow-sm">
        <span className="-rotate-6 font-display text-sm font-bold text-canvas">A</span>
      </div>
      <div>
        <div className="font-display text-[15px] leading-none font-bold tracking-tight">AOM Staff Hub</div>
        <div className="label-mono mt-1 text-warning">Floor Operations</div>
      </div>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      <span className="label-mono mb-1 px-3">Staff Workspace</span>
      {nav.map(({ href, label, icon: Icon }) => {
        const active = href === "/employee" ? pathname === "/employee" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-warning-soft font-medium text-ink ring-1 ring-warning/30"
                : "text-muted-foreground hover:bg-canvas hover:text-ink"
            )}
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function EmployeeLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user, role, logout } = useAuth();

  return (
    <AuthGuard allowedRoles={["admin", "staff"]}>
      <div className="flex min-h-screen bg-canvas text-ink">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-line bg-card/70 px-4 py-6 backdrop-blur-md lg:flex">
          <div className="mb-8 px-2">
            <Brand />
          </div>

          <NavList />

          <div className="mt-6 px-2">
            <Link
              href="/employee/operations"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-xs font-semibold text-canvas shadow transition-opacity hover:opacity-90"
            >
              <Plus className="size-3.5" /> Fast Daily Entry
            </Link>
          </div>

          <div className="mt-auto pt-6 space-y-4">
            {role === "admin" && (
              <div className="rounded-lg bg-sky-soft/40 p-2.5 text-xs ring-1 ring-sky/30">
                <div className="flex items-center gap-1.5 font-medium text-sky">
                  <ShieldAlert className="size-3.5" /> Admin Viewing Mode
                </div>
                <Link href="/" className="mt-1 block font-mono text-[11px] text-muted-foreground hover:text-ink">
                  &larr; Return to Admin Portal
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-line pt-4 px-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-warning-soft font-display text-xs font-bold text-warning">
                  {user?.avatar || "A"}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold">{user?.name || "Arun Pandian"}</div>
                  <div className="truncate font-mono text-[10px] text-muted-foreground">
                    {user?.email || "staff@aomlaundry.in"}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Sign Out"
                className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground ring-1 ring-line hover:bg-danger-soft hover:text-danger hover:ring-danger/30 transition-colors"
              >
                <LogOut className="size-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-ink/40"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 flex w-[280px] flex-col overflow-y-auto bg-card px-4 py-5">
              <div className="mb-6 flex items-center justify-between">
                <Brand />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid size-9 place-items-center rounded-lg ring-1 ring-line"
                >
                  <X className="size-4" />
                </button>
              </div>
              <NavList onNavigate={() => setOpen(false)} />
              <div className="mt-auto pt-6 space-y-4">
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-danger-soft py-2 text-xs font-semibold text-danger ring-1 ring-danger/30"
                >
                  <LogOut className="size-3.5" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-5">
            <div className="flex min-w-0 items-center gap-3 lg:hidden">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-card ring-1 ring-line"
              >
                <Menu className="size-4" />
              </button>
              <span className="truncate font-display font-bold tracking-tight">Staff Portal</span>
            </div>
            <div className="hidden min-w-0 lg:block">
              <span className="rounded-full bg-warning-soft px-3 py-1 font-mono text-xs font-medium text-warning ring-1 ring-warning/30">
                Operational Staff Access &bull; Shift Shift-A
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="relative grid size-9 place-items-center rounded-lg bg-card ring-1 ring-line"
              >
                <Bell className="size-4" strokeWidth={1.75} />
              </button>
              <div className="hidden text-right sm:block">
                <div className="text-sm leading-none font-semibold">{user?.name || "Arun Pandian"}</div>
                <div className="mt-1 font-mono text-[10px] text-muted-foreground">Operations Supervisor</div>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Sign Out"
                className="flex items-center gap-1.5 rounded-lg bg-card px-2.5 py-1.5 text-xs text-muted-foreground ring-1 ring-line hover:bg-danger-soft hover:text-danger hover:ring-danger/30 transition-colors"
              >
                <LogOut className="size-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          <div className="flex-1 px-5 pb-12 sm:px-8">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}
