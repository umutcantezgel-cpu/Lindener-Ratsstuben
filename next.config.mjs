import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@tabler/icons-react', 'date-fns', 'lodash'],
  },
  async redirects() {
    return [
      // Force naked domain and www root to canonical /de to eliminate redirect chains
      {
        source: '/',
        destination: '/de',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 960, 1280, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      // Defense-in-depth: Markdown mirror SEO protection
      {
        source: '/:path*.md',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, noarchive' },
          { key: 'Vary', value: 'Accept' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          ...(process.env.NODE_ENV === 'production' ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }] : []),
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '0' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), bluetooth=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              // Base policy — only allow resources from same origin by default
              "default-src 'self'",
              // Scripts: self + Vercel Analytics (consent-gated)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              // Styles: self + Google Fonts stylesheets
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: permissive for restaurant photos, external CDNs
              "img-src 'self' data: https: blob:",
              // Fonts: self-hosted + Google Fonts CDN
              "font-src 'self' https://fonts.gstatic.com",
              // XHR/Fetch: Formspree (forms), Vercel Insights (consent-gated)
              "connect-src 'self' https://formspree.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              // Iframes: Google Maps embed
              "frame-src https://maps.google.com https://www.google.com",
              "base-uri 'self'",
              // Form submissions: only to own origin + Formspree
              "form-action 'self' https://formspree.io",
              "frame-ancestors 'none'",
              ...(process.env.NODE_ENV === 'production' ? ["upgrade-insecure-requests"] : []),
            ].join('; ')
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
