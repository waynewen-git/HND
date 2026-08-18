import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

/** Spread 10–20% off across listed featured products. */
function offerPercent(index: number, total: number) {
  if (total <= 1) return 10;
  return Math.round(10 + (index / (total - 1)) * 10);
}

export default function OffersPage() {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">Current Offers</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Limited promotions on featured HND gear — 10% to 20% off list price.
          Online checkout is not available yet — explore the lineup and reach us
          to order.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              promoPercent={offerPercent(i, featured.length)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
