// templates/next-app-router/next.config.mjs
/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fail the build on any TypeScript or ESLint problem, like the library's own CI.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
