import Link from "next/link";
import Logo from "@/components/layout/Logo";
import SocialLinks from "@/components/layout/SocialLinks";
import AppImage from "@/components/ui/AppImage";
import { withBasePath } from "@/lib/assetPath";

const primaryLinks = [
  { href: "/products/guitars", label: "Guitars" },
  { href: "/products/amps", label: "Amps" },
  { href: "/products/speakers", label: "Speakers" },
  { href: "/products/lifestyle", label: "Lifestyle" },
];

const secondaryLinks = [
  { href: "/support", label: "Support" },
  { href: "/account", label: "Account" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-hnd-gray-300 text-hnd-gray-500 dark:border-hnd-gray-800">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={withBasePath("/images/background.png")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_right]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hnd-white from-[20%] via-hnd-white/92 via-[48%] to-hnd-white/55 to-[85%] dark:from-hnd-black dark:via-hnd-black/90 dark:to-hnd-black/55" />
      </div>

      <div className="section-padding container-max relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,14rem)_1fr_auto] lg:items-start lg:gap-x-16 lg:gap-y-0">
          <div className="flex w-full flex-col items-center justify-self-start lg:pt-0">
            <Logo size="xl" variant="full" className="object-top" />
            <div className="relative -mt-12 aspect-[2944/1312] w-full max-w-[182px] md:-mt-14 md:max-w-[210px]">
              <AppImage
                src="/images/slogan.png"
                alt="Bring Rock Closer to Life."
                fill
                unoptimized
                className="object-contain object-center brightness-0 dark:brightness-100"
                sizes="210px"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16 lg:justify-self-center lg:gap-20">
            <ul className="space-y-3">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 font-ui text-sm tracking-[0.14em] text-hnd-gray-700 uppercase transition-colors hover:text-hnd-black dark:text-hnd-gray-300 dark:hover:text-hnd-white"
                  >
                    {link.label}
                    <span className="text-hnd-red transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 font-ui text-sm tracking-[0.14em] text-hnd-gray-500 uppercase transition-colors hover:text-hnd-black dark:hover:text-hnd-white"
                  >
                    {link.label}
                    <span className="text-hnd-red transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0 justify-self-start lg:justify-self-end lg:pt-0 lg:text-right">
            <p className="label-condensed mb-5 text-hnd-gray-500">Follow HND</p>
            <SocialLinks className="justify-start lg:justify-end" />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hnd-gray-300 pt-8 md:flex-row md:items-center dark:border-hnd-gray-800">
          <p className="font-ui text-[11px] tracking-[0.12em] text-hnd-gray-500 uppercase">
            © {new Date().getFullYear()} HND Musical Instruments
          </p>
          <div className="flex gap-6 font-ui text-[11px] tracking-[0.12em] uppercase">
            <Link
              href="/about"
              className="hover:text-hnd-black dark:hover:text-hnd-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="hover:text-hnd-black dark:hover:text-hnd-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
