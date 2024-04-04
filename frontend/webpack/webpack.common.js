const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { bundle: path.resolve(__dirname, "../src/index.tsx") },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map", // helps to debug in chrome in sources tab
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist"),
    },
    port: 3005,
    open: true,
    hot: true, //hot reloading
    compress: true, // enable Z-zip compression
    historyApiFallback: true /*ensures that the server serves the entry
                                point of the SPA for all URLs, allowing the client-side
                                routing to manage the navigation within the application.
                              */,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // ts tsx js jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // i -> case insensitive
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Typescript",
      filename: "index.html",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  resolve: { extensions: [".ts", ".js", ".tsx"] }, // we don't need to write App.tsx while importing
};
