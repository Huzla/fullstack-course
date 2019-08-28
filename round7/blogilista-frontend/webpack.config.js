const path = require("path")

const config = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "customBuild"),
    filename: "main.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "customBuild"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api/": {
          target: "http://localhost:3003",
          secure: false
      },
      "/login": {
          target: "http://localhost:3003",
          secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
}
module.exports = config
