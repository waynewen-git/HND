"use client";

import { useEffect, useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  /** Kept for call-site compatibility */
  variant?: "mark" | "full";
  className?: string;
  linked?: boolean;
  /** Cycle logo-0…logo-4 every 2s (nav) */
  slideshow?: boolean;
}

const LOGO_STATIC = "/logo/logo-0.png";
const LOGO_SLIDES = [
  "/logo/logo-0.png",
  "/logo/logo-1.png",
  "/logo/logo-2.png",
  "/logo/logo-3.png",
  "/logo/logo-4.png",
] as const;

const sizeMap = {
  sm: "h-[4.5rem] w-[4.5rem] md:h-[5.25rem] md:w-[5.25rem]",
  md: "h-24 w-24 md:h-[7.5rem] md:w-[7.5rem]",
  lg: "h-[7.5rem] w-[7.5rem] md:h-36 md:w-36",
};

export default function Logo({
  size = "sm",
  className,
  linked = true,
  slideshow = false,
}: LogoProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slideshow) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % LOGO_SLIDES.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [slideshow]);

  const frameClass = cn(
    "relative shrink-0 overflow-hidden",
    sizeMap[size],
    className,
  );

  const image = slideshow ? (
    <span className={frameClass} aria-hidden={false}>
      {LOGO_SLIDES.map((src, i) => (
        <AppImage
          key={src}
          src={src}
          alt={i === index ? "HND Musical Instruments" : ""}
          width={2000}
          height={2000}
          priority={i === 0}
          unoptimized
          className={cn(
            "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        />
      ))}
    </span>
  ) : (
    <AppImage
      src={LOGO_STATIC}
      alt="HND Musical Instruments"
      width={2000}
      height={2000}
      className={cn("object-contain object-left", sizeMap[size], className)}
      priority
      unoptimized
    />
  );

  if (!linked) return image;

  return (
    <Link
      href="/"
      aria-label="HND Home"
      className="inline-flex shrink-0 items-center"
    >
      {image}
    </Link>
  );
}
