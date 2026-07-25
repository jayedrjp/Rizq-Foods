"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-stone-dark">Store details used across the site and checkout</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          window.setTimeout(() => setSaved(false), 2000);
        }}
        className="flex flex-col gap-4 rounded-xl2 border border-ink/8 bg-white p-6 shadow-softer"
      >
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Store Name
          <input
            defaultValue="Rizq Foods"
            className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Support Email
          <input
            defaultValue="support@rizqfoods.com"
            type="email"
            className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Support Phone
          <input
            defaultValue="+880 1XXX-XXXXXX"
            className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Delivery Fee (৳)
          <input
            defaultValue={80}
            type="number"
            min={0}
            className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
          />
        </label>
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
          {saved && <span className="text-sm font-medium text-leaf">Saved (demo only, not persisted)</span>}
        </div>
      </form>
    </div>
  );
}
