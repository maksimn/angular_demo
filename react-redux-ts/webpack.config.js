const path = require('path');
const nodeExternals = require('webpack-node-externals');

const clientDevBuild = {
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

const serverDevBuild = {
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, 'app.ts'),
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
        filename: "app.js",
        path: __dirname,
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    devtool: "inline-source-map"
};

module.exports = [clientDevBuild, serverDevBuild];