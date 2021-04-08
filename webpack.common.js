const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");

const headHTML = `<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>webpack-serve-template</title>`;

const bodyHTML = `<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
<script type="text/javascript" src="./dist/bundle.js"></script>`;

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
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  watch: true,

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    new MiniHtmlWebpackPlugin({
      filename: "index.html",
      context: {
        title: "webpack-serve-template",
        // без этого plugin не генерирует html файл с id="root", в отличии от HtmlWebpackPlugin где нужно указать свойство template => путь к файлу html
        head: headHTML,
        body: bodyHTML,
        htmlAttributes: {
          lang: "en",
        },
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
