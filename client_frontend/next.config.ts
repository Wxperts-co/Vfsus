import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
  async redirects() {
    return [
      {
        source: "/why-choose-us",
        destination: "/menu/why-choose-us",
        permanent: true,
      },
      {
        source: "/how-we-recruit",
        destination: "/menu/how-we-recruit",
        permanent: true,
      },
      {
        source: "/faqs",
        destination: "/menu/faqs",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/menu/faqs",
        permanent: true,
      },
      {
        source: "/nationwide-security-services-asf",
        destination: "/menu/nationwide-security-services-asf",
        permanent: true,
      },
      {
        source: "/employment",
        destination: "/menu/employment",
        permanent: true,
      },
      {
        source: "/menu/vsf-goes-nationwide",
        destination: "/menu/nationwide-security-services-asf",
        permanent: true,
      },
      {
        source: "/security-insights",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/menu/vsf-resource-library",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/menu/vsf-three-divisions",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/_next/static/media/6c98c9fb873995d2-s.p.4a6499bc.woff2",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/_next/static/media/0595f7052377a1a2-s.p.0de08f1e.woff2",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/vehicle-patrol.php",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/index.php/post/167",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/index.php/why-choose-us.php",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/vsf-goes-nationwide.php",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/why-choose-us.php",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/how-we-recruit.php",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/favicon.ico",
        has: [
          {
            type: "query",
            key: "favicon.6fdfc723.ico",
          },
        ],
        destination: "/",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/uploads/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
