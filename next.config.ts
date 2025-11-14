// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // keep your existing config here…
  experimental: {
    ...(process.env.NODE_ENV === "development" ? {} : {}),
    typedRoutes: false, // 🚫 turn off the validator causing .next/dev/types errors
  },
};

export default nextConfig;
