// //correct one 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
// };

// module.exports = {
//   resolve:{
//       fallback:{
//           process: require.resolve('process/browser')
//       }
//   }
// }

// module.exports = nextConfig;
//2sep
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
//   productionBrowserSourceMaps: true, 
//   webpack: (config) => {
//     config.resolve.fallback = {
//       ...config.resolve.fallback, // Merge with existing fallback settings
//       crypto: false, 
//       http: false,
//       https: false,
//       // Disable crypto module on client-side
//       process: require.resolve('process/browser'), // Add process polyfill
//     };
//     return config;
//   },
// };

// module.exports = nextConfig;

//before deployment 0ct 14
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 's3.us-west-2.amazonaws.com',
//       },
//     ],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
//   productionBrowserSourceMaps: true, 
//   webpack: (config) => {
//     config.resolve.fallback = {
//       ...config.resolve.fallback, // Merge with existing fallback settings
//       crypto: false, 
//       http: false,
//       https: false,
//       // Disable crypto module on client-side
//       process: require.resolve('process/browser'), // Add process polyfill
//     };
//     return config;
//   },
// };

// module.exports = nextConfig;


module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      http: false,
      https: false,
      process: require.resolve('process/browser'),
    };
    return config;
  },
  // Explicitly adding redirects for dynamic routes
  async rewrites() {
    return [
      {
        source: '/api/stripe',
        destination: '/api/stripe',
      },
      {
        source: '/search',
        destination: '/search',
      },
    ];
  },
};




// const webpack = require('webpack');

// module.exports = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         stream: require.resolve('stream-browserify'),
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         process: require.resolve('process/browser'),
//         vm: require.resolve('vm-browserify'),
//         zlib: require.resolve('browserify-zlib'),
//         path: require.resolve('path-browserify'),
//         os: require.resolve('os-browserify/browser'),
//         querystring: require.resolve('querystring-es3'),
//         crypto: false,
//       };

//       config.plugins.push(
//         new webpack.ProvidePlugin({
//           process: 'process/browser',
//           Buffer: ['buffer', 'Buffer'],
//         })
//       );
//     }
//     return config;
//   },
// };


// next.config.js
// const webpack = require('webpack');

// module.exports = {
//   webpack: (config) => {
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       crypto: require.resolve('crypto-browserify'),
//       stream: require.resolve('stream-browserify'),
//       https: require.resolve('https-browserify'),
//       os: require.resolve('os-browserify/browser'),
//       path: require.resolve('path-browserify'),
//       zlib: require.resolve('browserify-zlib'),
//       process: require.resolve('process/browser'),
//     };

//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         process: 'process/browser',
//         Buffer: ['buffer', 'Buffer'],
//       })
//     );

//     return config;
//   },
// };



// const webpack = require('webpack');

// module.exports = {
//   webpack: (config) => {
//     config.resolve.fallback = {
//       crypto: require.resolve('crypto-browserify'),
//       stream: require.resolve('stream-browserify'),
//       http: require.resolve('stream-http'),
//       https: require.resolve('https-browserify'),
//       os: require.resolve('os-browserify/browser'),
//       path: require.resolve('path-browserify'),
//       zlib: require.resolve('browserify-zlib'),
//       process: require.resolve('process/browser'),
//     };

//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         process: 'process/browser',
//         Buffer: ['buffer', 'Buffer'],
//       })
//     );

//     return config;
//   },
// };





// const webpack = require('webpack');

// module.exports = {
//   webpack: (config) => {
//     config.resolve.fallback = {
//       crypto: require.resolve('crypto-browserify'),
//       stream: require.resolve('stream-browserify'),
//       http: require.resolve('stream-http'),
//       https: require.resolve('https-browserify'),
//       process: require.resolve('process/browser'),
//       vm: require.resolve('vm-browserify'),
//       zlib: require.resolve('browserify-zlib'),
//       path: require.resolve('path-browserify'),
//       os: require.resolve('os-browserify/browser'),
//       querystring: require.resolve('querystring-es3'),
//     };

//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         process: 'process/browser',
//         Buffer: ['buffer', 'Buffer'],
//       })
//     );

//     return config;
//   },
// };


//Much better

// const webpack = require('webpack');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         crypto: require.resolve('crypto-browserify'),
//         stream: require.resolve('stream-browserify'),
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         process: require.resolve('process/browser'),
//         vm: require.resolve('vm-browserify'),
//         zlib: require.resolve('browserify-zlib'),
//         path: require.resolve('path-browserify'),
//         os: require.resolve('os-browserify/browser'),
//         querystring: require.resolve('querystring-es3'),
//       };

//       config.plugins.push(
//         new webpack.ProvidePlugin({
//           process: 'process/browser',
//           Buffer: ['buffer', 'Buffer'],
//         })
//       );
//     }
//     return config;
//   },
// };

// module.exports = nextConfig;





// const webpack = require('webpack');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
//   webpack: (config) => {
//     config.resolve.fallback = {
//       crypto: require.resolve('crypto-browserify'),
//       stream: require.resolve('stream-browserify'),
//       http: require.resolve('stream-http'),
//       https: require.resolve('https-browserify'),
//       process: require.resolve('process/browser'),
//       vm: require.resolve('vm-browserify'),
//       zlib: require.resolve('browserify-zlib'),
//       path: require.resolve('path-browserify'),
//       os: require.resolve('os-browserify/browser'),
//       querystring: require.resolve('querystring-es3'),
//     };
//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         process: 'process/browser',
//         Buffer: ['buffer', 'Buffer'],
//       })
//     );
//     return config;
//   },
// };

// module.exports = nextConfig;



// const webpack = require('webpack');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         crypto: require.resolve('crypto-browserify'),
//         stream: require.resolve('stream-browserify'),
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         process: require.resolve('process/browser'),
//         vm: require.resolve('vm-browserify'),
//         zlib: require.resolve('browserify-zlib'),
//         path: require.resolve('path-browserify'),
//         os: require.resolve('os-browserify/browser'),
//         querystring: require.resolve('querystring-es3'),
//       };
//       config.plugins.push(
//         new webpack.ProvidePlugin({
//           process: 'process/browser',
//           Buffer: ['buffer', 'Buffer'],
//         })
//       );
//     }
//     return config;
//   },
// };

// module.exports = nextConfig;

//Internal Server Error
// const webpack = require('webpack');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
//   webpack: (config, { isServer }) => {
//     config.resolve.fallback = {
//       crypto: require.resolve('crypto-browserify'),
//       stream: require.resolve('stream-browserify'),
//       http: require.resolve('stream-http'),
//       https: require.resolve('https-browserify'),
//       process: require.resolve('process/browser'),
//       vm: require.resolve('vm-browserify'),
//     };

//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         process: 'process/browser',
//         Buffer: ['buffer', 'Buffer'],
//       })
//     );

//     // Ensure the modules are only required on the server-side
//     if (isServer) {
//       config.externals = config.externals || {};
//       config.externals['openid-client'] = 'commonjs openid-client';
//       config.externals['jose'] = 'commonjs jose';
//     }

//     return config;
//   },
// };

// module.exports = nextConfig;



//Better
// const webpack = require('webpack');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   output: "standalone",
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         crypto: require.resolve('crypto-browserify'),
//         stream: require.resolve('stream-browserify'),
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         // Remove process and vm-browserify
//       };
//       config.plugins.push(
//         new webpack.ProvidePlugin({
//           process: 'process/browser',
//           Buffer: ['buffer', 'Buffer'],
//         })
//       );
//     }
//     return config;
//   },
// };

// module.exports = nextConfig;
