"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryChapter from "@/components/home/CategoryChapter";
import { withBasePath } from "@/lib/assetPath";
import type { CategorySlide } from "@/types/categorySlide";

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

  const slide = slides[current];
  const isIntro = !slide.index;
  const isHndIntro = isIntro && slide.image === "/images/hnd-0.png";

  return (
    <section
      className="relative w-full max-w-[100vw] overflow-x-clip bg-hnd-white pt-16 text-hnd-black md:pt-20 dark:bg-hnd-black dark:text-hnd-white"
      aria-label="Product categories"
      aria-roledescription="carousel"
    >
      {/* Shared slide frame — sized to 01–04 content, tighter to nav + video */}
      <div className="relative h-[32vh] overflow-visible md:h-[36vh] lg:h-[40vh]">
        {isIntro ? (
          <div
            key={slide.id}
            className="absolute inset-0 flex items-center justify-center bg-hnd-white dark:bg-hnd-black"
          >
            {isHndIntro ? (
              <>
                <img
                  src={withBasePath("/images/hnd-0-light.png")}
                  alt={slide.title || "HND"}
                  className="h-full w-full object-contain object-center dark:hidden"
                  decoding="async"
                  fetchPriority="high"
                />
                <img
                  src={withBasePath("/images/hnd-0.png")}
                  alt=""
                  aria-hidden
                  className="hidden h-full w-full object-contain object-center dark:block"
                  decoding="async"
                  fetchPriority="high"
                />
              </>
            ) : (
              <img
                src={withBasePath(slide.image)}
                alt={slide.title || "HND"}
                className="h-full w-full object-contain object-center"
                decoding="async"
                fetchPriority="high"
              />
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center">
            <CategoryChapter
              key={slide.id}
              index={slide.index}
              label={slide.label}
              title={slide.title}
              tagline={slide.tagline}
              image={slide.image}
              href={slide.href}
              cta={slide.cta}
              imageScale={slide.imageScale ?? 1}
              className="w-full"
            />
          </div>
        )}

        <button
          type="button"
          onClick={prev}
          className="absolute top-1/2 left-[max(8px,1.5%)] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-hnd-black/50 transition-colors hover:text-hnd-red md:h-11 md:w-11 dark:text-hnd-white/70"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 right-[max(8px,1.5%)] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-hnd-black/50 transition-colors hover:text-hnd-red md:h-11 md:w-11 dark:text-hnd-white/70"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <div className="absolute bottom-1.5 left-1/2 z-30 flex -translate-x-1/2 gap-2">
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
