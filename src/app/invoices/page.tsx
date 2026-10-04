"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
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
import { invoiceLines, invoices, rupee } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statuses = ["All", "Generated", "Pending", "Paid"] as const;

export default function InvoicesPage() {
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [selected, setSelected] = useState(invoices[0]);

  const rows = invoices.filter((i) => status === "All" || i.status === status);
  const subtotal = invoiceLines.reduce((s, l) => s + l.amount, 0);
  const gst = Math.round(subtotal * 0.18);

  return (
    <AdminLayout>
      <PageHeader
        title="Invoices"
        subtitle="Monthly billing for each customer."
        action={
          <PrimaryButton>
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
                <Th>Customer</Th>
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
                  <Td className="font-medium">{i.customer}</Td>
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
          <CardHead title={selected.no} meta={`${selected.customer} · ${selected.month}`} />
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between border-y border-line py-3">
              <span className="label-mono">Invoice date</span>
              <span className="font-mono text-sm">{selected.date}</span>
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
    </AdminLayout>
  );
}
