"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { getProductsByCategory } from "@/data/products";
import { useI18n } from "@/i18n/useI18n";
import type { ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: ProductCategory[] = ["guitars", "amps"];

function isCategory(value: string | null): value is ProductCategory {
  return CATEGORIES.includes(value as ProductCategory);
}

export default function CompareTools() {
  const { t, lp, formatPrice, categoryLabel, lspec } = useI18n();
  const searchParams = useSearchParams();
  const initial = searchParams.get("category");
  const [category, setCategory] = useState<ProductCategory>(
    isCategory(initial) ? initial : "guitars",
  );
  const rawProducts = getProductsByCategory(category);
  const products = rawProducts.map(lp);
  const [selected, setSelected] = useState<string[]>(() =>
    rawProducts.slice(0, 2).map((p) => p.id),
  );

  const visible = useMemo(
    () => products.filter((p) => selected.includes(p.id)),
    [products, selected],
  );

  const specLabels = useMemo(() => {
    if (category === "guitars") {
      return [
        "Price",
        "Body",
        "Neck",
        "Fingerboard",
        "Pickups",
        "Bridge",
        "Scale Length",
        "Strings",
        "Weight",
      ];
    }
    const labels = new Set<string>(["Price"]);
    for (const product of rawProducts) {
      for (const spec of product.specs) labels.add(spec.label);
    }
    return [...labels];
  }, [rawProducts, category]);

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 2) return prev;
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }

  function switchCategory(next: ProductCategory) {
    setCategory(next);
    setSelected(getProductsByCategory(next).slice(0, 2).map((p) => p.id));
  }

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => switchCategory(cat)}
            className={cn(
              "px-4 py-2 font-ui text-xs tracking-[0.14em] uppercase transition-colors",
              category === cat
                ? "bg-hnd-red text-white"
                : "text-hnd-gray-500 hover:text-hnd-black dark:hover:text-hnd-white",
            )}
          >
            {categoryLabel(cat)}
          </button>
        ))}
      </div>
      <p className="mt-4 font-ui text-xs tracking-[0.14em] text-hnd-gray-500 uppercase">
        {t("compare.selectModels")}
      </p>

      <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => {
          const on = selected.includes(product.id);
          return (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => toggle(product.id)}
                className={cn(
                  "group flex w-full flex-col items-center border px-3 py-4 text-center transition-colors",
                  on
                    ? "border-hnd-red"
                    : "border-hnd-gray-300/40 hover:border-hnd-gray-500 dark:border-hnd-gray-800",
                )}
              >
                <div className="relative aspect-square w-full">
                  <AppImage
                    src={product.navImage ?? product.images[0]}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
                <span className="mt-2 font-ui text-[11px] tracking-[0.12em] uppercase">
                  {product.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-hnd-gray-300/30 dark:border-hnd-gray-800">
              <th className="py-4 pr-4 font-ui text-xs tracking-[0.14em] text-hnd-gray-500 uppercase">
                {t("compare.spec")}
              </th>
              {visible.map((product) => (
                <th key={product.id} className="px-4 py-4">
                  <Link
                    href={`/products/${product.category}/${product.slug}`}
                    className="font-bebas text-xl tracking-tight hover:text-hnd-red"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 font-ui text-[11px] tracking-[0.12em] text-hnd-gray-500 uppercase">
                    {product.tagline}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specLabels.map((label) => (
              <tr
                key={label}
                className="border-b border-hnd-gray-300/20 dark:border-hnd-gray-800/80"
              >
                <th className="py-4 pr-4 font-ui text-xs tracking-[0.14em] text-hnd-gray-500 uppercase">
                  {lspec(label)}
                </th>
                {visible.map((product) => {
                  const raw = rawProducts.find((r) => r.id === product.id);
                  const specIndex =
                    raw?.specs.findIndex((s) => s.label === label) ?? -1;
                  const value =
                    label === "Price"
                      ? formatPrice(product.price)
                      : specIndex >= 0
                        ? product.specs[specIndex]?.value
                        : "—";
                  return (
                    <td key={`${product.id}-${label}`} className="px-4 py-4 text-sm">
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
