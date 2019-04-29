import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin'

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "public");

export default {
  mode: "development",
  entry: src + "/index.jsx",

  output: {
    path: dist,
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }, {
        test: /\.css$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  plugins: [
    //以下追記
    new HtmlWebpackPlugin({
      template: src + "/index.html",
      filename: "index.html"
    })
  ]
};
