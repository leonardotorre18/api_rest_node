const path = require('path');
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.join(__dirname, './src', 'index.ts'),
  mode: "production",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: 'ts-loader',
        exclude: [/node_modules/, /test/]
      }
    ]
  },
  externals: [webpackNodeExternals()]
}