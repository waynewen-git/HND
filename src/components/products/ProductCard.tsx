"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, salePrice } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "large";
  index?: number;
  /** When set, list price is struck through and a sale price is shown. */
  promoPercent?: number;
}

function PriceLine({
  price,
  promoPercent,
  className,
}: {
  price: number;
  promoPercent?: number;
  className?: string;
}) {
  if (!promoPercent) {
    return <p className={className}>{formatPrice(price)}</p>;
  }

  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5",
        className,
      )}
    >
      <span className="text-hnd-gray-500 line-through decoration-hnd-red decoration-1">
        {formatPrice(price)}
      </span>
      <span>{formatPrice(salePrice(price, promoPercent))}</span>
      <span className="font-ui text-xs tracking-[0.12em] text-hnd-red uppercase">
        {promoPercent}% off
      </span>
    </p>
  );
}

export default function ProductCard({
  product,
  variant = "default",
  index,
  promoPercent,
}: ProductCardProps) {
  const href = `/products/${product.category}/${product.slug}`;
  const num =
    index !== undefined
      ? String(index + 1).padStart(2, "0")
      : product.sku?.replace(/\D/g, "").slice(-2) || null;

  if (variant === "large") {
    return (
      <Link href={href} className="group relative block overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-transparent">
          <AppImage
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized
            className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hnd-black/80 via-hnd-black/20 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-8 md:p-12">
            {num && (
              <p className="label-condensed text-hnd-red">{num}</p>
            )}
            <h3 className="mt-2 font-bebas text-3xl text-hnd-white md:text-4xl">
              {product.name}
            </h3>
            <p className="mt-2 label-condensed text-hnd-gray-300">
              {product.tagline}
            </p>
            <PriceLine
              price={product.price}
              promoPercent={promoPercent}
              className="mt-3 text-hnd-gray-300"
            />
            <span className="mt-5 inline-flex items-center gap-2 font-ui text-sm tracking-[0.14em] text-hnd-white uppercase transition-transform duration-300 group-hover:translate-x-1">
              Explore →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block">
        <div className="relative aspect-square overflow-hidden bg-transparent">
          <AppImage
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized
            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            {num && (
              <p className="label-condensed text-hnd-red">{num}</p>
            )}
            <h3 className="mt-1 font-bebas text-lg tracking-tight transition-transform duration-300 group-hover:translate-x-0.5">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-hnd-gray-500">{product.tagline}</p>
            <PriceLine
              price={product.price}
              promoPercent={promoPercent}
              className="mt-2 text-sm text-hnd-gray-700 dark:text-hnd-gray-300"
            />
          </div>
        <span
          aria-hidden
          className="mt-1 font-ui text-sm text-hnd-gray-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-hnd-red"
        >
          →
        </span>
      </div>
      <span className="mt-3 block h-px w-0 bg-hnd-red transition-all duration-300 group-hover:w-10" />
    </Link>
  );
}
