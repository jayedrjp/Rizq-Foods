import HeroSlider from "@/components/home/HeroSlider";
import PromotionBanner from "@/components/home/PromotionBanner";
import BrandSlider from "@/components/home/BrandSlider";
import ReviewCard from "@/components/home/ReviewCard";
import CategoryCard from "@/components/product/CategoryCard";
import ProductCard from "@/components/product/ProductCard";
import ProductSlider from "@/components/product/ProductSlider";
import SectionHeader from "@/components/shared/SectionHeader";
import { categories } from "@/data/categories";
import { products, getProductsByCategory } from "@/data/products";
import { reviews } from "@/data/reviews";
import ReviewMarquee from "@/components/home/ReviewMarquee";

export default function HomePage() {
  const topSelling = products.filter((p) => p.badge === "Best Selling");
  const honeyProducts = getProductsByCategory("honey");
  const comboProducts = products.filter((p) => p.badge === "Combo Offer");
  const dateProducts = getProductsByCategory("dates");
  const cookingEssentials = [
    ...getProductsByCategory("mustard-oil"),
    ...getProductsByCategory("ghee"),
  ];
  const organicProducts = products.filter((p) => p.badge === "Organic");
  const recommended = products.slice(0, 10);

  return (
    <div className="container-rizq flex flex-col gap-14 py-6 md:gap-20 md:py-10">
      {/* Hero */}
      <section aria-label="Featured promotions">
        <HeroSlider />
      </section>

      {/* Featured Categories */}
      <section aria-label="Featured categories">
        <SectionHeader eyebrow="Shop by" title="Featured Categories" align="center" />
        <div className="flex flex-wrap justify-center gap-4 pb-2">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Top Selling Products */}
      <section aria-label="Top selling products">
        <SectionHeader eyebrow="Customer favourites" title="Top Selling Products" viewAllHref="/products" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topSelling.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>


      {/* Honey Products */}
      <section aria-label="Honey products">
        <SectionHeader eyebrow="Raw & Unfiltered" title="All Natural Honey" viewAllHref="/category/honey" />
        <ProductSlider products={honeyProducts} navId="honey" />
      </section>

      {/* Combo Products */}
      <section aria-label="Combo deals" className="rounded-xl2 bg-saffron-light p-5 md:p-8">
        <SectionHeader eyebrow="Bundle & Save" title="Exclusive Combo Deals" viewAllHref="/products" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comboProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Premium Dates */}
      <section aria-label="Premium dates">
        <SectionHeader eyebrow="Iftar essentials" title="Premium Dates" viewAllHref="/category/dates" />
        <ProductSlider products={dateProducts} navId="dates" />
      </section>

      {/* Promotional Banner */}
<section aria-label="Promotion" className="py-8">
  <img
    src="/images/mustard-oil-banner.png"
    alt="Rizq Foods Promotion"
    className="w-full h-auto rounded-2xl object-cover"
  />
</section>

      {/* Cooking Essentials */}
      <section aria-label="Cooking essentials">
        <SectionHeader eyebrow="Everyday staples" title="Cooking Essentials" viewAllHref="/products" />
        <ProductSlider products={cookingEssentials} navId="cooking" />
      </section>

      {/* Organic Products */}
      <section aria-label="Organic products">
        <SectionHeader eyebrow="Certified clean" title="Organic Products" viewAllHref="/products" />
        {organicProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {organicProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-dark">More organic picks coming soon.</p>
        )}
      </section>

      {/* Recommended Products */}
      <section aria-label="Recommended for you">
        <SectionHeader eyebrow="Just for you" title="Recommended Products" viewAllHref="/products" />
        <ProductSlider products={recommended} navId="recommended" />
      </section>

{/* Customer Reviews */}
<section aria-label="Customer reviews">
  <SectionHeader
    eyebrow="Word from families"
    title="Customer Reviews"
    align="center"
  />
  <ReviewMarquee reviews={reviews} />
</section>
    </div>
  );
}
