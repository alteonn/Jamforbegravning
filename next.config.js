/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  optimizeFonts: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Force favicon to not be cached
  headers: async () => {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
}