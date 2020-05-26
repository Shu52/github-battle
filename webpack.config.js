const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './app/index.js',
    output: {
        // two underscores for __dirname
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module:{
        //transformations!
        rules: [
            //use babel loader on every js file
            { test: /\.(js)$/, use: 'babel-loader' },
            // use style and css loader on all css files
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
}