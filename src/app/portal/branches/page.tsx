"use client";

import { Building, MapPin } from "lucide-react";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import {
  CardHead,
  PageHeader,
  Surface,
  TableShell,
  Td,
  Th,
} from "@/components/admin/primitives";
import { customers } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export default function CustomerBranchesPage() {
  const { user } = useAuth();
  const customerId = user?.customerId || "hotel-grand-a";
  const hotel = customers.find((c) => c.id === customerId) || customers[0];
  const branches = hotel.branches || [];

  return (
    <CustomerLayout>
      <PageHeader
        title="Registered Hotel Branches & Locations"
        meta={`${hotel.name} &bull; Individual laundry balances by physical site`}
      />

      <Surface>
        <CardHead
          title="Locations Overview"
          meta={`${branches.length} active delivery locations under this contract`}
        />

        <TableShell>
          <thead>
            <tr>
              <Th className="px-5">Branch Name</Th>
              <Th>Delivery Address</Th>
              <Th>On-Site Contact</Th>
              <Th>Today&apos;s Soil Sent</Th>
              <Th>Today&apos;s Fresh Received</Th>
              <Th>Pending Balance</Th>
              <Th className="pr-5 text-right">Status</Th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b) => (
              <tr key={b.id} className="border-b border-line last:border-0 hover:bg-canvas/40">
                <Td className="px-5">
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-lg bg-emerald-soft text-emerald">
                      <Building className="size-3.5" />
                    </span>
                    <div>
                      <div className="font-semibold text-ink">{b.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{b.id}</div>
                    </div>
                  </div>
                </Td>
                <Td className="max-w-xs truncate text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3 shrink-0 text-muted-foreground" />
                    <span className="truncate">{b.address}</span>
                  </span>
                </Td>
                <Td>
                  <div className="text-xs font-medium text-ink">{b.contact}</div>
                  <div className="font-mono text-[11px] text-muted-foreground">{b.phone}</div>
                </Td>
                <Td mono className="font-semibold text-ink">+{b.soil} pcs</Td>
                <Td mono className="font-semibold text-emerald">-{b.fresh} pcs</Td>
                <Td mono className="font-bold text-warning">{b.balance} pcs</Td>
                <Td className="pr-5 text-right">
                  <span className="rounded-full bg-emerald-soft px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald">
                    Active
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-canvas/80 font-bold border-t border-line">
              <Td className="px-5">Consolidated Hotel Total</Td>
              <Td className="text-xs text-muted-foreground">Across all registered sites</Td>
              <Td className="text-xs text-muted-foreground">{hotel.contact}</Td>
              <Td mono className="text-ink">+{hotel.soil} pcs</Td>
              <Td mono className="text-emerald">-{hotel.fresh} pcs</Td>
              <Td mono className="text-brand font-bold">{hotel.balance} pcs</Td>
              <Td className="pr-5 text-right font-mono text-xs text-muted-foreground">Verified</Td>
            </tr>
          </tfoot>
        </TableShell>
      </Surface>
    </CustomerLayout>
  );
}
