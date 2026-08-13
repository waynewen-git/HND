"use client";

import { COLOR_HEX, COLOR_LABELS, type ProductColor } from "@/types";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  colors: ProductColor[];
  selected: ProductColor;
  onSelect: (color: ProductColor) => void;
  size?: "sm" | "md";
}

export default function ColorSwatch({
  colors,
  selected,
  onSelect,
  size = "md",
}: ColorSwatchProps) {
  const sizeClass = size === "sm" ? "h-6 w-6" : "h-8 w-8";

  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Color">
      {colors.map((color) => (
        <button
          key={color}
          role="radio"
          aria-checked={selected === color}
          aria-label={COLOR_LABELS[color]}
          onClick={() => onSelect(color)}
          className={cn(
            sizeClass,
            "rounded-full border-2 transition-all duration-200",
            selected === color
              ? "border-hnd-red ring-2 ring-hnd-red/30 scale-110"
              : "border-hnd-gray-300 dark:border-hnd-gray-700 hover:scale-105",
            color === "white" && "shadow-inner",
          )}
          style={{ backgroundColor: COLOR_HEX[color] }}
        />
      ))}
    </div>
  );
}
