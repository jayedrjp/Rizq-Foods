export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export type ProductBadge = "Best Selling" | "Combo Offer" | "Organic" | "New";

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  weight: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  badge?: ProductBadge;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface Brand {
  id: string;
  name: string;
  logoInitial: string;
}
