const path = require("path");

module.exports = {
  target: "web",
  mode: "development",

  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    open: true,
    port: 3000,
    hot: true,
    liveReload: false,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
  },
};
