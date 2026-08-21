import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in ./out for GitHub Pages (no Node server needed)
  output: "export",
  images: {
    // Required for static export: no on-demand image optimization server
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  experimental: {
    optimisticClientCache: true,
  },
};

export default nextConfig;
