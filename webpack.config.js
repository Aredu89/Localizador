module.exports = {
    entry: './app_client/jsx/app.jsx',
    output: {
        path: __dirname + '/app_client/js/',
        filename: 'bundle.js'
    },
    devtool: '#sourcemap',
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader"
            }
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: {
            loader: "style-loader!css-loader"
            }
          }
        ]
    }
}