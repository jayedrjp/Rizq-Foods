"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ADMIN_AUTH_KEY, isAdminAuthenticated } from "@/lib/adminAuth";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminAuthenticated()) router.replace("/admin");
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setError("Invalid username or password.");
      return;
    }

    sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
    router.replace("/admin");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <section className="relative w-full max-w-md rounded-xl2 bg-white p-7 shadow-lifted sm:p-9">
        <button
          type="button"
          aria-label="Return to Rizq Foods home page"
          onClick={() => router.push("/")}
          className="focus-ring absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-stone-dark transition-colors hover:bg-stone hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="mb-1 flex justify-center">
          <Image
            src="/logo.png"
            alt="Rizq Foods"
            width={400}
            height={100}
            className="h-28 w-auto max-w-full"
            priority
          />
        </div>
        <h1 className="text-center font-display text-3xl font-semibold text-ink">Admin login</h1>
        <p className="mt-2 text-center text-sm text-stone-dark">
          Sign in to manage your store.
        </p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-ink">
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
              className="focus-ring mt-2 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-ink"
            />
          </label>

          <label className="block text-sm font-medium text-ink">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="focus-ring mt-2 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-ink"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="focus-ring w-full rounded-lg bg-saffron px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-saffron-deep"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
