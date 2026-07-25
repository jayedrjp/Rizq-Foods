import { adminCategories } from "@/data/admin/categories";

export default function AdminCategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Categories</h1>
        <p className="mt-1 text-sm text-stone-dark">{adminCategories.length} categories in the storefront</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminCategories.map((cat) => (
          <div key={cat.id} className="rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
            <p className="font-display text-lg font-semibold text-ink">{cat.name}</p>
            <p className="mt-1 text-sm text-stone-dark">/{cat.slug}</p>
            <p className="mt-3 text-sm font-medium text-saffron-deep">{cat.productCount} products</p>
          </div>
        ))}
      </div>
    </div>
  );
}
