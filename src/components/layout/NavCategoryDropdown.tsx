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
        "flex items-start gap-8 py-3 md:gap-10 md:py-4 lg:gap-12",
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
              <div className="flex flex-col items-center gap-3 py-2 sm:flex-row sm:items-center sm:gap-4 md:gap-5 md:py-2.5">
                {/* Left — 01–04 chapter text per product */}
                <div className="relative z-20 flex w-full min-w-0 shrink-0 items-start gap-2 sm:w-[min(100%,15.5rem)] sm:gap-2.5 md:w-[17rem] lg:w-[18rem] lg:items-center">
                  <span
                    aria-hidden
                    className="font-bebas pointer-events-none hidden shrink-0 origin-center scale-x-[0.88] scale-y-[1.55] select-none text-[clamp(6.5rem,10vw,10.5rem)] leading-none tracking-tighter text-hnd-black/[0.06] lg:inline dark:text-hnd-white/[0.08]"
                  >
                    {index}
                  </span>

                  <div className="relative z-20 min-w-0 lg:-ml-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bebas text-2xl leading-none text-hnd-red lg:hidden">
                        {index}
                      </span>
                      <p className="font-ui text-[10px] font-semibold tracking-[0.22em] text-hnd-red uppercase md:text-[11px]">
                        {label}
                      </p>
                    </div>

                    <h2 className="mt-1 font-bebas text-[clamp(1.45rem,2.4vw,2.15rem)] leading-[0.88] text-hnd-black dark:text-hnd-white">
                      {titleLines.map((line) => (
                        <span key={`${product.id}-${line}`} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>

                    {product.tagline ? (
                      <p className="mt-2 font-ui text-[10px] tracking-[0.16em] text-hnd-gray-500 uppercase md:text-[11px]">
                        {product.tagline}
                      </p>
                    ) : null}

                    <Link
                      href={productHref}
                      className="group/cta relative z-30 mt-3 inline-flex items-center gap-2 font-ui text-[11px] tracking-[0.18em] text-hnd-black uppercase transition-colors hover:text-hnd-red dark:text-hnd-white dark:hover:text-hnd-red"
                    >
                      Explore
                      <span className="text-hnd-red transition-transform group-hover/cta:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right — larger product image, close to copy */}
                <div className="relative z-0 min-w-0 flex-1">
                  <Link
                    href={productHref}
                    className="group relative block h-[200px] w-full overflow-hidden transition-transform duration-300 hover:scale-[1.02] sm:h-[220px] md:h-[260px] lg:h-[300px]"
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
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="sticky top-0 hidden w-40 shrink-0 border-l border-hnd-gray-300 pl-6 pt-4 md:block lg:w-48 lg:pl-8 dark:border-hnd-gray-800">
        <ul className="space-y-4">
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
