module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://localhost:3001', // Proxy to Backend
      },
    ];
  },
};
