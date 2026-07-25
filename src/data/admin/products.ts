import { AdminProduct, AdminProductStatus } from "@/types/admin";
import { products } from "@/data/products";

function statusFor(inStock: boolean): AdminProductStatus {
  return inStock ? "Active" : "Out of Stock";
}

export const adminProducts: AdminProduct[] = products.map((p, i) => ({
  id: p.id,
  name: p.name,
  category: p.categoryName,
  status: statusFor(p.inStock),
  shortDescription: p.description,
  fullDescription: p.description,
  images: [p.image],
  variants: [
    {
      id: `${p.id}-v1`,
      size: p.weight,
      price: p.price,
      salePrice: p.oldPrice,
      stock: p.inStock ? 20 + ((i * 7) % 60) : 0,
      lowStockLimit: 10,
      sku: `RZQ-${p.id.toUpperCase()}`,
    },
  ],
}));

export function getAdminProductById(id: string) {
  return adminProducts.find((p) => p.id === id);
}
