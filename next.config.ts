import type { NextConfig } from "next";

/** Set GITHUB_PAGES=true in CI so assets resolve under /HND/ on GitHub Pages */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/HND" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
