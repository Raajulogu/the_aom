"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone =
  | "brand"
  | "sky"
  | "warn"
  | "warning"
  | "danger"
  | "neutral"
  | "ink"
  | "default"
  | "success";

const toneChip: Record<string, string> = {
  brand: "bg-brand-soft text-brand",
  success: "bg-brand-soft text-brand",
  sky: "bg-sky-soft text-sky",
  warn: "bg-warn-soft text-warn",
  warning: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
  neutral: "bg-canvas text-muted-foreground",
  default: "bg-canvas text-muted-foreground",
  ink: "bg-ink text-canvas",
};

export function Surface({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("surface", className)}>{children}</section>;
}

export function PageHeader({
  title,
  subtitle,
  meta,
  action,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  action?: ReactNode;
}) {
  const desc = subtitle ?? meta;
  return (
    <div className="rise grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-bold tracking-tight text-balance sm:text-[28px]">{title}</h1>
        {desc ? <p className="mt-1 text-sm text-muted-foreground">{desc}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Chip({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={cn("inline-block rounded-md px-2.5 py-1 text-[11px] font-medium", toneChip[tone] ?? toneChip.neutral)}>
      {children}
    </span>
  );
}

const statusTone: Record<string, Tone> = {
  Processing: "sky",
  "On Track": "brand",
  Attention: "warn",
  Completed: "neutral",
  Active: "brand",
  Inactive: "neutral",
  Generated: "sky",
  Pending: "warn",
  Paid: "brand",
};

export function StatusBadge({ status }: { status: string }) {
  return <Chip tone={statusTone[status] ?? "neutral"}>{status}</Chip>;
}

export function KpiCard({
  label,
  value,
  note,
  delta,
  tone = "brand",
}: {
  label: string;
  value: string;
  note?: string;
  delta?: string;
  tone?: Tone;
}) {
  const dark = tone === "ink";
  const noteText = note ?? delta;
  return (
    <div
      className={cn(
        "w-[220px] shrink-0 rounded-2xl p-5 shadow-sm",
        dark ? "bg-ink text-canvas ring-1 ring-ink" : "bg-card ring-1 ring-line",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "grid size-6 place-items-center rounded-md text-xs",
            dark ? "bg-canvas/10 text-brand-soft" : (toneChip[tone] ?? toneChip.brand),
          )}
        >
          ●
        </span>
        <span className={cn("text-xs font-medium", dark ? "text-canvas/60" : "text-muted-foreground")}>
          {label}
        </span>
      </div>
      <div className="mt-3 font-display text-3xl font-bold tracking-tight">{value}</div>
      {noteText ? (
        <div className={cn("mt-2 font-mono text-[11px]", dark ? "text-brand-soft" : "text-muted-foreground")}>
          {noteText}
        </div>
      ) : null}
    </div>
  );
}

export function KpiStrip({ children }: { children: ReactNode }) {
  return (
    <div className="no-bar -mx-5 mt-6 overflow-x-auto pb-1 sm:mx-0">
      <div className="flex min-w-max gap-3 px-5 sm:px-0">{children}</div>
    </div>
  );
}

export function CardHead({
  title,
  meta,
  action,
}: {
  title: string;
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
      <div className="min-w-0">
        <h2 className="font-display font-bold tracking-tight text-balance">{title}</h2>
        {meta ? <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{meta}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Th({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <th
      className={cn(
        "px-3 py-2.5 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  className,
  children,
  mono,
}: {
  className?: string;
  children?: ReactNode;
  mono?: boolean;
}) {
  return (
    <td className={cn("px-3 py-3 align-middle", mono && "font-mono", className)}>
      {children}
    </td>
  );
}

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max text-sm">{children}</table>
    </div>
  );
}

export function GhostButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-line transition-colors hover:text-ink",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-canvas shadow-sm transition-opacity hover:opacity-90",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function DateSelector({ label = "Viewing", value }: { label?: string; value: string }) {
  return (
    <button className="flex cursor-pointer items-center gap-3 rounded-xl bg-card py-2 pr-3 pl-4 shadow-sm ring-1 ring-line">
      <span className="label-mono">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
      <span className="text-xs text-muted-foreground">▾</span>
    </button>
  );
}

export function SoilFreshChart({
  data,
}: {
  data: { day: string; soil: number; fresh: number }[];
}) {
  const max = Math.max(...data.flatMap((d) => [d.soil, d.fresh]));
  return (
    <div className="mt-5 flex h-32 items-end justify-between gap-1.5">
      {data.map((d, i) => (
        <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-24 items-end gap-1">
            <div
              className="grow-bar w-2.5 rounded-sm bg-sky"
              style={{ height: `${(d.soil / max) * 100}%`, animationDelay: `${i * 60 + 200}ms` }}
            />
            <div
              className="grow-bar w-2.5 rounded-sm bg-brand"
              style={{ height: `${(d.fresh / max) * 100}%`, animationDelay: `${i * 60 + 240}ms` }}
            />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">{d.day.slice(0, 3)}</span>
        </div>
      ))}
    </div>
  );
}
