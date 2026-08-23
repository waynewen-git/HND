"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/products";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  const { t, lfaqs } = useI18n();
  const localizedFaqs = lfaqs(faqs);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">{t("support.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          {t("support.intro")}
        </p>
      </section>

      <section className="section-padding container-max pb-24">
        <div className="mx-auto max-w-3xl divide-y divide-hnd-gray-300/20 dark:divide-hnd-gray-700/50">
          {localizedFaqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 font-bebas text-lg">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-300",
                    openIndex === i && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === i ? "max-h-96 pb-6" : "max-h-0",
                )}
              >
                <p className="leading-relaxed text-hnd-gray-500">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
