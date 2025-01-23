import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:
      [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com'
        }      
      ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/trending',
        permanent: true, // true: 301 Permanent Redirect, false: 307 Temporary Redirect
      },
    ];
  },
};

export default nextConfig;
