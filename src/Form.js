import React, { Component } from 'react';
import { Formik, withFormik } from 'formik';
import { render, setConfig } from './registry';

const Form = ({ schema, apiUrl, ...props }) => {
    setConfig('apiUrl', apiUrl);

    return <Formik
        { ...props }
        render={ (formikprops) => render(schema, formikprops) } />
}

/*const Form = ({ schema, ...formikProps }) =>
    withFormik({ ...formikProps })(render(schema, formikProps));*/

export default Form;
