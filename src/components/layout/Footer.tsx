import Link from "next/link";
import Logo from "@/components/layout/Logo";

const footerLinks = {
  Products: [
    { href: "/products/guitars", label: "Electric Guitars" },
    { href: "/products/amps", label: "Amp Heads" },
    { href: "/products/speakers", label: "Bluetooth Speakers" },
    { href: "/shop", label: "Shop All" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/news", label: "News" },
    { href: "/stores", label: "Experience Centers" },
    { href: "/contact", label: "Contact" },
  ],
  Support: [
    { href: "/support", label: "FAQ" },
    { href: "/support", label: "Technical Support" },
    { href: "/account", label: "My Account" },
    { href: "/contact", label: "Contact Us" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-hnd-gray-300/20 bg-hnd-gray-950 text-hnd-gray-300">
      <div className="section-padding container-max py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo size="md" variant="full" />
            <p className="mt-4 text-sm leading-relaxed text-hnd-gray-500">
              Musical Instruments
              <br />
              Live is Life
              <br />
              Bring Rock Closer to Life.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-hnd-white uppercase">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-hnd-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-hnd-gray-800 pt-8 md:flex-row">
          <p className="text-xs text-hnd-gray-500">
            &copy; {new Date().getFullYear()} HND Musical Instruments. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-hnd-gray-500">
            <Link href="/about" className="hover:text-hnd-white">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-hnd-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
