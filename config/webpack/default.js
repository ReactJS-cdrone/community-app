const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const context = path.resolve(__dirname, '../..');

module.exports = {
  context,
  entry: './src/client',
  module: {
    rules: [{
      test: /\.(jsx?|svg)$/,
      exclude: [
        /node_modules\/(?!appirio-tech.*|topcoder|tc-)/,
        /src\/assets\/fonts/,
      ],
      loader: 'babel-loader',
      /* NOTE: Babel configuration is taken from .babelrc, in general case.
       * For development Webpack build, however, Babel is configured directly
       * inside Webpack's development.js config. */
    }],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../build'),
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../../src/assets/mock-data'),
      to: path.resolve(__dirname, '../../build/mock-data'),
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        /* Some isomorphic code relies on this variable to determine, whether
         * it is executed client- or server-side. */
        FRONT_END: true,
      },
    }),
  ],
  resolve: {
    alias: {
      /* NOTE: Aliases related to .jsx and .jsx files are defined in Babel
       * config. */
      styles: path.resolve(__dirname, '../../src/styles'),
    },
    extensions: ['.js', '.json', '.jsx', '.scss'],
  },
};
