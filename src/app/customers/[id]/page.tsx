"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Building, Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AddBranchDialog } from "@/components/admin/AddBranchDialog";
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
import { customerPricing, customers, materialLedger, TODAY, Branch } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const customer = customers.find((c) => c.id === id) || customers[0];

  const [branches, setBranches] = useState<Branch[]>(customer?.branches || []);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("all");
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);

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
  const selectedBranch = branches.find((b) => b.id === selectedBranchId);

  // Compute active figures: either branch-specific or aggregated customer figures
  const activeSoil = selectedBranch ? selectedBranch.soil : c.soil;
  const activeFresh = selectedBranch ? selectedBranch.fresh : c.fresh;
  const activeBalance = selectedBranch ? selectedBranch.balance : c.balance;
  const activeAddress = selectedBranch ? selectedBranch.address : c.address;
  const activeContact = selectedBranch ? selectedBranch.contact : c.contact;
  const activePhone = selectedBranch ? selectedBranch.phone : c.phone;

  const handleSaveBranch = (newBranchData: {
    name: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    gst: string;
  }) => {
    const newBranch: Branch = {
      id: `${c.id}-${Date.now()}`,
      name: newBranchData.name,
      contact: newBranchData.contact || c.contact,
      phone: newBranchData.phone || c.phone,
      email: newBranchData.email || c.email,
      address: newBranchData.address,
      gst: newBranchData.gst || c.gst,
      soil: 0,
      fresh: 0,
      balance: 0,
      status: "Active",
    };
    setBranches((prev) => [...prev, newBranch]);
    setSelectedBranchId(newBranch.id);
  };

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
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={() => setIsAddBranchOpen(true)}>
              <span className="flex items-center gap-1.5">
                <Plus className="size-3.5" /> Add Branch
              </span>
            </GhostButton>
            <GhostButton>Edit Customer</GhostButton>
            <GhostButton>Generate Invoice</GhostButton>
          </div>
        }
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge status={c.status} />
        <StatusBadge status={c.ops} />
        <Chip tone="neutral">{c.materials} materials assigned</Chip>
        {branches.length > 0 ? (
          <span className="rounded-md bg-brand-soft px-2.5 py-1 font-mono text-[11px] font-medium text-brand ring-1 ring-brand/20">
            {branches.length} {branches.length === 1 ? "branch" : "branches"} registered
          </span>
        ) : null}
      </div>

      {/* Branch Selector Tabs (if branches exist) */}
      {branches.length > 0 ? (
        <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-canvas p-3 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Building className="size-4 text-brand" />
            <span>Location View:</span>
          </div>
          <div className="no-bar flex overflow-x-auto gap-1">
            <button
              type="button"
              onClick={() => setSelectedBranchId("all")}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors shrink-0",
                selectedBranchId === "all"
                  ? "bg-card text-ink shadow-sm ring-1 ring-line"
                  : "text-muted-foreground hover:text-ink",
              )}
            >
              All Branches (Aggregated)
            </button>
            {branches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBranchId(b.id)}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors shrink-0",
                  selectedBranchId === b.id
                    ? "bg-brand text-card shadow-sm"
                    : "text-muted-foreground hover:text-ink",
                )}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <KpiStrip>
        <KpiCard
          label={selectedBranch ? `${selectedBranch.name} Soil` : "Today's Soil"}
          value={String(activeSoil)}
          note="items received"
          tone="sky"
        />
        <KpiCard
          label={selectedBranch ? `${selectedBranch.name} Fresh` : "Today's Fresh"}
          value={String(activeFresh)}
          note="items delivered"
          tone="brand"
        />
        <KpiCard
          label={selectedBranch ? `${selectedBranch.name} Balance` : "Pending Balance"}
          value={String(activeBalance)}
          note="items with us"
          tone="warn"
        />
        <KpiCard
          label="Monthly Value"
          value={c.monthlyValue}
          note="August 2026"
          tone="ink"
        />
      </KpiStrip>

      {/* Branches & Locations Directory Card */}
      <Surface className="rise mt-4 overflow-hidden">
        <CardHead
          title="Customer Branches & Locations"
          meta={`${branches.length} locations configured`}
          action={
            <GhostButton onClick={() => setIsAddBranchOpen(true)}>
              <span className="flex items-center gap-1">
                <Plus className="size-3" /> Add Branch
              </span>
            </GhostButton>
          }
        />
        {branches.length > 0 ? (
          <TableShell>
            <thead>
              <tr className="border-y border-line bg-canvas/60">
                <Th className="px-5">Branch Name</Th>
                <Th>Delivery Address</Th>
                <Th>Contact Person</Th>
                <Th>Phone</Th>
                <Th className="text-right">Today&apos;s Soil</Th>
                <Th className="text-right">Today&apos;s Fresh</Th>
                <Th className="text-right">Balance</Th>
                <Th>Status</Th>
                <Th className="px-5 text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => (
                <tr
                  key={b.id}
                  className={cn(
                    "border-b border-line/70 last:border-0 hover:bg-canvas/50",
                    selectedBranchId === b.id && "bg-brand-soft/30",
                  )}
                >
                  <Td className="px-5 font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-brand" />
                      <span>{b.name}</span>
                    </div>
                  </Td>
                  <Td className="text-xs text-muted-foreground max-w-xs truncate">
                    {b.address}
                  </Td>
                  <Td className="text-muted-foreground">{b.contact}</Td>
                  <Td className="font-mono text-[13px]">{b.phone}</Td>
                  <Td className="text-right font-mono">{b.soil}</Td>
                  <Td className="text-right font-mono">{b.fresh}</Td>
                  <Td className="text-right font-mono font-medium">{b.balance}</Td>
                  <Td>
                    <StatusBadge status={b.status} />
                  </Td>
                  <Td className="px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedBranchId(b.id)}
                      className="cursor-pointer text-xs font-medium text-brand hover:underline"
                    >
                      Filter View
                    </button>
                    <span className="mx-2 text-line">|</span>
                    <button type="button" className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-ink">
                      Edit
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        ) : (
          <div className="px-5 py-6 text-center text-sm text-muted-foreground">
            No multiple branches configured. This customer operates from a single location.
            <div className="mt-2">
              <GhostButton onClick={() => setIsAddBranchOpen(true)}>Add First Branch</GhostButton>
            </div>
          </div>
        )}
      </Surface>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Surface className="rise p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold tracking-tight">
              {selectedBranch ? `${selectedBranch.name} Details` : "Primary Business Details"}
            </h3>
            {selectedBranch ? (
              <span className="rounded bg-brand-soft px-1.5 py-0.5 font-mono text-[10px] text-brand">
                Branch View
              </span>
            ) : null}
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Contact person", activeContact],
              ["Phone", activePhone],
              ["Email", selectedBranch?.email || c.email],
              ["Address", activeAddress],
              ["GST number", selectedBranch?.gst || c.gst],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label-mono">{k}</dt>
                <dd className="mt-0.5 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Surface>

        <Surface className="rise overflow-hidden xl:col-span-2 [animation-delay:120ms]">
          <CardHead
            title="Assigned Materials & Rates"
            meta={
              selectedBranch
                ? `rates applying to ${selectedBranch.name}`
                : "custom rates override master defaults"
            }
          />
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
        <CardHead
          title="Material-wise Balance"
          meta={selectedBranch ? `${selectedBranch.name} · ${TODAY}` : TODAY}
        />
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

      <AddBranchDialog
        open={isAddBranchOpen}
        onOpenChange={setIsAddBranchOpen}
        customerName={c.name}
        onSave={handleSaveBranch}
      />
    </AdminLayout>
  );
}
