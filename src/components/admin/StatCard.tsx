import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  tone?: "saffron" | "leaf" | "ink" | "red";
  hint?: string;
}

const toneClasses: Record<string, string> = {
  saffron: "bg-saffron-light text-saffron-deep",
  leaf: "bg-leaf-light text-leaf",
  ink: "bg-stone text-ink",
  red: "bg-red-50 text-red-500",
};

export default function StatCard({ label, value, icon, tone = "saffron", hint }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl2 border border-ink/8 bg-white p-5 shadow-softer">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${toneClasses[tone]}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-stone-dark">{label}</p>
        <p className="font-display text-xl font-semibold text-ink">{value}</p>
        {hint && <p className="text-xs text-stone-dark">{hint}</p>}
      </div>
    </div>
  );
}
