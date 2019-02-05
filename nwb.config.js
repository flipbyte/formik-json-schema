module.exports = {
    type: 'react-component',
    npm: {
        esModules: true,
        umd: {
            global: 'FormikJson',
            externals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                formik: 'Formik',
            }
        }
    }
}
