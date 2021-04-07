// const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

// const outputPath = path.resolve(__dirname, './dist', 'main.bundle.js');

// module.exports = {
//     mode: 'development',
//     entry: {
//         main: ['webpack-plugin-serve/client', path.resolve(__dirname, './src/index.js')] // ← important: this is required, where the magic happens in the browser
//     },

//     output: {
//         path: path.resolve(__dirname, './dist'),
//         filename: '[name].bundle.js',
//     },

//     module: {
//         rules: [
//             {
//                 test: /\.js$|jsx/,
//                 loader: 'babel-loader',
//                 exclude: /(node_modules|bower_components)/,
//                 options: { presets: ['env'] },
//             },
//             {
//                 test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
//                 type: 'asset/resource',
//             },
//             {
//                 test: /\.less$/i,
//                 loader: "style-loader",
//             },
//             {
//                 test: /\.css$/i,
//                 use: ['style-loader', 'css-loader'],
//             },
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//           title: 'Demo',
//           template: path.resolve(__dirname, './src/index.html'),
//           filename: '[name].index.html', 
//         }),
//         new CleanWebpackPlugin(),
//         new webpack.SourceMapDevToolPlugin({
//             filename: '[file].map'
//         }),
//         new Serve({
//             client: {
//                 address: '127.0.0.1:3000'
//             },
//             historyFallback: true, // ← The Accept header is explicitly stripped from the /wps WebSocket path when using historyFallback, due to an issue with how Firefox and the middleware interact.
//             // hmr: true,
//             liveReload: true,
//             log: {
//                 level: 'info' && 'error' && 'warn'
//             },
//             open: true,
//             progress: true,
//             host: "127.0.0.1",
//             static: outputPath,
//             port: 8080,
//             waitForBuild: true,
//         }), 
//     ],
//     watch: true, // ← important: webpack and the server will continue to run in watch mode
// };

const {
  MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");

module.exports = {
  watch: truncateSync,
  entry: ["./src", "webpack-plugin-serve/client"],
  mode: "development",
  plugins: [
    new MiniHtmlWebpackPlugin({ context: { title: "Demo" } }),
    new WebpackPluginServe({
      port: 8080,
      static: "./dist",
      liveReload: true,
      waitForBuild: true,
    }),
  ],
};
