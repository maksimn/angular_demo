var path = require('path');

module.exports = {
    entry: {
    },
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
    }
};
