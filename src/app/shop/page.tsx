"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import type { ProductCategory } from "@/types";
import { CATEGORY_LABELS } from "@/types";

type SortOption = "price-asc" | "price-desc" | "name";

export default function ShopPage() {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<SortOption>("name");

  const filtered = useMemo(() => {
    const base =
      category === "all"
        ? [...products]
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
    <div className="pt-24 md:pt-28">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">Shop</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Browse our complete collection. Filter by category and sort by price or
          name.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {(["all", "guitars", "amps", "speakers", "lifestyle"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-sm px-4 py-2 text-sm tracking-wide uppercase transition-all ${
                  category === cat
                    ? "bg-hnd-red text-white"
                    : "border border-hnd-gray-300 dark:border-hnd-gray-700"
                }`}
              >
                {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="ml-auto rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-2 text-sm dark:border-hnd-gray-700"
            aria-label="Sort products"
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <p className="mt-4 text-sm text-hnd-gray-500">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
