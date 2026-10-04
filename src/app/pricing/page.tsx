"use client";

import { useState } from "react";
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

const overrides: Record<string, Record<string, number>> = {
  "hotel-grand-a": { Bedsheet: 100, "Bath Towel": 80, "Pillow Cover": 40 },
  "hotel-royal-b": { Bedsheet: 95, Blanket: 140 },
  "ocean-resort": { "Bath Towel": 85, Curtain: 200 },
};

export default function PricingPage() {
  const [customerId, setCustomerId] = useState(customers[0].id);
  const customer = customers.find((c) => c.id === customerId) || customers[0];
  const custom = overrides[customerId] ?? {};

  return (
    <AdminLayout>
      <PageHeader
        title="Pricing"
        subtitle="Customer-specific rates that override the default price list."
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
                onClick={() => setCustomerId(c.id)}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                  c.id === customerId
                    ? "bg-brand-soft font-medium text-brand ring-1 ring-brand/15"
                    : "text-muted-foreground hover:bg-canvas hover:text-ink",
                )}
              >
                <div className="truncate">{c.name}</div>
                <div className="font-mono text-[10px] opacity-70">{c.materials} materials</div>
              </button>
            ))}
          </div>
        </Surface>

        <Surface className="rise overflow-hidden [animation-delay:120ms]">
          <CardHead
            title={`Rates for ${customer.name}`}
            meta="blank agreed rate falls back to the default"
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
                const rate = custom[m.name];
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
                        key={customerId + m.name}
                        className="w-24 rounded-lg bg-canvas px-3 py-1.5 text-right font-mono text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                      />
                    </Td>
                    <Td className="px-5 text-right text-xs font-medium">
                      {rate ? (
                        <span className="text-brand">Custom</span>
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
    </AdminLayout>
  );
}
