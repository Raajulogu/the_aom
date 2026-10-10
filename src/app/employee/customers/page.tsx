"use client";

import Link from "next/link";
import { Phone, MapPin, Building, Plus } from "lucide-react";
import { EmployeeLayout } from "@/components/employee/EmployeeLayout";
import {
  CardHead,
  PageHeader,
  StatusBadge,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customers } from "@/lib/mock-data";

export default function EmployeeCustomersPage() {
  const activeCustomers = customers.filter((c) => c.status === "Active");

  return (
    <EmployeeLayout>
      <PageHeader
        title="Customer Directory & Pending Balances"
        meta="Floor staff directory &bull; Active hotel accounts &bull; Delivery points"
      />

      <Surface>
        <CardHead
          title="Active Client Hotels"
          meta={`${activeCustomers.length} active hotel contracts with daily delivery schedules`}
        />

        <TableShell>
          <thead>
            <tr>
              <Th className="px-5">Hotel / Business</Th>
              <Th>Registered Branches</Th>
              <Th>Floor Contact</Th>
              <Th>Delivery Address</Th>
              <Th>Pending Balance</Th>
              <Th>Status</Th>
              <Th className="pr-5 text-right">Action</Th>
            </tr>
          </thead>
          <tbody>
            {activeCustomers.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0 hover:bg-canvas/40">
                <Td className="px-5">
                  <div className="font-semibold text-ink">{c.name}</div>
                  <div className="font-mono text-[11px] text-muted-foreground">{c.id}</div>
                </Td>
                <Td>
                  {c.branches && c.branches.length > 0 ? (
                    <div className="space-y-1">
                      {c.branches.map((b) => (
                        <div key={b.id} className="inline-flex items-center gap-1.5 rounded bg-canvas px-2 py-0.5 font-mono text-[11px] ring-1 ring-line mr-1">
                          <Building className="size-3 text-muted-foreground" />
                          <span>{b.name}</span>
                          <span className="text-warning font-semibold">({b.balance} pcs)</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-muted-foreground">Single location</span>
                  )}
                </Td>
                <Td>
                  <div className="text-xs font-medium text-ink">{c.contact}</div>
                  <a
                    href={`tel:${c.phone}`}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-brand hover:underline"
                  >
                    <Phone className="size-2.5" /> {c.phone}
                  </a>
                </Td>
                <Td className="max-w-xs truncate text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3 shrink-0 text-muted-foreground" />
                    <span className="truncate">{c.address}</span>
                  </span>
                </Td>
                <Td mono className={c.balance > 30 ? "font-bold text-warning" : "font-semibold text-ink"}>
                  {c.balance} pcs
                </Td>
                <Td>
                  <StatusBadge status={c.ops} />
                </Td>
                <Td className="pr-5 text-right">
                  <Link
                    href={`/employee/operations?customerId=${c.id}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold text-canvas hover:opacity-90 transition-opacity"
                  >
                    <Plus className="size-3" /> Entry
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Surface>
    </EmployeeLayout>
  );
}
