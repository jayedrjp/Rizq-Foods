"use client";

import Marquee from "react-fast-marquee";
import { Review } from "@/types";
import ReviewCard from "./ReviewCard";

export default function ReviewMarquee({
  reviews,
}: {
  reviews: Review[];
}) {
  return (
    <Marquee
      speed={40}
      gradient={false}
      pauseOnHover={true}
      pauseOnClick={false}
      autoFill={true}
    >
      {reviews.map((review) => (
        <div key={review.id} className="mx-3 w-[320px]">
          <ReviewCard review={review} />
        </div>
      ))}
    </Marquee>
  );
}