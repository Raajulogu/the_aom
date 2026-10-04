"use client";

import { Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  CardHead,
  Chip,
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
import { activity, employees } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tone: Record<string, string> = {
  brand: "bg-brand-soft text-brand",
  sky: "bg-sky-soft text-sky",
  warn: "bg-warn-soft text-warn",
  neutral: "bg-canvas text-muted-foreground",
};

export default function EmployeesPage() {
  return (
    <AdminLayout>
      <PageHeader
        title="Employees"
        subtitle="Staff accounts and their daily entry activity."
        action={
          <PrimaryButton>
            <Plus className="size-4" /> Add Employee
          </PrimaryButton>
        }
      />

      <KpiStrip>
        <KpiCard label="Total Staff" value="4" note="3 active today" tone="brand" />
        <KpiCard label="Entries Today" value="31" note="across 5 hotels" tone="sky" />
        <KpiCard label="Supervisors" value="1" note="Divya" tone="ink" />
        <KpiCard label="Inactive" value="1" note="Prakash" tone="warn" />
      </KpiStrip>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Surface className="rise overflow-hidden">
          <CardHead title="Staff Directory" meta="4 members" />
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Name</Th>
                <Th>Role</Th>
                <Th>Phone</Th>
                <Th className="text-right">Entries Today</Th>
                <Th>Status</Th>
                <Th className="px-5 text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.name} className="border-b border-line/70 last:border-0 hover:bg-canvas/50">
                  <Td className="px-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 place-items-center rounded-lg bg-brand-soft font-display text-xs font-bold text-brand">
                        {e.name[0]}
                      </span>
                      <span className="font-semibold">{e.name}</span>
                    </div>
                  </Td>
                  <Td>
                    <Chip tone="sky">{e.role}</Chip>
                  </Td>
                  <Td className="font-mono text-[13px]">{e.phone}</Td>
                  <Td className="text-right font-mono font-medium">{e.entries}</Td>
                  <Td>
                    <StatusBadge status={e.status} />
                  </Td>
                  <Td className="px-5 text-right whitespace-nowrap">
                    <button type="button" className="cursor-pointer text-xs font-medium text-brand hover:underline">Edit</button>
                    <span className="mx-2 text-line">|</span>
                    <button type="button" className="cursor-pointer text-xs font-medium text-danger hover:underline">
                      Deactivate
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>

        <Surface className="rise p-5 [animation-delay:120ms]">
          <h3 className="font-display font-bold tracking-tight">Recent Staff Activity</h3>
          <ul className="mt-4 space-y-4">
            {activity.map((a) => (
              <li key={a.text} className="flex gap-3">
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg font-display text-xs font-bold",
                    tone[a.tone],
                  )}
                >
                  {a.initial}
                </span>
                <div>
                  <p className="text-sm leading-snug">{a.text}</p>
                  <span className="font-mono text-[11px] text-muted-foreground">{a.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </Surface>
      </div>
    </AdminLayout>
  );
}
