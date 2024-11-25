/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ta bort swcMinify och optimizeFonts då de är default i Next.js 15
}

module.exports = nextConfig