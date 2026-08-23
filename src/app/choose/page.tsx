"use client";

import { Suspense } from "react";
import ChooseGuide from "@/components/tools/ChooseGuide";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function ChoosePage() {
  const { t } = useLocale();

  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">{t("choose.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          {t("choose.intro")}
        </p>
        <Suspense fallback={null}>
          <ChooseGuide />
        </Suspense>
      </section>
    </div>
  );
}
