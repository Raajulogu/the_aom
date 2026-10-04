"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PrimaryButton } from "@/components/admin/primitives";
import { materials } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AddCustomerDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selected, setSelected] = useState<Record<string, number>>({
    Bedsheet: 90,
    "Bath Towel": 70,
    "Pillow Cover": 35,
  });

  if (!open) return null;

  const toggle = (name: string, defaultRate: number) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[name] !== undefined) {
        delete next[name];
      } else {
        next[name] = defaultRate;
      }
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-xs">
      <div
        className="w-full max-w-xl rounded-2xl bg-card shadow-xl ring-1 ring-line"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight">Add New Customer</h2>
            <p className="font-mono text-xs text-muted-foreground">Hotel or business account onboarding</p>
          </div>
          <button
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="grid size-8 cursor-pointer place-items-center rounded-lg ring-1 ring-line hover:bg-canvas"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="label-mono">Business Name *</span>
              <input
                placeholder="e.g. Hotel Promenade"
                className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              />
            </label>
            <label className="block">
              <span className="label-mono">Contact Person</span>
              <input
                placeholder="Manager name"
                className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              />
            </label>
            <label className="block">
              <span className="label-mono">Phone Number *</span>
              <input
                placeholder="98765 43210"
                className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              />
            </label>
            <label className="block">
              <span className="label-mono">Email</span>
              <input
                placeholder="ops@hotel.in"
                className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              />
            </label>
          </div>

          <label className="block">
            <span className="label-mono">Address</span>
            <input
              placeholder="Street, City, Pincode"
              className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>

          <label className="block">
            <span className="label-mono">GST Number</span>
            <input
              placeholder="34AAAAA0000A1Z5"
              className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 font-mono text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>

          <div className="pt-2">
            <div className="flex items-center justify-between">
              <span className="label-mono">Materials &amp; Agreed Rates</span>
              <span className="font-mono text-xs text-muted-foreground">
                {Object.keys(selected).length} selected
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Select items this customer uses and set agreed rates (defaults shown).
            </p>

            <div className="mt-3 space-y-2">
              {materials.map((m) => {
                const on = selected[m.name] !== undefined;
                return (
                  <div
                    key={m.name}
                    className={cn(
                      "flex items-center justify-between rounded-xl p-2.5 transition-all ring-1",
                      on ? "bg-brand-soft/50 ring-brand/25" : "bg-canvas ring-line",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(m.name, m.rate)}
                      className="flex min-w-0 cursor-pointer items-center gap-2.5 text-left"
                    >
                      <span
                        className={cn(
                          "grid size-4 shrink-0 place-items-center rounded border text-[10px]",
                          on ? "border-brand bg-brand text-card" : "border-line bg-card",
                        )}
                      >
                        {on ? "✓" : ""}
                      </span>
                      <span className="truncate text-sm font-medium">{m.name}</span>
                    </button>
                    {on ? (
                      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-card px-2 py-1 ring-1 ring-line">
                        <span className="text-xs text-muted-foreground">₹</span>
                        <input
                          type="number"
                          value={selected[m.name]}
                          onChange={(e) =>
                            setSelected((p) => ({ ...p, [m.name]: Number(e.target.value) || 0 }))
                          }
                          className="w-12 bg-transparent text-right font-mono text-sm outline-none"
                        />
                      </div>
                    ) : (
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                        default ₹{m.rate}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-ink"
          >
            Cancel
          </button>
          <PrimaryButton onClick={() => onOpenChange(false)}>Save Customer</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
