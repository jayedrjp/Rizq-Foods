import { cx } from "@/lib/utils";

const toneMap: Record<string, string> = {
  // Order statuses
  Pending: "bg-amber-50 text-amber-600",
  Processing: "bg-sky-50 text-sky-600",
  Shipped: "bg-indigo-50 text-indigo-600",
  Delivered: "bg-leaf-light text-leaf",
  Cancelled: "bg-red-50 text-red-500",
  // Product statuses
  Active: "bg-leaf-light text-leaf",
  Draft: "bg-stone text-stone-dark",
  "Out of Stock": "bg-red-50 text-red-500",
  // Stock statuses
  "In Stock": "bg-leaf-light text-leaf",
  "Low Stock": "bg-amber-50 text-amber-600",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        toneMap[status] ?? "bg-stone text-ink"
      )}
    >
      {status}
    </span>
  );
}
