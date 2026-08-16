import Link from "next/link";
import Button from "@/components/ui/Button";

const articles: Record<string, { title: string; date: string; content: string }> = {
  "hnd-g-series-launch": {
    title: "Introducing the HND-G Electric Guitar Series",
    date: "2026-03-15",
    content:
      "Today we unveil six new electric guitar models — the HND-G series. Each guitar is built for heavy rock with high-output humbuckers, fast C-profile necks, and stage-ready hardware. Available in four colors: Black, White, Red, and Blue. Prices range from $699 to $899.",
  },
  "diode-speaker-technology": {
    title: "Inside HND Diode Amplifier Technology",
    date: "2026-02-28",
    content:
      "Our HND-S01 Bluetooth speaker uses a proprietary diode amplifier architecture that achieves ultra-low distortion and studio-grade clarity. With 120W RMS output, aptX HD Bluetooth 5.3, and 24-hour battery life, it sets a new standard for portable audio.",
  },
  "experience-centers-opening": {
    title: "HND Experience Centers Now Open",
    date: "2026-01-10",
    content:
      "We're excited to announce the opening of HND Experience Centers in Los Angeles, New York, London, and Tokyo. Visit to try our full product lineup, get expert advice, and experience the HND difference firsthand.",
  },
};

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="pt-16 md:pt-20">
        <div className="section-padding container-max py-24 text-center">
          <h1 className="font-bebas text-3xl">Article Not Found</h1>
          <Button href="/news" className="mt-8">
            Back to News
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <article className="section-padding container-max py-16 md:py-24">
        <Link
          href="/news"
          className="text-sm tracking-wide uppercase text-hnd-red hover:underline"
        >
          &larr; Back to News
        </Link>
        <time className="mt-8 block text-sm text-hnd-gray-500">
          {article.date}
        </time>
        <h1 className="mt-4 font-bebas text-4xl md:text-5xl">
          {article.title}
        </h1>
        <div className="mt-8 max-w-3xl text-lg leading-relaxed text-hnd-gray-500">
          <p>{article.content}</p>
        </div>
      </article>
    </div>
  );
}
