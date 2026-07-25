"use client";

import Button from "@/components/ui/Button";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
        className="focus-ring w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50"
      />
      <Button type="submit" variant="primary" size="md">
        Subscribe
      </Button>
    </form>
  );
}
