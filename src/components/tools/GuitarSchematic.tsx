"use client";

import GuitarPreview from "@/components/tools/GuitarPreview";
import { type GuitarSelections } from "@/data/guitarCustom";
import { cn } from "@/lib/utils";

interface GuitarSchematicProps {
  selections: GuitarSelections;
  className?: string;
}

export default function GuitarSchematic({
  selections,
  className,
}: GuitarSchematicProps) {
  return (
    <GuitarPreview
      bodyValue={selections.body}
      colorId={selections.color}
      neckId={selections.neck}
      className={cn("aspect-[880/1640]", className)}
    />
  );
}
