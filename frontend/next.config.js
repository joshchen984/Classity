module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*', // Proxy to Backend
      },
    ];
  },
};
