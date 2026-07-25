"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function ProductsPage() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");

  function toggleCategory(slug: string) {
    setActiveCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategories.length > 0) {
      list = list.filter((p) => activeCategories.includes(p.categorySlug));
    }
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [activeCategories, sort]);

  return (
    <div className="container-rizq py-8 md:py-12">
      <div className="mb-8">
        <p className="eyebrow mb-2 flex items-center gap-2">
          <span className="rizq-drop" aria-hidden="true" />
          Full catalogue
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">All Products</h1>
        <p className="mt-2 max-w-xl text-sm text-stone-dark">
          Browse every item in the Rizq Foods pantry — from raw honey to cold-pressed oils.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-[150px] lg:self-start">
          <div className="rounded-xl2 border border-ink/8 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink">Category</h2>
            <ul className="flex flex-col gap-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/80">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-saffron"
                      checked={activeCategories.includes(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                    />
                    {cat.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-stone-dark">{filtered.length} products</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="focus-ring rounded-full border border-ink/12 bg-white px-4 py-2 text-sm text-ink"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl2 border border-dashed border-ink/15 p-10 text-center text-sm text-stone-dark">
              No products match these filters yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
