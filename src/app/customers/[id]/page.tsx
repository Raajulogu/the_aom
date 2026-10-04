"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  CardHead,
  Chip,
  GhostButton,
  KpiCard,
  KpiStrip,
  PageHeader,
  StatusBadge,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customerPricing, customers, materialLedger, TODAY } from "@/lib/mock-data";

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const customer = customers.find((c) => c.id === id) || customers[0];

  if (!customer) {
    return (
      <AdminLayout>
        <PageHeader title="Customer not found" subtitle="This customer record does not exist." />
        <Link href="/customers" className="mt-6 inline-block text-sm font-medium text-brand hover:underline">
          ← Back to customers
        </Link>
      </AdminLayout>
    );
  }

  const c = customer;

  return (
    <AdminLayout>
      <Link
        href="/customers"
        className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-ink"
      >
        <ArrowLeft className="size-3.5" /> All customers
      </Link>

      <PageHeader
        title={c.name}
        subtitle={`${c.contact} · ${c.phone}`}
        action={
          <div className="flex gap-2">
            <GhostButton>Edit</GhostButton>
            <GhostButton>Generate Invoice</GhostButton>
          </div>
        }
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <StatusBadge status={c.status} />
        <StatusBadge status={c.ops} />
        <Chip tone="neutral">{c.materials} materials assigned</Chip>
      </div>

      <KpiStrip>
        <KpiCard label="Today's Soil" value={String(c.soil)} note="items received" tone="sky" />
        <KpiCard label="Today's Fresh" value={String(c.fresh)} note="items delivered" tone="brand" />
        <KpiCard label="Pending Balance" value={String(c.balance)} note="items with us" tone="warn" />
        <KpiCard label="Monthly Value" value={c.monthlyValue} note="August 2026" tone="ink" />
      </KpiStrip>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Surface className="rise p-5">
          <h3 className="font-display font-bold tracking-tight">Business Details</h3>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Contact person", c.contact],
              ["Phone", c.phone],
              ["Email", c.email],
              ["Address", c.address],
              ["GST number", c.gst],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label-mono">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </Surface>

        <Surface className="rise overflow-hidden xl:col-span-2 [animation-delay:120ms]">
          <CardHead title="Assigned Materials & Rates" meta="custom rates override defaults" />
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Material</Th>
                <Th className="text-right">Default Rate</Th>
                <Th className="text-right">Agreed Rate</Th>
                <Th className="px-5 text-right">Difference</Th>
              </tr>
            </thead>
            <tbody>
              {customerPricing.map((p) => (
                <tr key={p.material} className="border-b border-line/70 last:border-0">
                  <Td className="px-5 font-medium">{p.material}</Td>
                  <Td className="text-right font-mono text-muted-foreground">₹{p.defaultRate}</Td>
                  <Td className="text-right font-mono font-medium">₹{p.rate}</Td>
                  <Td className="px-5 text-right font-mono text-brand">+₹{p.rate - p.defaultRate}</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>
      </div>

      <Surface className="rise mt-4 overflow-hidden [animation-delay:220ms]">
        <CardHead title="Material-wise Balance" meta={TODAY} />
        <TableShell>
          <thead>
            <tr className="border-y border-line bg-canvas/60">
              <Th className="px-5">Material</Th>
              <Th className="text-right">Opening</Th>
              <Th className="text-right">Soil In</Th>
              <Th className="text-right">Fresh Out</Th>
              <Th className="text-right">Balance</Th>
              <Th className="px-5 text-right">Month Total</Th>
            </tr>
          </thead>
          <tbody>
            {materialLedger.map((m) => (
              <tr key={m.material} className="border-b border-line/70 last:border-0">
                <Td className="px-5 font-medium">{m.material}</Td>
                <Td className="text-right font-mono">{m.opening}</Td>
                <Td className="text-right font-mono">{m.soil}</Td>
                <Td className="text-right font-mono">{m.fresh}</Td>
                <Td className="text-right font-mono font-medium">{m.balance}</Td>
                <Td className="px-5 text-right font-mono text-muted-foreground">{m.total}</Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Surface>
    </AdminLayout>
  );
}
