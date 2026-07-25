"use client";

import { useState } from "react";

export default function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={`relative flex w-full items-center ${className}`}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for mangoes, honey, ghee..."
        aria-label="Search products"
        className="focus-ring w-full rounded-full border border-ink/12 bg-stone/60 py-2.5 pl-4 pr-11 text-sm text-ink placeholder:text-stone-dark focus:border-saffron focus:bg-white"
      />
      <button
        type="submit"
        aria-label="Search"
        className="focus-ring absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-white transition-colors hover:bg-saffron-deep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
}
