# Rizq Foods — Frontend

A production-ready, frontend-only e-commerce site for **Rizq Foods**, a premium natural grocery
brand for families in Bangladesh. Built with Next.js (App Router), TypeScript, Tailwind CSS and
Swiper.js — no backend, database, or auth included by design.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/                 Route pages (App Router)
    page.tsx           Home
    products/           All Products
    category/[slug]/    Category page
    product/[slug]/     Product details
    cart/                Cart (UI only)
    wishlist/            Wishlist (UI only)
    contact/             Contact form (UI only)
    about/               About page
    not-found.tsx        Custom 404
  components/
    ui/                Button, Badge
    layout/            Navbar, SearchBar, CategoryNavbar, Footer, FloatingCart
    home/              HeroSlider, PromotionBanner, BrandSlider, ReviewCard, NewsletterForm
    product/           ProductCard, ProductSlider, CategoryCard, ProductDetailActions
    shared/            SectionHeader
  data/                Static TypeScript dummy data (products, categories, brands, reviews)
  types/               Shared TypeScript interfaces
  lib/                 Small utilities (formatPrice, cx)
```

## Notes

- All product/category/brand/review data lives in `src/data/*.ts` as static arrays — swap these
  for real API calls when a backend is ready.
- Product images use placehold.co placeholders; replace `image` fields in `src/data/products.ts`
  with real product photography.
- The floating cart, cart page, and wishlist page use local component state only (no persistence)
  — wire up real state management or a backend once available.
- Design tokens (colors, type scale) live in `tailwind.config.ts` and `src/app/globals.css`.
