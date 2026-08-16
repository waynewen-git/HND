"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Fade-up on enter — content stays visible if JS/observer fails. */
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in view on mount → show immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-100",
        className,
      )}
      data-reveal={visible ? "in" : "pending"}
    >
      {children}
    </div>
  );
}
