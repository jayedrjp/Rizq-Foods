"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
  id: string;
  image: string;
  href: string;
  alt: string;
}

const slides: Slide[] = [
  { id: "s1", image: "/images/honey-banner.png", href: "/products/honey", alt: "100% Pure Natural Honey" },
  { id: "s2", image: "/images/dates-banner.png", href: "/products/dates", alt: "Luxury Dates Collection" },
  { id: "s3", image: "/images/ghee-banner.png", href: "/products/ghee", alt: "Pure Desi Ghee" },
  { id: "s4", image: "/images/nuts-banner.png", href: "/products/nuts", alt: "Premium Dry Fruits & Nuts" },
  { id: "s5", image: "/images/mustard-oil-banner.png", href: "/products/oil", alt: "Oil" },
  { id: "s6", image: "/images/rice-banner.png", href: "/products/rice", alt: "Premium Rice" },
  { id: "s7", image: "/images/masala-banner.png", href: "/products/spices", alt: "Organic Spices" },
];

export default function HeroSlider() {
  return (
    <div className="relative overflow-hidden rounded-xl2 shadow-soft">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        speed={700}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.href} className="focus-ring relative block aspect-[2/1] w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        className="hero-prev focus-ring absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-softer hover:bg-white md:flex"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="hero-next focus-ring absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-softer hover:bg-white md:flex"
      >
        ›
      </button>
      <div className="hero-pagination absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2" />
    </div>
  );
}