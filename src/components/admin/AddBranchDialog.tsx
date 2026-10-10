"use client";

import { useState } from "react";
import { X, Building } from "lucide-react";
import { PrimaryButton } from "@/components/admin/primitives";

export function AddBranchDialog({
  open,
  onOpenChange,
  customerName,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  onSave?: (branch: {
    name: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    gst: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gst, setGst] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({ name, contact, phone, email, address, gst });
    }
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-xs">
      <div
        className="w-full max-w-lg rounded-2xl bg-card shadow-xl ring-1 ring-line"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-brand">
              <Building className="size-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight">Add New Branch</h2>
              <p className="font-mono text-xs text-muted-foreground">
                {customerName ? `Location for ${customerName}` : "Branch location onboarding"}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="grid size-8 cursor-pointer place-items-center rounded-lg ring-1 ring-line hover:bg-canvas"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3.5 p-5">
            <label className="block">
              <span className="label-mono">Branch / Location Name *</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Beach Road Annex or Heritage Wing"
                className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              />
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="label-mono">Branch Contact Person</span>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Manager / Housekeeper"
                  className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                />
              </label>
              <label className="block">
                <span className="label-mono">Branch Phone *</span>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43219"
                  className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 font-mono text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                />
              </label>
            </div>

            <label className="block">
              <span className="label-mono">Delivery &amp; Pickup Address *</span>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address for laundry dispatch and pickup"
                className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
              />
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="label-mono">Email (Optional)</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="branch@hotel.in"
                  className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                />
              </label>
              <label className="block">
                <span className="label-mono">Branch GST (Optional)</span>
                <input
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  placeholder="Inherits parent GST if blank"
                  className="mt-1.5 w-full rounded-lg bg-canvas px-3 py-2 font-mono text-sm ring-1 ring-line outline-none focus:ring-2 focus:ring-brand/40"
                />
              </label>
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
            <PrimaryButton type="submit">Save Branch</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
