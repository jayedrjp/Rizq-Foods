import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="focus-ring group flex shrink-0 flex-col items-center gap-3 rounded-xl2 border border-ink/8 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-saffron/40 hover:shadow-soft"
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-saffron-light">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="64px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-ink">
        {category.name}
      </span>
    </Link>
  );
}
