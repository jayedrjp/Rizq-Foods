"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "@/components/layout/SearchBar";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/categories";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const { user, loading } = useAuth();
  const isSignedIn = !loading && Boolean(user);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-cream/95 backdrop-blur">
      <div className="container-rizq flex h-[72px] min-w-0 items-center gap-3 md:gap-8">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="Rizq Foods" width={400} height={140} priority className="h-14 w-auto sm:h-16 md:h-20" />
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto hidden items-center gap-3 md:flex lg:gap-6">
          <Link
            href="/track-order"
            aria-label="Track Order"
            className="group focus-ring flex min-h-[44px] w-16 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-ink transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:text-saffron-deep"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
              <path d="M3 3h18v13H3zM3 16l4 5M21 16l-4 5M9 21h6" />
            </svg>
            <span className="whitespace-nowrap text-xs font-medium leading-none">Track Order</span>
          </Link>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="group focus-ring flex min-h-[44px] w-16 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-ink transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:text-saffron-deep"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
              <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 4.5 6 4.1c2.2-.2 3.9 1 6 3.2 2.1-2.2 3.8-3.4 6-3.2 3.7.4 5.5 4.3 4 7.8C19.5 16.4 12 21 12 21z" />
            </svg>
            <span className="whitespace-nowrap text-xs font-medium leading-none">Wishlist</span>
          </Link>

          <button
            type="button"
            aria-label="Open cart"
            onClick={openDrawer}
            className="group focus-ring flex min-h-[44px] w-16 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-ink transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:text-saffron-deep"
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-saffron text-[10px] font-bold text-white">
                {itemCount}
              </span>
            </span>
            <span className="whitespace-nowrap text-xs font-medium leading-none">Cart</span>
          </button>

          <Link
            href={isSignedIn ? "/account" : "/login"}
            aria-label={isSignedIn ? "Account" : "Sign In"}
            className="group focus-ring flex min-h-[44px] w-16 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-ink transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:text-saffron-deep"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
              <path d="M20 21a8 8 0 1 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="whitespace-nowrap text-xs font-medium leading-none">
              {isSignedIn ? "Account" : "Sign In"}
            </span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((v) => !v)}
          className="focus-ring ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink hover:bg-stone md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-[75] cursor-default bg-ink/45"
          />
          <aside
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="fixed right-0 top-0 z-[80] flex h-[100dvh] w-[min(20rem,calc(100vw-1rem))] flex-col overflow-y-auto bg-cream p-5 shadow-lifted"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-xl font-semibold text-ink">Menu</span>
              <button type="button" aria-label="Close menu" onClick={closeMobileMenu} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-stone">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><path d="m6 6 12 12M18 6 6 18" /></svg>
              </button>
            </div>

            <SearchBar className="mb-5" />
            <nav className="flex flex-col text-sm font-medium text-ink">
              <Link href="/products" onClick={closeMobileMenu} className="focus-ring rounded-lg px-3 py-3 hover:bg-stone">All Products</Link>
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`} onClick={closeMobileMenu} className="focus-ring rounded-lg px-3 py-3 hover:bg-stone">
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-ink/8 pt-3 text-sm font-medium text-ink">
              <Link href="/track-order" onClick={closeMobileMenu} className="focus-ring block rounded-lg px-3 py-3 hover:bg-stone">Track Order</Link>
              <Link href="/wishlist" onClick={closeMobileMenu} className="focus-ring block rounded-lg px-3 py-3 hover:bg-stone">Wishlist</Link>
              <Link href={isSignedIn ? "/account" : "/login"} onClick={closeMobileMenu} className="focus-ring block rounded-lg px-3 py-3 hover:bg-stone">{isSignedIn ? "Account" : "Sign In"}</Link>
              <Link href="/about" onClick={closeMobileMenu} className="focus-ring block rounded-lg px-3 py-3 hover:bg-stone">About</Link>
              <Link href="/contact" onClick={closeMobileMenu} className="focus-ring block rounded-lg px-3 py-3 hover:bg-stone">Contact</Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
