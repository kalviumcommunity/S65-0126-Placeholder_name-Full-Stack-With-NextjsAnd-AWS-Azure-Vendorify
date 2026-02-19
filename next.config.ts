import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: 'standalone'` — that mode is for self-hosted Docker.
  // Vercel detects Next.js automatically and handles output format itself.
};

export default nextConfig;
