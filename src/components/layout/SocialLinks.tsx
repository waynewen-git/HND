import { cn } from "@/lib/utils";

/** Placeholder URLs — replace with official HND accounts when ready */
export const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@HNDMusic",
    label: "HND on YouTube",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hndmusic",
    label: "HND on Instagram",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@hndmusic",
    label: "HND on TikTok",
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
] as const;

const iconSize = "h-7 w-7 md:h-8 md:w-8";

function YouTubeBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#FF0000"
        d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8Z"
      />
      <path fill="#fff" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}

function InstagramBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="#fff" />
    </svg>
  );
}

function TikTokBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#25F4EE"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.09-2.77V9.4a6.34 6.34 0 1 0 5.54 6.27V8.73a8.19 8.19 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-.99-.15Z"
        transform="translate(-0.6 0.4)"
      />
      <path
        fill="#FE2C55"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.09-2.77V9.4a6.34 6.34 0 1 0 5.54 6.27V8.73a8.19 8.19 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-.99-.15Z"
        transform="translate(0.6 -0.4)"
      />
      <path
        fill="#111"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.09-2.77V9.4a6.34 6.34 0 1 0 5.54 6.27V8.73a8.19 8.19 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-.99-.15Z"
      />
    </svg>
  );
}

function BilibiliBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="1.5" y="5" width="21" height="14.5" rx="3.5" fill="#00A1D6" />
      <path
        fill="#fff"
        d="M7.2 3.4 9.1 5.2H6.4L4.6 3.4c-.25-.25-.25-.65 0-.9.25-.25.65-.25.9 0L7.2 3.4Zm9.6 0 1.7-1.5c.25-.25.65-.25.9 0 .25.25.25.65 0 .9L17.6 5.2h-2.7l1.9-1.8ZM8.2 10.2c.55 0 1 .45 1 1v2.6c0 .55-.45 1-1 1s-1-.45-1-1v-2.6c0-.55.45-1 1-1Zm7.6 0c.55 0 1 .45 1 1v2.6c0 .55-.45 1-1 1s-1-.45-1-1v-2.6c0-.55.45-1 1-1Z"
      />
    </svg>
  );
}

function XiaohongshuBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#FF2442" />
      <path
        fill="#fff"
        d="M7.2 7.2h9.6c.44 0 .8.36.8.8v8c0 .44-.36.8-.8.8H7.2c-.44 0-.8-.36-.8-.8v-8c0-.44.36-.8.8-.8Zm1.2 2v1.4h7.2V9.2H8.4Zm0 3v1.4h7.2V12.2H8.4Zm0 3v1.2h4.4V15.2H8.4Z"
      />
    </svg>
  );
}

function FacebookBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.3 19.2v-6.3h2.1l.3-2.5h-2.4V8.8c0-.7.2-1.2 1.3-1.2h1.3V5.4c-.2 0-1-.1-2-1.1-1.1 0-2.2.7-2.2 2.4v1.7H9.4v2.5h2.2v6.3h1.7Z"
      />
    </svg>
  );
}

function WeChatBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#07C160"
        d="M9.1 3.5C5.1 3.5 1.8 6.2 1.8 9.6c0 1.9 1 3.6 2.7 4.8l-.7 2.5 2.7-1.4c.8.2 1.6.4 2.5.4.3 0 .5 0 .8-.1-.2-.5-.3-1.1-.3-1.7 0-3.5 3.3-6.3 7.3-6.3.3 0 .6 0 .9.1C16.8 5.1 13.3 3.5 9.1 3.5Zm-2.3 3.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm4.7 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Z"
      />
      <path
        fill="#07C160"
        d="M21.8 14.4c0-2.9-2.8-5.2-6.2-5.2s-6.2 2.3-6.2 5.2 2.8 5.2 6.2 5.2c.7 0 1.4-.1 2.1-.3l2.3 1.2-.6-2.1c1.5-1 2.4-2.4 2.4-4Zm-8.3-1.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Zm4.1 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Z"
      />
    </svg>
  );
}

function BrandIcon({ name }: { name: (typeof socialLinks)[number]["name"] }) {
  switch (name) {
    case "YouTube":
      return <YouTubeBrandIcon className={iconSize} />;
    case "Instagram":
      return <InstagramBrandIcon className={iconSize} />;
    case "TikTok":
      return <TikTokBrandIcon className={iconSize} />;
    case "Bilibili":
      return <BilibiliBrandIcon className={iconSize} />;
    case "Xiaohongshu":
      return <XiaohongshuBrandIcon className={iconSize} />;
    case "Facebook":
      return <FacebookBrandIcon className={iconSize} />;
    case "WeChat":
      return <WeChatBrandIcon className={iconSize} />;
    default:
      return null;
  }
}

interface SocialLinksProps {
  className?: string;
  /** Colored brand logos in a single row (homepage) */
  variant?: "brand" | "muted";
}

export default function SocialLinks({
  className,
  variant = "brand",
}: SocialLinksProps) {
  const isBrand = variant === "brand";

  return (
    <ul
      className={cn(
        "flex flex-nowrap items-center justify-center gap-4 md:gap-6",
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
            title={`${item.name} (coming soon)`}
            className={cn(
              "flex items-center justify-center rounded-full transition-transform hover:scale-110",
              isBrand
                ? "h-11 w-11 bg-hnd-gray-300/50 shadow-sm md:h-12 md:w-12 dark:bg-hnd-gray-900"
                : "h-10 w-10 border border-hnd-gray-700 text-hnd-gray-400 hover:border-hnd-red hover:text-hnd-red",
            )}
          >
            <BrandIcon name={item.name} />
          </a>
        </li>
      ))}
    </ul>
  );
}
