'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.

function isVendor({ resource }) {
  return resource &&
    (resource.indexOf('node_modules') + 1);
}

const config = {
  stats: {
    warnings: false
  },
  cache: true,
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      require.resolve('./polyfills'),
      paths.appIndexJs
    ],
    dev: [
      require.resolve('react-dev-utils/webpackHotDevClient'), //dev only
      require.resolve('react-error-overlay'), //dev-only
    ]
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [],
  },
  plugins: [],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
};

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: isVendor,
  
}));
config.entry.vendor = ['react'];

config.plugins.push(new InterpolateHtmlPlugin(env.raw));

var sortOrder = ['vendor', 'dev', 'app'];
const sortFn = (a, b) => sortOrder.indexOf(a.names[0]) - sortOrder.indexOf(b.names[0]);
config.plugins.push(new HtmlWebpackPlugin({
  inject: true,
  template: paths.appHtml,
  chunksSortMode: sortFn
}));

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.DefinePlugin(env.stringified));
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new CaseSensitivePathsPlugin());
config.plugins.push(new WatchMissingNodeModulesPlugin(paths.appNodeModules));

const exclude = [
  /\.html$/,
  /\.json$/
];

// First, run the linter.
// It's important to do this before Babel processes the JS.
exclude.push(/\.(js|jsx)$/);
config.module.rules.push({
  test: /\.(js|jsx)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        formatter: eslintFormatter,
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  include: paths.appSrc,
});

config.module.rules.push({
  test: /\.(js|jsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: true,
  },
});

config.module.rules.push({
  exclude: exclude,
  loader: require.resolve('file-loader'),
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
});

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
exclude.push(
  /\.bmp$/,
  /\.gif$/,
  /\.jpe?g$/,
  /\.png$/,
  /\.svg$/
);
config.module.rules.push({
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 1000,
    name: 'static/media/[name].[hash:8].[ext]',
  },
});

// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use a plugin to extract that CSS to a file, but
// in development "style" loader enables hot editing of CSS.
/*
exclude.push(/\.css$/);
config.module.rules.push({
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ],
});*/

module.exports = config;