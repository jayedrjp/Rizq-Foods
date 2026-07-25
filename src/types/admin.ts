export type AdminProductStatus = "Active" | "Draft" | "Out of Stock";

export interface AdminVariant {
  id: string;
  size: string;
  price: number;
  salePrice?: number;
  stock: number;
  lowStockLimit: number;
  sku?: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  status: AdminProductStatus;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  variants: AdminVariant[];
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface AdminOrderItem {
  productName: string;
  variantSize: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: AdminOrderItem[];
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joined: string;
}

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface AdminReview {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  text: string;
  date: string;
  approved: boolean;
}
