const conf = require('./base.webpack.config'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  WebpackCleanPlugin = require('webpack-clean-plugin');

conf.module.rules = [
  {
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader'
  },
  {
      test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: "css-loader" 
        }, {
          loader: "sass-loader"
        }]
  },
  { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
];

conf.devtool = false;

conf.plugins = [
  new WebpackCleanPlugin({
    on: "emit",
    path: ['./public']
  }),
  ...conf.plugins,
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
  })
]

module.exports = conf;
