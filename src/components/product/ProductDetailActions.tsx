"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, openDrawer } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  function requireLogin() {
    if (loading) return true;
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return true;
    }
    return false;
  }

  function handleAddToCart() {
    if (!product.inStock) return;
    if (requireLogin()) return;
    addItem(product, quantity);
    openDrawer();
  }

  function handleBuyNow() {
    if (!product.inStock) return;
    if (requireLogin()) return;
    addItem(product, quantity);
    router.push("/cart");
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex w-fit items-center rounded-full border border-ink/12">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="focus-ring flex h-11 w-11 items-center justify-center text-lg text-ink hover:text-saffron-deep"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold text-ink">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => q + 1)}
          className="focus-ring flex h-11 w-11 items-center justify-center text-lg text-ink hover:text-saffron-deep"
        >
          +
        </button>
      </div>

      <div className="flex flex-1 gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Add to Cart
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={handleBuyNow}
          disabled={!product.inStock}
        >
          Buy Now
        </Button>
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((v) => !v)}
          className={`focus-ring flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border transition-colors ${
            isWishlisted
              ? "border-saffron text-saffron"
              : "border-ink/12 text-ink hover:border-saffron hover:text-saffron"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 stroke-current stroke-2"
            fill={isWishlisted ? "currentColor" : "none"}
          >
            <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 4.5 6 4.1c2.2-.2 3.9 1 6 3.2 2.1-2.2 3.8-3.4 6-3.2 3.7.4 5.5 4.3 4 7.8C19.5 16.4 12 21 12 21z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
