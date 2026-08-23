import { notFound } from "next/navigation";
import ProductDetail from "@/components/products/ProductDetail";
import { getProductBySlug, getProductsByCategory } from "@/data/products";

interface ProductDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const all = [
    ...getProductsByCategory("guitars"),
    ...getProductsByCategory("amps"),
    ...getProductsByCategory("speakers"),
    ...getProductsByCategory("lifestyle"),
  ];
  return all.map((p) => ({ category: p.category, slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.category !== category) notFound();

  return (
    <div className="pt-12 md:pt-14">
      <ProductDetail product={product} />
    </div>
  );
}
