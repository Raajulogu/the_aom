"use client";

import { useState } from "react";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import {
  CardHead,
  PageHeader,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { materialLedger, TODAY } from "@/lib/mock-data";

const hotelActivitySlips = [
  { id: "slip-1", date: TODAY, time: "09:42 AM", branch: "Main Branch", material: "Bath Towel", type: "Fresh Delivered", qty: 20, slipNo: "SLIP-2026-904" },
  { id: "slip-2", date: TODAY, time: "09:42 AM", branch: "Main Branch", material: "Bedsheet", type: "Soil Sent", qty: 10, slipNo: "SLIP-2026-903" },
  { id: "slip-3", date: TODAY, time: "08:15 AM", branch: "Beach Road Annex", material: "Pillow Cover", type: "Fresh Delivered", qty: 25, slipNo: "SLIP-2026-902" },
  { id: "slip-4", date: "04 Sep 2026", time: "05:30 PM", branch: "Main Branch", material: "Blanket", type: "Fresh Delivered", qty: 6, slipNo: "SLIP-2026-899" },
  { id: "slip-5", date: "04 Sep 2026", time: "10:00 AM", branch: "Beach Road Annex", material: "Bath Towel", type: "Soil Sent", qty: 20, slipNo: "SLIP-2026-895" },
];

export default function CustomerActivityPage() {
  const [selectedBranch, setSelectedBranch] = useState("all");

  const filteredSlips = selectedBranch === "all"
    ? hotelActivitySlips
    : hotelActivitySlips.filter((s) => s.branch === selectedBranch);

  return (
    <CustomerLayout>
      <PageHeader
        title="Linen Circulation & Movement Slips"
        meta="Daily verified delivery receipts &bull; Hotel Grand A"
      />

      <div className="space-y-6">
        {/* Current Balances Table */}
        <Surface>
          <CardHead
            title="Material Balances by Category"
            meta="Opening balance carried forward from previous cycle"
          />
          <TableShell>
            <thead>
              <tr>
                <Th className="px-5">Material Item</Th>
                <Th>Opening Quantity</Th>
                <Th>Today&apos;s Soil Sent</Th>
                <Th>Today&apos;s Fresh Received</Th>
                <Th>Pending Balance in Laundry</Th>
                <Th className="pr-5 text-right">Total Linen Stock</Th>
              </tr>
            </thead>
            <tbody>
              {materialLedger.map((row) => (
                <tr key={row.material} className="border-b border-line last:border-0 hover:bg-canvas/40">
                  <Td className="px-5 font-semibold text-ink">{row.material}</Td>
                  <Td mono className="text-muted-foreground">{row.opening}</Td>
                  <Td mono className="font-semibold text-ink">+{row.soil}</Td>
                  <Td mono className="font-semibold text-emerald">-{row.fresh}</Td>
                  <Td mono className="font-bold text-warning">{row.balance} pcs</Td>
                  <Td mono className="pr-5 text-right text-muted-foreground">{row.total} pcs</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>

        {/* Daily Slips History */}
        <Surface>
          <CardHead
            title="Recent Delivery & Intake Slips"
            meta="Verified delivery receipts signed by property housekeeping"
            action={
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="rounded-lg bg-canvas px-3 py-1.5 text-xs font-semibold ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              >
                <option value="all">All Branches</option>
                <option value="Main Branch">Main Branch</option>
                <option value="Beach Road Annex">Beach Road Annex</option>
              </select>
            }
          />

          <TableShell>
            <thead>
              <tr>
                <Th className="px-5">Date & Time</Th>
                <Th>Receipt Slip #</Th>
                <Th>Branch / Annex</Th>
                <Th>Material</Th>
                <Th>Movement Type</Th>
                <Th className="pr-5 text-right">Quantity</Th>
              </tr>
            </thead>
            <tbody>
              {filteredSlips.map((slip) => (
                <tr key={slip.id} className="border-b border-line last:border-0 hover:bg-canvas/40">
                  <Td className="px-5 font-mono text-xs text-muted-foreground">
                    {slip.date} &bull; {slip.time}
                  </Td>
                  <Td mono className="font-semibold text-brand text-xs">{slip.slipNo}</Td>
                  <Td className="text-xs text-ink font-medium">{slip.branch}</Td>
                  <Td className="text-xs text-ink">{slip.material}</Td>
                  <Td>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[11px] font-medium ${
                        slip.type === "Fresh Delivered"
                          ? "bg-emerald-soft text-emerald"
                          : "bg-canvas text-ink ring-1 ring-line"
                      }`}
                    >
                      {slip.type}
                    </span>
                  </Td>
                  <Td mono className={`pr-5 text-right font-bold text-sm ${
                    slip.type === "Fresh Delivered" ? "text-emerald" : "text-ink"
                  }`}>
                    {slip.type === "Fresh Delivered" ? `-${slip.qty}` : `+${slip.qty}`} pcs
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Surface>
      </div>
    </CustomerLayout>
  );
}
