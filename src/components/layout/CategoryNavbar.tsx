"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export default function CategoryNavbar() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [isHoverCapable, setIsHoverCapable] = useState(true);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Detect touch/coarse-pointer devices so hover behavior only applies on desktop.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverCapable(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsHoverCapable(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleEnter = useCallback(
    (slug: string) => {
      if (!isHoverCapable) return;
      clearCloseTimer();
      setOpenSlug(slug);
    },
    [isHoverCapable, clearCloseTimer]
  );

  const handleLeave = useCallback(() => {
    if (!isHoverCapable) return;
    clearCloseTimer();
    // Small delay avoids flicker when the cursor briefly crosses a gap
    // between the trigger and the dropdown panel.
    closeTimer.current = setTimeout(() => setOpenSlug(null), 150);
  }, [isHoverCapable, clearCloseTimer]);

  const handleTapToggle = useCallback(
    (e: React.MouseEvent, slug: string) => {
      if (isHoverCapable) return;
      e.preventDefault();
      setOpenSlug((prev) => (prev === slug ? null : slug));
    },
    [isHoverCapable]
  );

  // Close on outside click (mobile/tap mode) and on Escape (all modes).
  useEffect(() => {
    if (openSlug === null) return;

    function handleOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenSlug(null);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenSlug(null);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openSlug]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  return (
    <nav ref={navRef} className="sticky top-[72px] z-30 hidden border-b border-ink/8 bg-ink md:block">
      {/*
        IMPORTANT: this container intentionally has NO overflow-x-auto (or any
        overflow value other than visible). Per the CSS spec, pairing
        `overflow-x: auto` with a default `overflow-y: visible` silently
        forces overflow-y to `auto` as well — that's what was clipping the
        dropdown panels into a tiny scrollable box with a vertical scrollbar.
        With a small, fixed category list we simply let items wrap instead of
        scrolling horizontally, which keeps overflow fully visible so
        dropdowns can expand to their natural height.
      */}
      <div className="container-rizq">
        <ul className="flex flex-wrap justify-center items-center gap-1 text-sm font-medium text-cream/90">
          <li>
            <Link
              href="/products"
              className="focus-ring flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-white"
            >
              All Products
            </Link>
          </li>
          {categories.map((cat) => {
            const items = getProductsByCategory(cat.slug).slice(0, 8);
            const isOpen = openSlug === cat.slug && items.length > 0;

            return (
              <li
                key={cat.id}
                className="relative"
                onMouseEnter={() => handleEnter(cat.slug)}
                onMouseLeave={handleLeave}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  aria-expanded={isOpen}
                  aria-haspopup={items.length > 0}
                  onClick={(e) => handleTapToggle(e, cat.slug)}
                  className="focus-ring flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {cat.name}
                  {items.length > 0 && (
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3.5 w-3.5 fill-none stroke-current stroke-2 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </Link>

                {items.length > 0 && (
                  <div
                    className={`absolute left-0 top-full z-50 w-64 origin-top rounded-xl2 border border-ink/8 bg-white p-2.5 shadow-lifted transition-all duration-200 ease-out ${
                      isOpen
                        ? "visible translate-y-1 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col">
                      {items.map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.slug}`}
                          onClick={() => setOpenSlug(null)}
                          className="focus-ring rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-saffron-light hover:text-saffron-deep"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-1 border-t border-ink/8 pt-1">
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={() => setOpenSlug(null)}
                        className="focus-ring block rounded-lg px-3 py-2 text-sm font-semibold text-saffron-deep transition-colors hover:bg-saffron-light"
                      >
                        View all {cat.name} →
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
