import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  compress: true,
  optimizePackageImports: ["@radix-ui", "lucide-react"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**", // allows any image path
      },
    ],

  }
};

export default nextConfig;
