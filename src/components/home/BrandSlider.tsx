import { brands } from "@/data/brands";

export default function BrandSlider() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:flex-nowrap md:justify-between md:gap-6">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="flex h-20 flex-1 min-w-[140px] items-center justify-center gap-2 rounded-xl2 border border-ink/8 bg-white px-4 transition-colors hover:border-saffron/40"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone font-display text-sm font-semibold text-saffron-deep">
            {brand.logoInitial}
          </span>
          <span className="text-sm font-semibold text-ink">{brand.name}</span>
        </div>
      ))}
    </div>
  );
}
