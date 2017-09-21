require('postcss-svg');
require('postcss-import');
require('postcss-partial-import');
require('postcss-mixins');
require('postcss-simple-vars');
require('postcss-conditionals');
require('postcss-custom-media');
require('postcss-media-minmax');
require('postcss-color-function');
require('postcss-nested');
require('postcss-property-lookup');
require('postcss-extend');
require('autoprefixer');
require('postcss-discard-empty');
require('postcss-inline-svg');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const glob = require('glob');

module.exports = {
  entry: glob.sync('./src/components/**/?(*.js|*.jsx)').reduce((result, item) => (
    Object.assign({}, result, {
      [item.replace(/\.[^/.]+$/, '').replace('./src/components/', './')]: item,
    })
  ), {}),
  output: {
    filename: '[name].js',
    path: path.resolve('./lib'),
    library: 'quark',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
      umd: 'prop-types',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /(node_modules|lib|example)/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.pcss$/,
        exclude: /(node_modules|lib|example)/,
        use: [
          'style-loader',
          'postcss-loader',
        ],
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /(node_modules|lib|example)/,
        use: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|lib|example)/,
        use: 'babel-loader',
      },
      {
        test: /\.svg/,
        exclude: /(node_modules|lib|example)/,
        use: 'url-loader',
      },
    ],
  },
};
