/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'blog.lishiyua.dev',
            },
          ],
          destination: '/blog/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig
