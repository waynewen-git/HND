import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { categories } from "@/data/products";

export default function ProductsPage() {
  return (
    <div className="pt-28 md:pt-36">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-display text-4xl font-bold md:text-6xl">Products</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Explore our full range of electric guitars, professional amp heads, and
          premium Bluetooth speakers.
        </p>
      </section>

      <div className="space-y-2">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/products/${cat.slug}`}
            className="group relative block h-[60vh] min-h-[400px] overflow-hidden"
          >
            <AppImage
              src={cat.heroImage}
              alt={cat.name}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center section-padding">
              <div className="container-max">
                <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
                  {cat.name}
                </h2>
                <p className="mt-4 max-w-md text-lg text-white/70">
                  {cat.description}
                </p>
                <span className="mt-6 inline-block text-sm tracking-wider text-white uppercase underline-offset-4 transition-all group-hover:underline">
                  View Collection
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
