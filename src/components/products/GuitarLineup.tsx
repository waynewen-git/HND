import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

interface GuitarLineupProps {
  variant?: "nav" | "page";
  className?: string;
}

export default function GuitarLineup({
  variant = "nav",
  className,
}: GuitarLineupProps) {
  const guitars = getProductsByCategory("guitars");
  const isNav = variant === "nav";

  return (
    <div className={cn(isNav ? "py-5 md:py-6" : "py-16 md:py-24", className)}>
      <div
        className={cn(
          "grid",
          isNav
            ? "grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:gap-x-8 md:gap-y-6"
            : "grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {guitars.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.category}/${product.slug}`}
            className="group flex flex-col items-center text-center"
          >
            <div
              className={cn(
                "relative w-full transition-transform duration-300 group-hover:scale-[1.03]",
                isNav
                  ? "h-24 md:h-28 lg:h-32"
                  : "aspect-[4/3] min-h-[280px] md:aspect-[16/10] md:min-h-[420px]",
              )}
            >
              <Image
                src={product.navImage ?? product.images[0]}
                alt={product.name}
                fill
                unoptimized
                className={cn(
                  "object-center",
                  isNav ? "object-contain" : "object-cover rounded-sm",
                )}
                sizes={
                  isNav
                    ? "(max-width: 640px) 50vw, 33vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
            </div>
            <div className={cn(isNav ? "mt-2" : "mt-6 md:mt-8")}>
              <p
                className={cn(
                  "font-display font-semibold tracking-tight text-hnd-black dark:text-hnd-white",
                  isNav ? "text-sm md:text-base" : "text-2xl md:text-3xl",
                )}
              >
                {product.name}
              </p>
              {!isNav && (
                <>
                  <p className="mt-1 text-sm text-hnd-gray-500 md:text-base">
                    {product.tagline}
                  </p>
                  <p className="mt-2 text-sm text-hnd-gray-500 md:text-base">
                    From {formatPrice(product.price)}
                  </p>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
