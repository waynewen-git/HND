import type { ProductCategory } from "@/types";
import type { MessageKey } from "@/i18n/dictionaries";

export function navUtilityLinks(category: ProductCategory): {
  href: string;
  labelKey: MessageKey;
}[] {
  const links: { href: string; labelKey: MessageKey }[] = [
    { href: "/offers", labelKey: "nav.offers" },
  ];

  if (category !== "lifestyle") {
    links.push(
      { href: `/compare?category=${category}`, labelKey: "nav.compare" },
      { href: `/choose?category=${category}`, labelKey: "nav.choose" },
    );
  }

  if (category === "guitars") {
    links.push({ href: "/configure", labelKey: "nav.custom" });
  }
  return links;
}
