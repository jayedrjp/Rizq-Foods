import { ReactNode } from "react";
import { cx } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  tone?: "saffron" | "leaf" | "ink" | "white";
  className?: string;
}

const toneClasses: Record<string, string> = {
  saffron: "bg-saffron text-white",
  leaf: "bg-leaf text-white",
  ink: "bg-ink text-cream",
  white: "bg-white text-ink border border-ink/10",
};

export default function Badge({ children, tone = "saffron", className }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
