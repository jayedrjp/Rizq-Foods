"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<null | { id: string; status: string }>(null);
  const [notFound, setNotFound] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = orderId.trim();
    if (!trimmed) return;
    // Demo-only lookup: no backend, so any non-empty ID "succeeds".
    setNotFound(false);
    setResult({ id: trimmed.toUpperCase(), status: "Processing" });
  }

  return (
    <div className="container-rizq flex justify-center py-12 md:py-20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2 flex items-center justify-center gap-2">
            <span className="rizq-drop" aria-hidden="true" />
            Order status
          </p>
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Track Your Order</h1>
          <p className="mt-2 text-sm text-stone-dark">Enter your order ID to see its current status.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-xl2 border border-ink/8 bg-white p-6 shadow-softer sm:flex-row sm:items-start"
        >
          <label className="flex flex-1 flex-col gap-1.5 text-sm text-ink">
            Order ID
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. RZQ-10234"
              className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
            />
          </label>
          <Button type="submit" variant="primary" size="lg" className="sm:mt-6">
            Track
          </Button>
        </form>

        {result && (
          <div className="mt-6 flex items-center justify-between rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
            <div>
              <p className="text-sm font-semibold text-ink">Order {result.id}</p>
              <p className="text-xs text-stone-dark">This is a demo — no real order lookup is connected yet.</p>
            </div>
            <Badge tone="saffron">{result.status}</Badge>
          </div>
        )}

        {notFound && (
          <p className="mt-6 rounded-xl2 border border-dashed border-ink/15 p-5 text-center text-sm text-stone-dark">
            We couldn&apos;t find that order.
          </p>
        )}
      </div>
    </div>
  );
}
