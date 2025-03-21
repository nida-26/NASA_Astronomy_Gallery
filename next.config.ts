/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com", // Allows embedding YouTube videos (if needed)
      },
      {
        protocol: "https",
        hostname: "cdn.spacetelescope.org", // Additional space-related image sources
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensures compatibility with Next.js App Router
  },
};

export default nextConfig;
