const webpack = require('webpack');
const path = require('path');
const ngTools = require('@ngtools/webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
   devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    app: __dirname + '/src/main.ts',
    polyfills: __dirname + '/src/polyfills.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundles/[hash]-[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    // new ngTools.AotPlugin({
    //   tsConfigPath: 'tsconfig.json',
    //   entryModule: path.resolve(__dirname, 'src/app/app.module#AppModule')
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug


      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      },
      minimize: true,
      sourceMap: true 
    }),

    new CommonsChunkPlugin({
      names: [ "app", "polyfills"],
       minChunks: Infinity  
    }),

    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/index.html',
      template: __dirname + '/src/index.html'
    })

  ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' }, { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] }
    ]
  }
}
