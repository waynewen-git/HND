"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
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
        "flex items-start gap-[clamp(1rem,3vw,2.5rem)] py-2 md:py-3",
        className,
      )}
    >
      <ul className="flex min-w-0 flex-1 flex-col divide-y divide-hnd-gray-300/40 dark:divide-hnd-gray-800/50">
        {products.map((product, i) => {
          const index = String(i + 1).padStart(2, "0");
          const titleLines = product.name.trim().split(/\s+/);
          const productHref = `/products/${product.category}/${product.slug}`;

          return (
            <li key={product.id}>
              {/* Fluid gap between chapter copy and product grows/shrinks with viewport */}
              <div className="flex flex-col items-stretch gap-[clamp(0.75rem,4vw,3.25rem)] py-2 sm:flex-row sm:items-center md:py-2.5">
                {/* Chapter: tall index aligned to full text-group height */}
                <div className="relative z-20 flex w-full min-w-0 shrink-0 items-stretch gap-2 sm:w-auto sm:max-w-[min(100%,24rem)] md:gap-3">
                  <span
                    aria-hidden
                    className="font-bebas pointer-events-none hidden shrink-0 select-none items-center self-center origin-center scale-x-[0.88] scale-y-[1.6] text-[clamp(5rem,6.8vw,7.75rem)] leading-none tracking-tighter text-hnd-black/14 lg:flex dark:text-hnd-white/16"
                  >
                    {index}
                  </span>

                  <div className="relative z-20 flex min-w-0 flex-col justify-center py-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bebas text-2xl leading-none text-hnd-red lg:hidden">
                        {index}
                      </span>
                      <p className="font-ui text-[10px] font-semibold tracking-[0.22em] text-hnd-red uppercase md:text-[11px]">
                        {label}
                      </p>
                    </div>

                    <h2 className="mt-1 font-bebas text-[clamp(1.65rem,2.5vw,2.35rem)] leading-[0.9] text-hnd-black dark:text-hnd-white">
                      {titleLines.map((line) => (
                        <span key={`${product.id}-${line}`} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>

                    {product.tagline ? (
                      <p className="mt-2 font-ui text-[11px] tracking-[0.16em] text-hnd-gray-500 uppercase md:text-xs">
                        {product.tagline}
                      </p>
                    ) : null}

                    <Link
                      href={productHref}
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
                  href={productHref}
                  className="relative block h-[clamp(11rem,28vw,18rem)] min-w-0 flex-1 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                >
                  <AppImage
                    src={product.navImage ?? product.images[0]}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain object-left"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                </Link>
              </div>
            </li>
          );
        })}
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
