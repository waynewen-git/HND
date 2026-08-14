"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "large";
}

export default function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const href = `/products/${product.category}/${product.slug}`;

  if (variant === "large") {
    return (
      <Link href={href} className="group relative block overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-hnd-gray-900">
          <AppImage
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-8 md:p-12">
            <p className="text-sm tracking-wider text-hnd-steel-light uppercase">
              {product.tagline}
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
              {product.name}
            </h3>
            <p className="mt-2 text-lg text-white/80">
              From {formatPrice(product.price)}
            </p>
            <span className="mt-4 inline-block text-sm tracking-wider text-white uppercase underline-offset-4 transition-all group-hover:underline">
              Learn More
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-hnd-gray-100 dark:bg-hnd-gray-900">
        <AppImage
          src={product.images[0]}
          alt={product.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-display text-lg font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-hnd-gray-500">{product.tagline}</p>
        <p className="mt-2 font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
