import { notFound } from "next/navigation";
import GuitarLineup from "@/components/products/GuitarLineup";
import ProductCard from "@/components/products/ProductCard";
import { withBasePath } from "@/lib/assetPath";
import {
  categoryChapters,
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
    { category: "lifestyle" },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = getCategoryInfo(category);
  if (!info) notFound();

  const categoryProducts = getProductsByCategory(category);
  const isGuitars = category === "guitars";
  const chapter = categoryChapters.find(
    (s) => s.href === `/products/${category}`,
  );
  const heroImage = chapter?.image ?? info.heroImage;

  return (
    <div className="pt-16 md:pt-20">
      <section
        className="relative w-full max-w-[100vw] overflow-x-clip bg-transparent"
        aria-label={info.name}
      >
        <div className="relative h-[42vh] min-h-[220px] overflow-hidden md:h-[44vh] lg:h-[48vh]">
          <img
            src={withBasePath(heroImage)}
            alt={info.name}
            className="absolute inset-0 h-full w-full object-contain object-center"
            decoding="async"
          />
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
