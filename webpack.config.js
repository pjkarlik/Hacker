'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  name: 'hacker-demo',
  target: 'web',
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  entry: './src/index.js',
  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
    modulesDirectories: ['node_modules', 'components'],
    fallback: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [/src/],
        exclude: /node_modules/,
        query:
          {
            presets: [
              require.resolve('babel-preset-es2015-loose'),
              require.resolve('babel-preset-react')
            ],
            plugins: [
              require.resolve('babel-plugin-transform-object-assign')
            ]
          }
      },
      {
        extractTextPlugin: true,
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!less',
        { publicPath: '../' })
      },
      {
        test: /\.(svg|png|gif|cur|jpg)$/,
        loader: 'file?name=images/[name]__[hash:base64:5].[ext]!' +
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name]_[hash:base64:5].[ext]'
      }
    ],
    preLoaders: [
      { test: /\.js$/,
        loader: 'eslint-loader'
      }
    ]
  },
  postcss: [
    AutoPrefixer
  ],
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'the Hacker',
      template: './src/template.ejs',
      inject: 'body'
    })
  ]
};

module.exports = config;
