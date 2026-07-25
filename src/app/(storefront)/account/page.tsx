"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, signOutUser } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace("/login?redirect=/account");
  }, [loading, router, user]);

  async function handleSignOut() {
    await signOutUser();
    router.push("/");
  }

  if (loading || !user) return null;

  const displayName = user.displayName || "Rizq Foods customer";
  const initial = displayName.trim().charAt(0).toUpperCase();
  const memberSince = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="container-rizq py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow mb-2">My account</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">Account information</h1>

        <section className="mt-7 rounded-xl2 border border-ink/8 bg-white p-6 shadow-softer md:p-8">
          <div className="flex items-center gap-4 border-b border-ink/8 pb-6">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-saffron-light font-display text-2xl font-semibold text-saffron-deep">
              {initial}
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-display text-xl font-semibold text-ink">{displayName}</h2>
              <p className="truncate text-sm text-stone-dark">{user.email || "No email address"}</p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-stone-dark">Full name</dt>
              <dd className="mt-1 text-sm text-ink">{user.displayName || "Not provided"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-stone-dark">Email address</dt>
              <dd className="mt-1 break-all text-sm text-ink">{user.email || "Not provided"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-stone-dark">Email status</dt>
              <dd className="mt-1 text-sm text-ink">{user.emailVerified ? "Verified" : "Not verified"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-stone-dark">Member since</dt>
              <dd className="mt-1 text-sm text-ink">{memberSince}</dd>
            </div>
          </dl>

          <Button variant="outline" size="md" className="mt-8" onClick={handleSignOut}>
            Sign out
          </Button>
        </section>
      </div>
    </div>
  );
}
