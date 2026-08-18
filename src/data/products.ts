import type {
  CategoryInfo,
  FAQItem,
  HeroSlide,
  Product,
  ProductColor,
  StoreLocation,
} from "@/types";

export const categories: CategoryInfo[] = [
  {
    slug: "guitars",
    name: "Electric Guitars",
    description:
      "Six precision-built electric guitars engineered for heavy rock. Aggressive tone, cold metal aesthetics, stage-ready performance.",
    heroImage: "/images/hnd-2.webp",
  },
  {
    slug: "amps",
    name: "Amp Heads",
    description:
      "Seven professional amp heads delivering crushing gain and pristine clarity. Built for the studio and the stage.",
    heroImage: "/images/hnd-3.webp",
  },
  {
    slug: "speakers",
    name: "Bluetooth Speakers",
    description:
      "Diode-driven Bluetooth audio with studio-grade clarity. One model, two finishes, uncompromising sound.",
    heroImage: "/images/hnd-1.webp",
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    description:
      "Stage-ready apparel and accessories. Bring rock closer to life.",
    heroImage: "/images/hnd-4.webp",
  },
];

const guitarPngs = [
  "/images/hero-guitar-1.webp",
  "/images/hero-guitar-2.webp",
  "/images/hero-guitar-3.webp",
  "/images/hero-guitar-4.webp",
  "/images/hero-guitar-5.webp",
  "/images/hero-guitar-6.webp",
];

const guitarDetailImages = [
  "/images/guitar-detail-1.webp",
  "/images/guitar-detail-2.webp",
  "/images/guitar-detail-3.webp",
  "/images/guitar-detail-4.webp",
  "/images/guitar-detail-5.webp",
  "/images/guitar-detail-6.webp",
  "/images/guitar-detail-7.webp",
];

const ampPngs = [
  "/images/hero-amps-1.webp",
  "/images/hero-amps-2.webp",
  "/images/hero-amps-3.webp",
  "/images/hero-amps-4.webp",
  "/images/hero-amps-5.webp",
  "/images/hero-amps-6.webp",
];

const speakerImage = "/images/hero-speaker-0.webp";

const livePngs = [
  "/images/hero-live-0.webp",
  "/images/hero-live-1.webp",
  "/images/hero-live-2.webp",
  "/images/hero-live-3.webp",
  "/images/hero-live-4.webp",
  "/images/hero-live-5.webp",
];

const guitarPrices = [699, 739, 779, 819, 859, 899];
const guitarStrings = [
  "9–42 Light",
  "10–46 Regular",
  "10–46 Regular",
  "11–48 Heavy",
  "11–48 Heavy",
  "12–54 Extra Heavy",
];
const ampPrices = [599, 633, 666, 699, 729, 759];

const guitarSeries = [
  { tagline: "Classic Single-Cut", body: "Mahogany set-neck" },
  { tagline: "Modern Double-Cut", body: "Alder bolt-on" },
  { tagline: "Superstrat Pro", body: "Alder with maple cap" },
  { tagline: "Offset Stage", body: "Alder offset body" },
  { tagline: "Explorer Metal", body: "Mahogany aggressive cut" },
  { tagline: "V-Shape Shred", body: "Lightweight alder V" },
];

export const products: Product[] = [
  ...Array.from({ length: 6 }, (_, i) => {
    const guitarImage = guitarPngs[i % guitarPngs.length];
    return {
    id: `guitar-0${i + 1}`,
    slug: `hnd-g0${i + 1}`,
    sku: `HND-G0${i + 1}`,
    category: "guitars" as const,
    name: `HND-G0${i + 1}`,
    tagline: guitarSeries[i].tagline,
    description:
      "A precision-crafted electric guitar built for heavy rock. Features a contoured body, high-output pickups, and a fast-playing neck designed for aggressive riffing and soaring solos.",
    price: guitarPrices[i],
    colors: ["black", "white", "red", "blue"] as ProductColor[],
    images: [guitarImage, ...guitarDetailImages],
    navImage: guitarImage,
    ...(i < 3
      ? { video: `/videos/products/hero-hnd-g0${i + 1}-demo.mp4` }
      : {}),
    specs: [
      { label: "Body", value: guitarSeries[i].body },
      { label: "Neck", value: "Maple, bolt-on" },
      { label: "Fingerboard", value: "Ebony, 24 frets" },
      { label: "Pickups", value: "HND Humbucker Set" },
      { label: "Bridge", value: "Fixed, string-through" },
      { label: "Scale Length", value: '25.5"' },
      { label: "Strings", value: guitarStrings[i] },
      { label: "Weight", value: "3.8 kg" },
    ],
    highlights: [
      "High-output humbuckers for crushing gain",
      "Fast C-profile neck for technical playing",
      "Stage-ready hardware and electronics",
    ],
    featured: i < 3,
  };
  }),
  ...Array.from({ length: 6 }, (_, i) => {
    const ampImage = ampPngs[i];
    const n = i + 1;
    return {
    id: `amp-0${n}`,
    slug: `hnd-a0${n}`,
    sku: `HND-A0${n}`,
    category: "amps" as const,
    name: `HND-A0${n}`,
    tagline: `Professional Amp Head 0${n}`,
    description:
      "A professional tube amp head delivering massive gain and articulate clean tones. Built with premium components for reliability on tour and in the studio.",
    price: ampPrices[i],
    colors: ["black", "white"] as ProductColor[],
    images: [ampImage],
    navImage: ampImage,
    specs: [
      { label: "Power", value: `${50 + i * 10}W` },
      { label: "Channels", value: "2 (Clean / Lead)" },
      { label: "Tubes", value: "4x EL34, 3x 12AX7" },
      { label: "Impedance", value: "4 / 8 / 16 Ω" },
      { label: "Effects Loop", value: "Series, footswitchable" },
      { label: "Weight", value: `${18 + i} kg` },
    ],
    highlights: [
      "All-tube circuitry for authentic tone",
      "Switchable voicing for modern and vintage sounds",
      "Tour-grade chassis and components",
    ],
    featured: i < 2,
  };
  }),
  {
    id: "speaker-01",
    slug: "hnd-s01",
    sku: "HND-S01",
    category: "speakers",
    name: "HND-S01",
    tagline: "Diode Bluetooth Speaker",
    description:
      "A premium diode-driven Bluetooth speaker delivering studio-grade clarity in a compact form. Engineered for accurate reproduction with deep, controlled bass.",
    price: 699,
    colors: ["black", "white"],
    images: [speakerImage, speakerImage, speakerImage],
    navImage: speakerImage,
    specs: [
      { label: "Driver", value: '6.5" woofer + 1" tweeter' },
      { label: "Power", value: "120W RMS" },
      { label: "Bluetooth", value: "5.3 with aptX HD" },
      { label: "Battery", value: "Up to 24 hours" },
      { label: "Inputs", value: "Bluetooth, 3.5mm, USB-C" },
      { label: "Weight", value: "2.4 kg" },
    ],
    highlights: [
      "Diode amplifier architecture for low distortion",
      "24-hour battery life",
      "IPX5 water resistance",
    ],
    featured: true,
  },
  ...[
    {
      id: "live-01",
      slug: "hnd-l01",
      sku: "HND-L01",
      name: "HND-L01",
      tagline: "Amp Graphic Tee",
      description:
        "Heavyweight cotton tee with HND amp-line artwork. Built for rehearsal rooms, tour vans, and late nights.",
      price: 49,
      image: livePngs[0],
    },
    {
      id: "live-02",
      slug: "hnd-l02",
      sku: "HND-L02",
      name: "HND-L02",
      tagline: "Stage High-Top",
      description:
        "Canvas high-tops with HND mark detailing. Made to move from street to stage without missing a step.",
      price: 89,
      image: livePngs[1],
    },
    {
      id: "live-03",
      slug: "hnd-l03",
      sku: "HND-L03",
      name: "HND-L03",
      tagline: "Pick Station",
      description:
        "Compact pick station with HND branding. Keep your picks ready wherever the night takes you.",
      price: 39,
      image: livePngs[2],
    },
    {
      id: "live-04",
      slug: "hnd-l04",
      sku: "HND-L04",
      name: "HND-L04",
      tagline: "Stage Low-Top",
      description:
        "Low-profile canvas sneakers with HND detailing. Clean lines for the street, grip for the stage.",
      price: 79,
      image: livePngs[3],
    },
    {
      id: "live-05",
      slug: "hnd-l05",
      sku: "HND-L05",
      name: "HND-L05",
      tagline: "Amplified Badge",
      description:
        "HND Amplified badge with guitar and amp artwork. Pin it, stick it, own the mark.",
      price: 19,
      image: livePngs[4],
    },
    {
      id: "live-06",
      slug: "hnd-l06",
      sku: "HND-L06",
      name: "HND-L06",
      tagline: "Amplified Keychain",
      description:
        "Metal keychain with HND Amplified guitar-and-amp relief. Carry the stage wherever you go.",
      price: 24,
      image: livePngs[5],
    },
  ].map(({ image, ...item }) => ({
    ...item,
    category: "lifestyle" as const,
    colors: ["black", "white"] as ProductColor[],
    images: [image],
    navImage: image,
    specs: [
      { label: "Collection", value: "Lifestyle" },
      { label: "SKU", value: item.sku },
    ],
    highlights: [
      "Official HND lifestyle collection",
      "Designed to match the stage aesthetic",
      "Built for everyday wear",
    ],
    featured: true,
  })),
];

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Guitars",
    subtitle: "Heavy Rock / Electric Guitar",
    cta: "Explore Guitars",
    ctaHref: "/products/guitars",
    image: "/images/hnd-0.webp",
  },
  {
    id: "hero-2",
    title: "Amps",
    subtitle: "Stage / Amp Head",
    cta: "Explore Amps",
    ctaHref: "/products/amps",
    image: "/images/hero-amps-1.webp",
  },
  {
    id: "hero-3",
    title: "Speakers",
    subtitle: "Pure Sound / Bluetooth Speaker",
    cta: "Explore Speakers",
    ctaHref: "/products/speakers",
    image: "/images/hero-speaker-0.webp",
  },
  {
    id: "hero-4",
    title: "Lifestyle",
    subtitle: "Made for the stage",
    cta: "Shop All",
    ctaHref: "/shop",
    image: "/images/hero-live-0.webp",
  },
];

/** Homepage slideshow — hnd-0…3, full-width, 500px tall on desktop */
export const categorySlides = [
  {
    id: "hnd-0",
    label: "Intro",
    title: "HND",
    tagline: "",
    image: "/images/hnd-0.webp",
    href: "/shop",
    cta: "Explore",
  },
  {
    id: "hnd-1",
    label: "Lifestyle",
    title: "Stage Ready",
    tagline: "Bring rock closer to life.",
    image: "/images/hnd-1.webp",
    href: "/products/lifestyle",
    cta: "Explore Lifestyle",
  },
  {
    id: "hnd-2",
    label: "Guitars",
    title: "Electric Guitars",
    tagline: "Built for heavy rock.",
    image: "/images/hnd-2.webp",
    href: "/products/guitars",
    cta: "Explore Guitars",
  },
  {
    id: "hnd-3",
    label: "Amps",
    title: "Amp Heads",
    tagline: "Pure power. Zero compromise.",
    image: "/images/hnd-3.webp",
    href: "/products/amps",
    cta: "Explore Amps",
  },
];

/** Product category heroes — 01–04 chapter layout */
export const categoryChapters = [
  {
    id: "cat-1",
    index: "01",
    label: "Guitars",
    title: "Electric Guitars",
    tagline: "Built for heavy rock.",
    image: "/images/hnd-2.webp",
    href: "/products/guitars",
    cta: "Explore Guitars",
    imageScale: 1,
  },
  {
    id: "cat-2",
    index: "02",
    label: "Amps",
    title: "Amp Heads",
    tagline: "Pure power. Zero compromise.",
    image: "/images/hnd-3.webp",
    href: "/products/amps",
    cta: "Explore Amps",
    imageScale: 1,
  },
  {
    id: "cat-3",
    index: "03",
    label: "Speakers",
    title: "Bluetooth Speakers",
    tagline: "Pure sound. No compromise.",
    image: "/images/hnd-1.webp",
    href: "/products/speakers",
    cta: "Explore Speakers",
    imageScale: 1,
  },
  {
    id: "cat-4",
    index: "04",
    label: "Lifestyle",
    title: "Lifestyle",
    tagline: "Bring rock closer to life.",
    image: "/images/hnd-4.webp",
    href: "/products/lifestyle",
    cta: "Explore Lifestyle",
    imageScale: 1,
  },
];

export const liveNavItems = [
  {
    href: "/products/lifestyle/hnd-l01",
    label: "HND-L01",
    image: livePngs[0],
  },
  {
    href: "/products/lifestyle/hnd-l02",
    label: "HND-L02",
    image: livePngs[1],
  },
  {
    href: "/products/lifestyle/hnd-l03",
    label: "HND-L03",
    image: livePngs[2],
  },
  {
    href: "/products/lifestyle/hnd-l04",
    label: "HND-L04",
    image: livePngs[3],
  },
  {
    href: "/products/lifestyle/hnd-l05",
    label: "HND-L05",
    image: livePngs[4],
  },
  {
    href: "/products/lifestyle/hnd-l06",
    label: "HND-L06",
    image: livePngs[5],
  },
];

export const faqs: FAQItem[] = [
  {
    question: "What is HND's warranty policy?",
    answer:
      "All HND products include a 2-year limited warranty covering manufacturing defects. Extended warranty options are available at purchase.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. We ship to most countries worldwide. Shipping costs and delivery times vary by destination and are calculated at checkout.",
  },
  {
    question: "Can I customize my guitar?",
    answer:
      "Custom configuration options including color, pickups, and neck material will be available in our configurator (coming in Phase 2).",
  },
  {
    question: "How do I contact support?",
    answer:
      "Reach our support team via the Contact page, or email support@hndmusic.com. We respond within 24 hours on business days.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unopened products can be returned within 30 days for a full refund. Opened products may be returned within 14 days with a restocking fee.",
  },
];

export const stores: StoreLocation[] = [
  {
    id: "store-1",
    name: "HND Experience Center — Los Angeles",
    city: "Los Angeles",
    country: "United States",
    address: "1247 Sunset Blvd, Los Angeles, CA 90026",
    hours: "Mon–Sat 10:00–19:00, Sun 12:00–17:00",
  },
  {
    id: "store-2",
    name: "HND Experience Center — New York",
    city: "New York",
    country: "United States",
    address: "89 Mercer St, New York, NY 10012",
    hours: "Mon–Sat 10:00–20:00, Sun 12:00–18:00",
  },
  {
    id: "store-3",
    name: "HND Experience Center — London",
    city: "London",
    country: "United Kingdom",
    address: "14 Denmark St, London WC2H 8TD",
    hours: "Mon–Sat 10:00–18:00, Sun Closed",
  },
  {
    id: "store-4",
    name: "HND Experience Center — Tokyo",
    city: "Tokyo",
    country: "Japan",
    address: "2-14-5 Shibuya, Shibuya-ku, Tokyo 150-0002",
    hours: "Mon–Sun 11:00–20:00",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getCategoryInfo(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

/** Whole-dollar sale price after a percent off. */
export function salePrice(price: number, percentOff: number): number {
  return Math.round(price * (1 - percentOff / 100));
}
