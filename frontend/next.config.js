const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3001/:path*', // Proxy to Backend
          },
        ];
      },
    };
  }
  return {
    reactStrictMode: true,
  };
};
