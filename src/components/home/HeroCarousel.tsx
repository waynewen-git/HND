"use client";

import { useCallback, useEffect, useState } from "react";
import AppImage from "@/components/ui/AppImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/types";
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

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="w-full pt-20 md:pt-24" aria-label="Featured products">
      {/* Full-bleed image stage — edge to edge, scales with viewport */}
      <div className="relative w-full overflow-hidden bg-hnd-white dark:bg-hnd-black">
        <div className="relative w-full overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`w-full overflow-hidden transition-opacity duration-700 ${
                i === current
                  ? "relative opacity-100"
                  : "pointer-events-none absolute inset-0 opacity-0"
              }`}
              aria-hidden={i !== current}
            >
              {/* Crop ~20% height (10% top + 10% bottom), keep full width */}
              <div className="-my-[10%] w-full">
                <AppImage
                  src={s.image}
                  alt={s.title}
                  width={2400}
                  height={1200}
                  priority={i === 0}
                  unoptimized
                  className="h-auto w-full object-contain object-center"
                  sizes="100vw"
                />
              </div>
            </div>
          ))}

          <button
            onClick={prev}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2.5 text-white backdrop-blur-md transition-all hover:bg-black/50 md:left-8"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2.5 text-white backdrop-blur-md transition-all hover:bg-black/50 md:right-8"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-4 bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copy below — Tesla rhythm, centered with padding */}
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
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href={slide.ctaHref} size="lg">
            {slide.cta}
          </Button>
          <Button href="/shop" variant="outline" size="lg">
            Shop All
          </Button>
        </div>
      </div>
    </section>
  );
}
