"use client";

import Link from "next/link";
import { withBasePath } from "@/lib/assetPath";
import { categoryChapters } from "@/data/products";
import { useI18n } from "@/i18n/useI18n";

export default function ProductsPage() {
  const { t, categoryLabel } = useI18n();

  return (
    <div className="pt-12 md:pt-14">
      {categoryChapters.map((chapter) => {
        const categoryKey = chapter.href.split("/").pop() as
          | "guitars"
          | "amps"
          | "speakers"
          | "lifestyle";
        const title = categoryLabel(categoryKey);
        return (
          <Link
            key={chapter.id}
            href={chapter.href}
            className="group relative block w-full max-w-[100vw] overflow-x-clip bg-transparent outline-none"
            aria-label={t("hero.goToCategory", { label: title })}
          >
            <div className="relative h-[42vh] min-h-[220px] overflow-hidden md:h-[44vh] lg:h-[48vh]">
              <img
                src={withBasePath(chapter.image)}
                alt={title}
                className="absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-300 group-hover:opacity-90"
                decoding="async"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
