var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: path.resolve(__dirname, 'components') + '/Posts.jsx',

  output: {
      path: path.resolve(__dirname, 'build') + '/app',
      filename: 'bundle.js',
      publicPath: '/app/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js|\.jsx?/,
        loaders: 'babel-loader',
        include: path.resolve(__dirname, 'components')
      },
      {
        test: /\.css|\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
    // require('style.less')
    // --> <link ...
  }
};
