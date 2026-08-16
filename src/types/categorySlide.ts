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
}
