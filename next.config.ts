import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['argon2'],
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
        pathname: '/u/**',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
        pathname: '/a/**',
      },
    ],
  },
};

export default nextConfig;
