export interface CategorySlide {
  id: string;
  /** Omit on intro / start slide */
  index?: string;
  label: string;
  title: string;
  tagline: string;
  image: string;
  href: string;
  cta: string;
  imageScale?: number;
  /** cover crops to fill; contain shows the full image (default: cover) */
  fit?: "cover" | "contain";
}
