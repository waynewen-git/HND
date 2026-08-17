"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Placeholder URLs — replace with official HND accounts when ready */
export const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@hndmusicalinstruments",
    label: "HND on YouTube",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hndamplification",
    label: "HND on Instagram",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@hndmusic",
    label: "HND on TikTok",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/hndmusic",
    label: "HND on Facebook",
  },
  {
    name: "WeChat",
    href: "https://www.wechat.com/",
    label: "HND on WeChat",
  },
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/",
    label: "HND on Bilibili",
  },
  {
    name: "Xiaohongshu",
    href: "https://www.xiaohongshu.com/",
    label: "HND on Xiaohongshu",
  },
] as const;

type SocialName = (typeof socialLinks)[number]["name"];

function MonoIcon({ name, className }: { name: SocialName; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": true as const,
    fill: "currentColor",
  };

  switch (name) {
    case "YouTube":
      return (
        <svg {...common}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.8 15V9l5.7 3-5.7 3Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common}>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.2-3.3a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...common}>
          <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.3V2h-3.4v13.7a2.9 2.9 0 1 1-2.1-2.8V9.4a6.3 6.3 0 1 0 5.5 6.3V8.7a8.2 8.2 0 0 0 4.8 1.5V6.8a4.8 4.8 0 0 1-1-.1Z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
        </svg>
      );
    case "WeChat":
      return (
        <svg {...common}>
          <path d="M9.1 3.5C5.1 3.5 1.8 6.2 1.8 9.6c0 1.9 1 3.6 2.7 4.8l-.7 2.5 2.7-1.4c.8.2 1.6.4 2.5.4.3 0 .5 0 .8-.1-.2-.5-.3-1.1-.3-1.7 0-3.5 3.3-6.3 7.3-6.3.3 0 .6 0 .9.1C16.8 5.1 13.3 3.5 9.1 3.5Zm-2.3 3.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm4.7 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9ZM21.8 14.4c0-2.9-2.8-5.2-6.2-5.2s-6.2 2.3-6.2 5.2 2.8 5.2 6.2 5.2c.7 0 1.4-.1 2.1-.3l2.3 1.2-.6-2.1c1.5-1 2.4-2.4 2.4-4Zm-8.3-1.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Zm4.1 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Z" />
        </svg>
      );
    case "Bilibili":
      return (
        <svg {...common}>
          <path d="M17.8 5.2 19.6 3.4l-1.1-1.1-2.2 2.1A8.4 8.4 0 0 0 12 3.8c-1.6 0-3 .5-4.3 1.6L5.5 2.3 4.4 3.4l1.8 1.8C4.1 6.7 2.8 8.9 2.8 11.6v5.1c0 2.6 2.1 4.7 4.7 4.7h9c2.6 0 4.7-2.1 4.7-4.7v-5.1c0-2.7-1.3-4.9-3.4-6.4ZM7.5 15.2a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Zm9 0a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z" />
        </svg>
      );
    case "Xiaohongshu":
      return (
        <svg {...common}>
          <path d="M5.2 3.5h13.6c.9 0 1.7.8 1.7 1.7v13.6c0 .9-.8 1.7-1.7 1.7H5.2c-.9 0-1.7-.8-1.7-1.7V5.2c0-.9.8-1.7 1.7-1.7Zm2.3 4.2v2.1h2.1l-2.4 6.5h2.3l1.1-3.1h3.1l1.1 3.1h2.3l-2.4-6.5h2.1V7.7H7.5Zm4.5 2.1 1 2.7h-2.1l1.1-2.7Z" />
        </svg>
      );
    default:
      return null;
  }
}

/** Full-color brand marks shown on hover / active / focus */
function BrandIcon({ name, className }: { name: SocialName; className?: string }) {
  const gradId = useId().replace(/:/g, "");

  switch (name) {
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            fill="#FF0000"
            d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"
          />
          <path fill="#FFFFFF" d="M9.8 15V9l5.7 3-5.7 3Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <defs>
            <radialGradient id={gradId} cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <path
            fill={`url(#${gradId})`}
            d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.2-3.3a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
          />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          {/* Cyan / magenta brand offsets + white body */}
          <path
            fill="#25F4EE"
            d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.3V2h-3.4v13.7a2.9 2.9 0 1 1-2.1-2.8V9.4a6.3 6.3 0 1 0 5.5 6.3V8.7a8.2 8.2 0 0 0 4.8 1.5V6.8a4.8 4.8 0 0 1-1-.1Z"
            transform="translate(-0.7 0.4)"
          />
          <path
            fill="#FE2C55"
            d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.3V2h-3.4v13.7a2.9 2.9 0 1 1-2.1-2.8V9.4a6.3 6.3 0 1 0 5.5 6.3V8.7a8.2 8.2 0 0 0 4.8 1.5V6.8a4.8 4.8 0 0 1-1-.1Z"
            transform="translate(0.7 -0.4)"
          />
          <path
            fill="#FFFFFF"
            d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.3V2h-3.4v13.7a2.9 2.9 0 1 1-2.1-2.8V9.4a6.3 6.3 0 1 0 5.5 6.3V8.7a8.2 8.2 0 0 0 4.8 1.5V6.8a4.8 4.8 0 0 1-1-.1Z"
          />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="11" fill="#1877F2" />
          <path
            fill="#FFFFFF"
            d="M13.5 20v-6.5H16l.4-3h-2.9V8.7c0-.9.3-1.5 1.6-1.5H16.5V4.5c-.4-.1-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8V10.5H6.5v3h2.5V20h4.5Z"
          />
        </svg>
      );
    case "WeChat":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            fill="#07C160"
            d="M9.1 3.5C5.1 3.5 1.8 6.2 1.8 9.6c0 1.9 1 3.6 2.7 4.8l-.7 2.5 2.7-1.4c.8.2 1.6.4 2.5.4.3 0 .5 0 .8-.1-.2-.5-.3-1.1-.3-1.7 0-3.5 3.3-6.3 7.3-6.3.3 0 .6 0 .9.1C16.8 5.1 13.3 3.5 9.1 3.5Zm-2.3 3.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm4.7 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9ZM21.8 14.4c0-2.9-2.8-5.2-6.2-5.2s-6.2 2.3-6.2 5.2 2.8 5.2 6.2 5.2c.7 0 1.4-.1 2.1-.3l2.3 1.2-.6-2.1c1.5-1 2.4-2.4 2.4-4Zm-8.3-1.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Zm4.1 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Z"
          />
        </svg>
      );
    case "Bilibili":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            fill="#00A1D6"
            d="M17.8 5.2 19.6 3.4l-1.1-1.1-2.2 2.1A8.4 8.4 0 0 0 12 3.8c-1.6 0-3 .5-4.3 1.6L5.5 2.3 4.4 3.4l1.8 1.8C4.1 6.7 2.8 8.9 2.8 11.6v5.1c0 2.6 2.1 4.7 4.7 4.7h9c2.6 0 4.7-2.1 4.7-4.7v-5.1c0-2.7-1.3-4.9-3.4-6.4ZM7.5 15.2a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Zm9 0a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z"
          />
        </svg>
      );
    case "Xiaohongshu":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="#FF2442" />
          <path
            fill="#FFFFFF"
            d="M7.5 7.7v2.1h2.1l-2.4 6.5h2.3l1.1-3.1h3.1l1.1 3.1h2.3l-2.4-6.5h2.1V7.7H7.5Zm4.5 2.1 1 2.7h-2.1l1.1-2.7Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

const brandBorder: Record<SocialName, string> = {
  YouTube: "hover:border-[#FF0000] active:border-[#FF0000] focus-visible:border-[#FF0000]",
  Instagram: "hover:border-[#E4405F] active:border-[#E4405F] focus-visible:border-[#E4405F]",
  TikTok: "hover:border-[#25F4EE] active:border-[#25F4EE] focus-visible:border-[#25F4EE]",
  Facebook: "hover:border-[#1877F2] active:border-[#1877F2] focus-visible:border-[#1877F2]",
  WeChat: "hover:border-[#07C160] active:border-[#07C160] focus-visible:border-[#07C160]",
  Bilibili: "hover:border-[#00A1D6] active:border-[#00A1D6] focus-visible:border-[#00A1D6]",
  Xiaohongshu: "hover:border-[#FF2442] active:border-[#FF2442] focus-visible:border-[#FF2442]",
};

interface SocialLinksProps {
  className?: string;
  variant?: "brand" | "muted";
}

export default function SocialLinks({
  className,
  variant = "muted",
}: SocialLinksProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 md:gap-4",
        className,
      )}
    >
      {socialLinks.map((item) => (
        <li key={item.name} className="shrink-0">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.name}
            className={cn(
              "group relative flex h-10 w-10 items-center justify-center rounded-full border border-hnd-black/25 text-hnd-black/70 transition-colors duration-300 md:h-11 md:w-11 dark:border-hnd-white/40 dark:text-hnd-white/80",
              brandBorder[item.name],
              variant === "brand" && "bg-transparent",
            )}
          >
            <MonoIcon
              name={item.name}
              className="h-5 w-5 transition-opacity duration-200 group-hover:opacity-0 group-active:opacity-0 group-focus-visible:opacity-0"
            />
            <BrandIcon
              name={item.name}
              className="pointer-events-none absolute h-5 w-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
