import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { formatPrice, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

interface GuitarLineupProps {
  variant?: "nav" | "page";
  className?: string;
}

const navSideLinks = [
  { href: "/offers", label: "Current Offers" },
  { href: "/compare?category=guitars", label: "Compare" },
  { href: "/choose?category=guitars", label: "Help me Choose" },
  { href: "/configure", label: "Custom" },
];

export default function GuitarLineup({
  variant = "nav",
  className,
}: GuitarLineupProps) {
  const guitars = getProductsByCategory("guitars");
  const isNav = variant === "nav";

  if (isNav) {
    return (
      <div
        className={cn(
          "flex items-start gap-10 py-2 md:gap-14 md:py-3",
          className,
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="grid max-w-[1120px] grid-cols-3 gap-x-6 gap-y-3 md:gap-x-8">
            {guitars.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.category}/${product.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-[220px] w-full transition-transform duration-300 group-hover:scale-[1.03] md:h-[260px]">
                  <AppImage
                    src={product.navImage ?? product.images[0]}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain object-center"
                    sizes="360px"
                  />
                </div>
                <p className="mt-1 font-ui text-sm tracking-[0.12em] text-hnd-gray-700 uppercase transition-colors group-hover:text-hnd-black md:text-base dark:text-hnd-gray-300 dark:group-hover:text-hnd-white">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="hidden w-48 shrink-0 border-l border-hnd-gray-300 pl-8 md:block lg:w-56 lg:pl-10 dark:border-hnd-gray-800">
          <ul className="space-y-4">
            {navSideLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-ui text-xs tracking-[0.14em] text-hnd-gray-500 uppercase transition-colors hover:text-hnd-red"
                >
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    );
  }

  return (
    <div className={cn("py-16 md:py-24", className)}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {guitars.map((product, i) => (
          <Link
            key={product.id}
            href={`/products/${product.category}/${product.slug}`}
            className="group flex flex-col items-center text-center"
          >
            <div className="relative aspect-[4/3] min-h-[280px] w-full overflow-hidden bg-transparent transition-transform duration-300 group-hover:scale-[1.02] md:aspect-[16/10] md:min-h-[380px]">
              <AppImage
                src={product.navImage ?? product.images[0]}
                alt={product.name}
                fill
                unoptimized
                className="object-contain object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="mt-6 md:mt-8">
              <p className="label-condensed text-hnd-red">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-bebas text-2xl tracking-tight text-hnd-black md:text-3xl dark:text-hnd-white">
                {product.name}
              </p>
              <p className="mt-1 text-sm text-hnd-gray-500 md:text-base">
                {product.tagline}
              </p>
              <p className="mt-2 text-sm text-hnd-gray-700 md:text-base dark:text-hnd-gray-300">
                From {formatPrice(product.price)}
              </p>
              <div
                className="mt-4 flex justify-center gap-2.5"
                aria-label="Available colors"
              >
                {product.colors.map((color) => (
                  <span
                    key={color}
                    title={color}
                    className="h-4 w-4 rounded-full border border-black/10 md:h-[18px] md:w-[18px]"
                    style={{
                      backgroundColor:
                        color === "black"
                          ? "#141413"
                          : color === "white"
                            ? "#ececeb"
                            : color === "red"
                              ? "#c41e3a"
                              : "#9ecae8",
                    }}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
