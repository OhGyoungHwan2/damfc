/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif"],
    minimumCacheTTL: 86400,
    domains: ["localhost", "github.com"],
    unoptimized: true,
  },
};
export default nextConfig;
