import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'github.com',
      'raw.githubusercontent.com',
      'localhost' // For local development
    ],
    // OR use remotePatterns for more specific control:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/ahmedibrahimaliemam/react-redux-tool-kit/raw/master/public/imgs/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/ahmedibrahimaliemam/react-redux-tool-kit/master/public/imgs/**',
      }
    ],
    minimumCacheTTL: 60,
  },
  // ... other Next.j
};

export default nextConfig;
