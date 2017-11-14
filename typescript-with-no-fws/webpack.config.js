var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'scripts'),
    entry: {
      register: './register.ts',
      login: './login.ts',
      photos: './photos.ts'
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
      filename: '[name].js',
      path: path.resolve(__dirname, 'scripts')
    }
};
