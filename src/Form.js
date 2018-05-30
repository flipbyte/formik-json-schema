import React, { Component } from 'react';
import { Formik } from 'formik';
import { renderForm } from './registry';

const Form = ( props ) =>
    <Formik
      { ...props }
      render={ renderForm(props.schema) } />

export default Form;
