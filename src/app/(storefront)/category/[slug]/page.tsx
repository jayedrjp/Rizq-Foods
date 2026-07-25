import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import CategoryHeader from "@/components/product/CategoryHeader";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);

  return (
    <div>
      <CategoryHeader category={category} productCount={items.length} />

      <div className="container-rizq py-8 md:py-12">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl2 border border-dashed border-ink/15 p-10 text-center text-sm text-stone-dark">
            New {category.name.toLowerCase()} arriving soon.
          </p>
        )}
      </div>
    </div>
  );
}