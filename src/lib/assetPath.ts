/** Prefix public asset paths for GitHub Pages subpath (/HND). */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
