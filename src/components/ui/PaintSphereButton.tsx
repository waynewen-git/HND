"use client";

import { cn } from "@/lib/utils";

function sphereShadow(selected: boolean) {
  if (selected) {
    return "0 4px 14px rgba(0,0,0,0.28), inset -4px -5px 10px rgba(0,0,0,0.38), inset 3px 3px 8px rgba(255,255,255,0.28)";
  }
  return "0 2px 8px rgba(0,0,0,0.18), inset -3px -4px 8px rgba(0,0,0,0.32), inset 2px 2px 6px rgba(255,255,255,0.22)";
}

interface PaintSphereButtonProps {
  selected: boolean;
  label: string;
  swatch: string;
  onSelect: () => void;
  size?: "sm" | "md";
}

/** Tesla-style 3D paint sphere — shared by product detail & guitar configurator. */
export default function PaintSphereButton({
  selected,
  label,
  swatch,
  onSelect,
  size = "md",
}: PaintSphereButtonProps) {
  const sizeClass =
    size === "sm"
      ? "h-8 w-8 sm:h-9 sm:w-9"
      : "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11";

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      title={label}
      onClick={onSelect}
      className={cn(
        "group relative mx-auto flex shrink-0 items-center justify-center sm:mx-0",
        sizeClass,
        "transition-transform duration-200",
        selected ? "scale-110" : "hover:scale-105",
      )}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full border transition-all duration-200",
          selected
            ? "border-hnd-black ring-2 ring-hnd-black ring-offset-2 ring-offset-hnd-white dark:border-hnd-white dark:ring-hnd-white dark:ring-offset-hnd-black"
            : "border-black/15 group-hover:border-black/30 dark:border-white/20 dark:group-hover:border-white/40",
        )}
      />
      <span
        aria-hidden
        className="absolute inset-[3px] rounded-full"
        style={{
          background: swatch,
          boxShadow: sphereShadow(selected),
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
}
