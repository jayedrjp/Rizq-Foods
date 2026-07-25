"use client";

import { useState } from "react";
import { adminReviews as initialReviews } from "@/data/admin/reviews";
import { AdminReview } from "@/types/admin";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${i < rating ? "fill-saffron" : "fill-stone"}`}>
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>(initialReviews);

  function toggleApproval(id: string) {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r)));
  }

  function removeReview(id: string) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Reviews</h1>
        <p className="mt-1 text-sm text-stone-dark">Moderate customer reviews before they go live</p>
      </div>

      <div className="flex flex-col gap-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink">{r.productName}</p>
                <p className="text-xs text-stone-dark">
                  {r.customerName} · {r.date}
                </p>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="mb-4 text-sm text-ink/80">{r.text}</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleApproval(r.id)}
                className={`focus-ring rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  r.approved
                    ? "bg-leaf-light text-leaf"
                    : "bg-stone text-stone-dark hover:bg-saffron-light hover:text-saffron-deep"
                }`}
              >
                {r.approved ? "Approved" : "Pending — Approve"}
              </button>
              <button
                type="button"
                onClick={() => removeReview(r.id)}
                className="focus-ring text-xs font-semibold text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="rounded-xl2 border border-dashed border-ink/15 p-10 text-center text-sm text-stone-dark">
            No reviews to moderate.
          </p>
        )}
      </div>
    </div>
  );
}
