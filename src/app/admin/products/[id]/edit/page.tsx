import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getAdminProductById, adminProducts } from "@/data/admin/products";

export function generateStaticParams() {
  return adminProducts.map((p) => ({ id: p.id }));
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = getAdminProductById(params.id);
  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Edit Product</h1>
        <p className="mt-1 text-sm text-stone-dark">{product.name}</p>
      </div>
      <ProductForm initialProduct={product} />
    </div>
  );
}
