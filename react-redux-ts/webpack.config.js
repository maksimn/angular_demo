const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
        filename: "index.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "inline-source-map",
    watch: true,
    watchOptions: {
        aggregateTimeout: 200
    }
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
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    devtool: "inline-source-map",
    watch: true,
    watchOptions: {
        aggregateTimeout: 200
    }
};

module.exports = [clientDevBuild, serverDevBuild];