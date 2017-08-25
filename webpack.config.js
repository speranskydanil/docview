const path = require('path')

module.exports = {
  entry: './src/js/docview.js',

  output: {
    filename: 'docview.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-runtime'],
            cacheDirectory: true
          }
        }
      }
    ]
  }
}

