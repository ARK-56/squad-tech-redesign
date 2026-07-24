/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Pre-existing lint debt in src/pages — don't block production builds on it
    ignoreDuringBuilds: true,
  },
  // /api/blogs reads these with fs at runtime; make sure Vercel bundles them
  outputFileTracingIncludes: {
    '/api/blogs': ['./src/data/blog-cms.json'],
  },
}

export default nextConfig
