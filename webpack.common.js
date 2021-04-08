const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { MiniHtmlWebpackPlugin} = require("mini-html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "less-loader"],
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx",],
  },

  watch: true,

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    new MiniHtmlWebpackPlugin({
      filename: 'index.html',
      context: {
        title: 'webpack-serve-template',
      }
    }),
    new CleanWebpackPlugin(),
  ],
}