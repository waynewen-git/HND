"use client";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import { useNavMenu } from "@/components/providers/NavMenuProvider";
import { cn } from "@/lib/utils";

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
  /** Product image scale factor (1 = default, 2 = 2×) */
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
        scaled ? "overflow-visible" : "overflow-hidden",
        className,
      )}
    >
      <div className="section-padding container-max relative z-10 grid items-center gap-3 lg:grid-cols-12 lg:gap-3">
        {/* Left: optional index + copy */}
        <div className="relative z-20 flex items-center gap-1 sm:gap-2 md:gap-3 lg:col-span-5">
          {index ? (
            <span
              aria-hidden
              className="font-bebas pointer-events-none -my-8 shrink-0 origin-center scale-x-[0.88] scale-y-[1.55] select-none text-[clamp(8rem,22vw,13.5rem)] leading-none tracking-tighter text-hnd-black/[0.06] dark:text-hnd-white/[0.08]"
            >
              {index}
            </span>
          ) : null}

          <div className={cn("relative z-20 min-w-0", index && "-ml-1 sm:-ml-2")}>
            <p className="font-ui text-[10px] font-semibold tracking-[0.22em] text-hnd-red uppercase md:text-[11px]">
              {label}
            </p>

            <h2 className="mt-0.5 font-bebas text-[clamp(2.1rem,4.5vw,3.35rem)] leading-[0.82] text-hnd-black dark:text-hnd-white">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-3.5 font-ui text-[11px] tracking-[0.16em] text-hnd-gray-500 uppercase md:mt-4 md:text-xs">
              {tagline}
            </p>

            <div className="relative z-30 mt-3.5 md:mt-4">
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

        {/* Right: product */}
        <div className="relative z-0 lg:col-span-7">
          <div
            className={cn(
              "pointer-events-none relative mx-auto aspect-[16/9] w-full lg:ml-auto",
              scaled
                ? "max-w-3xl min-h-[220px] md:min-h-[280px] lg:min-h-[320px]"
                : "max-w-2xl lg:max-w-3xl",
            )}
          >
            <AppImage
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-contain object-center transition-transform duration-700 hover:brightness-110"
              style={{ transform: `scale(${imageScale})` }}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
