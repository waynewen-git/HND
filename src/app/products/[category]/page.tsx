import CategoryPageContent from "@/components/products/CategoryPageContent";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: "guitars" },
    { category: "amps" },
    { category: "speakers" },
    { category: "lifestyle" },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  return <CategoryPageContent category={category} />;
}
