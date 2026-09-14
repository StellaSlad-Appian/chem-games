import type { NextConfig } from "next";

// Response headers applied to every route (see e2e/security-headers.spec.ts).
// A Content-Security-Policy is deliberately deferred: the nonce-based setup
// Next.js recommends forces dynamic rendering on every page. When it is
// revisited, follow node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Supabase's Google sign-in is a full-page redirect rather than a popup, so
  // isolating the browsing-context group does not break the auth flow.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
