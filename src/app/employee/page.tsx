"use client";

import Link from "next/link";
import { Plus, ClipboardList, CheckCircle2, AlertTriangle, ArrowRight, Truck } from "lucide-react";
import { EmployeeLayout } from "@/components/employee/EmployeeLayout";
import {
  CardHead,
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
import { customers, TODAY } from "@/lib/mock-data";

export default function EmployeeDashboardPage() {
  const activeCustomers = customers.filter((c) => c.status === "Active");
  const totalSoil = activeCustomers.reduce((acc, c) => acc + c.soil, 0);
  const totalFresh = activeCustomers.reduce((acc, c) => acc + c.fresh, 0);
  const totalPending = activeCustomers.reduce((acc, c) => acc + c.balance, 0);

  return (
    <EmployeeLayout>
      <PageHeader
        title="Floor Operations Dashboard"
        meta={`Shift A &bull; ${TODAY} &bull; Laundry intake & processing queue`}
        action={
          <Link href="/employee/operations">
            <PrimaryButton>
              <Plus className="size-4" /> Record Laundry Entry
            </PrimaryButton>
          </Link>
        }
      />

      <KpiStrip>
        <KpiCard
          label="Today's Soil Received"
          value={`${totalSoil} pcs`}
          delta="Intake logged"
          tone="default"
        />
        <KpiCard
          label="Today's Fresh Delivered"
          value={`${totalFresh} pcs`}
          delta="Dispatched"
          tone="success"
        />
        <KpiCard
          label="Active Linen Backlog"
          value={`${totalPending} pcs`}
          delta="In-wash / iron queue"
          tone="warning"
        />
        <KpiCard
          label="Hotels Active Today"
          value={`${activeCustomers.length} Hotels`}
          delta="Route completed"
          tone="default"
        />
      </KpiStrip>

      {/* Quick Action Prompt Banner */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-warning-soft/40 p-5 ring-1 ring-warning/30 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-warning text-canvas font-bold">
            <Truck className="size-5" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-ink">Ready for Evening Vehicle Return?</h2>
            <p className="font-mono text-xs text-muted-foreground">
              Ensure all delivery challans and fresh dispatch counts match customer slips before shift handoff.
            </p>
          </div>
        </div>
        <Link href="/employee/operations" className="shrink-0">
          <PrimaryButton>
            <ClipboardList className="size-3.5" /> Open Entry Sheet
          </PrimaryButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Customer Processing Status */}
        <div className="lg:col-span-2">
          <Surface>
            <CardHead
              title="Today's Hotel Operations Queue"
              meta="Status and counts across client hotels and branches"
              action={
                <Link
                  href="/employee/customers"
                  className="inline-flex items-center gap-1 font-mono text-xs text-brand hover:underline"
                >
                  View All <ArrowRight className="size-3" />
                </Link>
              }
            />
            <TableShell>
              <thead>
                <tr>
                  <Th className="px-5">Customer / Property</Th>
                  <Th>Soil In</Th>
                  <Th>Fresh Out</Th>
                  <Th>Pending</Th>
                  <Th>Status</Th>
                  <Th className="pr-5 text-right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {activeCustomers.map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0 hover:bg-canvas/50">
                    <Td className="px-5">
                      <div className="font-medium text-ink">{c.name}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">
                        {c.branches ? `${c.branches.length} branches registered` : "Single location"}
                      </div>
                    </Td>
                    <Td mono>{c.soil}</Td>
                    <Td mono>{c.fresh}</Td>
                    <Td mono className={c.balance > 30 ? "font-bold text-warning" : ""}>
                      {c.balance}
                    </Td>
                    <Td>
                      <StatusBadge status={c.ops} />
                    </Td>
                    <Td className="pr-5 text-right">
                      <Link
                        href={`/employee/operations?customerId=${c.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-card px-2.5 py-1 text-xs font-semibold ring-1 ring-line hover:bg-brand-soft hover:text-brand"
                      >
                        Log Slip
                      </Link>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </Surface>
        </div>

        {/* Live Activity Feed */}
        <div>
          <Surface>
            <CardHead title="Recent Staff Entries" meta="Today's logged movements" />
            <div className="space-y-3.5 p-5">
              <div className="flex items-start gap-3 rounded-xl bg-canvas p-3 ring-1 ring-line">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-soft text-emerald text-xs">
                  <CheckCircle2 className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink">Hotel Grand A</span>
                    <span className="font-mono text-[10px] text-muted-foreground">09:42 AM</span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    Fresh Delivered: 20 Bath Towels to Main Branch
                  </p>
                  <div className="mt-1 font-mono text-[10px] text-brand">Logged by Arun Pandian</div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-canvas p-3 ring-1 ring-line">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-warning-soft text-warning text-xs">
                  <AlertTriangle className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink">Ocean Resort</span>
                    <span className="font-mono text-[10px] text-muted-foreground">09:15 AM</span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    Soil Received: 40 Bedsheets from Spa Wing
                  </p>
                  <div className="mt-1 font-mono text-[10px] text-brand">Logged by Arun Pandian</div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-canvas p-3 ring-1 ring-line">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-soft text-emerald text-xs">
                  <CheckCircle2 className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink">Hotel Royal B</span>
                    <span className="font-mono text-[10px] text-muted-foreground">08:50 AM</span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    Fresh Delivered: 30 Pillow Covers to Promenade Main
                  </p>
                  <div className="mt-1 font-mono text-[10px] text-brand">Logged by Suresh K</div>
                </div>
              </div>

              <Link
                href="/employee/history"
                className="block text-center font-mono text-xs text-brand hover:underline pt-2"
              >
                View full shift activity log &rarr;
              </Link>
            </div>
          </Surface>
        </div>
      </div>
    </EmployeeLayout>
  );
}
