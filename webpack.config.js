var path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components|build)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
            test: /\.css$/,
            include: /node_modules/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        }]
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        formik: {
            root: 'Formik',
            commonjs2: 'formik',
            commonjs: 'formik',
            amd: 'formik'
        },
        lodash: {
            root: '_',
            commonjs2: 'lodash',
            commonjs: 'lodash',
            amd: 'lodash'
        },
        validatorjs: {
            root: 'ValidatorJS',
            commonjs2: 'validatorjs',
            commonjs: 'validatorjs',
            amd: 'validatorjs'
        },
        codemirror: {
            commonjs: 'codemirror',
            commonjs2: 'codemirror',
            amd: 'codemirror',
            root: 'CodeMirror'
        }
    }
};
