"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function FloatingCart() {
  const { itemCount, subtotal, openDrawer } = useCart();

  return (
    <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2">
      <button
        type="button"
        onClick={openDrawer}
        aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
        className="overflow-hidden rounded-l-xl bg-white shadow-xl"
      >
        {/* Orange Header */}
        <div className="flex w-18 flex-col items-center justify-center bg-saffron py-2.5 text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 fill-none stroke-current stroke-2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>

          <span className="mt-1 text-sm font-semibold">
            {itemCount} Item{itemCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* White Bottom */}
        <div className="flex w-20 items-center justify-center bg-white py-1">
          <span className="text-s font-bold text-saffron">
            {formatPrice(subtotal)}
          </span>
        </div>
      </button>
    </div>
  );
}