import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://bnengkzaqe.us-east-1.awsapprunner.com'}/:path*`,
    },
  ],
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
  reactStrictMode: false,
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

export default nextConfig;