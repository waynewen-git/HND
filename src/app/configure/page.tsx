import Button from "@/components/ui/Button";
import { products } from "@/data/products";

export default function ConfigurePage() {
  const configurable = products.filter(
    (p) => p.category === "guitars" || p.category === "amps",
  );

  return (
    <div className="pt-28 md:pt-36">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-display text-4xl font-bold md:text-6xl">
          Configure
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Build your perfect instrument. Select a model to begin customizing
          colors, components, and more. Full 3D configurator coming in Phase 2.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {configurable.map((product) => (
            <div
              key={product.id}
              className="rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50"
            >
              <p className="text-sm tracking-wider text-hnd-steel uppercase">
                {product.tagline}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                {product.name}
              </h2>
              <p className="mt-4 text-sm text-hnd-gray-500">
                {product.colors.length} color options available
              </p>
              <Button
                href={`/products/${product.category}/${product.slug}`}
                className="mt-6 w-full"
              >
                View & Customize
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
