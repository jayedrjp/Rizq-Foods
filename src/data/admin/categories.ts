import { AdminCategory } from "@/types/admin";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export const adminCategories: AdminCategory[] = categories.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  productCount: getProductsByCategory(c.slug).length,
}));
