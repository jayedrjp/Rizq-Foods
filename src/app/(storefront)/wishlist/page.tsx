"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { wishlistIds } = useWishlist();

  const items = products.filter((product) => wishlistIds.includes(product.id));

  return (
    <div className="container-rizq py-8 md:py-12">
      <h1 className="mb-2 font-display text-3xl font-semibold text-ink md:text-4xl">
        Your Wishlist
      </h1>

      <p className="mb-8 text-sm text-stone-dark">
        {items.length} saved {items.length === 1 ? "item" : "items"}
      </p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl2 border border-dashed border-ink/15 py-20 text-center">
          <span className="rizq-drop-lg" aria-hidden="true" />
          <p className="text-sm text-stone-dark">
            You haven't saved anything yet.
          </p>

          <Link href="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
