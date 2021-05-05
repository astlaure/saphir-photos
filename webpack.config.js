require('dotenv').config();
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = [
  {
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve('bin'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    mode: 'development',
    module: {
      rules: [
        { test: /\.tsx?$/, use: 'babel-loader' },
      ],
    },
    target: 'node',
    node: false,
    plugins: [],
    devtool: 'source-map',
  },
  {
    entry: ['./web/scripts/main.js', './web/css/style.css'],
    output: {
      filename: 'js/main.js',
      path: path.resolve('public'),
      publicPath: process.env.APP_URL,
    },
    mode: 'development',
    module: {
      rules: [
        // { test: /\.tsx?$/, use: 'babel-loader' },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'resolve-url-loader',
            { loader: 'postcss-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: '[path][name].[ext]',
              context: './web/images',
              outputPath: '/images',
            },
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
      new webpack.DefinePlugin({
        ROOT_APP_URL: JSON.stringify(process.env.APP_URL),
      }),
    ],
    devtool: 'source-map',
  }
];
