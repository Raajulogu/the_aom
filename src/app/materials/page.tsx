"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Chip,
  PageHeader,
  PrimaryButton,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { materials } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const categories = ["All", "Bedding", "Bathroom", "Room", "Staff"] as const;

export default function MaterialsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      materials.filter(
        (m) =>
          (cat === "All" || m.category === cat) &&
          m.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [cat, query],
  );

  return (
    <AdminLayout>
      <PageHeader
        title="Materials"
        subtitle="Master list of laundry items and default rates."
        action={
          <PrimaryButton>
            <Plus className="size-4" /> Add Material
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
              placeholder="Search materials…"
              className="w-full rounded-lg bg-canvas py-2 pr-3 pl-9 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
          <div className="no-bar -mx-1 overflow-x-auto px-1">
            <div className="flex min-w-max gap-1 rounded-lg bg-canvas p-1 ring-1 ring-line">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    cat === c ? "bg-card text-ink shadow-sm" : "text-muted-foreground hover:text-ink",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <TableShell>
          <thead>
            <tr className="border-y border-line bg-canvas/60">
              <Th className="px-5">Material</Th>
              <Th>Category</Th>
              <Th>Unit</Th>
              <Th className="text-right">Default Rate</Th>
              <Th className="px-5 text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.name} className="border-b border-line/70 last:border-0 hover:bg-canvas/50">
                <Td className="px-5 font-semibold">{m.name}</Td>
                <Td>
                  <Chip tone="sky">{m.category}</Chip>
                </Td>
                <Td className="text-muted-foreground">{m.unit}</Td>
                <Td className="text-right font-mono font-medium">₹{m.rate}</Td>
                <Td className="px-5 text-right whitespace-nowrap">
                  <button type="button" className="cursor-pointer text-xs font-medium text-brand hover:underline">Edit</button>
                  <span className="mx-2 text-line">|</span>
                  <button type="button" className="cursor-pointer text-xs font-medium text-danger hover:underline">Remove</button>
                </Td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <Td className="px-5 py-8 text-center text-sm text-muted-foreground">No materials found.</Td>
              </tr>
            ) : null}
          </tbody>
        </TableShell>
      </Surface>
    </AdminLayout>
  );
}
