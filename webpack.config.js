const path = require('path')

module.exports = {
    context: __dirname,
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: [/\.js$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    
                }
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ]
            },
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['*', '.js']
    }
}