"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import {
  CardHead,
  PageHeader,
  StatusBadge,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { invoiceLines, rupee } from "@/lib/mock-data";

const hotelInvoices = [
  {
    id: "inv-hotel-1",
    no: "INV-2026-001",
    month: "August 2026",
    date: "31 Aug 2026",
    dueDate: "15 Sep 2026",
    amount: "₹84,500",
    status: "Generated" as const,
    subtotal: 71610,
    gst: 12890,
    total: 84500,
    lines: invoiceLines,
  },
  {
    id: "inv-hotel-0",
    no: "INV-2026-000",
    month: "July 2026",
    date: "31 Jul 2026",
    dueDate: "15 Aug 2026",
    amount: "₹79,200",
    status: "Paid" as const,
    subtotal: 67118,
    gst: 12082,
    total: 79200,
    lines: invoiceLines.map((l) => ({ ...l, qty: Math.round(l.qty * 0.95), amount: Math.round(l.amount * 0.95) })),
  },
];

export default function CustomerInvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState(hotelInvoices[0]);

  return (
    <CustomerLayout>
      <PageHeader
        title="Invoices & Billing Statements"
        meta="Hotel Grand A &bull; Verified monthly billing &bull; Rate audit snapshots"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Invoice Register List */}
        <div className="lg:col-span-1">
          <Surface>
            <CardHead title="Invoice Register" meta="Issued monthly by AOM Industrial Laundry" />
            <div className="space-y-3 p-4">
              {hotelInvoices.map((inv) => {
                const isSelected = selectedInvoice.id === inv.id;
                return (
                  <button
                    key={inv.id}
                    type="button"
                    onClick={() => setSelectedInvoice(inv)}
                    className={`flex w-full cursor-pointer flex-col rounded-xl p-4 text-left transition-all ring-1 ${
                      isSelected
                        ? "bg-brand-soft/30 ring-brand/50 shadow-xs"
                        : "bg-canvas ring-line hover:bg-canvas/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-ink">{inv.no}</span>
                      <StatusBadge status={inv.status} />
                    </div>
                    <div className="mt-2 text-sm font-bold text-ink">{inv.amount}</div>
                    <div className="mt-1 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                      <span>{inv.month}</span>
                      <span>Due: {inv.dueDate}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Surface>
        </div>

        {/* Selected Invoice Preview */}
        <div className="lg:col-span-2">
          <Surface className="p-6">
            <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-xs text-muted-foreground">TAX INVOICE</span>
                <h2 className="font-display text-xl font-bold text-ink">{selectedInvoice.no}</h2>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  Billing Period: {selectedInvoice.month} &bull; Date: {selectedInvoice.date}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={selectedInvoice.status} />
                <button
                  type="button"
                  onClick={() => alert(`Downloading PDF for ${selectedInvoice.no}`)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-canvas hover:opacity-90 transition-opacity"
                >
                  <Download className="size-3.5" /> Download PDF
                </button>
              </div>
            </div>

            {/* Bill To & Bill From */}
            <div className="grid grid-cols-2 gap-4 py-5 font-mono text-xs border-b border-line">
              <div>
                <span className="label-mono text-[10px] text-muted-foreground">Billed To (Client):</span>
                <div className="mt-1 font-semibold text-ink">Hotel Grand A</div>
                <div className="text-muted-foreground">12 Mission Street, Pondicherry 605001</div>
                <div className="text-muted-foreground">GSTIN: 34AABCG1234K1Z5</div>
              </div>
              <div className="text-right">
                <span className="label-mono text-[10px] text-muted-foreground">Billed By (Provider):</span>
                <div className="mt-1 font-semibold text-ink">The AOM Industrial Laundry</div>
                <div className="text-muted-foreground">Auroville Main Road, Pondicherry 605101</div>
                <div className="text-muted-foreground">GSTIN: 34AABCA9876M1Z0</div>
              </div>
            </div>

            {/* Itemized Lines */}
            <div className="mt-4">
              <TableShell>
                <thead>
                  <tr>
                    <Th className="px-4">Material Description</Th>
                    <Th>Verified Qty</Th>
                    <Th>Agreed Rate</Th>
                    <Th className="pr-4 text-right">Amount</Th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.lines.map((line) => (
                    <tr key={line.material} className="border-b border-line last:border-0">
                      <Td className="px-4 font-semibold text-ink">{line.material}</Td>
                      <Td mono>{line.qty} pcs</Td>
                      <Td mono>{rupee(line.rate)}</Td>
                      <Td mono className="pr-4 text-right font-semibold text-ink">
                        {rupee(line.amount)}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableShell>
            </div>

            {/* Totals Summary */}
            <div className="mt-6 flex justify-end border-t border-line pt-4 font-mono text-xs">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>{rupee(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%):</span>
                  <span>{rupee(selectedInvoice.gst)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-sm font-bold text-ink">
                  <span>Total Amount:</span>
                  <span>{rupee(selectedInvoice.total)}</span>
                </div>
              </div>
            </div>
          </Surface>
        </div>
      </div>
    </CustomerLayout>
  );
}
