const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const outputPath = path.resolve(__dirname, "./dist");

const serve = new Serve({
  host: "localhost",
  port: process.env.PORT || 3000,
  static: outputPath,
  progress: "minimal",
  open: true,
  hmr: "refresh-on-failure",
  historyFallback: true,
  waitForBuild: true,
  log: {
    level: "warn",
    timestamp: true,
  },
});

module.exports = merge(common, {
  mode: "development",
  entry: ["./src", "webpack-plugin-serve/client"].filter(Boolean),
  devtool: "cheap-module-source-map",
  plugins: [serve, new ReactRefreshWebpackPlugin()],
});
