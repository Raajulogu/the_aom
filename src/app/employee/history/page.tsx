"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { EmployeeLayout } from "@/components/employee/EmployeeLayout";
import {
  CardHead,
  PageHeader,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { TODAY } from "@/lib/mock-data";

const shiftLogs = [
  { id: "log-1", time: "10:15 AM", customer: "Hotel Grand A", branch: "Main Branch", material: "Bedsheet", soil: 30, fresh: 25, by: "Arun Pandian", challan: "CH-2026-081" },
  { id: "log-2", time: "09:42 AM", customer: "Hotel Grand A", branch: "Beach Road Annex", material: "Bath Towel", soil: 20, fresh: 20, by: "Arun Pandian", challan: "CH-2026-080" },
  { id: "log-3", time: "09:15 AM", customer: "Ocean Resort", branch: "Spa & Wellness Wing", material: "Bath Towel", soil: 40, fresh: 30, by: "Arun Pandian", challan: "CH-2026-079" },
  { id: "log-4", time: "08:50 AM", customer: "Hotel Royal B", branch: "Promenade Main", material: "Pillow Cover", soil: 50, fresh: 50, by: "Suresh K", challan: "CH-2026-078" },
  { id: "log-5", time: "08:20 AM", customer: "Hotel Royal B", branch: "Heritage Wing", material: "Bedsheet", soil: 25, fresh: 20, by: "Suresh K", challan: "CH-2026-077" },
  { id: "log-6", time: "07:45 AM", customer: "Green Park Hotel", branch: "Single Location", material: "Hotel Uniform", soil: 15, fresh: 15, by: "Mani V", challan: "CH-2026-076" },
];

export default function EmployeeHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = shiftLogs.filter(
    (l) =>
      l.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <EmployeeLayout>
      <PageHeader
        title="Shift Activity Log"
        meta={`Shift A &bull; ${TODAY} &bull; Immutable audit entries logged by floor staff`}
      />

      <Surface>
        <CardHead
          title="Recorded Transactions Today"
          meta={`${shiftLogs.length} delivery & intake slips processed on Shift A`}
          action={
            <div className="relative">
              <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by hotel, material…"
                className="w-56 rounded-lg bg-canvas py-1.5 pr-2.5 pl-8 text-xs ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
          }
        />

        <TableShell>
          <thead>
            <tr>
              <Th className="px-5">Time</Th>
              <Th>Challan No</Th>
              <Th>Hotel / Customer</Th>
              <Th>Branch / Property</Th>
              <Th>Material</Th>
              <Th>Soil Received</Th>
              <Th>Fresh Delivered</Th>
              <Th className="pr-5 text-right">Logged By</Th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b border-line last:border-0 hover:bg-canvas/40">
                <Td className="px-5 font-mono text-xs text-muted-foreground">{log.time}</Td>
                <Td mono className="font-semibold text-brand text-xs">{log.challan}</Td>
                <Td className="font-semibold text-ink">{log.customer}</Td>
                <Td className="font-mono text-xs text-muted-foreground">{log.branch}</Td>
                <Td className="font-medium text-ink">{log.material}</Td>
                <Td mono className="font-semibold text-ink">+{log.soil} pcs</Td>
                <Td mono className="font-semibold text-emerald">-{log.fresh} pcs</Td>
                <Td className="pr-5 text-right font-mono text-xs text-muted-foreground">
                  {log.by}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Surface>
    </EmployeeLayout>
  );
}
