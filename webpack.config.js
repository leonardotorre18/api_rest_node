const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "production",
  entry: path.join(__dirname, './src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {from: 'src/public', to: ''}
      ]
    })
  ],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: 'ts-loader',
        exclude: [/node_modules/, /test/]
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx', '.ts', '.js'
    ]
  },
  externals: [webpackNodeExternals()]
}