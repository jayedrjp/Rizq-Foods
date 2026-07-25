"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice } from "@/lib/utils";
import { adminProducts } from "@/data/admin/products";

export default function AdminProductsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return adminProducts;
    return adminProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Products</h1>
          <p className="mt-1 text-sm text-stone-dark">{adminProducts.length} products in catalogue</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary">+ Add Product</Button>
        </Link>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products or categories..."
        aria-label="Search products"
        className="focus-ring w-full max-w-sm rounded-full border border-ink/12 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-stone-dark"
      />

      <div className="overflow-x-auto rounded-xl2 border border-ink/8 bg-white shadow-softer">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-stone-dark">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
              return (
                <tr key={p.id} className="border-b border-ink/8 last:border-0 hover:bg-stone/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-stone">
                        <Image src={p.images[0]} alt={p.name} fill sizes="44px" className="object-cover" />
                      </div>
                      <span className="font-medium text-ink">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-stone-dark">{p.category}</td>
                  <td className="px-5 py-3 font-semibold text-ink">
                    {formatPrice(p.variants[0]?.price ?? 0)}
                  </td>
                  <td className="px-5 py-3 text-stone-dark">{totalStock}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="focus-ring text-xs font-semibold text-saffron-deep hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-stone-dark">
                  No products match &ldquo;{query}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
