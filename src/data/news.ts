export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "hnd-g-series-launch",
    title: "Introducing the HND-G Electric Guitar Series",
    date: "2026-03-15",
    excerpt:
      "Six new electric guitar models engineered for heavy rock, featuring high-output humbuckers and fast-playing necks.",
    content:
      "Today we unveil six new electric guitar models — the HND-G series. Each guitar is built for heavy rock with high-output humbuckers, fast C-profile necks, and stage-ready hardware. Available in four colors: Black, White, Red, and Blue. Prices range from $699 to $899.",
  },
  {
    slug: "diode-speaker-technology",
    title: "Inside HND Diode Amplifier Technology",
    date: "2026-02-28",
    excerpt:
      "How our diode-driven amplifier architecture delivers studio-grade clarity in a portable Bluetooth speaker.",
    content:
      "Our HND-S01 Bluetooth speaker uses a proprietary diode amplifier architecture that achieves ultra-low distortion and studio-grade clarity. With 120W RMS output, aptX HD Bluetooth 5.3, and 24-hour battery life, it sets a new standard for portable audio.",
  },
  {
    slug: "experience-centers-opening",
    title: "HND Experience Centers Now Open",
    date: "2026-01-10",
    excerpt:
      "Visit our new locations in Los Angeles, New York, London, and Tokyo to try the full HND lineup.",
    content:
      "We're excited to announce the opening of HND Experience Centers in Los Angeles, New York, London, and Tokyo. Visit to try our full product lineup, get expert advice, and experience the HND difference firsthand.",
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
