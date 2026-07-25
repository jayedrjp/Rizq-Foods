"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotal } = useCart();
  const delivery = subtotal > 0 ? 80 : 0;
  const total = subtotal + delivery;

  return (
    <div className="container-rizq py-8 md:py-12">
      <h1 className="mb-8 font-display text-3xl font-semibold text-ink md:text-4xl">Your Cart</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl2 border border-dashed border-ink/15 py-20 text-center">
          <span className="rizq-drop-lg" aria-hidden="true" />
          <p className="text-sm text-stone-dark">Your cart is empty.</p>
          <Link href="/products">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="flex flex-col gap-4">
            {lines.map((line) => (
              <li
                key={line.product.id}
                className="flex gap-4 rounded-xl2 border border-ink/8 bg-white p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone">
                  <Image src={line.product.image} alt={line.product.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link href={`/product/${line.product.slug}`} className="focus-ring font-display text-sm font-semibold text-ink hover:text-saffron-deep">
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
                        className="focus-ring flex h-8 w-8 items-center justify-center text-ink hover:text-saffron-deep"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-ink">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(line.product.id, 1)}
                        className="focus-ring flex h-8 w-8 items-center justify-center text-ink hover:text-saffron-deep"
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

          <div className="h-fit rounded-xl2 border border-ink/8 bg-white p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-ink">Order Summary</h2>
            <div className="flex flex-col gap-2 border-b border-ink/8 pb-4 text-sm text-ink/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{formatPrice(delivery)}</span>
              </div>
            </div>
            <div className="flex justify-between py-4 font-display text-base font-semibold text-ink">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
            <Link href="/products" className="focus-ring mt-3 block text-center text-sm text-saffron-deep hover:underline">
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
