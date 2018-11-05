const path = require('path')

module.exports = {
    entry: {
        index: ["babel-polyfill", './src/index.js'],
        recipe: ["babel-polyfill", './src/recipe.js'],
        viewrecipe: ["babel-polyfill", './src/view-recipe.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        publicPath: "/scripts/"
    },
    devtool: "source-map",
    node: {
        fs: 'empty'
    }
}