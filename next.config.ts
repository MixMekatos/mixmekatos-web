import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Works around local TLS interception (antivirus/corporate proxy) that
    // otherwise breaks Turbopack's fetch of next/font/google files.
    turbopackUseSystemTlsCerts: true,
  },
};

export default withFlowbiteReact(nextConfig);