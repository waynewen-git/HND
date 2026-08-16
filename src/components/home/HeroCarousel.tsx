"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/types";
import { withBasePath } from "@/lib/assetPath";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
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

  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-36" aria-label="Featured products">
      <div className="relative w-full max-w-full">
        {/* Only mount current slide in-flow so nothing can cover the controls */}
        <img
          key={slide.id}
          src={withBasePath(slide.image)}
          alt={slide.title}
          className="block h-auto w-full max-w-full"
          decoding="async"
          fetchPriority="high"
        />

        {/* Preload neighbors off-screen */}
        <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
          {slides.map((s) =>
            s.id === slide.id ? null : (
              <img key={s.id} src={withBasePath(s.image)} alt="" />
            ),
          )}
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-hnd-red text-white shadow-lg transition-transform hover:scale-105"
          style={{ left: "max(12px, 4%)" }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-hnd-red text-white shadow-lg transition-transform hover:scale-105"
          style={{ left: "auto", right: "max(12px, 4%)" }}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
        </button>

        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 sm:bottom-5 md:bottom-6">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-white" : "w-4 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        id="home-content"
        className="section-padding container-max mx-auto py-8 text-center md:py-10"
      >
        <h1 className="font-body text-2xl font-medium tracking-wide text-hnd-black md:text-3xl lg:text-4xl dark:text-hnd-white">
          {slide.title}
        </h1>
        <p className="mt-3 font-body text-sm tracking-wide text-hnd-gray-500 md:text-base">
          {slide.subtitle}
        </p>
      </div>
    </section>
  );
}
