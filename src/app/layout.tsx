import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConfiguratorChrome from "@/components/layout/ConfiguratorChrome";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NavMenuProvider } from "@/components/providers/NavMenuProvider";

/** Bebas Neue — all display titles (HND VULTURE, chapters, Build Your Sound) */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

/** Oswald — condensed industrial rock headline */
const oswald = Oswald({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

/** Space Grotesk — nav, labels, body, buttons (bold across site) */
const spaceGrotesk = Space_Grotesk({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "HND — Musical Instruments",
  description:
    "Precision electric guitars, professional amp heads, and diode Bluetooth speakers. Built for heavy rock. Live is Life.",
  icons: {
    icon: [
      { url: `${basePath}/logo/favicon-64.png`, sizes: "64x64", type: "image/png" },
      { url: `${basePath}/logo/favicon-48.png`, sizes: "48x48", type: "image/png" },
      { url: `${basePath}/logo/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${basePath}/logo/favicon-96.png`, sizes: "96x96", type: "image/png" },
      { url: `${basePath}/logo/favicon-128.png`, sizes: "128x128", type: "image/png" },
      { url: `${basePath}/logo/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${basePath}/logo/icon-256.png`, sizes: "256x256", type: "image/png" },
      { url: `${basePath}/logo/icon-512.png`, sizes: "512x512", type: "image/png" },
      { url: `${basePath}/favicon.ico`, sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
    shortcut: `${basePath}/logo/favicon-64.png`,
  },
  manifest: `${basePath}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${bebasNeue.variable} ${oswald.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("hnd-theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");document.documentElement.style.colorScheme="light";}}catch(e){}})();`,
          }}
        />
      </head>
  <body className={`${spaceGrotesk.className} font-bold antialiased`}>
        <ThemeProvider>
          <NavMenuProvider>
            <Navbar />
            <main>{children}</main>
            <ConfiguratorChrome>
              <Footer />
            </ConfiguratorChrome>
          </NavMenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
