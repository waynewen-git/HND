import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  href?: string;
  /** Append → for text/primary CTAs */
  arrow?: boolean;
}

const variants = {
  primary:
    "rounded-none bg-hnd-red text-white hover:bg-hnd-red-dark active:scale-[0.98]",
  secondary:
    "rounded-none bg-hnd-black text-hnd-white hover:bg-hnd-gray-800 dark:bg-hnd-white dark:text-hnd-black dark:hover:bg-hnd-gray-100 active:scale-[0.98]",
  ghost:
    "rounded-none bg-transparent hover:bg-hnd-gray-300/30 dark:hover:bg-hnd-gray-900 active:scale-[0.98]",
  outline:
    "rounded-none border border-current bg-transparent hover:border-hnd-red hover:text-hnd-red active:scale-[0.98]",
  text:
    "group/btn rounded-none bg-transparent px-0 py-0 font-ui tracking-[0.18em] text-hnd-black hover:text-hnd-black dark:text-hnd-white dark:hover:text-hnd-white",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const textSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  arrow,
  ...props
}: ButtonProps) {
  const isText = variant === "text";
  const showArrow = arrow ?? isText;

  const classes = cn(
    "inline-flex items-center justify-center font-ui font-bold tracking-[0.14em] uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hnd-red disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    isText ? textSizes[size] : sizes[size],
    isText && "gap-2",
    className,
  );

  const content = (
    <>
      <span className="relative">
        {children}
        {isText && (
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-hnd-red transition-all duration-300 group-hover/btn:w-full" />
        )}
      </span>
      {showArrow && (
        <span
          aria-hidden
          className={cn(
            "inline-block text-hnd-red transition-transform duration-300",
            isText && "group-hover/btn:translate-x-1.5",
            !isText && "ml-2 text-white",
          )}
        >
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
