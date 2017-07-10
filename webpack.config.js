var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "./static/comments/js/posts"
  ],
  output: {
  //  path: path.join(__dirname, 'build'),
    path: path.join(__dirname, './static/comments/build/'),
    filename: "bundle.js",
    publicPath: './static/comments/build/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, './static/comments/js'),
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
