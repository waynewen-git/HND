import Link from "next/link";

const articles = [
  {
    slug: "hnd-g-series-launch",
    title: "Introducing the HND-G Electric Guitar Series",
    date: "2026-03-15",
    excerpt:
      "Six new electric guitar models engineered for heavy rock, featuring high-output humbuckers and fast-playing necks.",
  },
  {
    slug: "diode-speaker-technology",
    title: "Inside HND Diode Amplifier Technology",
    date: "2026-02-28",
    excerpt:
      "How our diode-driven amplifier architecture delivers studio-grade clarity in a portable Bluetooth speaker.",
  },
  {
    slug: "experience-centers-opening",
    title: "HND Experience Centers Now Open",
    date: "2026-01-10",
    excerpt:
      "Visit our new locations in Los Angeles, New York, London, and Tokyo to try the full HND lineup.",
  },
];

export default function NewsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">News</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Latest updates, product launches, and stories from HND.
        </p>
      </section>

      <section className="section-padding container-max pb-24">
        <div className="mx-auto max-w-3xl divide-y divide-hnd-gray-300/20 dark:divide-hnd-gray-700/50">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group block py-8"
            >
              <time className="text-sm text-hnd-gray-500">{article.date}</time>
              <h2 className="mt-2 font-bebas text-2xl transition-colors group-hover:text-hnd-red">
                {article.title}
              </h2>
              <p className="mt-3 leading-relaxed text-hnd-gray-500">
                {article.excerpt}
              </p>
              <span className="mt-4 inline-block text-sm tracking-wide uppercase text-hnd-red">
                Read More
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
