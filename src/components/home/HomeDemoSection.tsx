"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import CategoryDemoVideo from "@/components/home/CategoryDemoVideo";

const demos = [
  {
    src: "/videos/products/hero-hnd-g01-demo.mp4",
    name: "Alex Rowe",
    role: "Rhythm Guitarist · Iron Circuit",
    instrument: "Electric Guitar",
    model: "HND-G01",
    tagline: "Classic Single-Cut",
    href: "/products/guitars/hnd-g01",
    quote:
      "Warm mahogany punch that still cuts through a dense mix. Built for the riff that holds the whole set together.",
  },
  {
    src: "/videos/products/hero-hnd-g02-demo.mp4",
    name: "Rin Vale",
    role: "Lead Guitarist · Static Room",
    instrument: "Electric Guitar",
    model: "HND-G02",
    tagline: "Modern Double-Cut",
    href: "/products/guitars/hnd-g02",
    quote:
      "Fast neck, tight attack, and enough clarity to stay articulate when the gain goes all the way up.",
  },
  {
    src: "/videos/products/hero-hnd-g03-demo.mp4",
    name: "Kai Mercer",
    role: "Lead Guitarist · Night Circuit",
    instrument: "Electric Guitar",
    model: "HND-G03",
    tagline: "Superstrat Pro",
    href: "/products/guitars/hnd-g03",
    quote:
      "Tight low end, cutting mids, and zero fluff on stage. This is the guitar that keeps up when the room gets loud.",
  },
  {
    src: "/videos/products/hero-Testing-Demo-1.mp4",
    name: "HND Live",
    role: "Stage Session",
    instrument: "Electric Guitar",
    model: "HND Stage",
    tagline: "Crafted for Heavy Rock",
    href: "/products/guitars",
    quote:
      "From the first note, the room tightens up. Built for the stage, tuned for the kind of rock that doesn’t sit still.",
  },
];

export default function HomeDemoSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    if (!cards.length) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 4) {
      setIndex(0);
      return;
    }
    if (el.scrollLeft <= 8) {
      setIndex(0);
      return;
    }
    if (el.scrollLeft >= maxScroll - 8) {
      setIndex(cards.length - 1);
      return;
    }

    const view = el.getBoundingClientRect();
    let nearest = 0;
    let bestVisible = -1;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const visible = Math.min(r.right, view.right) - Math.max(r.left, view.left);
      if (visible > bestVisible) {
        bestVisible = visible;
        nearest = i;
      }
    });
    setIndex(nearest);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      ro.disconnect();
    };
  }, [sync]);

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;

    setIndex(i);

    const last = el.children.length - 1;
    if (i <= 0) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (i >= last) {
      el.scrollTo({
        left: el.scrollWidth - el.clientWidth,
        behavior: "smooth",
      });
      return;
    }

    const elRect = el.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta =
      cardRect.left + cardRect.width / 2 - (elRect.left + elRect.width / 2);
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  }, []);

  const prev = () => goTo(Math.max(0, index - 1));
  const next = () => goTo(Math.min(demos.length - 1, index + 1));

  return (
    <section className="relative w-full max-w-[100vw] overflow-x-clip bg-hnd-white py-8 md:py-12 dark:bg-transparent">
      <div className="section-padding text-center">
        <h2 className="font-rock text-[clamp(1.35rem,3vw,2.15rem)] leading-tight text-hnd-black dark:text-hnd-white">
          Crafted for Heavy <span className="text-hnd-red">Rock</span>
          {" - "}
          Built for the <span className="text-hnd-red">Stage</span>.
        </h2>
      </div>

      <div className="relative mt-8 w-full md:mt-10">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:gap-5 sm:px-6 md:gap-6 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {demos.map((demo, i) => (
            <article
              key={demo.model}
              className={`w-[calc(100%-2.75rem)] max-w-[36rem] shrink-0 sm:w-[calc(100%-5rem)] md:w-[calc(100%-6.5rem)] ${
                i === 0
                  ? "snap-start"
                  : i === demos.length - 1
                    ? "snap-end"
                    : "snap-center"
              }`}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-hnd-gray-950">
                <CategoryDemoVideo src={demo.src} title={demo.model} />
              </div>

              <div className="mt-4 px-1">
                <p className="font-ui text-[10px] font-semibold tracking-[0.22em] text-hnd-red uppercase md:text-[11px]">
                  On Stage
                </p>
                <h3 className="mt-2 font-bebas text-[clamp(1.5rem,2.4vw,2rem)] leading-[0.92] text-hnd-black dark:text-hnd-white">
                  {demo.name}
                </h3>
                <p className="mt-1.5 font-ui text-[11px] tracking-[0.14em] text-hnd-gray-500 uppercase md:text-xs">
                  {demo.role}
                </p>

                <div className="mt-3 border-t border-hnd-gray-300/50 pt-3 dark:border-hnd-gray-700/50">
                  <p className="font-ui text-[10px] tracking-[0.2em] text-hnd-gray-500 uppercase">
                    Instrument
                  </p>
                  <p className="mt-1 font-ui text-sm tracking-[0.08em] text-hnd-black dark:text-hnd-white">
                    {demo.instrument}
                  </p>
                  <p className="mt-0.5 font-bebas text-xl tracking-wide text-hnd-red md:text-[1.35rem]">
                    {demo.model}
                  </p>
                  <p className="mt-0.5 font-ui text-[11px] tracking-[0.12em] text-hnd-gray-500 uppercase">
                    {demo.tagline}
                  </p>
                </div>

                <blockquote className="mt-3 border-l-2 border-hnd-red pl-3">
                  <p className="font-ui text-[13px] leading-relaxed tracking-wide text-hnd-gray-700 dark:text-hnd-gray-300">
                    “{demo.quote}”
                  </p>
                </blockquote>

                <Link
                  href={demo.href}
                  className="group/cta mt-4 inline-flex items-center gap-2 font-ui text-xs tracking-[0.18em] text-hnd-black uppercase transition-colors hover:text-hnd-red dark:text-hnd-white dark:hover:text-hnd-red"
                >
                  Explore
                  <span className="text-hnd-red transition-transform group-hover/cta:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="absolute top-[10rem] left-1 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 disabled:opacity-0 sm:left-3 sm:h-11 sm:w-11"
          aria-label="Previous demo"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={index === demos.length - 1}
          className="absolute top-[10rem] right-1 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 disabled:opacity-0 sm:right-3 sm:h-11 sm:w-11"
          aria-label="Next demo"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <div className="mt-5 flex justify-center gap-3 md:mt-6">
          {demos.map((demo, i) => (
            <button
              key={demo.model}
              type="button"
              onClick={() => goTo(i)}
              className={`h-3.5 w-3.5 rounded-full border-2 transition-all duration-200 ${
                i === index
                  ? "scale-110 border-hnd-red bg-hnd-red"
                  : "border-hnd-red/80 bg-white hover:border-hnd-red hover:bg-hnd-red/25 dark:border-white dark:bg-transparent dark:hover:border-hnd-red dark:hover:bg-hnd-red/40"
              }`}
              aria-label={`Go to ${demo.model}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
