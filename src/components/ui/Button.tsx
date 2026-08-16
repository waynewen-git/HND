import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const variants = {
  primary:
    "bg-hnd-red text-white hover:bg-hnd-red-dark active:scale-[0.98]",
  secondary:
    "bg-hnd-black text-hnd-white hover:bg-hnd-gray-900 dark:bg-hnd-white dark:text-hnd-black dark:hover:bg-hnd-gray-300 active:scale-[0.98]",
  ghost:
    "bg-transparent hover:bg-hnd-gray-300/40 dark:hover:bg-hnd-gray-900 active:scale-[0.98]",
  outline:
    "border border-current bg-transparent hover:bg-hnd-gray-300/40 dark:hover:bg-hnd-gray-900 active:scale-[0.98]",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-sm font-medium tracking-wide uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hnd-red disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
