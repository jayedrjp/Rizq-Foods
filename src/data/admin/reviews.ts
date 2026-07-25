import { AdminReview } from "@/types/admin";

export const adminReviews: AdminReview[] = [
  { id: "ar1", productName: "Sundarban Raw Honey", customerName: "Nusrat Jahan", rating: 5, text: "Tastes exactly like what my grandmother used to bring from the village.", date: "2026-07-05", approved: true },
  { id: "ar2", productName: "Premium Ajwa Dates", customerName: "Rafiul Islam", rating: 5, text: "Fresh, soft, and delivered right on time for Ramadan.", date: "2026-07-06", approved: true },
  { id: "ar3", productName: "Cold-Pressed Mustard Oil", customerName: "Farzana Akter", rating: 4, text: "Strong aroma, just like the traditional ones back home.", date: "2026-07-08", approved: false },
  { id: "ar4", productName: "Pure Desi Ghee", customerName: "Tanvir Ahmed", rating: 5, text: "Rich, golden, and you can really smell the difference.", date: "2026-07-09", approved: true },
];
