// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // keep your existing config here…
  typedRoutes: false, // same behavior, but in the new location
  experimental: {
    // Keep recently visited / hover-prefetched dashboard pages in the client cache
    // briefly, so going back and forth between pages is instant.
    staleTimes: { dynamic: 30, static: 60 },
  },
};

export default nextConfig;
