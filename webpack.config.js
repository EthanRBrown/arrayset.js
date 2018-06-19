const path = require('path')

module.exports = {
  entry: './src/arrayset.js',
  output: {
    filename: 'arrayset.js',
    library: 'Arrayset',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
