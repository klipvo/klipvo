import type { Category } from "@/generated/prisma/enums";

export const CATEGORIES: readonly ["All", ...Category[]] = [
  "All",
  "Fashion",
  "Fitness",
  "Beauty",
  "Tech",
  "Travel",
  "Food",
];

// Not backed by real search analytics yet — a fixed starter list for the search screen.
export const TRENDING_SEARCHES: string[] = [
  "Summer Sale",
  "Nike Promo",
  "Skincare",
  "Tech Deals",
  "Gym Supplements",
  "Travel Codes",
  "Food & Drink",
  "Gaming",
];
