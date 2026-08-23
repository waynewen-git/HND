"use client";

import PaintSphereButton from "@/components/ui/PaintSphereButton";
import { COLOR_HEX, type ProductColor } from "@/types";
import { useI18n } from "@/i18n/useI18n";

interface ColorSwatchProps {
  colors: ProductColor[];
  selected: ProductColor;
  onSelect: (color: ProductColor) => void;
  size?: "sm" | "md";
}

/** Tesla-style 3D paint spheres — product detail & cart color pickers. */
export default function ColorSwatch({
  colors,
  selected,
  onSelect,
  size = "md",
}: ColorSwatchProps) {
  const { t, lcolor } = useI18n();

  return (
    <div
      className="flex flex-wrap items-center gap-3 sm:gap-3.5"
      role="radiogroup"
      aria-label={t("product.color")}
    >
      {colors.map((color) => (
        <PaintSphereButton
          key={color}
          selected={selected === color}
          label={lcolor(color)}
          swatch={COLOR_HEX[color]}
          onSelect={() => onSelect(color)}
          size={size}
        />
      ))}
    </div>
  );
}
