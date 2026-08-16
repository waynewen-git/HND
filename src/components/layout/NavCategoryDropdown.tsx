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

/** Tall chapter index — font size tracks the adjacent copy block height */
function ChapterIndex({
  index,
  heightPx,
}: {
  index: string;
  heightPx: number;
}) {
  const fontSize =
    heightPx > 0 ? Math.max(52, Math.min(heightPx * 0.95, 200)) : 80;

  return (
    <span
      aria-hidden
      className="font-bebas hidden shrink-0 select-none items-center tracking-tighter text-hnd-black/15 md:inline-flex dark:text-hnd-white/18"
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
}: {
  index: string;
  label: string;
  productName: string;
  tagline?: string;
  image: string;
  href: string;
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
      className="flex flex-col items-stretch py-2 md:flex-row md:items-center md:py-2.5"
      style={{ gap: "clamp(0.75rem, 5vw, 4rem)" }}
    >
      {/* Chapter copy + height-matched index */}
      <div className="relative z-20 flex w-full min-w-0 shrink-0 items-center gap-3 md:w-auto md:max-w-[min(42%,26rem)] md:gap-4">
        <ChapterIndex index={index} heightPx={copyHeight} />

        <div ref={copyRef} className="relative z-20 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-bebas text-2xl leading-none text-hnd-red md:hidden">
              {index}
            </span>
            <p className="font-ui text-[10px] font-semibold tracking-[0.22em] text-hnd-red uppercase md:text-[11px]">
              {label}
            </p>
          </div>

          <h2 className="mt-1 font-bebas text-[clamp(1.65rem,2.5vw,2.35rem)] leading-[0.9] text-hnd-black dark:text-hnd-white">
            {titleLines.map((line) => (
              <span key={`${href}-${line}`} className="block">
                {line}
              </span>
            ))}
          </h2>

          {tagline ? (
            <p className="mt-2 font-ui text-[11px] tracking-[0.16em] text-hnd-gray-500 uppercase md:text-xs">
              {tagline}
            </p>
          ) : null}

          <Link
            href={href}
            className="group/cta relative z-30 mt-3 inline-flex items-center gap-2 font-ui text-xs tracking-[0.18em] text-hnd-black uppercase transition-colors hover:text-hnd-red dark:text-hnd-white dark:hover:text-hnd-red"
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
        className="relative block min-h-[11rem] min-w-0 flex-1 overflow-hidden transition-transform duration-300 hover:scale-[1.02] md:min-h-[14rem] lg:min-h-[16rem]"
        style={{ height: "clamp(11rem, 28vw, 18rem)" }}
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
}: NavCategoryDropdownProps) {
  const products = getProductsByCategory(category);
  const sideLinks = sideLinksByCategory[category];

  return (
    <div
      className={cn(
        "flex items-start py-2 md:py-3",
        className,
      )}
      style={{ gap: "clamp(1rem, 3vw, 2.5rem)" }}
    >
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
            />
          </li>
        ))}
      </ul>

      <aside className="sticky top-0 hidden w-36 shrink-0 border-l border-hnd-gray-300 pl-5 pt-2 md:block lg:w-44 lg:pl-6 dark:border-hnd-gray-800">
        <ul className="space-y-3">
          {sideLinks.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link
                href={link.href}
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
