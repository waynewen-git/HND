"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useNavMenu } from "@/components/providers/NavMenuProvider";
import Logo from "@/components/layout/Logo";
import NavCategoryDropdown from "@/components/layout/NavCategoryDropdown";
import { cn } from "@/lib/utils";
import { getProductsByCategory } from "@/data/products";
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

  if (item.label === "Amps") return "/images/hero-amps-1.png";
  if (item.label === "Speakers") return "/images/hero-speaker-0.png";
  if (item.label === "Lifestyle") return "/images/hero-live-0.png";
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
              <span className="mt-2 font-ui text-sm tracking-[0.1em] text-hnd-black uppercase dark:text-hnd-white">
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
    "group relative font-ui px-3 py-2 text-xs tracking-[0.16em] uppercase transition-colors duration-300 lg:text-[13px]",
    isOpen || active
      ? "text-hnd-red"
      : "text-hnd-gray-500 hover:text-hnd-black dark:hover:text-hnd-white",
  );

  return (
    <li onMouseEnter={() => setOpenMenu(item.label)}>
      <button type="button" className={labelClass} aria-expanded={isOpen}>
        {item.label}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-3 h-px bg-hnd-red transition-all duration-300",
            isOpen || active ? "w-[calc(100%-1.5rem)]" : "w-0 group-hover:w-[calc(100%-1.5rem)]",
          )}
        />
      </button>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { openMenu, setOpenMenu, keepMenuOpen, scheduleCloseMenu } =
    useNavMenu();
  const { theme, toggleTheme } = useTheme();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);

  const categoryNavItems = useMemo<NavItem[]>(
    () => [
      {
        label: "Guitars",
        href: "/products/guitars",
        matchPath: "/products/guitars",
        children: buildProductChildren("guitars"),
      },
      {
        label: "Amps",
        href: "/products/amps",
        matchPath: "/products/amps",
        children: buildProductChildren("amps"),
      },
      {
        label: "Speakers",
        href: "/products/speakers",
        matchPath: "/products/speakers",
        children: buildProductChildren("speakers"),
      },
      {
        label: "Lifestyle",
        href: "/products/lifestyle",
        matchPath: "/products/lifestyle",
        children: buildProductChildren("lifestyle"),
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
          "fixed top-0 right-0 left-0 z-50 overflow-visible transition-all duration-300",
          scrolled || openMenu
            ? "border-b border-hnd-gray-300/70 bg-hnd-white/90 backdrop-blur-md dark:border-hnd-gray-800/50 dark:bg-hnd-black/55"
            : "bg-hnd-white/70 backdrop-blur-sm dark:bg-hnd-black/30",
        )}
        onMouseEnter={keepMenuOpen}
        onMouseLeave={scheduleCloseMenu}
      >
        <nav
          className="section-padding container-max flex h-16 items-center gap-6 md:h-20 md:gap-8"
          aria-label="Main navigation"
        >
          <Logo size="md" />

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex lg:gap-3">
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

          <div className="ml-auto flex items-center gap-1 md:gap-2 lg:gap-3">
            <ul className="hidden items-center gap-1 md:flex lg:gap-2">
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "font-ui px-3 py-2 text-xs tracking-[0.16em] uppercase transition-colors duration-300 lg:text-[13px]",
                      pathname.startsWith(link.href)
                        ? "text-hnd-red"
                        : "text-hnd-gray-500 hover:text-hnd-black dark:hover:text-hnd-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleTheme}
              className="p-2 text-hnd-gray-500 transition-colors hover:text-hnd-black dark:hover:text-hnd-white"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Link
              href="/cart"
              className="relative p-2 text-hnd-gray-500 transition-colors hover:text-hnd-black dark:hover:text-hnd-white"
              aria-label={`Shopping cart${mounted && totalItems > 0 ? `, ${totalItems} items` : ""}`}
            >
              <ShoppingBag className="h-4 w-4" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-hnd-red text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-hnd-gray-500 transition-colors hover:text-hnd-black md:hidden dark:hover:text-hnd-white"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {activeItem && (
          <div className="hidden max-h-[min(82vh,820px)] overflow-y-auto border-t border-hnd-gray-300/60 bg-hnd-white md:block dark:border-hnd-gray-800/40 dark:bg-hnd-black/70 dark:backdrop-blur-md">
            <div className="section-padding container-max">
              <NavCategoryDropdown
                category={
                  activeItem.label === "Guitars"
                    ? "guitars"
                    : activeItem.label === "Amps"
                      ? "amps"
                      : activeItem.label === "Speakers"
                        ? "speakers"
                        : "lifestyle"
                }
                label={activeItem.label}
                href={activeItem.href}
              />
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-hnd-white px-5 pt-5 pb-10 md:hidden dark:bg-hnd-black">
          <button
            onClick={() => setMobileOpen(false)}
            className="mb-4 self-end p-1 text-hnd-gray-700 dark:text-hnd-gray-300"
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
                  className="border-b border-hnd-gray-300 pb-2 dark:border-hnd-gray-800"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded(expanded ? null : item.label)
                    }
                    className={cn(
                      "flex w-full items-center justify-between py-3 text-left font-ui text-lg tracking-[0.12em] uppercase",
                      active ? "text-hnd-red" : "text-hnd-gray-700 dark:text-hnd-gray-300",
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
                className="border-b border-hnd-gray-300 pb-2 dark:border-hnd-gray-800"
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-3 font-ui text-lg tracking-[0.12em] uppercase",
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
