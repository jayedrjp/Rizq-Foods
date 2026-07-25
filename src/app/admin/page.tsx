"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import SalesChart from "@/components/admin/SalesChart";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice } from "@/lib/utils";
import { StoreOrder, subscribeToOrders } from "@/lib/orders";
import { adminProducts } from "@/data/admin/products";
import { adminCustomers } from "@/data/admin/customers";

const icons = {
  revenue: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  customers: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
    </svg>
  ),
  products: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="m20.5 7.3-8.5-5-8.5 5 8.5 5 8.5-5z" />
      <path d="M3.5 7.3v9.4l8.5 5 8.5-5V7.3" />
    </svg>
  ),
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<StoreOrder[]>([]);

  useEffect(() => subscribeToOrders(setOrders, (error) => console.error("Unable to load orders", error)), []);

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const activeProducts = adminProducts.filter((p) => p.status === "Active").length;
  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-stone-dark">Here&apos;s what&apos;s happening at Rizq Foods today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={formatPrice(totalRevenue)} icon={icons.revenue} tone="saffron" hint="Last 7 days" />
        <StatCard label="Orders" value={String(orders.length)} icon={icons.orders} tone="leaf" hint="All time" />
        <StatCard label="Customers" value={String(adminCustomers.length)} icon={icons.customers} tone="ink" hint="All time" />
        <StatCard label="Active Products" value={String(activeProducts)} icon={icons.products} tone="red" hint={`${adminProducts.length} total`} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">Revenue This Week</h2>
          </div>
          <SalesChart />
        </div>

        <div className="rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">Recent Orders</h2>
            <Link href="/admin/orders" className="focus-ring text-xs font-semibold text-saffron-deep hover:underline">
              View all
            </Link>
          </div>
          <ul className="flex flex-col gap-3">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-2 border-b border-ink/8 pb-3 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{order.customerName}</p>
                  <p className="text-xs text-stone-dark">{order.id}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-ink">{formatPrice(order.total)}</span>
                  <StatusBadge status={order.status} />
                </div>
              </li>
            ))}
            {recentOrders.length === 0 && <li className="py-5 text-center text-sm text-stone-dark">No orders yet.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
