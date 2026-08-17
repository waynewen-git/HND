"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getProductsByCategory } from "@/data/products";
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

const sideLinksByCategory: Record<
  ProductCategory,
  { href: string; label: string }[]
> = {
  guitars: [
    { href: "/products/guitars", label: "All Guitars" },
    { href: "/configure", label: "Configure" },
    { href: "/shop", label: "Shop" },
    { href: "/support", label: "Support" },
  ],
  amps: [
    { href: "/products/amps", label: "View All" },
    { href: "/shop", label: "Shop" },
    { href: "/support", label: "Support" },
  ],
  speakers: [
    { href: "/products/speakers", label: "View All" },
    { href: "/shop", label: "Shop" },
    { href: "/support", label: "Support" },
  ],
  lifestyle: [
    { href: "/products/lifestyle", label: "View All" },
    { href: "/shop", label: "Shop" },
    { href: "/support", label: "Support" },
  ],
};

/** Tall slender chapter index — compressed width, stretched height */
function ChapterIndex({
  index,
  heightPx,
}: {
  index: string;
  heightPx: number;
}) {
  const fontSize =
    heightPx > 0 ? Math.max(48, Math.min(heightPx * 0.78, 160)) : 72;

  return (
    <span
      aria-hidden
      className="font-bebas pointer-events-none hidden shrink-0 origin-center scale-x-[0.72] scale-y-[1.65] select-none items-center tracking-tighter text-hnd-black/15 sm:inline-flex dark:text-hnd-white/18"
      style={{
        fontSize,
        lineHeight: 1,
        height: heightPx > 0 ? heightPx : undefined,
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
    <div
      className="flex flex-col items-stretch py-3 sm:flex-row sm:items-center"
      style={{ gap: "clamp(0.75rem, 4vw, 2.5rem)" }}
    >
      <div className="relative z-20 flex w-full min-w-0 shrink-0 items-center gap-3 sm:w-auto sm:max-w-[min(48%,18rem)]">
        <ChapterIndex index={index} heightPx={copyHeight} />

        <div ref={copyRef} className="relative z-20 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-bebas text-3xl leading-none text-hnd-red sm:hidden">
              {index}
            </span>
            <p className="font-ui text-[11px] font-semibold tracking-[0.22em] text-hnd-red uppercase">
              {label}
            </p>
          </div>

          <h2 className="mt-1.5 font-bebas text-[clamp(1.85rem,6vw,2.6rem)] leading-[0.88] text-hnd-black dark:text-hnd-white">
            {titleLines.map((line) => (
              <span key={`${href}-${line}`} className="block">
                {line}
              </span>
            ))}
          </h2>

          {tagline ? (
            <p className="mt-2 font-ui text-xs tracking-[0.16em] text-hnd-gray-500 uppercase">
              {tagline}
            </p>
          ) : null}

          <Link
            href={href}
            onClick={onNavigate}
            className="group/cta relative z-30 mt-3 inline-flex items-center gap-2 font-ui text-sm tracking-[0.18em] text-hnd-black uppercase transition-colors hover:text-hnd-red dark:text-hnd-white dark:hover:text-hnd-red"
          >
            Explore
            <span className="text-hnd-red transition-transform group-hover/cta:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>

      <Link
        href={href}
        onClick={onNavigate}
        className="relative block min-h-[10rem] min-w-0 flex-1 overflow-hidden sm:min-h-[12rem]"
        style={{ height: "clamp(10rem, 38vw, 16rem)" }}
      >
        <AppImage
          src={image}
          alt={productName}
          fill
          unoptimized
          className="object-contain object-left"
          sizes="(max-width: 768px) 100vw, 55vw"
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
  const sideLinks = sideLinksByCategory[category];

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

      <aside className="hidden w-36 shrink-0 border-l border-hnd-gray-300 pl-5 pt-1 md:block lg:w-44 lg:pl-6 dark:border-hnd-gray-800">
        <ul className="space-y-3">
          {sideLinks.map((link) => (
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
      </aside>
    </div>
  );
}
