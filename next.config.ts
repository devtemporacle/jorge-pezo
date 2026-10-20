import type { NextConfig } from "next";

// Optional sub-path the site is served from, e.g. "/jorge-pezo" for a GitHub
// Pages project site. Empty (root) by default, which is what Vercel uses.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

// Fully static site: `next build` writes plain HTML/CSS/JS to `out/`,
// so it deploys to Vercel and GitHub Pages with no server runtime.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(basePath && { basePath, assetPrefix: basePath }),
};

export default nextConfig;
