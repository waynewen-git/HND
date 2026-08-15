import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  /** Kept for call-site compatibility; all variants use logo.png */
  variant?: "mark" | "full";
  className?: string;
  linked?: boolean;
}

const LOGO_SRC = "/logo/logo.png";

const sizeMap = {
  sm: "h-12 w-12 md:h-14 md:w-14",
  md: "h-16 w-16 md:h-20 md:w-20",
  lg: "h-20 w-20 md:h-24 md:w-24",
};

export default function Logo({
  size = "sm",
  className,
  linked = true,
}: LogoProps) {
  const image = (
    <AppImage
      src={LOGO_SRC}
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
