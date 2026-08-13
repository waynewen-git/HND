import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/products/AddToCartButton";
import ProductCard from "@/components/products/ProductCard";
import ProductDemoVideo from "@/components/products/ProductDemoVideo";
import {
  formatPrice,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from "@/data/products";
import { CATEGORY_LABELS, COLOR_LABELS } from "@/types";

interface ProductDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const all = [
    ...getProductsByCategory("guitars"),
    ...getProductsByCategory("amps"),
    ...getProductsByCategory("speakers"),
  ];
  return all.map((p) => ({ category: p.category, slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.category !== category) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding container-max py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-sm bg-hnd-gray-100 dark:bg-hnd-gray-900">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                unoptimized
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-sm bg-hnd-gray-100 dark:bg-hnd-gray-900"
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 2}`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 16vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm tracking-wider text-hnd-steel uppercase">
              {CATEGORY_LABELS[product.category]}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
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
                  {COLOR_LABELS[c]}
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

      {/* Highlights */}
      <section className="bg-hnd-gray-100 dark:bg-hnd-gray-950">
        <div className="section-padding container-max py-16 md:py-24">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Highlights
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="rounded-sm border border-hnd-gray-300/20 p-6 dark:border-hnd-gray-700/50"
              >
                <p className="leading-relaxed">{h}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Specs */}
      <section className="section-padding container-max py-16 md:py-24">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Specifications
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

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-hnd-gray-100 dark:bg-hnd-gray-950">
          <div className="section-padding container-max py-16 md:py-24">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                You May Also Like
              </h2>
              <Link
                href={`/products/${product.category}`}
                className="text-sm tracking-wide uppercase text-hnd-red hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
