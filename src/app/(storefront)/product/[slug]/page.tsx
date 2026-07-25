import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductDetailActions from "@/components/product/ProductDetailActions";
import { formatPrice } from "@/lib/utils";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="container-rizq py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-stone-dark">
        <Link href="/" className="focus-ring hover:text-saffron-deep">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.categorySlug}`} className="focus-ring hover:text-saffron-deep">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl2 bg-stone">
          {product.badge && (
            <div className="absolute left-4 top-4 z-10">
              <Badge tone={product.badge === "Organic" ? "leaf" : "saffron"}>{product.badge}</Badge>
            </div>
          )}
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
        </div>

        <div>
          <span className="mb-2 inline-block text-sm font-medium text-saffron-deep">
            {product.categoryName}
          </span>
          <h1 className="mb-3 font-display text-2xl font-semibold text-ink md:text-3xl">
            {product.name}
          </h1>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-saffron" : "fill-stone"}`}>
                  <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-stone-dark">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-stone-dark line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {product.discountPercent && <Badge tone="ink">Save {product.discountPercent}%</Badge>}
          </div>

          <p className="mb-6 max-w-lg text-sm leading-relaxed text-ink/75">{product.description}</p>

          <div className="mb-6 flex items-center gap-6 text-sm text-ink/70">
            <span><strong className="text-ink">Weight:</strong> {product.weight}</span>
            <span className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-leaf" : "bg-red-400"}`} />
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <ProductDetailActions product={product} />

          <ul className="mt-8 flex flex-col gap-2 border-t border-ink/8 pt-6 text-sm text-ink/70">
            <li>✓ Sourced and quality-checked by Rizq Foods</li>
            <li>✓ Sealed and hygienically packed for freshness</li>
            <li>✓ Cash on delivery available across Bangladesh</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeader eyebrow="You may also like" title={`More from ${product.categoryName}`} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
