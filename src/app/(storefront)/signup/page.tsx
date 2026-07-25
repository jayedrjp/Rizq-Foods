"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { firebaseAuthErrorMessage } from "@/lib/firebaseErrors";

const googleIcon = (
  <svg viewBox="0 0 48 48" className="h-4 w-4">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3c-7.6 0-14.1 4.3-17.7 10.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 45c5.4 0 10.3-2.1 14-5.4l-6.5-5.5c-2 1.5-4.6 2.4-7.5 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.8 40.6 16.3 45 24 45z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.5C41.4 35.6 44 30.2 44 24c0-1.4-.1-2.7-.4-3.5z"
    />
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signUp(name, email, password);
      router.push("/");
    } catch (err) {
      setError(firebaseAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setGoogleSubmitting(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      setError(firebaseAuthErrorMessage(err));
    } finally {
      setGoogleSubmitting(false);
    }
  }

  return (
    <div className="container-rizq flex justify-center py-12 md:py-20">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2 flex items-center justify-center gap-2">
            <span className="rizq-drop" aria-hidden="true" />
            Join Rizq Foods
          </p>
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-stone-dark">
            Save your wishlist and track orders across visits.
          </p>
        </div>

        <div className="rounded-xl2 border border-ink/8 bg-white p-6 shadow-softer md:p-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleGoogle}
            disabled={googleSubmitting || submitting}
          >
            {googleIcon}
            {googleSubmitting ? "Signing in…" : "Continue with Google"}
          </Button>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-ink/8" />
            <span className="text-xs font-medium uppercase tracking-wide text-stone-dark">
              or
            </span>
            <span className="h-px flex-1 bg-ink/8" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm text-ink">
              Full Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                placeholder="John Doe"
                autoComplete="name"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-ink">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-ink">
              Password
              <input
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="mt-1 w-full"
              disabled={submitting}
            >
              {submitting ? "Creating account…" : "Create Account"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-stone-dark">
          Already have an account?{" "}
          <Link
            href="/login"
            className="focus-ring font-semibold text-saffron-deep hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
