import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { formatPrice, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

interface GuitarLineupProps {
  variant?: "nav" | "page";
  className?: string;
}

const navSideLinks = [
  { href: "/products/guitars", label: "All Guitars" },
  { href: "/configure", label: "Configure" },
  { href: "/shop", label: "Shop" },
  { href: "/support", label: "Support" },
  { href: "/stores", label: "Experience Centers" },
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
          "flex items-start gap-10 py-1.5 md:gap-14 md:py-2",
          className,
        )}
      >
        {/* Left: compact 3-col product grid — Tesla style */}
        <div className="min-w-0 flex-1">
          <div className="grid max-w-[1120px] grid-cols-3 gap-x-6 gap-y-2 md:gap-x-8 md:gap-y-3">
            {guitars.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.category}/${product.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-[280px] w-full transition-transform duration-300 group-hover:scale-[1.04] md:h-[336px]">
                  <AppImage
                    src={product.navImage ?? product.images[0]}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain object-center"
                    sizes="360px"
                  />
                </div>
                <p className="mt-1 font-display text-base font-semibold tracking-tight text-hnd-black md:text-lg dark:text-hnd-white">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: reserved for links / other uses */}
        <aside className="hidden w-48 shrink-0 border-l border-hnd-gray-300/30 pl-8 md:block dark:border-hnd-gray-700/50 lg:w-56 lg:pl-10">
          <ul className="space-y-3">
            {navSideLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-hnd-gray-700 transition-colors hover:text-hnd-black dark:text-hnd-gray-300 dark:hover:text-hnd-white"
                >
                  {link.label}
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
        {guitars.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.category}/${product.slug}`}
            className="group flex flex-col items-center text-center"
          >
            <div className="relative aspect-[4/3] min-h-[280px] w-full transition-transform duration-300 group-hover:scale-[1.03] md:aspect-[16/10] md:min-h-[420px]">
              <AppImage
                src={product.navImage ?? product.images[0]}
                alt={product.name}
                fill
                unoptimized
                className="rounded-sm object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="mt-6 md:mt-8">
              <p className="font-display text-2xl font-semibold tracking-tight text-hnd-black md:text-3xl dark:text-hnd-white">
                {product.name}
              </p>
              <p className="mt-1 text-sm text-hnd-gray-500 md:text-base">
                {product.tagline}
              </p>
              <p className="mt-2 text-sm text-hnd-gray-500 md:text-base">
                From {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
