const {
  merge,
} = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.css$/,
      use: 'ignore-loader',
    },
    {
      test: /\.less$/,
      use: 'ignore-loader',

    },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'react',
        // entry:'https://11.url.cn/nowlib/16.2.0/react.min.js',
        entry: 'https://now8.gtimg.com/now/lib/16.2.0/react.min.js',
        global: 'React',
      },
      {
        module: 'react-dom',
        // entry:'https://11.url.cn/nowlib/16.2.0/react-dom.min.js',
        entry: 'https://now8.gtimg.com/now/lib/16.2.0/react-dom.min.js',
        global: 'React',
      },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      // cacheGroups: {
      //     commons: {
      //         test: /(react|react-dom)/,
      //         name: 'vendors',
      //         chunks: 'all'
      //     }
      // }
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
