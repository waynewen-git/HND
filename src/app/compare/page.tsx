"use client";

import { Suspense } from "react";
import CompareTools from "@/components/tools/CompareTools";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function ComparePage() {
  const { t } = useLocale();

  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">{t("compare.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          {t("compare.intro")}
        </p>
        <Suspense fallback={null}>
          <CompareTools />
        </Suspense>
      </section>
    </div>
  );
}
