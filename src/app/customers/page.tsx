"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AddCustomerDialog } from "@/components/admin/AddCustomerDialog";
import {
  PageHeader,
  PrimaryButton,
  StatusBadge,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const filters = ["All", "Active", "Inactive"] as const;

export default function CustomersPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const rows = useMemo(
    () =>
      customers.filter(
        (c) =>
          (filter === "All" || c.status === filter) &&
          c.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [filter, query],
  );

  return (
    <AdminLayout>
      <PageHeader
        title="Customers"
        subtitle="Manage hotels and business customers."
        action={
          <PrimaryButton onClick={() => setOpen(true)}>
            <Plus className="size-4" /> Add Customer
          </PrimaryButton>
        }
      />

      <Surface className="rise mt-6 overflow-hidden">
        <div className="flex flex-col gap-3 px-5 pt-5 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:max-w-xs sm:flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers…"
              className="w-full rounded-lg bg-canvas py-2 pr-3 pl-9 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
          <div className="flex gap-1 rounded-lg bg-canvas p-1 ring-1 ring-line">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === f ? "bg-card text-ink shadow-sm" : "text-muted-foreground hover:text-ink",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <TableShell>
          <thead>
            <tr className="border-y border-line bg-canvas/60">
              <Th className="px-5">Customer</Th>
              <Th>Contact Person</Th>
              <Th>Phone</Th>
              <Th className="text-right">Materials</Th>
              <Th className="text-right">Today's Soil</Th>
              <Th className="text-right">Today's Fresh</Th>
              <Th className="text-right">Balance</Th>
              <Th>Status</Th>
              <Th className="px-5 text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-line/70 last:border-0 hover:bg-canvas/50">
                <Td className="px-5">
                  <Link href={`/customers/${c.id}`} className="font-semibold hover:text-brand">
                    {c.name}
                  </Link>
                </Td>
                <Td className="text-muted-foreground">{c.contact}</Td>
                <Td className="font-mono text-[13px]">{c.phone}</Td>
                <Td className="text-right font-mono">{c.materials}</Td>
                <Td className="text-right font-mono">{c.soil}</Td>
                <Td className="text-right font-mono">{c.fresh}</Td>
                <Td className="text-right font-mono font-medium">{c.balance}</Td>
                <Td>
                  <StatusBadge status={c.status} />
                </Td>
                <Td className="px-5 text-right whitespace-nowrap">
                  <Link
                    href={`/customers/${c.id}`}
                    className="text-xs font-medium text-brand hover:underline"
                  >
                    View
                  </Link>
                  <span className="mx-2 text-line">|</span>
                  <button type="button" className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-ink">
                    Edit
                  </button>
                  <span className="mx-2 text-line">|</span>
                  <button type="button" className="cursor-pointer text-xs font-medium text-danger hover:underline">
                    Deactivate
                  </button>
                </Td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <Td className="px-5 py-8 text-center text-sm text-muted-foreground">No customers match this filter.</Td>
              </tr>
            ) : null}
          </tbody>
        </TableShell>
      </Surface>

      <AddCustomerDialog open={open} onOpenChange={setOpen} />
    </AdminLayout>
  );
}
