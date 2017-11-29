var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'client/index.tsx'),
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'client')
    },
    devtool: "inline-source-map"
};