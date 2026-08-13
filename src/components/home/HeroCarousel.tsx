"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
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
      <div className="relative w-full overflow-hidden bg-hnd-black">
        <div className="relative h-[clamp(280px,55vh,620px)] w-full">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== current}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={i === 0}
                unoptimized
                className="object-contain object-center"
                sizes="100vw"
              />
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
        className="section-padding container-max mx-auto py-12 text-center md:py-16"
      >
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          {slide.title}
        </h1>
        <p className="mt-4 text-base text-hnd-gray-500 md:text-lg">
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
