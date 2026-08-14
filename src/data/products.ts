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
    heroImage: "/images/hero-guitar-1.png",
  },
  {
    slug: "amps",
    name: "Amp Heads",
    description:
      "Four professional amp heads delivering crushing gain and pristine clarity. Built for the studio and the stage.",
    heroImage: "/images/hero-amps-1.png",
  },
  {
    slug: "speakers",
    name: "Bluetooth Speakers",
    description:
      "Diode-driven Bluetooth audio with studio-grade clarity. One model, two finishes, uncompromising sound.",
    heroImage: "/images/hero-speaker-0.png",
  },
];

const guitarPngs = [
  "/images/hero-guitar-1.png",
  "/images/hero-guitar-2.png",
  "/images/hero-guitar-3.png",
  "/images/hero-guitar-4.png",
  "/images/hero-guitar-5.png",
  "/images/hero-guitar-6.png",
];

const guitarDetailImages = [
  "/images/guitar-detail-1.jpg",
  "/images/guitar-detail-2.jpg",
  "/images/guitar-detail-3.jpg",
  "/images/guitar-detail-4.jpg",
  "/images/guitar-detail-5.jpg",
  "/images/guitar-detail-6.jpg",
  "/images/guitar-detail-7.jpg",
];

const ampPngs = [
  "/images/hero-amps-1.png",
  "/images/hero-amps-2.png",
  "/images/hero-amps-3.png",
  "/images/hero-amps-4.png",
];

const speakerImage = "/images/hero-speaker-0.png";

const livePngs = [
  "/images/hero-live-0.png",
  "/images/hero-live-1.png",
  "/images/hero-live-2.png",
];

const guitarPrices = [699, 739, 779, 819, 859, 899];
const ampPrices = [599, 633, 666, 699];

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
      ? { video: `/videos/products/hnd-g0${i + 1}-demo.mp4` }
      : {}),
    specs: [
      { label: "Body", value: "Alder with maple top" },
      { label: "Neck", value: "Maple, bolt-on" },
      { label: "Fingerboard", value: "Ebony, 24 frets" },
      { label: "Pickups", value: "HND Humbucker Set" },
      { label: "Bridge", value: "Fixed, string-through" },
      { label: "Scale Length", value: '25.5"' },
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
  ...Array.from({ length: 4 }, (_, i) => {
    const ampImage = ampPngs[i];
    return {
    id: `amp-0${i + 1}`,
    slug: `hnd-a0${i + 1}`,
    sku: `HND-A0${i + 1}`,
    category: "amps" as const,
    name: `HND-A0${i + 1}`,
    tagline: `Professional Amp Head 0${i + 1}`,
    description:
      "A professional tube amp head delivering massive gain and articulate clean tones. Built with premium components for reliability on tour and in the studio.",
    price: ampPrices[i],
    colors: ["black", "white"] as ProductColor[],
    images: [ampImage, ampPngs[(i + 1) % ampPngs.length], ampImage],
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
];

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Live is Life",
    subtitle: "Bring Rock Closer to Life.",
    cta: "Explore Guitars",
    ctaHref: "/products/guitars",
    image: "/images/hnd-0.png",
  },
  {
    id: "hero-2",
    title: "Forged to Shred",
    subtitle: "Aggressive tone, stage-ready performance",
    cta: "Explore Guitars",
    ctaHref: "/products/guitars",
    image: "/images/hnd-1.png",
  },
  {
    id: "hero-3",
    title: "Crushing Tone",
    subtitle: "Professional amp heads for stage and studio",
    cta: "Explore Amps",
    ctaHref: "/products/amps",
    image: "/images/hnd-2.png",
  },
  {
    id: "hero-4",
    title: "Pure Power",
    subtitle: "All-tube circuitry built for the tour",
    cta: "Explore Amps",
    ctaHref: "/products/amps",
    image: "/images/hnd-3.png",
  },
  {
    id: "hero-5",
    title: "HND Musical Instruments",
    subtitle: "Continuously creating passion",
    cta: "Shop All",
    ctaHref: "/shop",
    image: "/images/hnd-4.png",
  },
];

export const liveNavItems = [
  {
    href: "/shop",
    label: "HND-L01",
    image: livePngs[0],
  },
  {
    href: "/configure",
    label: "HND-L02",
    image: livePngs[1],
  },
  {
    href: "/stores",
    label: "HND-L03",
    image: livePngs[2],
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
