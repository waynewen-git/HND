"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useTheme } from "@/components/providers/ThemeProvider";
import Logo from "@/components/layout/Logo";
import GuitarLineup from "@/components/products/GuitarLineup";
import { cn } from "@/lib/utils";
import { getProductsByCategory, liveNavItems } from "@/data/products";
import type { ProductCategory } from "@/types";

interface NavChild {
  href: string;
  label: string;
  description?: string;
  image?: string;
}

interface NavItem {
  label: string;
  href: string;
  matchPath?: string;
  children: NavChild[];
}

function buildProductChildren(category: ProductCategory): NavChild[] {
  const items = getProductsByCategory(category);
  return items.map((product) => ({
    href: `/products/${product.category}/${product.slug}`,
    label: product.name,
    description: product.tagline,
  }));
}

const utilityLinks = [
  { label: "Support", href: "/support" },
  { label: "Account", href: "/account" },
];

function isNavActive(pathname: string, item: NavItem) {
  const match = item.matchPath ?? item.href;
  if (pathname === match || pathname.startsWith(`${match}/`)) return true;
  return item.children.some(
    (child) =>
      pathname === child.href || pathname.startsWith(`${child.href}/`),
  );
}

function resolveNavChildImage(item: NavItem, child: NavChild): string {
  if (child.image) return child.image;

  const product = [
    ...getProductsByCategory("guitars"),
    ...getProductsByCategory("amps"),
    ...getProductsByCategory("speakers"),
  ].find((p) => p.name === child.label);

  if (product?.navImage) return product.navImage;
  if (product?.images[0]) return product.images[0];

  if (item.label === "AMP Header") return "/images/hero-amps-1.png";
  if (item.label === "Speaker") return "/images/hero-speaker-0.png";
  if (item.label === "Live") return "/images/hero-live-0.png";
  return "/images/hero-guitar-1.png";
}

function MobileNavProductList({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  return (
    <ul className="mb-4 grid grid-cols-2 gap-x-4 gap-y-5">
      {item.children.map((child) => {
        const image = resolveNavChildImage(item, child);
        return (
          <li key={`${item.label}-${child.label}`}>
            <Link
              href={child.href}
              onClick={onNavigate}
              className="flex flex-col items-center text-center transition-opacity hover:opacity-80"
            >
              <div className="relative aspect-square w-full">
                <AppImage
                  src={image}
                  alt={child.label}
                  fill
                  unoptimized
                  className="object-contain object-center"
                  sizes="40vw"
                />
              </div>
              <span className="mt-2 font-display text-sm font-semibold tracking-tight text-hnd-black dark:text-hnd-white">
                {child.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function NavMenuItem({
  item,
  pathname,
  openMenu,
  setOpenMenu,
}: {
  item: NavItem;
  pathname: string;
  openMenu: string | null;
  setOpenMenu: (label: string | null) => void;
}) {
  const active = isNavActive(pathname, item);
  const isOpen = openMenu === item.label;
  const labelClass = cn(
    "rounded-sm px-3 py-1.5 text-[13px] font-semibold tracking-wide uppercase transition-colors duration-200 lg:text-sm",
    isOpen
      ? "bg-hnd-gray-100 text-hnd-black dark:bg-hnd-gray-800 dark:text-hnd-white"
      : active
        ? "text-hnd-red"
        : "text-hnd-gray-700 hover:bg-hnd-gray-100 dark:text-hnd-gray-300 dark:hover:bg-hnd-gray-800",
  );

  return (
    <li onMouseEnter={() => setOpenMenu(item.label)}>
      <button type="button" className={labelClass} aria-expanded={isOpen}>
        {item.label}
      </button>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);

  const categoryNavItems = useMemo<NavItem[]>(
    () => [
      {
        label: "Guitar",
        href: "/products/guitars",
        matchPath: "/products/guitars",
        children: buildProductChildren("guitars"),
      },
      {
        label: "AMP Header",
        href: "/products/amps",
        matchPath: "/products/amps",
        children: buildProductChildren("amps"),
      },
      {
        label: "Speaker",
        href: "/products/speakers",
        matchPath: "/products/speakers",
        children: buildProductChildren("speakers"),
      },
      {
        label: "Live",
        href: "/shop",
        matchPath: "/shop",
        children: liveNavItems.map((item) => ({
          href: item.href,
          label: item.label,
          image: item.image,
        })),
      },
    ],
    [],
  );

  const activeItem = categoryNavItems.find((item) => item.label === openMenu);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 overflow-visible transition-all duration-500",
          scrolled || openMenu
            ? "bg-hnd-white shadow-sm dark:bg-hnd-black"
            : "bg-hnd-white/60 backdrop-blur-md dark:bg-hnd-black/60",
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <nav
          className="section-padding container-max flex h-20 items-center gap-4 md:h-24 md:gap-6"
          aria-label="Main navigation"
        >
          <Logo size="md" />

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex lg:gap-2">
            {categoryNavItems.map((item) => (
              <NavMenuItem
                key={item.label}
                item={item}
                pathname={pathname}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 md:gap-3 lg:gap-4">
            <ul className="hidden items-center gap-1 md:flex lg:gap-2">
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-sm px-3 py-1.5 text-[13px] font-semibold tracking-wide uppercase transition-colors duration-200 lg:text-sm",
                      pathname.startsWith(link.href)
                        ? "text-hnd-red"
                        : "text-hnd-gray-700 hover:text-hnd-red dark:text-hnd-gray-300",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleTheme}
              className="rounded-full p-2 transition-colors hover:bg-hnd-gray-100 dark:hover:bg-hnd-gray-900"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <Link
              href="/cart"
              className="relative rounded-full p-2 transition-colors hover:bg-hnd-gray-100 dark:hover:bg-hnd-gray-900"
              aria-label={`Shopping cart${mounted && totalItems > 0 ? `, ${totalItems} items` : ""}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-hnd-red text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {activeItem && (
          <div className="hidden border-t border-hnd-gray-300/15 bg-hnd-white md:block dark:border-hnd-gray-700/40 dark:bg-hnd-black">
            <div className="section-padding container-max">
              {activeItem.label === "Guitar" ? (
                <GuitarLineup variant="nav" />
              ) : (
                <div className="flex items-start gap-10 py-1.5 md:gap-14 md:py-2">
                  <ul className="grid max-w-[1120px] flex-1 grid-cols-3 gap-x-6 gap-y-2 md:gap-x-8 md:gap-y-3">
                    {activeItem.children.map((child) => {
                      const product = [
                        ...getProductsByCategory("amps"),
                        ...getProductsByCategory("speakers"),
                      ].find((p) => p.name === child.label);

                      const fallbackImage =
                        activeItem.label === "AMP Header"
                          ? "/images/hero-amps-1.png"
                          : activeItem.label === "Speaker"
                            ? "/images/hero-speaker-0.png"
                            : activeItem.label === "Live"
                              ? "/images/hero-live-0.png"
                              : "/images/hero-speaker-0.png";

                      const image =
                        child.image ??
                        product?.navImage ??
                        product?.images[0] ??
                        fallbackImage;

                      return (
                        <li key={`${activeItem.label}-${child.label}`}>
                          <Link
                            href={child.href}
                            className="group flex flex-col items-center text-center"
                          >
                            <div className="relative h-[280px] w-full transition-transform duration-300 group-hover:scale-[1.04] md:h-[336px]">
                              <AppImage
                                src={image}
                                alt={child.label}
                                fill
                                unoptimized
                                className="object-contain object-center"
                                sizes="360px"
                              />
                            </div>
                            <span className="mt-1 font-display text-base font-semibold tracking-tight text-hnd-black md:text-lg dark:text-hnd-white">
                              {child.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <aside className="hidden w-48 shrink-0 border-l border-hnd-gray-300/30 pl-8 md:block dark:border-hnd-gray-700/50 lg:w-56 lg:pl-10">
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href={activeItem.href}
                          className="text-sm text-hnd-gray-700 transition-colors hover:text-hnd-black dark:text-hnd-gray-300 dark:hover:text-hnd-white"
                        >
                          View All
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop"
                          className="text-sm text-hnd-gray-700 transition-colors hover:text-hnd-black dark:text-hnd-gray-300 dark:hover:text-hnd-white"
                        >
                          Shop
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/support"
                          className="text-sm text-hnd-gray-700 transition-colors hover:text-hnd-black dark:text-hnd-gray-300 dark:hover:text-hnd-white"
                        >
                          Support
                        </Link>
                      </li>
                    </ul>
                  </aside>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-hnd-white px-5 pt-5 pb-10 dark:bg-hnd-gray-950 md:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="mb-4 self-end p-1"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          <ul className="flex flex-col gap-2">
            {categoryNavItems.map((item) => {
              const expanded = mobileExpanded === item.label;
              const active = isNavActive(pathname, item);
              return (
                <li
                  key={item.label}
                  className="border-b border-hnd-gray-300/20 pb-2 dark:border-hnd-gray-700/50"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded(expanded ? null : item.label)
                    }
                    className={cn(
                      "flex w-full items-center justify-between py-3 text-left text-lg tracking-wide uppercase",
                      active
                        ? "text-hnd-red"
                        : "text-hnd-gray-700 dark:text-hnd-gray-300",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                  {expanded && (
                    <MobileNavProductList
                      item={item}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  )}
                </li>
              );
            })}
            {utilityLinks.map((link) => (
              <li
                key={link.href}
                className="border-b border-hnd-gray-300/20 pb-2 dark:border-hnd-gray-700/50"
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-3 text-lg tracking-wide uppercase",
                    pathname.startsWith(link.href)
                      ? "text-hnd-red"
                      : "text-hnd-gray-700 dark:text-hnd-gray-300",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
