import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="container-rizq flex min-h-screen flex-col items-center justify-center gap-5 py-24 text-center">
      <span className="rizq-drop-lg animate-drip" aria-hidden="true" />
      <p className="eyebrow flex items-center gap-2">Error 404</p>
      <h1 className="max-w-md font-display text-3xl font-semibold text-ink md:text-4xl">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-stone-dark">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="focus-ring inline-flex items-center justify-center rounded-full bg-saffron px-6 py-3.5 text-base font-medium text-white shadow-softer transition-all hover:bg-saffron-deep active:scale-[0.97]"
      >
        Back to Home
      </Link>
    </div>
  );
}
