export type Category =
  | "Fashion"
  | "Fitness"
  | "Beauty"
  | "Tech"
  | "Travel"
  | "Food";

export interface Deal {
  id: number;
  influencer: string;
  avatar: string;
  brand: string;
  category: Category;
  title: string;
  code: string;
  discount: string;
  expiry: string;
  link: string;
  views: string;
  clicks: string;
  saves: string;
  emoji: string;
  gradient: string;
  isNew: boolean;
  expiring: boolean;
}

export interface Brand {
  emoji: string;
  name: string;
  codes: number;
}
