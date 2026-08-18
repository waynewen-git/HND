import { Suspense } from "react";
import CompareTools from "@/components/tools/CompareTools";

export default function ComparePage() {
  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">Compare</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Put two or three models side by side. Specs, price, and a path to each
          product page.
        </p>
        <Suspense fallback={null}>
          <CompareTools />
        </Suspense>
      </section>
    </div>
  );
}
