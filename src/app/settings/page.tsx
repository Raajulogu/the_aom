"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Chip,
  PageHeader,
  PrimaryButton,
  Surface,
} from "@/components/admin/primitives";
import { cn } from "@/lib/utils";

const tabs = ["Business", "Billing", "Notifications", "Users"] as const;

function Field({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <label className="block">
      <span className="label-mono">{label}</span>
      <input
        defaultValue={value}
        className="mt-2 w-full rounded-lg bg-canvas px-3 py-2.5 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
      />
      {hint ? <span className="mt-1.5 block text-[11px] text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

function Toggle({ label, note, on }: { label: string; note: string; on?: boolean }) {
  const [checked, setChecked] = useState(!!on);
  return (
    <button
      type="button"
      onClick={() => setChecked((v) => !v)}
      className="flex w-full cursor-pointer items-center justify-between gap-4 border-b border-line/70 py-4 text-left last:border-0"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-[12px] text-muted-foreground">{note}</span>
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-brand" : "bg-line",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-card shadow-sm transition-all",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Business");

  return (
    <AdminLayout>
      <PageHeader
        title="Settings"
        subtitle="Company profile, billing defaults and alerts."
        action={<PrimaryButton>Save Changes</PrimaryButton>}
      />

      <div className="no-bar mt-4 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-1 rounded-lg bg-canvas p-1 ring-1 ring-line">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "cursor-pointer rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors",
                tab === t ? "bg-card text-ink shadow-sm" : "text-muted-foreground hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "Business" ? (
        <Surface className="rise mt-4 p-5">
          <h3 className="font-display font-bold tracking-tight">Business Profile</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field label="Company name" value="AOM Industrial Laundry" />
            <Field label="GST number" value="34AAACA1234B1Z9" />
            <Field label="Phone" value="0413 234 5678" />
            <Field label="Email" value="admin@aomlaundry.in" />
            <Field label="Address" value="Industrial Estate, Thattanchavady, Pondicherry 605009" />
            <Field label="Working hours" value="6:00 AM – 8:00 PM" />
          </div>
        </Surface>
      ) : null}

      {tab === "Billing" ? (
        <Surface className="rise mt-4 p-5">
          <h3 className="font-display font-bold tracking-tight">Billing Defaults</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field label="Invoice prefix" value="INV-2026-" />
            <Field label="GST rate (%)" value="18" />
            <Field label="Billing cycle" value="Monthly (last day)" hint="Invoices generate automatically." />
            <Field label="Payment terms (days)" value="15" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip tone="brand">Auto-generate invoices</Chip>
            <Chip tone="sky">Email to customer</Chip>
            <Chip tone="neutral">PDF attachment</Chip>
          </div>
        </Surface>
      ) : null}

      {tab === "Notifications" ? (
        <Surface className="rise mt-4 p-5">
          <h3 className="font-display font-bold tracking-tight">Alerts</h3>
          <div className="mt-2">
            <Toggle label="High pending balance" note="Alert when a customer crosses 50 pending items." on />
            <Toggle label="Missing daily entry" note="Alert if a customer has no entry by 6 PM." on />
            <Toggle label="Invoice overdue" note="Alert when payment crosses the due date." on />
            <Toggle label="Daily summary email" note="Send an end-of-day operations summary." />
          </div>
        </Surface>
      ) : null}

      {tab === "Users" ? (
        <Surface className="rise mt-4 p-5">
          <h3 className="font-display font-bold tracking-tight">Portal Access</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Employee and customer portals arrive in a later phase. Access shown here is a preview.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { name: "Admin Portal", note: "Full access", tone: "brand" as const, state: "Live" },
              { name: "Employee Portal", note: "Daily entry only", tone: "sky" as const, state: "Planned" },
              { name: "Customer Portal", note: "View & download", tone: "neutral" as const, state: "Planned" },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl bg-canvas p-4 ring-1 ring-line">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{p.name}</span>
                  <Chip tone={p.tone}>{p.state}</Chip>
                </div>
                <p className="mt-2 text-[12px] text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
        </Surface>
      ) : null}
    </AdminLayout>
  );
}
