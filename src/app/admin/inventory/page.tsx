import StatusBadge from "@/components/admin/StatusBadge";
import { adminProducts } from "@/data/admin/products";
import { StockStatus } from "@/types/admin";

function stockStatus(stock: number, lowStockLimit: number): StockStatus {
  if (stock <= 0) return "Out of Stock";
  if (stock <= lowStockLimit) return "Low Stock";
  return "In Stock";
}

export default function AdminInventoryPage() {
  const rows = adminProducts.flatMap((p) =>
    p.variants.map((v) => ({
      productName: p.name,
      size: v.size,
      sku: v.sku ?? "—",
      stock: v.stock,
      lowStockLimit: v.lowStockLimit,
      status: stockStatus(v.stock, v.lowStockLimit),
    }))
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Inventory</h1>
        <p className="mt-1 text-sm text-stone-dark">Stock levels across all product variants</p>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-ink/8 bg-white shadow-softer">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-stone-dark">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Variant</th>
              <th className="px-5 py-3 font-medium">SKU</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-ink/8 last:border-0 hover:bg-stone/40">
                <td className="px-5 py-3 font-medium text-ink">{row.productName}</td>
                <td className="px-5 py-3 text-stone-dark">{row.size}</td>
                <td className="px-5 py-3 text-stone-dark">{row.sku}</td>
                <td className="px-5 py-3 font-semibold text-ink">{row.stock}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
