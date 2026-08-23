"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { getNewsArticle } from "@/data/news";
import { useI18n } from "@/i18n/useI18n";

interface NewsDetailContentProps {
  slug: string;
}

export default function NewsDetailContent({ slug }: NewsDetailContentProps) {
  const { t, lnews } = useI18n();
  const raw = getNewsArticle(slug);

  if (!raw) {
    return (
      <div className="pt-12 md:pt-14">
        <div className="section-padding container-max py-24 text-center">
          <h1 className="font-bebas text-3xl">{t("news.notFound")}</h1>
          <Button href="/news" className="mt-8">
            {t("news.backToNews")}
          </Button>
        </div>
      </div>
    );
  }

  const article = lnews(raw);

  return (
    <div className="pt-12 md:pt-14">
      <article className="section-padding container-max py-16 md:py-24">
        <Link
          href="/news"
          className="text-sm tracking-wide uppercase text-hnd-red hover:underline"
        >
          &larr; {t("news.backToNews")}
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
