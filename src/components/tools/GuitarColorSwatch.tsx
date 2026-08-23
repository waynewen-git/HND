"use client";

import PaintSphereButton from "@/components/ui/PaintSphereButton";
import {
  guitarBodyColorOptions,
  type GuitarBodyColorId,
} from "@/data/guitarCustom";
import { useI18n } from "@/i18n/useI18n";

interface GuitarColorSwatchProps {
  selected: GuitarBodyColorId;
  onSelect: (color: GuitarBodyColorId) => void;
}

/** Tesla-style 3D paint spheres for the guitar configurator. */
export default function GuitarColorSwatch({
  selected,
  onSelect,
}: GuitarColorSwatchProps) {
  const { t, lguitarColor } = useI18n();

  return (
    <div
      className="grid grid-cols-6 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5"
      role="radiogroup"
      aria-label={t("configure.paint")}
    >
      {guitarBodyColorOptions.map((option) => (
        <PaintSphereButton
          key={option.id}
          selected={selected === option.id}
          label={lguitarColor(option.id)}
          swatch={option.swatch}
          onSelect={() => onSelect(option.id)}
        />
      ))}
    </div>
  );
}
