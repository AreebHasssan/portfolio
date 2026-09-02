import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  allowedDevOrigins: ["172.31.192.1:3000"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://20.216.17.96:30080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
