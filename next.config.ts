import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',          // Enable static export for Amplify
  trailingSlash: true,       // Required for static export
  images: {
    unoptimized: true,       // Required for static export
    remotePatterns: [{ hostname: "*" }],
  },
  reactStrictMode: false,
  // Note: rewrites and headers don't work with static export
  // API calls will need to use full URLs instead of rewrites
};

export default nextConfig;