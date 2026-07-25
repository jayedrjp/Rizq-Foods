"use client";

interface AdminTopbarProps {
  onMenuClick: () => void;
  onSignOut: () => void;
}

export default function AdminTopbar({ onMenuClick, onSignOut }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-ink/8 bg-white/95 px-4 backdrop-blur md:px-6">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-stone lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-stone"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-saffron" />
        </button>

        <div className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 hover:bg-stone">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron-light font-display text-sm font-semibold text-saffron-deep">
            A
          </span>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold leading-tight text-ink">Admin</p>
            <p className="text-[11px] leading-tight text-stone-dark">Store Manager</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSignOut}
          className="focus-ring rounded-full px-3 py-2 text-xs font-semibold text-stone-dark transition-colors hover:bg-stone hover:text-ink"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
