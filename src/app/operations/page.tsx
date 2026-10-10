"use client";

import { useState } from "react";
import { Plus, Building } from "lucide-react";
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
  { time: "09:42 AM", customer: "Hotel Grand A", branch: "Mission Street (Main)", material: "Bath Towel", soil: 25, fresh: 20, by: "Arun" },
  { time: "09:20 AM", customer: "Ocean Resort", branch: "Main Resort (ECR)", material: "Bedsheet", soil: 40, fresh: 30, by: "Kumar" },
  { time: "08:55 AM", customer: "Hotel Royal B", branch: "Heritage Quarter", material: "Pillow Cover", soil: 18, fresh: 18, by: "Divya" },
  { time: "08:30 AM", customer: "Green Park Hotel", branch: "Single Location", material: "Blanket", soil: 12, fresh: 12, by: "Arun" },
  { time: "08:05 AM", customer: "Sunrise Resort", branch: "Single Location", material: "Hotel Uniform", soil: 22, fresh: 15, by: "Kumar" },
];

export default function OperationsPage() {
  const [tab, setTab] = useState<"Entry" | "Log">("Entry");
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0].id);
  const currentCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    currentCustomer.branches?.[0]?.id || "",
  );
  const [inputValues, setInputValues] = useState<Record<string, { soil: string; fresh: string }>>({});

  const handleCustomerChange = (customerId: string) => {
    setSelectedCustomerId(customerId);
    const cust = customers.find((c) => c.id === customerId);
    if (cust?.branches && cust.branches.length > 0) {
      setSelectedBranchId(cust.branches[0].id);
    } else {
      setSelectedBranchId("");
    }
    setInputValues({});
  };

  const handleInputChange = (materialName: string, field: "soil" | "fresh", value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [materialName]: {
        soil: field === "soil" ? value : prev[materialName]?.soil || "",
        fresh: field === "fresh" ? value : prev[materialName]?.fresh || "",
      },
    }));
  };

  const selectedBranch = currentCustomer.branches?.find((b) => b.id === selectedBranchId);

  return (
    <AdminLayout>
      <PageHeader
        title="Laundry Operations"
        subtitle="Record today's soil received and fresh delivered per location."
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
            meta={
              selectedBranch
                ? `${currentCustomer.name} · ${selectedBranch.name}`
                : `${currentCustomer.name} · ${TODAY}`
            }
            action={
              <PrimaryButton className="px-3 py-2 text-xs">
                <Plus className="size-3.5" /> Save Entries
              </PrimaryButton>
            }
          />
          <div className="flex flex-col gap-3 px-5 pb-4 sm:flex-row sm:items-center">
            <div className="flex-1 sm:max-w-xs">
              <label className="label-mono">Customer</label>
              <select
                value={selectedCustomerId}
                onChange={(e) => handleCustomerChange(e.target.value)}
                className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.branches && c.branches.length > 1 ? `(${c.branches.length} branches)` : ""}
                  </option>
                ))}
              </select>
            </div>

            {currentCustomer.branches && currentCustomer.branches.length > 0 ? (
              <div className="flex-1 sm:max-w-xs">
                <div className="flex items-center justify-between">
                  <label className="label-mono flex items-center gap-1.5 text-brand">
                    <Building className="size-3" /> Branch / Location
                  </label>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {currentCustomer.branches.length} locations
                  </span>
                </div>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="mt-1.5 w-full rounded-lg bg-brand-soft/40 px-3 py-2 text-sm font-medium text-ink ring-1 ring-brand/30 outline-none focus:ring-2 focus:ring-brand"
                >
                  {currentCustomer.branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.balance} pending)
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
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
                <Th>Customer &amp; Branch</Th>
                <Th>Material</Th>
                <Th className="text-right">Soil</Th>
                <Th className="text-right">Fresh</Th>
                <Th className="px-5">Recorded By</Th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.time + e.customer} className="border-b border-line/70 last:border-0 hover:bg-canvas/50">
                  <Td className="px-5 font-mono text-[13px] text-muted-foreground">{e.time}</Td>
                  <Td>
                    <div className="font-medium">{e.customer}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{e.branch}</div>
                  </Td>
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
        <CardHead title="Customer & Location Status" meta="today's operational completion" />
        <TableShell>
          <thead>
            <tr className="border-y border-line bg-canvas/60">
              <Th className="px-5">Customer / Location</Th>
              <Th className="text-right">Soil</Th>
              <Th className="text-right">Fresh</Th>
              <Th className="text-right">Balance</Th>
              <Th className="px-5 text-right">Status</Th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-line/70 last:border-0">
                <Td className="px-5">
                  <div className="font-medium">{c.name}</div>
                  {c.branches && c.branches.length > 1 ? (
                    <div className="mt-1 flex flex-wrap gap-1 font-mono text-[10px] text-muted-foreground">
                      {c.branches.map((b) => (
                        <span key={b.id} className="rounded bg-canvas px-1.5 py-0.5 ring-1 ring-line">
                          {b.name}: {b.balance} bal
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Td>
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
