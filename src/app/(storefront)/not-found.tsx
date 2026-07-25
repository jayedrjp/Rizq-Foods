import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-rizq flex flex-col items-center gap-5 py-24 text-center md:py-32">
      <span className="rizq-drop-lg animate-drip" aria-hidden="true" />
      <p className="eyebrow flex items-center gap-2">Error 404</p>
      <h1 className="max-w-md font-display text-3xl font-semibold text-ink md:text-4xl">
        This shelf is empty
      </h1>
      <p className="max-w-sm text-sm text-stone-dark">
        The page you&apos;re looking for has been moved, sold out, or never existed.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
