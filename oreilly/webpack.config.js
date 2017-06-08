const path = require('path');

const entries = {
  chapter01: './src/js/chapter01.js'
};

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, './src/bundle'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  cache: true,
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    reasons: true,
    timings: true,
    hash: true,
    version: true,
    chunks: true,
    chunkModules: true,
    cached: true
  }
};
