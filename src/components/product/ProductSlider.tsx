"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";

interface ProductSliderProps {
  products: Product[];
  navId: string;
}

export default function ProductSlider({ products, navId }: ProductSliderProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.next-${navId}`,
          prevEl: `.prev-${navId}`,
        }}
        spaceBetween={16}
        slidesPerView={2.2}
        breakpoints={{
          640: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous products"
        className={`prev-${navId} focus-ring absolute -left-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white shadow-softer hover:text-saffron md:flex`}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next products"
        className={`next-${navId} focus-ring absolute -right-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white shadow-softer hover:text-saffron md:flex`}
      >
        ›
      </button>
    </div>
  );
}
