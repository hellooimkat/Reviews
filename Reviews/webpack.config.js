const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: [`${SRC_DIR}/index.js`, `${SRC_DIR}/scss/main.scss`],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  plugins: [
    // new NodemonPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3004,
      server: { baseDir: [DIST_DIR] }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-3']
        }
      },
      {
        test: /\.scss?/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
