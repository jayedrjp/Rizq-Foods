"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/utils";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <path d="m20.5 7.3-8.5-5-8.5 5 8.5 5 8.5-5z" />
        <path d="M3.5 7.3v9.4l8.5 5 8.5-5V7.3" />
      </svg>
    ),
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/inventory",
    label: "Inventory",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z" />
        <path d="M3.3 7 12 12l8.7-5M12 22V12" />
      </svg>
    ),
  },
  {
    href: "/admin/customers",
    label: "Customers",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </svg>
    ),
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z" />
      </svg>
    ),
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const content = (
    <>
      <Link href="/" className="focus-ring flex items-center justify-center px-5 py-5">
        <Image
          src="/logo.png"
          alt="Rizq Foods"
          width={200}
          height={50}
          className="h-20 w-auto max-w-full"
          priority
        />
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cx(
                "focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-saffron-light text-saffron-deep"
                  : "text-ink/70 hover:bg-stone hover:text-ink"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink/8 px-3 py-4">
        <Link
          href="/"
          className="focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-stone hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5M21 12H9" />
          </svg>
          Logout
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col border-r border-ink/8 bg-white lg:flex">
        {content}
      </aside>

      {/* Mobile drawer */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cx(
          "fixed inset-0 z-40 bg-ink/50 transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />
      <aside
        className={cx(
          "fixed left-0 top-0 z-50 flex h-full w-80 flex-col bg-white shadow-lifted transition-transform duration-300 ease-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {content}
      </aside>
    </>
  );
}
