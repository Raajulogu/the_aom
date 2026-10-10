"use client";

import { useState } from "react";
import { Building } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  CardHead,
  GhostButton,
  PageHeader,
  PrimaryButton,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customers, materials } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const customerOverrides: Record<string, Record<string, number>> = {
  "hotel-grand-a": { Bedsheet: 100, "Bath Towel": 80, "Pillow Cover": 40 },
  "hotel-royal-b": { Bedsheet: 95, Blanket: 140 },
  "ocean-resort": { "Bath Towel": 85, Curtain: 200 },
};

const branchOverrides: Record<string, Record<string, number>> = {
  "hotel-grand-a-beach": { Bedsheet: 105, "Bath Towel": 85 },
  "ocean-resort-spa": { "Bath Towel": 90, Curtain: 210 },
};

export default function PricingPage() {
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("base");

  const customer = customers.find((c) => c.id === customerId) || customers[0];

  const handleSelectCustomer = (id: string) => {
    setCustomerId(id);
    setSelectedBranchId("base");
  };

  // Determine current active rates
  const currentRates =
    selectedBranchId === "base"
      ? customerOverrides[customerId] ?? {}
      : branchOverrides[selectedBranchId] ?? customerOverrides[customerId] ?? {};

  const activeBranch = customer.branches?.find((b) => b.id === selectedBranchId);

  return (
    <AdminLayout>
      <PageHeader
        title="Pricing"
        subtitle="Customer and branch-specific rates that override the default price list."
        action={<PrimaryButton>Save Changes</PrimaryButton>}
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Surface className="rise p-3">
          <div className="label-mono px-2 pt-2 pb-3">Select customer</div>
          <div className="flex flex-col gap-1">
            {customers.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectCustomer(c.id)}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                  c.id === customerId
                    ? "bg-brand-soft font-medium text-brand ring-1 ring-brand/15"
                    : "text-muted-foreground hover:bg-canvas hover:text-ink",
                )}
              >
                <div className="truncate font-medium">{c.name}</div>
                <div className="flex items-center gap-2 font-mono text-[10px] opacity-70">
                  <span>{c.materials} materials</span>
                  {c.branches && c.branches.length > 1 ? (
                    <span className="text-brand">· {c.branches.length} branches</span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </Surface>

        <div className="space-y-4">
          {/* Branch Rate Switcher if Customer has Branches */}
          {customer.branches && customer.branches.length > 1 ? (
            <Surface className="p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="label-mono flex items-center gap-1.5 text-brand">
                  <Building className="size-3.5" /> Rate Scope:
                </span>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedBranchId("base")}
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                      selectedBranchId === "base"
                        ? "bg-brand text-card shadow-sm"
                        : "bg-canvas text-muted-foreground hover:text-ink ring-1 ring-line",
                    )}
                  >
                    Customer Base Rates
                  </button>
                  {customer.branches.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBranchId(b.id)}
                      className={cn(
                        "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                        selectedBranchId === b.id
                          ? "bg-brand text-card shadow-sm"
                          : "bg-canvas text-muted-foreground hover:text-ink ring-1 ring-line",
                      )}
                    >
                      {b.name} Override
                    </button>
                  ))}
                </div>
              </div>
            </Surface>
          ) : null}

          <Surface className="rise overflow-hidden [animation-delay:120ms]">
            <CardHead
              title={
                activeBranch
                  ? `Agreed Rates for ${customer.name} (${activeBranch.name})`
                  : `Base Agreed Rates for ${customer.name}`
              }
              meta={
                activeBranch
                  ? "branch overrides take highest precedence"
                  : "blank agreed rate falls back to master default"
              }
              action={<GhostButton>Reset to defaults</GhostButton>}
            />
            <TableShell>
              <thead>
                <tr className="border-y border-line bg-canvas/60">
                  <Th className="px-5">Material</Th>
                  <Th>Unit</Th>
                  <Th className="text-right">Default</Th>
                  <Th className="text-right">Agreed Rate</Th>
                  <Th className="px-5 text-right">Status</Th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => {
                  const rate = currentRates[m.name];
                  const isBranchOverridden =
                    selectedBranchId !== "base" &&
                    branchOverrides[selectedBranchId]?.[m.name] !== undefined;

                  return (
                    <tr key={m.name} className="border-b border-line/70 last:border-0">
                      <Td className="px-5 font-medium">{m.name}</Td>
                      <Td className="text-muted-foreground">{m.unit}</Td>
                      <Td className="text-right font-mono text-muted-foreground">₹{m.rate}</Td>
                      <Td className="text-right">
                        <input
                          defaultValue={rate ?? ""}
                          placeholder={String(m.rate)}
                          inputMode="numeric"
                          key={customerId + selectedBranchId + m.name}
                          className={cn(
                            "w-24 rounded-lg bg-canvas px-3 py-1.5 text-right font-mono text-sm ring-1 ring-line outline-none focus:ring-2",
                            isBranchOverridden ? "border-brand bg-brand-soft/30 font-semibold text-brand" : "focus:ring-brand/40",
                          )}
                        />
                      </Td>
                      <Td className="px-5 text-right text-xs font-medium">
                        {isBranchOverridden ? (
                          <span className="rounded bg-brand-soft px-1.5 py-0.5 text-brand">
                            Branch Custom
                          </span>
                        ) : rate ? (
                          <span className="text-brand">Customer Custom</span>
                        ) : (
                          <span className="text-muted-foreground">Default</span>
                        )}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </TableShell>
          </Surface>
        </div>
      </div>
    </AdminLayout>
  );
}
