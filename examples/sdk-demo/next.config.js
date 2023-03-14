/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  /* config options here */
  env: {
    API_HOST: process.env.API_HOST,
    SDK_DOCS: process.env.SDK_DOCS,
    APP_ID: process.env.APP_ID,
    APP_SECRET: process.env.APP_SECRET,
  },
  webpack: function (config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024 * 30,
          name: '[path][name].[ext]',
          encoding: 'base64',
          fallback: require.resolve('file-loader'),
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
