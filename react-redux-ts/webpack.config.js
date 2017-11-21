var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'client/index.ts'),
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'client')
    }
};
