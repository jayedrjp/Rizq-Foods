import { Review } from "@/types";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex h-full w-full min-h-[220px] flex-col rounded-xl2 border border-ink/8 bg-white p-6 shadow-softer">
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-4 w-4 ${i < review.rating ? "fill-saffron" : "fill-stone"}`}
          >
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z" />
          </svg>
        ))}
      </div>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-ink/80">“{review.text}”</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron-light font-display text-sm font-semibold text-saffron-deep">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{review.name}</p>
          <p className="text-xs text-stone-dark">{review.role}</p>
        </div>
      </div>
    </div>
  );
}
