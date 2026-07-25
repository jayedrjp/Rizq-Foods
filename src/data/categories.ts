import { Category } from "@/types";

export const categories: Category[] = [
  { id: "c1", name: "Honey", slug: "honey", image: "/images/honey.png" },
  { id: "c2", name: "Dates", slug: "dates", image: "/images/dates.png" },
  { id: "c3", name: "Oil", slug: "oil", image: "/images/mustard-oil.png" },
  { id: "c4", name: "Ghee", slug: "ghee", image: "/images/ghee.png" },
  { id: "c5", name: "Nuts", slug: "nuts", image: "/images/nuts.png" },
  { id: "c6", name: "Spices", slug: "spices", image: "/images/spices.png" },
  { id: "c7", name: "Rices", slug: "rices", image: "/images/rice.png" },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
