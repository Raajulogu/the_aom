"use client";

import Link from "next/link";
import { Building, FileText, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import {
  CardHead,
  KpiCard,
  KpiStrip,
  PageHeader,
  PrimaryButton,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customers, materialLedger, TODAY } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const customerId = user?.customerId || "hotel-grand-a";
  const hotel = customers.find((c) => c.id === customerId) || customers[0];

  return (
    <CustomerLayout>
      <PageHeader
        title={`${hotel.name} &mdash; Linen Hub`}
        meta={`Live operational status &bull; ${TODAY} &bull; Dedicated client view`}
        action={
          <Link href="/portal/invoices">
            <PrimaryButton>
              <FileText className="size-4" /> Latest Invoices
            </PrimaryButton>
          </Link>
        }
      />

      <KpiStrip>
        <KpiCard
          label="Pending Laundry in Wash"
          value={`${hotel.balance} pcs`}
          delta="Across all branches"
          tone="warning"
        />
        <KpiCard
          label="Today's Soil Sent"
          value={`${hotel.soil} pcs`}
          delta="Dispatched to AOM"
          tone="default"
        />
        <KpiCard
          label="Today's Fresh Received"
          value={`${hotel.fresh} pcs`}
          delta="Delivered clean"
          tone="success"
        />
        <KpiCard
          label="August Billing Amount"
          value={hotel.monthlyValue}
          delta="GST included &bull; 1 invoice"
          tone="default"
        />
      </KpiStrip>

      {/* Multi-Branch Status Cards */}
      {hotel.branches && hotel.branches.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Building className="size-4 text-emerald" />
              <h2 className="text-sm font-bold text-ink">Physical Branches & Locations</h2>
            </div>
            <Link
              href="/portal/branches"
              className="inline-flex items-center gap-1 font-mono text-xs text-brand hover:underline"
            >
              View Branch Breakdown <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {hotel.branches.map((b) => (
              <div
                key={b.id}
                className="flex flex-col justify-between rounded-2xl bg-card p-5 shadow-xs ring-1 ring-line"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-ink">{b.name}</h3>
                      <p className="mt-1 flex items-center gap-1 font-mono text-xs text-muted-foreground">
                        <MapPin className="size-3 text-muted-foreground" />
                        {b.address}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-soft px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald">
                      Active
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-canvas p-3 ring-1 ring-line text-center">
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground">Soil Sent</div>
                      <div className="font-mono text-sm font-bold text-ink">{b.soil} pcs</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground">Fresh Back</div>
                      <div className="font-mono text-sm font-bold text-emerald">{b.fresh} pcs</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground">In Wash</div>
                      <div className="font-mono text-sm font-bold text-warning">{b.balance} pcs</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-xs text-muted-foreground">
                  <span>Manager: {b.contact}</span>
                  <span>{b.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Material Breakdown & Recent Movements */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Surface>
            <CardHead
              title="Today's Material Balances"
              meta="Current linen circulation between your properties and AOM laundry plant"
              action={
                <Link
                  href="/portal/activity"
                  className="inline-flex items-center gap-1 font-mono text-xs text-brand hover:underline"
                >
                  Full Activity <ArrowRight className="size-3" />
                </Link>
              }
            />
            <TableShell>
              <thead>
                <tr>
                  <Th className="px-5">Linen Item</Th>
                  <Th>Opening</Th>
                  <Th>Soil Sent</Th>
                  <Th>Fresh Received</Th>
                  <Th>Pending Balance</Th>
                  <Th className="pr-5 text-right">Circulation</Th>
                </tr>
              </thead>
              <tbody>
                {materialLedger.map((row) => (
                  <tr key={row.material} className="border-b border-line last:border-0 hover:bg-canvas/40">
                    <Td className="px-5 font-semibold text-ink">{row.material}</Td>
                    <Td mono className="text-muted-foreground">{row.opening}</Td>
                    <Td mono className="text-ink font-semibold">+{row.soil}</Td>
                    <Td mono className="text-emerald font-semibold">-{row.fresh}</Td>
                    <Td mono className="font-bold text-warning">{row.balance} pcs</Td>
                    <Td mono className="pr-5 text-right text-muted-foreground">{row.total} pcs</Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </Surface>
        </div>

        {/* Latest Billing Notice */}
        <div>
          <Surface>
            <CardHead title="Billing & Invoicing" meta="August 2026 Billing Period" />
            <div className="space-y-4 p-5">
              <div className="rounded-xl bg-canvas p-4 ring-1 ring-line">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">Invoice No:</span>
                  <span className="font-mono text-xs font-bold text-brand">INV-2026-001</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">Amount:</span>
                  <span className="font-display text-lg font-bold text-ink">₹84,500</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">Status:</span>
                  <span className="rounded-md bg-sky-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-sky">
                    Generated / Due 15 Sep
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-emerald-soft/40 p-3 text-xs ring-1 ring-emerald/30">
                <div className="flex items-center gap-1.5 font-semibold text-emerald">
                  <CheckCircle2 className="size-4" /> All Agreed Rates Locked
                </div>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  Bedsheet rate: ₹100/pc &bull; Bath Towel: ₹80/pc &bull; Pillow: ₹40/pc
                </p>
              </div>

              <Link
                href="/portal/invoices"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-xs font-semibold text-canvas hover:opacity-90 transition-opacity"
              >
                View Full Statement <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Surface>
        </div>
      </div>
    </CustomerLayout>
  );
}
