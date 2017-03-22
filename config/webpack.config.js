const path = require('path');

module.exports = {
  entry: './src/reference.js',
  output: {
    path: path.resolve(__dirname, '..', 'lib'),
    filename: 'dist.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
  }
}
