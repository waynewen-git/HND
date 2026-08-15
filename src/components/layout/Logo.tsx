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
  sm: "h-9 w-9 md:h-10 md:w-10",
  md: "h-10 w-10 md:h-11 md:w-11",
  lg: "h-14 w-14 md:h-16 md:w-16",
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
