"use client";

import { notFound } from "next/navigation";
import GuitarLineup from "@/components/products/GuitarLineup";
import ProductCard from "@/components/products/ProductCard";
import { withBasePath } from "@/lib/assetPath";
import {
  categoryChapters,
  getCategoryInfo,
  getProductsByCategory,
} from "@/data/products";
import { useI18n } from "@/i18n/useI18n";

interface CategoryPageContentProps {
  category: string;
}

export default function CategoryPageContent({
  category,
}: CategoryPageContentProps) {
  const { lcat, t } = useI18n();
  const info = getCategoryInfo(category);
  if (!info) notFound();

  const localized = lcat(info);
  const categoryProducts = getProductsByCategory(category);
  const isGuitars = category === "guitars";
  const isSpeakers = category === "speakers";
  const chapter = categoryChapters.find(
    (s) => s.href === `/products/${category}`,
  );
  const heroImage = chapter?.image ?? info.heroImage;

  if (isSpeakers) {
    return (
      <div className="pt-12 md:pt-14">
        <section className="section-padding container-max flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <h1 className="font-bebas text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-wide">
            {t("cart.comingSoon")}
          </h1>
          <p className="mt-4 font-ui text-sm tracking-[0.16em] text-hnd-gray-500 uppercase">
            {localized.name}
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-12 md:pt-14">
      <section
        className="relative w-full max-w-[100vw] overflow-x-clip bg-transparent"
        aria-label={localized.name}
      >
        <div className="relative h-[42vh] min-h-[220px] overflow-hidden md:h-[44vh] lg:h-[48vh]">
          <img
            src={withBasePath(heroImage)}
            alt={localized.name}
            className="absolute inset-0 h-full w-full object-contain object-center"
            decoding="async"
          />
        </div>
      </section>

      {isGuitars ? (
        <section className="section-padding container-max border-b border-hnd-gray-300/20 dark:border-hnd-gray-700/50">
          <GuitarLineup variant="page" />
        </section>
      ) : (
        <section className="section-padding container-max py-16 md:py-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
