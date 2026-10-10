"use client";

import { useState } from "react";
import { Check, Building, Save, AlertCircle } from "lucide-react";
import { EmployeeLayout } from "@/components/employee/EmployeeLayout";
import {
  CardHead,
  PageHeader,
  PrimaryButton,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customers, materialLedger, TODAY } from "@/lib/mock-data";

export default function EmployeeOperationsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0].id);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const customer = customers.find((c) => c.id === selectedCustomer) || customers[0];
  const hasBranches = customer.branches && customer.branches.length > 0;

  // Local state for material inputs
  const [rows, setRows] = useState(
    materialLedger.map((row) => ({
      material: row.material,
      opening: row.opening,
      soil: row.soil,
      fresh: row.fresh,
    }))
  );

  const handleSoilChange = (index: number, val: number) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, soil: Math.max(0, val) } : r))
    );
  };

  const handleFreshChange = (index: number, val: number) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, fresh: Math.max(0, val) } : r))
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const totalSoil = rows.reduce((acc, r) => acc + r.soil, 0);
  const totalFresh = rows.reduce((acc, r) => acc + r.fresh, 0);
  const totalClosing = rows.reduce((acc, r) => acc + (r.opening + r.soil - r.fresh), 0);

  return (
    <EmployeeLayout>
      <PageHeader
        title="Daily Laundry Entry Sheet"
        meta={`Shift A &bull; ${TODAY} &bull; Physical intake & delivery count logging`}
      />

      {savedSuccess && (
        <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-emerald-soft p-4 text-xs font-semibold text-emerald ring-1 ring-emerald/30">
          <Check className="size-4 shrink-0" />
          <span>Daily slip recorded successfully for {customer.name}! Ledgers updated in database.</span>
        </div>
      )}

      {/* Customer & Branch Selection Bar */}
      <Surface className="mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="label-mono mb-1.5 block" htmlFor="emp-customer-select">
              1. Select Customer / Hotel *
            </label>
            <select
              id="emp-customer-select"
              value={selectedCustomer}
              onChange={(e) => {
                setSelectedCustomer(e.target.value);
                setSelectedBranch("all");
              }}
              className="w-full rounded-lg bg-canvas px-3 py-2 text-sm font-semibold ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
            >
              {customers
                .filter((c) => c.status === "Active")
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.branches ? `${c.branches.length} branches` : "Single location"})
                  </option>
                ))}
            </select>
          </div>

          {hasBranches ? (
            <div>
              <label className="label-mono mb-1.5 block" htmlFor="emp-branch-select">
                2. Select Property Branch *
              </label>
              <select
                id="emp-branch-select"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full rounded-lg bg-brand-soft/40 px-3 py-2 text-sm font-semibold text-brand ring-1 ring-brand/30 outline-none focus:ring-2 focus:ring-brand/40"
              >
                <option value="all">Consolidated / All Locations</option>
                {customer.branches?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.address.split(",")[0]})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <span className="label-mono mb-1.5 block">2. Branch Location</span>
              <div className="flex h-9 items-center rounded-lg bg-canvas px-3 font-mono text-xs text-muted-foreground ring-1 ring-line">
                <Building className="mr-2 size-3.5" /> Single Physical Location
              </div>
            </div>
          )}

          <div className="flex items-end">
            <div className="rounded-lg bg-canvas px-3.5 py-2 ring-1 ring-line w-full">
              <span className="label-mono text-[10px] text-muted-foreground">Contact On-Site:</span>
              <div className="font-semibold text-xs text-ink">{customer.contact} &bull; {customer.phone}</div>
            </div>
          </div>
        </div>
      </Surface>

      {/* Material Count Entry Grid */}
      <Surface>
        <CardHead
          title="Material Ledger & Daily Counts"
          meta="Closing Balance = Opening + Soil Received - Fresh Delivered"
          action={
            <PrimaryButton onClick={handleSave}>
              <Save className="size-4" /> Save Shift Transaction
            </PrimaryButton>
          }
        />

        <TableShell>
          <thead>
            <tr>
              <Th className="px-5">Material Item</Th>
              <Th>Opening Balance</Th>
              <Th className="w-32">Soil Received (In)</Th>
              <Th className="w-32">Fresh Delivered (Out)</Th>
              <Th>Closing Balance</Th>
              <Th className="pr-5 text-right">Verification</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const closing = row.opening + row.soil - row.fresh;
              const hasAlert = closing > 30;

              return (
                <tr key={row.material} className="border-b border-line last:border-0 hover:bg-canvas/40">
                  <Td className="px-5 font-semibold text-ink">{row.material}</Td>
                  <Td mono className="text-muted-foreground">{row.opening}</Td>
                  <Td>
                    <input
                      type="number"
                      min={0}
                      value={row.soil}
                      onChange={(e) => handleSoilChange(idx, parseInt(e.target.value) || 0)}
                      className="w-24 rounded-md bg-canvas px-2.5 py-1.5 font-mono text-sm font-semibold ring-1 ring-line focus:ring-2 focus:ring-brand/40 outline-none"
                    />
                  </Td>
                  <Td>
                    <input
                      type="number"
                      min={0}
                      value={row.fresh}
                      onChange={(e) => handleFreshChange(idx, parseInt(e.target.value) || 0)}
                      className="w-24 rounded-md bg-canvas px-2.5 py-1.5 font-mono text-sm font-semibold text-emerald ring-1 ring-line focus:ring-2 focus:ring-emerald/40 outline-none"
                    />
                  </Td>
                  <Td mono className={closing < 0 ? "font-bold text-danger" : "font-bold text-ink"}>
                    {closing} pcs
                  </Td>
                  <Td className="pr-5 text-right font-mono text-xs">
                    {closing < 0 ? (
                      <span className="inline-flex items-center gap-1 rounded bg-danger-soft px-2 py-0.5 text-danger font-medium">
                        <AlertCircle className="size-3" /> Check counts
                      </span>
                    ) : hasAlert ? (
                      <span className="rounded bg-warning-soft px-2 py-0.5 text-warning font-medium">
                        High Backlog
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Normal</span>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-canvas/80 font-bold border-t border-line">
              <Td className="px-5">Shift Total</Td>
              <Td mono className="text-muted-foreground">
                {rows.reduce((acc, r) => acc + r.opening, 0)}
              </Td>
              <Td mono className="text-ink">{totalSoil} pcs</Td>
              <Td mono className="text-emerald">{totalFresh} pcs</Td>
              <Td mono className="text-brand">{totalClosing} pcs</Td>
              <Td className="pr-5 text-right font-mono text-xs text-muted-foreground">
                Formula verified
              </Td>
            </tr>
          </tfoot>
        </TableShell>

        <div className="flex items-center justify-between border-t border-line p-5">
          <p className="font-mono text-xs text-muted-foreground">
            Transaction timestamps and driver dispatch ID are attached automatically upon submission.
          </p>
          <PrimaryButton onClick={handleSave}>
            <Save className="size-4" /> Save Shift Transaction
          </PrimaryButton>
        </div>
      </Surface>
    </EmployeeLayout>
  );
}
