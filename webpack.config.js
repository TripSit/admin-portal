'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const Html = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const Brotli = require('brotli-webpack-plugin');

const base = {
  context: path.resolve('src'),
  entry: [
    'bootstrap/dist/css/bootstrap.css',
    'core-js',
    './index.jsx',
  ],
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: require.resolve('babel-loader'),
          options: { sourceMap: true },
        }],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtract.loader,
          require.resolve('css-loader'),
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: require.resolve('file-loader'),
      },
    ],
  },
  plugins: [
    new Html({
      template: path.resolve('src/template.html'),
      inject: 'head',
    }),
    new MiniCssExtract(),
  ],
};

const environments = {
  development: {
    mode: 'development',
    watchOptions: {
      ignored: ['node_modules/**'],
    },
    devtool: 'source-map',
    devServer: {
      compress: false,
      port: 8880,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/graphql'],
          target: 'http://localhost:3000',
        },
      ],
    },
  },

  production: {
    mode: 'production',
    output: {
      path: path.resolve('dist'),
      filename: 'main.[contenthash].js',
    },
    plugins: [
      new Brotli(),
    ],
  },
};

module.exports = function webpackConfig() {
  return merge(base, environments[process.env.NODE_ENV] || environments.production);
};
