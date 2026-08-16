"use client";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import { useNavMenu } from "@/components/providers/NavMenuProvider";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface CategoryChapterProps {
  /** Large background index e.g. "01" — omit on intro slide */
  index?: string;
  /** Small red label e.g. GUITARS */
  label: string;
  /** Large white title — split by space onto stacked lines */
  title: string;
  /** Gray tagline */
  tagline: string;
  image: string;
  href: string;
  cta: string;
  /** Product image scale factor (1 = default, 2 = 2×) — desktop only */
  imageScale?: number;
  className?: string;
}

const NAV_MENU_LABELS = new Set(["Guitars", "Amps", "Speakers", "Lifestyle"]);

export default function CategoryChapter({
  index,
  label,
  title,
  tagline,
  image,
  href,
  cta,
  imageScale = 1,
  className,
}: CategoryChapterProps) {
  const titleLines = title.trim().split(/\s+/);
  const scaled = imageScale !== 1;
  const { openCategoryMenu, scheduleCloseMenu } = useNavMenu();
  const opensNavMenu = NAV_MENU_LABELS.has(label);

  return (
    <section
      className={cn(
        "relative bg-hnd-white py-0 text-hnd-black dark:bg-hnd-black dark:text-hnd-white",
        scaled ? "overflow-x-clip overflow-y-visible lg:overflow-visible" : "overflow-hidden",
        className,
      )}
    >
      <div className="section-padding container-max relative z-10 grid grid-cols-1 items-center gap-5 md:gap-6 lg:grid-cols-12 lg:gap-4">
        {/* Copy — stacks above image on mobile */}
        <div className="relative z-20 flex min-w-0 items-start gap-2 sm:gap-3 lg:col-span-5 lg:items-center">
          {index ? (
            <span
              aria-hidden
              className="font-bebas pointer-events-none hidden shrink-0 origin-center scale-x-[0.88] scale-y-[1.55] select-none text-[clamp(8rem,22vw,13.5rem)] leading-none tracking-tighter text-hnd-black/[0.06] lg:inline dark:text-hnd-white/[0.08]"
            >
              {index}
            </span>
          ) : null}

          <div className={cn("relative z-20 min-w-0", index && "lg:-ml-2")}>
            <div className="flex items-baseline gap-2">
              {index ? (
                <span className="font-bebas text-2xl leading-none text-hnd-red lg:hidden">
                  {index}
                </span>
              ) : null}
              <p className="font-ui text-[10px] font-semibold tracking-[0.22em] text-hnd-red uppercase md:text-[11px]">
                {label}
              </p>
            </div>

            <h2 className="mt-1 font-bebas text-[clamp(1.85rem,7vw,3.35rem)] leading-[0.88] text-hnd-black dark:text-hnd-white">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-2.5 font-ui text-[11px] tracking-[0.16em] text-hnd-gray-500 uppercase md:mt-4 md:text-xs">
              {tagline}
            </p>

            <div className="relative z-30 mt-3 md:mt-4">
              {opensNavMenu ? (
                <>
                  <Button
                    type="button"
                    variant="text"
                    size="sm"
                    className="relative z-30 hidden md:inline-flex"
                    onMouseEnter={() => openCategoryMenu(label)}
                    onMouseLeave={scheduleCloseMenu}
                    onFocus={() => openCategoryMenu(label)}
                    onClick={() => openCategoryMenu(label)}
                    aria-haspopup="true"
                  >
                    {cta}
                  </Button>
                  <Button
                    href={href}
                    variant="text"
                    size="sm"
                    className="md:hidden"
                  >
                    {cta}
                  </Button>
                </>
              ) : (
                <Button href={href} variant="text" size="sm">
                  {cta}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Product — below copy on mobile, no oversized scale until lg */}
        <div className="relative z-0 w-full lg:col-span-7">
          <div
            className={cn(
              "pointer-events-none relative mx-auto w-full overflow-hidden lg:ml-auto lg:overflow-visible",
              "aspect-[4/3] max-h-[42vw] min-h-[140px] sm:max-h-[280px] md:aspect-[16/9] md:max-h-none",
              scaled
                ? "max-w-md md:max-w-2xl md:min-h-[240px] lg:max-w-3xl lg:min-h-[300px]"
                : "max-w-md md:max-w-2xl lg:max-w-3xl",
            )}
            style={
              {
                "--product-scale": String(imageScale),
              } as CSSProperties
            }
          >
            <AppImage
              src={image}
              alt={title}
              fill
              unoptimized
              className="origin-center object-contain object-center transition-transform duration-700 hover:brightness-110 max-lg:scale-100 lg:scale-[var(--product-scale)]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
