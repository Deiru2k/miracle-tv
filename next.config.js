module.exports = {
  productionBrowserSourceMaps: true,
  distDir: "/dist/client",
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};
