import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
