"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/products";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-20">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-display text-4xl font-bold md:text-6xl">Support</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Find answers to common questions about HND products, shipping, warranty,
          and more.
        </p>
      </section>

      <section className="section-padding container-max pb-24">
        <div className="mx-auto max-w-3xl divide-y divide-hnd-gray-300/20 dark:divide-hnd-gray-700/50">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 font-display text-lg font-semibold">
                  {faq.question}
                </span>
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
                <p className="leading-relaxed text-hnd-gray-500">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
