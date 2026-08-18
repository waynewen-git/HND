import type { ProductCategory } from "@/types";

export function navUtilityLinks(category: ProductCategory) {
  const links = [{ href: "/offers", label: "Current Offers" }];

  if (category !== "lifestyle") {
    links.push(
      { href: `/compare?category=${category}`, label: "Compare" },
      { href: `/choose?category=${category}`, label: "Help me Choose" },
    );
  }

  if (category === "guitars") {
    links.push({ href: "/configure", label: "Custom" });
  }
  return links;
}
