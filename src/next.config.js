/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ["https://f4-public.s3.eu-central-1.amazonaws.com"]
  },
  env:{
    STAGE: process.env.STAGE,
  },
}

module.exports = nextConfig
