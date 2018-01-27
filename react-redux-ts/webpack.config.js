const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const clientDevBuild = {
    entry: path.resolve(__dirname, 'src/client/index.tsx'),
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
        filename: isProd ? "index.min.js" : "index.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "inline-source-map",
    watch: !isProd,
    watchOptions: {
        aggregateTimeout: 200
    },
    plugins: isProd ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })
    ] : []
};

const serverDevBuild = {
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, 'src/app.ts'),
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    devtool: "inline-source-map",
    watch: !isProd,
    watchOptions: {
        aggregateTimeout: 200
    }
};

module.exports = [clientDevBuild, serverDevBuild];