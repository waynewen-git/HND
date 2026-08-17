"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/types";
import { withBasePath } from "@/lib/assetPath";
import Button from "@/components/ui/Button";

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
  const indexLabel = String(current + 1).padStart(2, "0");

  return (
    <section
      className="relative w-full max-w-[100vw] bg-hnd-black pt-24 md:pt-28"
      aria-label="Featured products"
    >
      <div className="relative min-h-[70vh] w-full max-w-full md:min-h-[78vh] lg:min-h-[85vh]">
        <img
          key={slide.id}
          src={withBasePath(slide.image)}
          alt={slide.title}
          className="absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
        />

        <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
          {slides.map((s) =>
            s.id === slide.id ? null : (
              <img key={s.id} src={withBasePath(s.image)} alt="" />
            ),
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-hnd-black/90 via-hnd-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hnd-black via-transparent to-hnd-black/30" />

        <div className="absolute inset-0 z-20 section-padding container-max flex flex-col justify-end pb-16 md:pb-20 lg:pb-24">
          <div className="pointer-events-auto flex w-full flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h1 className="font-bebas text-5xl leading-[0.88] text-hnd-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem]">
                <span className="block">HND</span>
                <span className="block">{slide.title}</span>
              </h1>
              <p className="mt-4 label-condensed text-hnd-gray-300">
                {slide.subtitle}
              </p>
              <div className="mt-8">
                <Button href={slide.ctaHref} variant="text" size="md">
                  Explore
                </Button>
              </div>
            </div>

            <p className="font-ui text-xs tracking-[0.2em] text-hnd-gray-300 uppercase sm:pb-1 sm:text-right sm:text-sm">
              <span className="text-hnd-red">{indexLabel}</span>
              <span className="mx-2 text-hnd-gray-700">/</span>
              <span>2026 Collection</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute top-1/2 left-[max(12px,2%)] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-hnd-white/70 transition-colors hover:text-hnd-red md:h-11 md:w-11"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 right-[max(12px,2%)] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-hnd-white/70 transition-colors hover:text-hnd-red md:h-11 md:w-11"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`h-px transition-all duration-300 ${
                i === current ? "w-8 bg-hnd-red" : "w-4 bg-hnd-white/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
