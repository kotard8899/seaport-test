/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_SUPPORT_NETWORKS: "5,4002",
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
}

module.exports = nextConfig
