import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "HND — Musical Instruments",
  description:
    "Precision electric guitars, professional amp heads, and diode Bluetooth speakers. Built for heavy rock. Live is Life.",
  icons: {
    // Prefer 32/48 PNG first so tabs don't fall back to tiny 16px ICO.
    icon: [
      { url: `${basePath}/logo/favicon-48.png`, sizes: "48x48", type: "image/png" },
      { url: `${basePath}/logo/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${basePath}/logo/favicon-64.png`, sizes: "64x64", type: "image/png" },
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
    shortcut: `${basePath}/logo/favicon-48.png`,
  },
  manifest: `${basePath}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} font-body antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
