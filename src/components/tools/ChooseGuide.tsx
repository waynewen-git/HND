"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import { formatPrice, getProductsByCategory } from "@/data/products";
import { CATEGORY_LABELS, type ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: ProductCategory[] = ["guitars", "amps", "speakers"];

type UseCase = "stage" | "studio" | "everyday";

const USE_CASES: { id: UseCase; label: string; hint: string }[] = [
  { id: "stage", label: "Stage", hint: "Volume, presence, night after night." },
  { id: "studio", label: "Studio", hint: "Clarity and control for recording." },
  { id: "everyday", label: "Everyday", hint: "Ready without overbuilding." },
];

function isCategory(value: string | null): value is ProductCategory {
  return CATEGORIES.includes(value as ProductCategory);
}

function pickProduct(category: ProductCategory, useCase: UseCase) {
  const list = getProductsByCategory(category);
  if (list.length === 0) return null;
  if (list.length === 1) return list[0];
  if (useCase === "studio") return list[0];
  if (useCase === "everyday") return list[Math.floor((list.length - 1) / 2)];
  return list[list.length - 1];
}

export default function ChooseGuide() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category");
  const [category, setCategory] = useState<ProductCategory | null>(
    isCategory(initial) ? initial : null,
  );
  const [useCase, setUseCase] = useState<UseCase | null>(null);

  const pick = useMemo(
    () => (category && useCase ? pickProduct(category, useCase) : null),
    [category, useCase],
  );

  return (
    <div className="mt-12 max-w-3xl">
      <p className="font-ui text-xs tracking-[0.18em] text-hnd-red uppercase">
        01 — Category
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              setUseCase(null);
            }}
            className={cn(
              "px-4 py-2 font-ui text-xs tracking-[0.14em] uppercase transition-colors",
              category === cat
                ? "bg-hnd-red text-white"
                : "text-hnd-gray-500 hover:text-hnd-black dark:hover:text-hnd-white",
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {category ? (
        <>
          <p className="mt-12 font-ui text-xs tracking-[0.18em] text-hnd-red uppercase">
            02 — How you play
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {USE_CASES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setUseCase(item.id)}
                className={cn(
                  "border px-4 py-5 text-left transition-colors",
                  useCase === item.id
                    ? "border-hnd-red"
                    : "border-hnd-gray-300/40 hover:border-hnd-gray-500 dark:border-hnd-gray-800",
                )}
              >
                <span className="font-bebas text-2xl tracking-tight">
                  {item.label}
                </span>
                <p className="mt-2 text-sm text-hnd-gray-500">{item.hint}</p>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {pick ? (
        <div className="mt-14 border-t border-hnd-gray-300/20 pt-10 dark:border-hnd-gray-800">
          <p className="font-ui text-xs tracking-[0.18em] text-hnd-red uppercase">
            03 — Start here
          </p>
          <div className="mt-6 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <div className="relative aspect-square w-full max-w-[16rem] shrink-0">
              <AppImage
                src={pick.navImage ?? pick.images[0]}
                alt={pick.name}
                fill
                unoptimized
                className="object-contain"
                sizes="256px"
              />
            </div>
            <div>
              <p className="font-ui text-[11px] tracking-[0.16em] text-hnd-gray-500 uppercase">
                {pick.tagline}
              </p>
              <h2 className="mt-2 font-bebas text-4xl tracking-tight">
                {pick.name}
              </h2>
              <p className="mt-3 max-w-md text-hnd-gray-500">
                {pick.description}
              </p>
              <p className="mt-4 text-sm text-hnd-gray-700 dark:text-hnd-gray-300">
                From {formatPrice(pick.price)}
              </p>
              <Button
                href={`/products/${pick.category}/${pick.slug}`}
                className="mt-6"
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
