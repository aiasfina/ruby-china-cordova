module.exports = {
  entry: './www/src/entry.js',
  output: {
    path: './www/scripts',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
　　　　　test: /\.(png|jpg)$/,
　　　　　loader: 'url-loader?limit=8192'
　　　　}
    ]
  }
}