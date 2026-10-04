"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  CardHead,
  DateSelector,
  KpiCard,
  KpiStrip,
  PageHeader,
  PrimaryButton,
  StatusBadge,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customers, materials, TODAY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const entries = [
  { time: "09:42 AM", customer: "Hotel Grand A", material: "Bath Towel", soil: 25, fresh: 20, by: "Arun" },
  { time: "09:20 AM", customer: "Ocean Resort", material: "Bedsheet", soil: 40, fresh: 30, by: "Kumar" },
  { time: "08:55 AM", customer: "Hotel Royal B", material: "Pillow Cover", soil: 18, fresh: 18, by: "Divya" },
  { time: "08:30 AM", customer: "Green Park Hotel", material: "Blanket", soil: 12, fresh: 12, by: "Arun" },
  { time: "08:05 AM", customer: "Sunrise Resort", material: "Hotel Uniform", soil: 22, fresh: 15, by: "Kumar" },
];

export default function OperationsPage() {
  const [tab, setTab] = useState<"Entry" | "Log">("Entry");
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0].id);
  const [inputValues, setInputValues] = useState<Record<string, { soil: string; fresh: string }>>({});

  const handleInputChange = (materialName: string, field: "soil" | "fresh", value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [materialName]: {
        soil: field === "soil" ? value : prev[materialName]?.soil || "",
        fresh: field === "fresh" ? value : prev[materialName]?.fresh || "",
      },
    }));
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Laundry Operations"
        subtitle="Record today's soil received and fresh delivered."
        action={<DateSelector value={TODAY} />}
      />

      <KpiStrip>
        <KpiCard label="Soil Received" value="1,248" note="items today" tone="sky" />
        <KpiCard label="Fresh Delivered" value="1,087" note="items today" tone="brand" />
        <KpiCard label="Pending" value="161" note="in process" tone="warn" />
        <KpiCard label="Entries Logged" value="31" note="by 4 staff" tone="ink" />
      </KpiStrip>

      <div className="mt-4 flex w-max gap-1 rounded-lg bg-canvas p-1 ring-1 ring-line">
        {(["Entry", "Log"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "cursor-pointer rounded-md px-4 py-1.5 text-xs font-medium transition-colors",
              tab === t ? "bg-card text-ink shadow-sm" : "text-muted-foreground hover:text-ink",
            )}
          >
            {t === "Entry" ? "Daily Entry" : "Activity Log"}
          </button>
        ))}
      </div>

      {tab === "Entry" ? (
        <Surface className="rise mt-4 overflow-hidden">
          <CardHead
            title="Daily Entry Sheet"
            meta={TODAY}
            action={
              <PrimaryButton className="px-3 py-2 text-xs">
                <Plus className="size-3.5" /> Save Entries
              </PrimaryButton>
            }
          />
          <div className="px-5 pb-3">
            <label className="label-mono">Customer</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="mt-2 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40 sm:max-w-xs"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Material</Th>
                <Th className="text-right">Opening</Th>
                <Th className="text-right">Soil Received</Th>
                <Th className="text-right">Fresh Delivered</Th>
                <Th className="px-5 text-right">Closing Balance</Th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m, i) => {
                const opening = 10 + i * 3;
                const soilVal = Number(inputValues[m.name]?.soil) || 0;
                const freshVal = Number(inputValues[m.name]?.fresh) || 0;
                const closingBalance = opening + soilVal - freshVal;

                return (
                  <tr key={m.name} className="border-b border-line/70 last:border-0">
                    <Td className="px-5 font-medium">{m.name}</Td>
                    <Td className="text-right font-mono text-muted-foreground">{opening}</Td>
                    <Td className="text-right">
                      <input
                        placeholder="0"
                        inputMode="numeric"
                        value={inputValues[m.name]?.soil || ""}
                        onChange={(e) => handleInputChange(m.name, "soil", e.target.value)}
                        className="w-20 rounded-lg bg-canvas px-3 py-1.5 text-right font-mono text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-sky/40"
                      />
                    </Td>
                    <Td className="text-right">
                      <input
                        placeholder="0"
                        inputMode="numeric"
                        value={inputValues[m.name]?.fresh || ""}
                        onChange={(e) => handleInputChange(m.name, "fresh", e.target.value)}
                        className="w-20 rounded-lg bg-canvas px-3 py-1.5 text-right font-mono text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                      />
                    </Td>
                    <Td className="px-5 text-right font-mono font-medium">{closingBalance}</Td>
                  </tr>
                );
              })}
            </tbody>
          </TableShell>
        </Surface>
      ) : (
        <Surface className="rise mt-4 overflow-hidden">
          <CardHead title="Today's Activity Log" meta="all staff entries" />
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Time</Th>
                <Th>Customer</Th>
                <Th>Material</Th>
                <Th className="text-right">Soil</Th>
                <Th className="text-right">Fresh</Th>
                <Th className="px-5">Recorded By</Th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.time} className="border-b border-line/70 last:border-0 hover:bg-canvas/50">
                  <Td className="px-5 font-mono text-[13px] text-muted-foreground">{e.time}</Td>
                  <Td className="font-medium">{e.customer}</Td>
                  <Td className="text-muted-foreground">{e.material}</Td>
                  <Td className="text-right font-mono">{e.soil}</Td>
                  <Td className="text-right font-mono">{e.fresh}</Td>
                  <Td className="px-5">{e.by}</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>
      )}

      <Surface className="rise mt-4 overflow-hidden [animation-delay:200ms]">
        <CardHead title="Customer Status" meta="today's completion" />
        <TableShell>
          <thead>
            <tr className="border-y border-line bg-canvas/60">
              <Th className="px-5">Customer</Th>
              <Th className="text-right">Soil</Th>
              <Th className="text-right">Fresh</Th>
              <Th className="text-right">Balance</Th>
              <Th className="px-5 text-right">Status</Th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-line/70 last:border-0">
                <Td className="px-5 font-medium">{c.name}</Td>
                <Td className="text-right font-mono">{c.soil}</Td>
                <Td className="text-right font-mono">{c.fresh}</Td>
                <Td className="text-right font-mono font-medium">{c.balance}</Td>
                <Td className="px-5 text-right">
                  <StatusBadge status={c.ops} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Surface>
    </AdminLayout>
  );
}
