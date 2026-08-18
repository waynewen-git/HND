"use client";

import {
  guitarBodyColorOptions,
  type GuitarBodyColorId,
} from "@/data/guitarCustom";
import { cn } from "@/lib/utils";

interface GuitarColorSwatchProps {
  selected: GuitarBodyColorId;
  onSelect: (color: GuitarBodyColorId) => void;
}

function sphereShadow(selected: boolean) {
  if (selected) {
    return "0 4px 14px rgba(0,0,0,0.28), inset -4px -5px 10px rgba(0,0,0,0.38), inset 3px 3px 8px rgba(255,255,255,0.28)";
  }
  return "0 2px 8px rgba(0,0,0,0.18), inset -3px -4px 8px rgba(0,0,0,0.32), inset 2px 2px 6px rgba(255,255,255,0.22)";
}

/** Tesla-style 3D paint spheres. */
export default function GuitarColorSwatch({
  selected,
  onSelect,
}: GuitarColorSwatchProps) {
  return (
    <div
      className="grid grid-cols-6 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5"
      role="radiogroup"
      aria-label="Body color"
    >
      {guitarBodyColorOptions.map((option) => {
        const on = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={option.label}
            title={option.label}
            onClick={() => onSelect(option.id)}
            className={cn(
              "group relative mx-auto flex h-9 w-9 shrink-0 items-center justify-center sm:mx-0 sm:h-10 sm:w-10 md:h-11 md:w-11",
              "transition-transform duration-200",
              on ? "scale-110" : "hover:scale-105",
            )}
          >
            <span
              className={cn(
                "absolute inset-0 rounded-full border transition-all duration-200",
                on
                  ? "border-hnd-black ring-2 ring-hnd-black ring-offset-2 ring-offset-hnd-white dark:border-hnd-white dark:ring-hnd-white dark:ring-offset-hnd-black"
                  : "border-black/15 group-hover:border-black/30 dark:border-white/20 dark:group-hover:border-white/40",
              )}
            />
            <span
              aria-hidden
              className="absolute inset-[3px] rounded-full"
              style={{
                background: option.swatch,
                boxShadow: sphereShadow(on),
              }}
            />
            <span
              aria-hidden
              className="absolute top-[18%] left-[22%] h-[26%] w-[26%] rounded-full bg-white/50 blur-[0.5px]"
            />
            <span
              aria-hidden
              className="absolute right-[20%] bottom-[22%] h-[12%] w-[12%] rounded-full bg-black/20 blur-[1px]"
            />
          </button>
        );
      })}
    </div>
  );
}
