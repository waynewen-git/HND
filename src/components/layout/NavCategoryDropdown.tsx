"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getProductsByCategory } from "@/data/products";
import { navUtilityLinks } from "@/data/navUtility";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";

interface NavCategoryDropdownProps {
  category: ProductCategory;
  label: string;
  href: string;
  className?: string;
  /** Desktop hover: compact image grid. Mobile menu: chapter rows. */
  layout?: "grid" | "chapter";
  onNavigate?: () => void;
}

function UtilityLinks({
  category,
  onNavigate,
  className,
}: {
  category: ProductCategory;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {navUtilityLinks(category).map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <Link
            href={link.href}
            onClick={onNavigate}
            className="font-ui text-xs tracking-[0.14em] text-hnd-gray-500 uppercase transition-colors hover:text-hnd-red"
          >
            {link.label} →
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Tall slender chapter index — stretched tall, compressed wide */
function ChapterIndex({
  index,
  heightPx,
}: {
  index: string;
  heightPx: number;
}) {
  const size = heightPx > 0 ? heightPx * 1.5 : 84;
  const scaleY = 1.42;
  const fontSize = size / scaleY;

  return (
    <span
      aria-hidden
      className="font-bebas flex shrink-0 select-none items-center tracking-tighter text-hnd-black/18 dark:text-hnd-white/22"
      style={{
        height: size,
        fontSize,
        lineHeight: 1,
        transform: `scaleX(0.62) scaleY(${scaleY})`,
        transformOrigin: "center",
      }}
    >
      {index}
    </span>
  );
}

function ProductChapterRow({
  index,
  label,
  productName,
  tagline,
  image,
  href,
  onNavigate,
}: {
  index: string;
  label: string;
  productName: string;
  tagline?: string;
  image: string;
  href: string;
  onNavigate?: () => void;
}) {
  const copyRef = useRef<HTMLDivElement>(null);
  const [copyHeight, setCopyHeight] = useState(0);
  const titleLines = productName.trim().split(/\s+/);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;

    const update = () => setCopyHeight(el.getBoundingClientRect().height);

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [productName, tagline, label]);

  return (
    <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_minmax(0,1.25fr)] items-center gap-x-[clamp(0.35rem,2vw,1.25rem)] overflow-visible py-[clamp(0.4rem,1.6vw,0.8rem)]">
      <ChapterIndex index={index} heightPx={copyHeight} />

      <div ref={copyRef} className="relative z-20 min-w-0">
        <p className="truncate font-ui text-[clamp(8px,2.4vw,11px)] font-semibold tracking-[0.18em] text-hnd-red uppercase">
          {label}
        </p>

        <h2 className="mt-[0.15em] font-bebas text-[clamp(1.05rem,5vw,2.35rem)] leading-[0.88] text-hnd-black dark:text-hnd-white">
          {titleLines.map((line) => (
            <span key={`${href}-${line}`} className="block truncate">
              {line}
            </span>
          ))}
        </h2>

        {tagline ? (
          <p className="mt-[0.3em] truncate font-ui text-[clamp(8px,2.2vw,12px)] tracking-[0.14em] text-hnd-gray-500 uppercase">
            {tagline}
          </p>
        ) : null}

        <Link
          href={href}
          onClick={onNavigate}
          className="group/cta relative z-30 mt-[0.4em] inline-flex items-center gap-1 font-ui text-[clamp(9px,2.2vw,13px)] tracking-[0.16em] text-hnd-black uppercase transition-colors hover:text-hnd-red dark:text-hnd-white dark:hover:text-hnd-red"
        >
          Explore
          <span className="text-hnd-red transition-transform group-hover/cta:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <Link
        href={href}
        onClick={onNavigate}
        className="relative min-h-0 min-w-0 overflow-hidden"
        style={{ height: "clamp(5.25rem, 32vw, 15rem)" }}
      >
        <AppImage
          src={image}
          alt={productName}
          fill
          unoptimized
          className="object-contain object-center"
          sizes="(max-width: 768px) 62vw, 55vw"
        />
      </Link>
    </div>
  );
}

export default function NavCategoryDropdown({
  category,
  label,
  className,
  layout = "grid",
  onNavigate,
}: NavCategoryDropdownProps) {
  const products = getProductsByCategory(category);

  if (layout === "chapter") {
    return (
      <div className={cn("flex flex-col", className)}>
        <ul className="flex min-w-0 flex-1 flex-col divide-y divide-hnd-gray-300/40 dark:divide-hnd-gray-800/50">
          {products.map((product, i) => (
            <li key={product.id}>
              <ProductChapterRow
                index={String(i + 1).padStart(2, "0")}
                label={label}
                productName={product.name}
                tagline={product.tagline}
                image={product.navImage ?? product.images[0]}
                href={`/products/${product.category}/${product.slug}`}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-hnd-gray-300/40 pt-4 dark:border-hnd-gray-800/50">
          <UtilityLinks category={category} onNavigate={onNavigate} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-start py-5 md:py-6", className)}
      style={{ gap: "clamp(1rem, 3vw, 2.5rem)" }}
    >
      <ul className="grid min-w-0 flex-1 grid-cols-3 gap-x-6 gap-y-8 lg:gap-x-8">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.category}/${product.slug}`}
              onClick={onNavigate}
              className="group flex flex-col items-center text-center transition-opacity hover:opacity-80"
            >
              <div className="relative aspect-square w-full max-h-[11rem] overflow-hidden lg:max-h-[13rem]">
                <AppImage
                  src={product.navImage ?? product.images[0]}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 30vw, 22vw"
                />
              </div>
              <span className="mt-3 font-ui text-xs tracking-[0.14em] text-hnd-black uppercase lg:text-sm dark:text-hnd-white">
                {product.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <aside className="hidden w-44 shrink-0 border-l border-hnd-gray-300 pl-5 pt-1 md:block lg:w-52 lg:pl-6 dark:border-hnd-gray-800">
        <UtilityLinks category={category} onNavigate={onNavigate} />
      </aside>
    </div>
  );
}
