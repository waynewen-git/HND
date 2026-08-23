"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { products } from "@/data/products";
import type { MessageKey } from "@/i18n/dictionaries";
import type { ProductCategory } from "@/types";

type SortOption = "price-asc" | "price-desc" | "name";

const categoryKeys: Record<ProductCategory, MessageKey> = {
  guitars: "categories.guitars",
  amps: "categories.amps",
  speakers: "categories.speakers",
  lifestyle: "categories.lifestyle",
};

export default function ShopPage() {
  const { t } = useLocale();
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<SortOption>("name");

  const filtered = useMemo(() => {
    const withoutSpeakers = products.filter((p) => p.category !== "speakers");
    const base =
      category === "all"
        ? withoutSpeakers
        : category === "speakers"
          ? []
          : products.filter((p) => p.category === category);

    return [...base].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [category, sort]);

  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">{t("shop.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          {t("shop.intro")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {(["all", "guitars", "amps", "speakers", "lifestyle"] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-sm px-4 py-2 text-sm tracking-wide uppercase transition-all ${
                    category === cat
                      ? "bg-hnd-red text-white"
                      : "border border-hnd-gray-300 dark:border-hnd-gray-700"
                  }`}
                >
                  {cat === "all" ? t("shop.all") : t(categoryKeys[cat])}
                </button>
              ),
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="ml-auto rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-2 text-sm dark:border-hnd-gray-700"
            aria-label="Sort products"
          >
            <option value="name">{t("shop.sortName")}</option>
            <option value="price-asc">{t("shop.sortPriceAsc")}</option>
            <option value="price-desc">{t("shop.sortPriceDesc")}</option>
          </select>
        </div>

        {category === "speakers" ? (
          <div className="mt-20 flex flex-col items-center justify-center py-16 text-center">
            <h2 className="font-bebas text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-wide">
              {t("cart.comingSoon")}
            </h2>
            <p className="mt-4 font-ui text-sm tracking-[0.16em] text-hnd-gray-500 uppercase">
              {t(categoryKeys.speakers)}
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4 text-sm text-hnd-gray-500">
              {filtered.length === 1
                ? t("shop.product", { count: filtered.length })
                : t("shop.products", { count: filtered.length })}
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
