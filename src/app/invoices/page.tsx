"use client";

import { useState } from "react";
import { FileText, Building, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  CardHead,
  GhostButton,
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
import { invoiceLines, invoices, rupee, customers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statuses = ["All", "Generated", "Pending", "Paid"] as const;

export default function InvoicesPage() {
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [selected, setSelected] = useState(invoices[0]);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  // Generate Invoice form state
  const [selectedCustId, setSelectedCustId] = useState(customers[0].id);
  const [invoiceType, setInvoiceType] = useState<"consolidated" | "branch">("consolidated");
  const [selectedBranchId, setSelectedBranchId] = useState("");

  const activeCustomer = customers.find((c) => c.id === selectedCustId);

  const rows = invoices.filter((i) => status === "All" || i.status === status);
  const subtotal = invoiceLines.reduce((s, l) => s + l.amount, 0);
  const gst = Math.round(subtotal * 0.18);

  const handleOpenGenerate = () => {
    setIsGenerateOpen(true);
    const cust = customers[0];
    setSelectedCustId(cust.id);
    if (cust.branches && cust.branches.length > 0) {
      setSelectedBranchId(cust.branches[0].id);
    }
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Invoices"
        subtitle="Monthly billing for each customer & branch location."
        action={
          <PrimaryButton onClick={handleOpenGenerate}>
            <FileText className="size-4" /> Generate Invoice
          </PrimaryButton>
        }
      />

      <KpiStrip>
        <KpiCard label="This Month Billed" value="₹2.93L" note="4 invoices" tone="brand" />
        <KpiCard label="Paid" value="₹58,200" note="1 invoice" tone="sky" />
        <KpiCard label="Outstanding" value="₹3.1L" note="8 invoices pending" tone="danger" />
        <KpiCard label="Avg Invoice" value="₹58,660" note="last 6 months" tone="ink" />
      </KpiStrip>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Surface className="rise overflow-hidden">
          <CardHead
            title="Invoice Register"
            meta={`${rows.length} invoices`}
            action={
              <div className="flex gap-1 rounded-lg bg-canvas p-1 ring-1 ring-line">
                {statuses.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={cn(
                      "cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors",
                      status === s ? "bg-card text-ink shadow-sm" : "text-muted-foreground hover:text-ink",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            }
          />
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Invoice</Th>
                <Th>Customer / Branch</Th>
                <Th>Month</Th>
                <Th className="text-right">Amount</Th>
                <Th>Status</Th>
                <Th className="px-5 text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr
                  key={i.no}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "cursor-pointer border-b border-line/70 last:border-0 hover:bg-canvas/50",
                    selected.no === i.no && "bg-brand-soft/40",
                  )}
                >
                  <Td className="px-5 font-mono text-[13px] font-medium">{i.no}</Td>
                  <Td>
                    <div className="font-medium">{i.customer}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {i.customer === "Hotel Grand A" ? "Consolidated (2 branches)" : "Single Location"}
                    </div>
                  </Td>
                  <Td className="text-muted-foreground">{i.month}</Td>
                  <Td className="text-right font-mono font-medium">{i.amount}</Td>
                  <Td>
                    <StatusBadge status={i.status} />
                  </Td>
                  <Td className="px-5 text-right whitespace-nowrap">
                    <button type="button" className="cursor-pointer text-xs font-medium text-brand hover:underline">View</button>
                    <span className="mx-2 text-line">|</span>
                    <button type="button" className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-ink">
                      PDF
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>

        <Surface className="rise overflow-hidden [animation-delay:120ms]">
          <CardHead
            title={selected.no}
            meta={`${selected.customer} · ${selected.month}`}
          />
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between border-y border-line py-3">
              <div>
                <span className="label-mono">Billing Scope</span>
                <div className="font-mono text-xs font-medium text-brand">
                  {selected.customer === "Hotel Grand A" ? "Consolidated (All Branches)" : "Main Facility"}
                </div>
              </div>
              <div className="text-right">
                <span className="label-mono">Invoice Date</span>
                <div className="font-mono text-xs">{selected.date}</div>
              </div>
            </div>
            <ul className="divide-y divide-line/70">
              {invoiceLines.map((l) => (
                <li key={l.material} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium">{l.material}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {l.qty} × ₹{l.rate}
                    </div>
                  </div>
                  <span className="font-mono text-sm">{rupee(l.amount)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-2 border-t border-line pt-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono">{rupee(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (18%)</span>
                <span className="font-mono">{rupee(gst)}</span>
              </div>
              <div className="flex justify-between font-display text-lg font-bold">
                <span>Total</span>
                <span className="font-mono">{rupee(subtotal + gst)}</span>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <PrimaryButton className="flex-1 justify-center">Download PDF</PrimaryButton>
              <GhostButton className="px-4 py-2.5">Mark Paid</GhostButton>
            </div>
          </div>
        </Surface>
      </div>

      {/* Generate Monthly Invoice Modal */}
      {isGenerateOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-xs">
          <div
            className="w-full max-w-lg rounded-2xl bg-card shadow-xl ring-1 ring-line"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h2 className="font-display text-lg font-bold tracking-tight">Generate Monthly Invoice</h2>
                <p className="font-mono text-xs text-muted-foreground">Create customer or branch-level bill</p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsGenerateOpen(false)}
                className="grid size-8 cursor-pointer place-items-center rounded-lg ring-1 ring-line hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <label className="block">
                <span className="label-mono">Select Customer</span>
                <select
                  value={selectedCustId}
                  onChange={(e) => {
                    setSelectedCustId(e.target.value);
                    const cust = customers.find((c) => c.id === e.target.value);
                    if (cust?.branches && cust.branches.length > 0) {
                      setSelectedBranchId(cust.branches[0].id);
                    }
                  }}
                  className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.branches && c.branches.length > 1 ? `(${c.branches.length} branches)` : ""}
                    </option>
                  ))}
                </select>
              </label>

              {/* Multi-Branch Scope Selection if customer has branches */}
              {activeCustomer?.branches && activeCustomer.branches.length > 1 ? (
                <div className="rounded-xl bg-canvas p-3 ring-1 ring-line">
                  <span className="label-mono flex items-center gap-1.5 text-brand">
                    <Building className="size-3" /> Invoicing Scope
                  </span>
                  <div className="mt-2.5 space-y-2">
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
                      <input
                        type="radio"
                        name="scope"
                        checked={invoiceType === "consolidated"}
                        onChange={() => setInvoiceType("consolidated")}
                        className="text-brand focus:ring-brand"
                      />
                      <span>Consolidated Invoice (All {activeCustomer.branches.length} Branches)</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
                      <input
                        type="radio"
                        name="scope"
                        checked={invoiceType === "branch"}
                        onChange={() => setInvoiceType("branch")}
                        className="text-brand focus:ring-brand"
                      />
                      <span>Single Branch Invoice</span>
                    </label>
                  </div>

                  {invoiceType === "branch" ? (
                    <div className="mt-3 pt-2 border-t border-line">
                      <span className="label-mono">Select Branch</span>
                      <select
                        value={selectedBranchId}
                        onChange={(e) => setSelectedBranchId(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-card px-3 py-1.5 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                      >
                        {activeCustomer.branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="label-mono">Billing Month</span>
                  <input
                    defaultValue="August 2026"
                    className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </label>
                <label className="block">
                  <span className="label-mono">Invoice Date</span>
                  <input
                    defaultValue="31 Aug 2026"
                    className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </label>
              </div>

              <div className="rounded-xl bg-brand-soft/30 p-3 text-xs leading-relaxed text-muted-foreground ring-1 ring-brand/15">
                💡 Historical rates will be frozen for this invoice. Generating will calculate quantities from recorded fresh laundry deliveries.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
              <button
                type="button"
                onClick={() => setIsGenerateOpen(false)}
                className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-ink"
              >
                Cancel
              </button>
              <PrimaryButton onClick={() => setIsGenerateOpen(false)}>Generate Invoice</PrimaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
