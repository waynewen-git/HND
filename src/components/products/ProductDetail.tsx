"use client";

import AddToCartButton from "@/components/products/AddToCartButton";
import ProductDemoVideo from "@/components/products/ProductDemoVideo";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import { useI18n } from "@/i18n/useI18n";
import type { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product: rawProduct }: ProductDetailProps) {
  const { lp, lcolor, formatPrice, categoryLabel, t } = useI18n();
  const product = lp(rawProduct);

  if (product.category === "speakers") {
    return (
      <section className="section-padding container-max flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="font-bebas text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-wide">
          {t("cart.comingSoon")}
        </h1>
        <p className="mt-4 font-ui text-sm tracking-[0.16em] text-hnd-gray-500 uppercase">
          {categoryLabel("speakers")}
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="section-padding container-max py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />

          <div className="flex flex-col justify-center">
            <p className="text-sm tracking-wider text-hnd-steel uppercase">
              {categoryLabel(product.category)}
            </p>
            <h1 className="mt-2 font-bebas text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-hnd-gray-500">{product.tagline}</p>
            <p className="mt-6 text-3xl font-semibold">
              {formatPrice(product.price)}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <span
                  key={c}
                  className="rounded-sm border border-hnd-gray-300 px-3 py-1 text-xs capitalize dark:border-hnd-gray-700"
                >
                  {lcolor(c)}
                </span>
              ))}
            </div>

            <p className="mt-8 leading-relaxed text-hnd-gray-500">
              {product.description}
            </p>

            <div className="mt-8">
              <AddToCartButton
                productId={product.id}
                defaultColor={product.colors[0]}
                colors={product.colors}
              />
            </div>
          </div>
        </div>
      </section>

      {product.video && (
        <ProductDemoVideo
          src={product.video}
          title={product.name}
          poster={product.images[0]}
        />
      )}

      <section className="section-padding container-max py-16 md:py-24">
        <h2 className="font-bebas text-2xl md:text-3xl">
          {t("product.specifications")}
        </h2>
        <dl className="mt-8 divide-y divide-hnd-gray-300/20 dark:divide-hnd-gray-700/50">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between py-4 text-sm md:text-base"
            >
              <dt className="font-medium">{spec.label}</dt>
              <dd className="text-hnd-gray-500">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
