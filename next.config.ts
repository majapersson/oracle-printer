import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    /**
     * Typechecking and building will be done in separate steps in the build
     * pipeline, so it's preferable to know whether each step passes independent
     * of the other.
     */
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactCompiler: true,
};

export default nextConfig;
