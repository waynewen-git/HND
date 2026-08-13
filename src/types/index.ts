export type ProductCategory = "guitars" | "amps" | "speakers";

export type ProductColor = "black" | "white" | "red" | "blue";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  category: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  price: number;
  colors: ProductColor[];
  images: string[];
  navImage?: string;
  video?: string;
  specs: ProductSpec[];
  highlights: string[];
  featured?: boolean;
}

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  description: string;
  heroImage: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  image: string;
  productId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  hours: string;
}

export interface CartItem {
  productId: string;
  color: ProductColor;
  quantity: number;
}

export const COLOR_LABELS: Record<ProductColor, string> = {
  black: "Black",
  white: "White",
  red: "Red",
  blue: "Blue",
};

export const COLOR_HEX: Record<ProductColor, string> = {
  black: "#1a1a1a",
  white: "#f5f5f5",
  red: "#c41e3a",
  blue: "#2d4a6f",
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  guitars: "Electric Guitars",
  amps: "Amp Heads",
  speakers: "Bluetooth Speakers",
};
