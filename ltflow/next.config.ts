import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.BUILD_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.ltflow.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/case-studies/how-an-nbfc-scaled-its-lending-without-compromising-credit-quality",
        destination: "/case-studies/ai-credit",
        permanent: true,
      },
      {
        source: "/solutions/ai-ml-score-models",
        destination: "/solutions/ai-intelligent-suite",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
