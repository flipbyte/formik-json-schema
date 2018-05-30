var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
    }
    ]
  },
  resolve: {
      alias: {
          'react': path.resolve(__dirname, './node_modules/react') ,
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
          'formik': path.resolve(__dirname, './node_modules/formik'),
      }
  },
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'formik': 'commonjs formik'
  }
};
