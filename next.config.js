module.exports = {
  productionBrowserSourceMaps: true,
  distDir: "/dist/client",
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    mediaUrl: process.env.NEXT_PUBLIC_MEDIA_URL,
  },
  async rewrites() {
    return [
      {
        source: "/streaming/hls/:path*",
        destination: "http://localhost:8081/live/:path*", // Proxy to Backend
      },
      {
        source: "/streaming/dash/:path*",
        destination: "http://localhost:8081/dash/:path*", // Proxy to Backend
      },
    ];
  },
};
