"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  CardHead,
  GhostButton,
  KpiCard,
  KpiStrip,
  PageHeader,
  PrimaryButton,
  SoilFreshChart,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customers, materialLedger, monthlyVolume, weekly } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ranges = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

export default function ReportsPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>("Monthly");
  const max = Math.max(...monthlyVolume.map((m) => m.items));

  return (
    <AdminLayout>
      <PageHeader
        title="Reports"
        subtitle="Volume, revenue and customer performance."
        action={
          <PrimaryButton>
            <Download className="size-4" /> Export
          </PrimaryButton>
        }
      />

      <div className="mt-4 flex w-max gap-1 rounded-lg bg-canvas p-1 ring-1 ring-line">
        {ranges.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              "cursor-pointer rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors",
              range === r ? "bg-card text-ink shadow-sm" : "text-muted-foreground hover:text-ink",
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <KpiStrip>
        <KpiCard label="Items Processed" value="1,51,750" note={`${range} view`} tone="brand" />
        <KpiCard label="Revenue" value="₹12.4L" note="6 months" tone="ink" />
        <KpiCard label="Avg Daily Volume" value="1,182" note="items per day" tone="sky" />
        <KpiCard label="Delivery Rate" value="94.2%" note="fresh vs soil" tone="warn" />
      </KpiStrip>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Surface className="rise p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold tracking-tight">Monthly Volume</h3>
            <span className="label-mono">items</span>
          </div>
          <div className="mt-6 flex h-40 items-end justify-between gap-2">
            {monthlyVolume.map((m, i) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {(m.items / 1000).toFixed(1)}k
                </span>
                <div
                  className="grow-bar w-full rounded-t-md bg-brand"
                  style={{ height: `${(m.items / max) * 100}%`, animationDelay: `${i * 70 + 150}ms` }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </Surface>

        <Surface className="rise p-5 [animation-delay:120ms]">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold tracking-tight">Soil vs Fresh (this week)</h3>
            <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <i className="inline-block size-2 rounded-sm bg-sky" /> Soil
              </span>
              <span className="flex items-center gap-1.5">
                <i className="inline-block size-2 rounded-sm bg-brand" /> Fresh
              </span>
            </div>
          </div>
          <SoilFreshChart data={weekly} />
        </Surface>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Surface className="rise overflow-hidden [animation-delay:200ms]">
          <CardHead
            title="Customer-wise Report"
            meta="current month"
            action={<GhostButton>CSV</GhostButton>}
          />
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Customer</Th>
                <Th className="text-right">Items</Th>
                <Th className="text-right">Balance</Th>
                <Th className="px-5 text-right">Value</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-line/70 last:border-0">
                  <Td className="px-5 font-medium">{c.name}</Td>
                  <Td className="text-right font-mono">{c.total}</Td>
                  <Td className="text-right font-mono">{c.balance}</Td>
                  <Td className="px-5 text-right font-mono font-medium">{c.monthlyValue}</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>

        <Surface className="rise overflow-hidden [animation-delay:280ms]">
          <CardHead title="Material-wise Report" meta="current month" action={<GhostButton>CSV</GhostButton>} />
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Material</Th>
                <Th className="text-right">Soil</Th>
                <Th className="text-right">Fresh</Th>
                <Th className="px-5 text-right">Total</Th>
              </tr>
            </thead>
            <tbody>
              {materialLedger.map((m) => (
                <tr key={m.material} className="border-b border-line/70 last:border-0">
                  <Td className="px-5 font-medium">{m.material}</Td>
                  <Td className="text-right font-mono">{m.soil}</Td>
                  <Td className="text-right font-mono">{m.fresh}</Td>
                  <Td className="px-5 text-right font-mono font-medium">{m.total}</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>
      </div>
    </AdminLayout>
  );
}
