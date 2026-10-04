"use client";

import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  CardHead,
  DateSelector,
  KpiCard,
  KpiStrip,
  PageHeader,
  SoilFreshChart,
  StatusBadge,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { activity, alerts, customers, kpis, TODAY, weekly } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const alertTone: Record<string, string> = {
  warn: "bg-warn-soft text-warn",
  sky: "bg-sky-soft text-sky",
  danger: "bg-danger-soft text-danger",
  neutral: "bg-canvas text-muted-foreground",
  brand: "bg-brand-soft text-brand",
};

export default function Dashboard() {
  return (
    <AdminLayout>
      <PageHeader
        title="Good morning, Admin"
        subtitle="Here's today's laundry operations overview."
        action={<DateSelector value={TODAY} />}
      />

      <KpiStrip>
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </KpiStrip>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Surface className="rise overflow-hidden xl:col-span-2 [animation-delay:120ms]">
          <CardHead
            title="Today's Laundry Operations"
            meta="5 customers · live"
            action={
              <Link
                href="/operations"
                className="rounded-lg bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand ring-1 ring-brand/20"
              >
                All ops →
              </Link>
            }
          />
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Customer</Th>
                <Th className="text-right">Soil Received</Th>
                <Th className="text-right">Fresh Delivered</Th>
                <Th className="text-right">Balance</Th>
                <Th className="px-5 text-right">Status</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-line/70 last:border-0">
                  <Td className="px-5">
                    <div className="font-semibold">{c.name}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{c.note}</div>
                  </Td>
                  <Td className="text-right font-mono">{c.soil}</Td>
                  <Td className="text-right font-mono">{c.fresh}</Td>
                  <Td className={cn("text-right font-mono font-medium", c.balance > 50 && "text-warn")}>
                    {c.balance}
                  </Td>
                  <Td className="px-5 text-right">
                    <StatusBadge status={c.ops} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>

        <div className="space-y-4">
          <Surface className="rise p-5 [animation-delay:220ms]">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold tracking-tight">Soil vs Fresh</h3>
              <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <i className="inline-block size-2 rounded-sm bg-sky" />
                  Soil
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="inline-block size-2 rounded-sm bg-brand" />
                  Fresh
                </span>
              </div>
            </div>
            <SoilFreshChart data={weekly} />
          </Surface>

          <Surface className="rise p-5 [animation-delay:320ms]">
            <h3 className="flex items-center gap-2 font-display font-bold tracking-tight">
              Attention Required
              <span className="grid size-5 place-items-center rounded-full bg-danger-soft font-mono text-[11px] font-medium text-danger">
                {alerts.length}
              </span>
            </h3>
            <ul className="mt-3 divide-y divide-line/70">
              {alerts.map((a) => (
                <li key={a.text} className="flex gap-3 py-2.5">
                  <span
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md text-[11px]",
                      alertTone[a.tone],
                    )}
                  >
                    !
                  </span>
                  <span className="text-sm leading-snug">{a.text}</span>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </div>

      <Surface className="rise mt-4 p-5 [animation-delay:420ms]">
        <h3 className="font-display font-bold tracking-tight">Recent Activity</h3>
        <ul className="mt-4 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {activity.map((a) => (
            <li key={a.text} className="flex gap-3">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg font-display text-xs font-bold",
                  alertTone[a.tone],
                )}
              >
                {a.initial}
              </span>
              <div>
                <p className="text-sm leading-snug">{a.text}</p>
                <span className="font-mono text-[11px] text-muted-foreground">{a.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </Surface>
    </AdminLayout>
  );
}
