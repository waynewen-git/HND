import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hndmusic.com";

  const productUrls = products.map((p) => ({
    url: `${base}/products/${p.category}/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/products`, lastModified: new Date() },
    { url: `${base}/products/guitars`, lastModified: new Date() },
    { url: `${base}/products/amps`, lastModified: new Date() },
    { url: `${base}/products/speakers`, lastModified: new Date() },
    { url: `${base}/shop`, lastModified: new Date() },
    { url: `${base}/configure`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/support`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/stores`, lastModified: new Date() },
    { url: `${base}/news`, lastModified: new Date() },
    ...productUrls,
  ];
}
