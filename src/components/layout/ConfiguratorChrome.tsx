"use client";

import { usePathname } from "next/navigation";

/** Hide global chrome on immersive configurator routes. */
export default function ConfiguratorChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isConfigurator =
    pathname === "/configure" ||
    pathname === "/configure/" ||
    pathname.endsWith("/configure") ||
    pathname.endsWith("/configure/");

  if (isConfigurator) return null;
  return children;
}
