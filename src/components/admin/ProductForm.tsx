"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { adminCategories } from "@/data/admin/categories";
import { AdminProduct, AdminProductStatus, AdminVariant } from "@/types/admin";

function emptyVariant(): AdminVariant {
  return {
    id: `v-${Math.random().toString(36).slice(2, 9)}`,
    size: "",
    price: 0,
    stock: 0,
    lowStockLimit: 10,
  };
}

interface ProductFormProps {
  initialProduct?: AdminProduct;
}

export default function ProductForm({ initialProduct }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProduct);

  const [name, setName] = useState(initialProduct?.name ?? "");
  const [category, setCategory] = useState(initialProduct?.category ?? adminCategories[0].name);
  const [status, setStatus] = useState<AdminProductStatus>(initialProduct?.status ?? "Active");
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription ?? "");
  const [fullDescription, setFullDescription] = useState(initialProduct?.fullDescription ?? "");
  const [images, setImages] = useState<string[]>(initialProduct?.images ?? []);
  const [variants, setVariants] = useState<AdminVariant[]>(
    initialProduct?.variants ?? [emptyVariant()]
  );

  function handleImageUpload(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function updateVariant(id: string, patch: Partial<AdminVariant>) {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }

  function addVariant() {
    setVariants((prev) => [...prev, emptyVariant()]);
  }

  function removeVariant(id: string) {
    setVariants((prev) => (prev.length > 1 ? prev.filter((v) => v.id !== id) : prev));
  }

  function duplicateVariant(id: string) {
    setVariants((prev) => {
      const source = prev.find((v) => v.id === id);
      if (!source) return prev;
      return [...prev, { ...source, id: `v-${Math.random().toString(36).slice(2, 9)}` }];
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Frontend-only demo: no backend to persist to.
    alert(isEditing ? "Product updated (demo only, not persisted)." : "Product created (demo only, not persisted).");
    router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          {/* Basic info */}
          <div className="rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
            <h2 className="mb-4 font-display text-base font-semibold text-ink">Basic Information</h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm text-ink">
                Product Name
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  placeholder="e.g. Sundarban Honey"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Category
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  >
                    {adminCategories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Status
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as AdminProductStatus)}
                    className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-sm text-ink">
                Short Description
                <input
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  placeholder="One line summary shown on product cards"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm text-ink">
                Full Description
                <textarea
                  required
                  rows={4}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="focus-ring resize-none rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  placeholder="Detailed description shown on the product page"
                />
              </label>
            </div>
          </div>

          {/* Variants */}
          <div className="rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">Variants</h2>
              <button
                type="button"
                onClick={addVariant}
                className="focus-ring text-xs font-semibold text-saffron-deep hover:underline"
              >
                + Add Variant
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {variants.map((variant, idx) => (
                <div
                  key={variant.id}
                  className="grid grid-cols-2 gap-3 rounded-lg border border-ink/8 p-3 sm:grid-cols-6"
                >
                  <label className="col-span-2 flex flex-col gap-1 text-xs text-stone-dark sm:col-span-1">
                    Size
                    <input
                      required
                      value={variant.size}
                      onChange={(e) => updateVariant(variant.id, { size: e.target.value })}
                      placeholder="500 gm"
                      className="focus-ring rounded-md border border-ink/12 px-2.5 py-1.5 text-sm text-ink"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs text-stone-dark">
                    Price (৳)
                    <input
                      required
                      type="number"
                      min={0}
                      value={variant.price}
                      onChange={(e) => updateVariant(variant.id, { price: Number(e.target.value) })}
                      className="focus-ring rounded-md border border-ink/12 px-2.5 py-1.5 text-sm text-ink"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs text-stone-dark">
                    Sale Price
                    <input
                      type="number"
                      min={0}
                      value={variant.salePrice ?? ""}
                      onChange={(e) =>
                        updateVariant(variant.id, {
                          salePrice: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      placeholder="Optional"
                      className="focus-ring rounded-md border border-ink/12 px-2.5 py-1.5 text-sm text-ink"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs text-stone-dark">
                    Stock
                    <input
                      required
                      type="number"
                      min={0}
                      value={variant.stock}
                      onChange={(e) => updateVariant(variant.id, { stock: Number(e.target.value) })}
                      className="focus-ring rounded-md border border-ink/12 px-2.5 py-1.5 text-sm text-ink"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs text-stone-dark">
                    SKU
                    <input
                      value={variant.sku ?? ""}
                      onChange={(e) => updateVariant(variant.id, { sku: e.target.value })}
                      placeholder="Optional"
                      className="focus-ring rounded-md border border-ink/12 px-2.5 py-1.5 text-sm text-ink"
                    />
                  </label>
                  <div className="flex items-end justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => duplicateVariant(variant.id)}
                      aria-label={`Duplicate variant ${idx + 1}`}
                      title="Duplicate"
                      className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-ink/12 text-ink hover:border-saffron hover:text-saffron-deep"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                        <rect x="9" y="9" width="12" height="12" rx="2" />
                        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      disabled={variants.length === 1}
                      aria-label={`Remove variant ${idx + 1}`}
                      title="Remove"
                      className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-ink/12 text-ink hover:border-red-400 hover:text-red-500 disabled:opacity-40"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Images sidebar */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
            <h2 className="mb-4 font-display text-base font-semibold text-ink">Product Images</h2>
            <label className="focus-ring flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-dashed border-ink/15 py-8 text-center hover:border-saffron">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2 text-stone-dark">
                <path d="M12 16V4M12 4 7 9M12 4l5 5" />
                <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
              </svg>
              <span className="text-xs text-stone-dark">Click to upload images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files)}
              />
            </label>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {images.map((src, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-stone">
                    <Image src={src} alt={`Product image ${i + 1}`} fill sizes="100px" className="object-cover" unoptimized />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label={`Remove image ${i + 1}`}
                      className="focus-ring absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              {isEditing ? "Save Changes" : "Add Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => router.push("/admin/products")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
