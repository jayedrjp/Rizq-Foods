import { formatPrice } from "@/lib/utils";
import { adminCustomers } from "@/data/admin/customers";

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Customers</h1>
        <p className="mt-1 text-sm text-stone-dark">{adminCustomers.length} registered customers</p>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-ink/8 bg-white shadow-softer">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-stone-dark">
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Orders</th>
              <th className="px-5 py-3 font-medium">Total Spent</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {adminCustomers.map((c) => (
              <tr key={c.id} className="border-b border-ink/8 last:border-0 hover:bg-stone/40">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-saffron-light font-display text-sm font-semibold text-saffron-deep">
                      {c.name.charAt(0)}
                    </span>
                    <span className="font-medium text-ink">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="text-ink">{c.email}</p>
                  <p className="text-xs text-stone-dark">{c.phone}</p>
                </td>
                <td className="px-5 py-3 text-stone-dark">{c.orders}</td>
                <td className="px-5 py-3 font-semibold text-ink">{formatPrice(c.totalSpent)}</td>
                <td className="px-5 py-3 text-stone-dark">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
