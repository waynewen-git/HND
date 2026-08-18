"use client";

import { COLOR_HEX, COLOR_LABELS, type ProductColor } from "@/types";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  colors: ProductColor[];
  selected: ProductColor;
  onSelect: (color: ProductColor) => void;
  size?: "sm" | "md";
}

/** Tesla-style color balls — shared by product detail & list reference. */
export default function ColorSwatch({
  colors,
  selected,
  onSelect,
  size = "md",
}: ColorSwatchProps) {
  const sizeClass = size === "sm" ? "h-7 w-7" : "h-9 w-9 md:h-10 md:w-10";

  return (
    <div
      className="flex flex-wrap items-center gap-3"
      role="radiogroup"
      aria-label="Color"
    >
      {colors.map((color) => {
        const on = selected === color;
        return (
          <button
            key={color}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={COLOR_LABELS[color]}
            title={COLOR_LABELS[color]}
            onClick={() => onSelect(color)}
            className={cn(
              sizeClass,
              "shrink-0 rounded-full border transition-all duration-200",
              on
                ? "scale-110 border-hnd-black ring-2 ring-hnd-black ring-offset-2 ring-offset-hnd-white dark:ring-offset-hnd-black"
                : "border-black/10 hover:scale-105 hover:border-black/25",
              color === "white" &&
                !on &&
                "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
            )}
            style={{ backgroundColor: COLOR_HEX[color] }}
          />
        );
      })}
    </div>
  );
}
