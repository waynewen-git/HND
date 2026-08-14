import { notFound } from "next/navigation";
import AppImage from "@/components/ui/AppImage";
import GuitarLineup from "@/components/products/GuitarLineup";
import ProductCard from "@/components/products/ProductCard";
import {
  getCategoryInfo,
  getProductsByCategory,
} from "@/data/products";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: "guitars" },
    { category: "amps" },
    { category: "speakers" },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = getCategoryInfo(category);
  if (!info) notFound();

  const categoryProducts = getProductsByCategory(category);
  const isGuitars = category === "guitars";

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px]">
        <AppImage
          src={info.heroImage}
          alt={info.name}
          fill
          unoptimized
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-end section-padding pb-12">
          <div className="container-max">
            <h1 className="font-display text-4xl font-bold text-white md:text-6xl">
              {info.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/70">
              {info.description}
            </p>
          </div>
        </div>
      </section>

      {isGuitars ? (
        <section className="section-padding container-max border-b border-hnd-gray-300/20 dark:border-hnd-gray-700/50">
          <GuitarLineup variant="page" />
        </section>
      ) : (
        <section className="section-padding container-max py-16 md:py-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
