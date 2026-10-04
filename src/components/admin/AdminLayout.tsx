"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Building2,
  Package,
  IndianRupee,
  ClipboardList,
  FileText,
  BarChart3,
  Users,
  Settings,
  Menu,
  X,
  Search,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Building2 },
  { href: "/materials", label: "Materials", icon: Package },
  { href: "/pricing", label: "Pricing", icon: IndianRupee },
  { href: "/operations", label: "Laundry Operations", icon: ClipboardList },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

function PortalSwitch() {
  return (
    <div>
      <div className="label-mono mb-2 px-3">Portal</div>
      <div className="grid grid-cols-3 rounded-lg bg-canvas p-1 text-[11px] font-medium ring-1 ring-line">
        <span className="rounded-md bg-card py-1.5 text-center text-ink shadow-sm">Admin</span>
        <span className="rounded-md py-1.5 text-center text-muted-foreground">Staff</span>
        <span className="rounded-md py-1.5 text-center text-muted-foreground">Hotel</span>
      </div>
      <p className="mt-2 px-1 text-[11px] leading-snug text-muted-foreground">
        Employee &amp; Customer portals arrive in a later phase.
      </p>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-9 rotate-6 place-items-center rounded-xl bg-ink">
        <span className="-rotate-6 font-display text-sm font-bold text-canvas">A</span>
      </div>
      <div>
        <div className="font-display text-[15px] leading-none font-bold tracking-tight">AOM Laundry</div>
        <div className="label-mono mt-1">Operations</div>
      </div>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      <span className="label-mono mb-1 px-3">Workspace</span>
      {nav.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-brand-soft font-medium text-brand ring-1 ring-brand/15"
                : "text-muted-foreground hover:bg-canvas hover:text-ink",
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

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-line bg-card/70 px-4 py-6 backdrop-blur-md lg:flex">
        <div className="mb-8 px-2">
          <Brand />
        </div>
        <NavList />
        <div className="mt-auto pt-8">
          <PortalSwitch />
          <div className="mt-4 flex items-center gap-3 px-2">
            <div className="grid size-9 place-items-center rounded-full bg-sky-soft font-display text-sm font-bold text-sky">
              R
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Rajesh Kumar</div>
              <div className="font-mono text-[10px] text-muted-foreground">Pondicherry HQ</div>
            </div>
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
            <div className="mt-auto pt-8">
              <PortalSwitch />
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
            <span className="truncate font-display font-bold tracking-tight">AOM Laundry</span>
          </div>
          <div className="hidden min-w-0 lg:block">
            <div className="relative max-w-md">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="w-full rounded-lg bg-card py-2 pr-3 pl-9 text-sm ring-1 ring-line outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-brand/40"
                placeholder="Search customers, invoices, materials…"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="relative grid size-9 place-items-center rounded-lg bg-card ring-1 ring-line"
            >
              <Bell className="size-4" strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-danger" />
            </button>
            <div className="hidden text-right sm:block">
              <div className="text-sm leading-none font-semibold">Rajesh Kumar</div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground">Administrator</div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-5 pb-12 sm:px-8">{children}</div>
      </main>
    </div>
  );
}
