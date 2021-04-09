const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const headHTML = `<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">  <link rel="icon" href="%PUBLIC_URL%/favicon.ico">`;

const bodyHTML = `<div id="root"></div>`;

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
        test: /\.(svg|png|jpg|ico)$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new MiniHtmlWebpackPlugin({
      filename: "index.html",
      context: {
        title: "webpack-serve-template",
        head: headHTML,
        body: bodyHTML,
        // favicon: '%PUBLIC_URL%/favicon.ico'
      },
    }),
    new CopyWebpackPlugin({ patterns: [
      { from: "public", to: "public" },
    ],}),
    new CleanWebpackPlugin(),
  ],
};
