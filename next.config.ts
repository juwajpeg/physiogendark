import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  experimental: {
    optimizeCss: true,
    optimisticClientCache: true,
  },
};

export default nextConfig;
