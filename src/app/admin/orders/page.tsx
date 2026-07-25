"use client";

import { useEffect, useMemo, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice } from "@/lib/utils";
import { removeOrder, subscribeToOrders, updateOrderStatus, StoreOrder } from "@/lib/orders";
import { OrderStatus } from "@/types/admin";

const statuses: (OrderStatus | "All")[] = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function formatOrderDate(order: StoreOrder) {
  return order.createdAt ? order.createdAt.toDate().toLocaleDateString("en-BD", { day: "2-digit", month: "short", year: "numeric" }) : "Just now";
}

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | "All">("All");
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToOrders(
      (nextOrders) => { setOrders(nextOrders); setLoading(false); },
      (listenerError) => { console.error(listenerError); setError("Orders could not be loaded. Check your Firestore rules and try again."); setLoading(false); }
    );
    return unsubscribe;
  }, []);

  const filtered = useMemo(() => filter === "All" ? orders : orders.filter((order) => order.status === filter), [filter, orders]);

  async function handleStatusChange(id: string, status: OrderStatus) {
    setSavingId(id);
    setError("");
    try { await updateOrderStatus(id, status); }
    catch (updateError) { console.error(updateError); setError("The order status could not be updated."); }
    finally { setSavingId(null); }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this order permanently?")) return;
    setSavingId(id);
    setError("");
    try { await removeOrder(id); }
    catch (deleteError) { console.error(deleteError); setError("The order could not be removed."); }
    finally { setSavingId(null); }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Orders</h1>
        <p className="mt-1 text-sm text-stone-dark">{loading ? "Loading orders..." : `${orders.length} total orders`}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => <button key={status} type="button" onClick={() => setFilter(status)} className={`focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${filter === status ? "border-saffron bg-saffron text-white" : "border-ink/12 bg-white text-ink hover:border-saffron/50"}`}>{status}</button>)}
      </div>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-xl2 border border-ink/8 bg-white shadow-softer">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead><tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-stone-dark">
            <th className="px-5 py-3 font-medium">Order</th><th className="px-5 py-3 font-medium">Customer</th><th className="px-5 py-3 font-medium">Date</th><th className="px-5 py-3 font-medium">Total</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((order) => <tr key={order.id} className="border-b border-ink/8 last:border-0 hover:bg-stone/40">
              <td className="px-5 py-4 font-semibold text-ink">{order.id}</td>
              <td className="px-5 py-4"><p className="text-ink">{order.customerName}</p><p className="text-xs text-stone-dark">{order.customerPhone}</p></td>
              <td className="px-5 py-4 text-stone-dark">{formatOrderDate(order)}</td>
              <td className="px-5 py-4 font-semibold text-ink">{formatPrice(order.total)}</td>
              <td className="px-5 py-4"><div className="flex items-center gap-2"><StatusBadge status={order.status} /><select aria-label={`Change status for order ${order.id}`} value={order.status} disabled={savingId === order.id} onChange={(event) => handleStatusChange(order.id, event.target.value as OrderStatus)} className="focus-ring rounded-md border border-ink/12 bg-white px-2 py-1 text-xs text-ink disabled:opacity-50">{statuses.slice(1).map((status) => <option key={status}>{status}</option>)}</select></div></td>
              <td className="px-5 py-4"><button type="button" disabled={savingId === order.id} onClick={() => handleDelete(order.id)} className="focus-ring rounded-md px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50">Remove</button></td>
            </tr>)}
            {!loading && filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-stone-dark">No orders match this filter.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
