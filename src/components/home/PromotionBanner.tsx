import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface PromotionBannerProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

export default function PromotionBanner({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  image,
}: PromotionBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl2 bg-ink">
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill sizes="100vw" className="object-cover opacity-40" />
      </div>
      <div className="relative z-10 flex flex-col items-start gap-4 px-6 py-14 md:px-14 md:py-20">
        <p className="eyebrow flex items-center gap-2 !text-saffron">
          <span className="rizq-drop" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="max-w-lg font-display text-2xl font-semibold text-white md:text-4xl">
          {title}
        </h2>
        <p className="max-w-md text-sm text-white/80 md:text-base">{subtitle}</p>
        <Link href={ctaHref}>
          <Button variant="primary" size="lg">
            {ctaLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
