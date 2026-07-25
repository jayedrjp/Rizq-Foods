"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { lines, isDrawerOpen, closeDrawer, removeItem, updateQuantity, subtotal } = useCart();

  // Close on Escape
  useEffect(() => {
    if (!isDrawerOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll while open WITHOUT shifting layout.
  // Hiding the scrollbar (overflow: hidden) narrows the viewport by the
  // scrollbar's width, which shoves all fixed-width content left/right and
  // reads as "the whole site shaking". We measure that width up front and
  // compensate with an equal amount of right padding on <body>, so the
  // available content width never changes — only the scrollbar disappears.
  useEffect(() => {
    if (!isDrawerOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const currentPaddingRight = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer — fixed position, animates only via transform (translateX), never width/left/right/margin */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-white shadow-lifted transition-transform duration-300 ease-out will-change-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">Your Cart</h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-stone"
          >
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="rizq-drop-lg" aria-hidden="true" />
            <p className="text-sm text-stone-dark">Your cart is empty.</p>
            <Link href="/products" onClick={closeDrawer}>
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4">
              {lines.map((line) => (
                <li key={line.product.id} className="flex gap-3 border-b border-ink/8 py-4 first:pt-0">
                  <Link
                    href={`/product/${line.product.slug}`}
                    onClick={closeDrawer}
                    className="focus-ring relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-stone"
                  >
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/product/${line.product.slug}`}
                        onClick={closeDrawer}
                        className="focus-ring font-display text-sm font-semibold text-ink hover:text-saffron-deep"
                      >
                        {line.product.name}
                      </Link>
                      <p className="text-xs text-stone-dark">{line.product.weight}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink/12">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(line.product.id, -1)}
                          className="focus-ring flex h-7 w-7 items-center justify-center text-sm text-ink hover:text-saffron-deep"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-ink">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(line.product.id, 1)}
                          className="focus-ring flex h-7 w-7 items-center justify-center text-sm text-ink hover:text-saffron-deep"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-display text-sm font-semibold text-ink">
                        {formatPrice(line.product.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${line.product.name}`}
                    onClick={() => removeItem(line.product.id)}
                    className="focus-ring self-start text-stone-dark hover:text-red-500"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink/8 px-5 py-4">
              <div className="mb-4 flex items-center justify-between font-display text-base font-semibold text-ink">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link href="/cart" onClick={closeDrawer}>
                <Button variant="primary" size="lg" className="w-full">
                  Checkout
                </Button>
              </Link>
              <Link
                href="/products"
                onClick={closeDrawer}
                className="focus-ring mt-3 block text-center text-sm text-saffron-deep hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
