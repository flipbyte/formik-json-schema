import React, { Component } from 'react';
import { Formik } from 'formik';
import { render } from './registry';

const Form = ( props ) =>
    <Formik
        { ...props }
        render={ (formikprops) => render(props.schema, formikprops) } />

export default Form;
