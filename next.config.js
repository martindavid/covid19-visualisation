const withPlugins = require("next-compose-plugins");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const nextConfig = {
  webpack: config => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsConfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsConfigPathsPlugin()];
    }

    return config;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret"
  },
  env: {
  }
};

// next.config.js
module.exports = withPlugins([], nextConfig);
