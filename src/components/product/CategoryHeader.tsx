"use client";

import { useRouter } from "next/navigation";
import { Category } from "@/types";

interface CategoryHeaderProps {
  category: Category;
  productCount: number;
}

export default function CategoryHeader({ category, productCount }: CategoryHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-saffron-light">
      <div className="container-rizq flex flex-col items-start justify-between gap-4 py-12 md:flex-row md:items-center md:py-16">
        <button
          type="button"
          onClick={() => router.back()}
          className="focus-ring group flex cursor-pointer items-center gap-2 rounded-full bg-white/70 px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-[250ms] hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current stroke-2 transition-transform duration-[250ms] group-hover:-translate-x-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>

        <div className="text-left md:text-right">
          <p className="eyebrow mb-2 flex items-center gap-2 md:justify-end">
            <span className="rizq-drop" aria-hidden="true" />
            Category
          </p>
          <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {category.name}
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            {productCount} product{productCount === 1 ? "" : "s"} available
          </p>
        </div>
      </div>
    </div>
  );
}