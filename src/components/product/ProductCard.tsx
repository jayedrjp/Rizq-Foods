"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${
            i < Math.round(rating) ? "fill-saffron" : "fill-stone"
          }`}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { user, loading } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();

  const [justAdded, setJustAdded] = useState(false);

  const wished = isWishlisted(product.id);

  function handleAddToCart() {
    if (!product.inStock) return;
    if (loading) return;
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    addItem(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="group relative flex flex-col rounded-xl2 border border-ink/8 bg-white p-3 shadow-softer transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <Badge tone={product.badge === "Organic" ? "leaf" : "saffron"}>
            {product.badge}
          </Badge>
        )}
        {product.discountPercent && (
          <Badge tone="ink">Save {product.discountPercent}%</Badge>
        )}
      </div>

      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wished}
        onClick={() => toggleWishlist(product.id)}
        className={`focus-ring absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-softer transition-colors ${
          wished ? "text-saffron" : "text-ink/60 hover:text-saffron"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-current stroke-2"
          fill={wished ? "currentColor" : "none"}
        >
          <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 4.5 6 4.1c2.2-.2 3.9 1 6 3.2 2.1-2.2 3.8-3.4 6-3.2 3.7.4 5.5 4.3 4 7.8C19.5 16.4 12 21 12 21z" />
        </svg>
      </button>

      <Link
        href={`/product/${product.slug}`}
        className="focus-ring relative mb-3 block aspect-square overflow-hidden rounded-lg bg-stone"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <span className="mb-1 text-xs font-medium text-saffron-deep">
        {product.categoryName}
      </span>

      <Link href={`/product/${product.slug}`} className="focus-ring">
        <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] font-display text-sm font-semibold leading-snug text-ink hover:text-saffron-deep">
          {product.name}
        </h3>
      </Link>

      <p className="mb-2 text-xs text-stone-dark">{product.weight}</p>

      <div className="mb-2 flex items-center gap-1.5">
        <StarRating rating={product.rating} />
        <span className="text-xs text-stone-dark">({product.reviewCount})</span>
      </div>

      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-display text-lg font-semibold text-ink">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice && (
          <span className="text-xs text-stone-dark line-through">
            {formatPrice(product.oldPrice)}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="focus-ring mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-xs font-semibold text-cream transition-colors hover:bg-saffron disabled:cursor-not-allowed disabled:bg-stone disabled:text-stone-dark"
      >
        {justAdded ? (
          <>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-current stroke-2"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Added
          </>
        ) : !product.inStock ? (
          "Out of Stock"
        ) : (
          <>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-current stroke-2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
