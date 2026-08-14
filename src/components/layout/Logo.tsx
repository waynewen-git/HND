import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "full";
  className?: string;
  linked?: boolean;
}

const assets = {
  mark: {
    src: "/logo/hnd-logo-mark.png",
    width: 316,
    height: 114,
  },
  full: {
    src: "/logo/hnd-logo.png",
    width: 209,
    height: 96,
  },
} as const;

const sizeMap = {
  sm: "h-9 w-auto md:h-10",
  md: "h-10 w-auto md:h-11",
  lg: "h-14 w-auto md:h-16",
};

export default function Logo({
  size = "sm",
  variant = "mark",
  className,
  linked = true,
}: LogoProps) {
  const asset = assets[variant];

  const image = (
    <AppImage
      src={asset.src}
      alt="HND Musical Instruments"
      width={asset.width}
      height={asset.height}
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
