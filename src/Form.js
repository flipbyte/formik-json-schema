import React, { Component } from 'react';
import { Formik, withFormik } from 'formik';
import { render } from './registry';

const Form = ({ schema, ...props }) =>
    <Formik
        { ...props }
        render={ (formikprops) => render(schema, formikprops) } />


/*const Form = ({ schema, ...formikProps }) =>
    withFormik({ ...formikProps })(render(schema, formikProps));*/

export default Form;
