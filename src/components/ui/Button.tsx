import { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-saffron text-white hover:bg-saffron-deep shadow-softer",
  outline:
    "border border-ink/15 text-ink bg-white hover:border-saffron hover:text-saffron-deep",
  ghost: "text-ink hover:bg-stone",
  dark: "bg-ink text-cream hover:bg-ink/90",
};

const sizeClasses: Record<string, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3.5 gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "focus-ring inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
