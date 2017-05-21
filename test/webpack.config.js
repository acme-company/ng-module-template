const helpers = require('../helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [helpers.root('src'), helpers.root('node_modules')]
  },

  module: {
    rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
            helpers.root('node_modules/@angular')
          ]
        },      
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('test', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ],
        exclude: [/\.e2e\.ts$/]
      },
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: []
        },      
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: []
        },
        {
          test: /\.css$/,
          loader: ['to-string-loader', 'css-loader'],
          exclude: []
        },
         
        {
          test: /\.scss$/,
          loader: ['raw-loader', 'sass-loader'],
          exclude: []
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: helpers.root('src'),
          query: { esModules: true },
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }        
    ]
  },

  plugins: [
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('../src'), // location of your src
      {} // a map of your routes
    )
  ],
  performance: {
      hints: false
  },
    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }  
}