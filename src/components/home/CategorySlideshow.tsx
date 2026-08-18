"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { withBasePath } from "@/lib/assetPath";
import type { CategorySlide } from "@/types/categorySlide";

const AUTO_MS = 5000;

interface CategorySlideshowProps {
  slides: CategorySlide[];
}

export default function CategorySlideshow({ slides }: CategorySlideshowProps) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [current, slides.length]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full max-w-[100vw] overflow-x-clip bg-hnd-white pt-12 text-hnd-black md:pt-14 dark:bg-transparent dark:text-hnd-white"
      aria-label="Product showcase"
      aria-roledescription="carousel"
    >
      {/* Fixed 500px on desktop; width-only crop via object-cover */}
      <div className="relative h-[min(42svh,500px)] w-full overflow-hidden md:h-[500px]">
        <div
          key={slide.id}
          className="absolute inset-0 bg-hnd-white dark:bg-transparent"
        >
          <img
            src={withBasePath(slide.image)}
            alt={slide.title || "HND"}
            className="h-full w-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
          />
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute top-1/2 left-1 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-hnd-black/50 transition-colors hover:text-hnd-red md:left-[max(8px,1.5%)] md:h-11 md:w-11 dark:text-hnd-white/70"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 right-1 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-hnd-black/50 transition-colors hover:text-hnd-red md:right-[max(8px,1.5%)] md:h-11 md:w-11 dark:text-hnd-white/70"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2 md:bottom-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className={`h-px transition-all duration-300 ${
                i === current
                  ? "w-8 bg-hnd-red"
                  : "w-4 bg-hnd-black/25 dark:bg-hnd-white/30"
              }`}
              aria-label={`Go to ${s.label}`}
              aria-current={i === current ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
