import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  // Enable SWC minification for better performance
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  experimental: {
    // Optimize in-page navigation
    optimizeCss: true,
    // Optimize by preloading critical assets
    optimisticClientCache: true,
  },
};

export default nextConfig;
