import Link from "next/link";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  viewAllHref?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  viewAllHref,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex gap-4 mb-6 ${
        align === "center"
          ? "flex-col items-center text-center"
          : "items-end justify-between"
      }`}
    >
      <div>
        {eyebrow && (
          <p
            className={`eyebrow mb-1.5 flex items-center gap-2 ${
              align === "center" ? "justify-center" : "justify-start"
            }`}
          >
            <span className="rizq-drop" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="focus-ring shrink-0 text-sm font-semibold text-saffron-deep hover:text-ink transition-colors underline-offset-4 hover:underline"
        >
          View all →
        </Link>
      )}
    </div>
  );
}