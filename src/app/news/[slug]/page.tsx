import NewsDetailContent from "@/components/news/NewsDetailContent";

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "hnd-g-series-launch" },
    { slug: "diode-speaker-technology" },
    { slug: "experience-centers-opening" },
  ];
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  return <NewsDetailContent slug={slug} />;
}
