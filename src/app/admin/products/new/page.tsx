import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Add Product</h1>
        <p className="mt-1 text-sm text-stone-dark">Create a new product listing for the storefront.</p>
      </div>
      <ProductForm />
    </div>
  );
}
