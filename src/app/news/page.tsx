"use client";

import Link from "next/link";
import { newsArticles } from "@/data/news";
import { useI18n } from "@/i18n/useI18n";

export default function NewsPage() {
  const { t, lnews } = useI18n();

  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">{t("news.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          {t("news.intro")}
        </p>
      </section>

      <section className="section-padding container-max pb-24">
        <div className="mx-auto max-w-3xl divide-y divide-hnd-gray-300/20 dark:divide-hnd-gray-700/50">
          {newsArticles.map((raw) => {
            const article = lnews(raw);
            return (
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
                  {t("news.readMore")}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
