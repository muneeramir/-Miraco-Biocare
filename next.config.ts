import type { NextConfig } from "next";

const PRODUCT_IMAGE_CACHE_VERSION = "20260620-nosciphi";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    localPatterns: [
      {
        pathname: "/images/products/**",
        search: "",
      },
      {
        pathname: "/images/products/**",
        search: `?v=${PRODUCT_IMAGE_CACHE_VERSION}`,
      },
      {
        pathname: "/hero/**",
        search: "",
      },
      {
        pathname: "/badges/**",
        search: "",
      },
      {
        pathname: "/logo.png",
        search: "",
      },
      {
        pathname: "/drmuneer.png",
        search: "",
      },
      {
        pathname: "/partners/**",
        search: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/products/:path*",
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