import _ from 'lodash';
import React, { Component } from 'react';
import { Formik, withFormik } from 'formik';
import { render, setConfig } from './registry';
import messages from './messages';

const Validator = require('validatorjs');

const validate = ( validationSchema = {}, values ) => {
    let validation = new Validator(values, validationSchema, messages);
    if(!validation.fails()) {
        return {};
    }

    return validation.errors.all();
}

const Form = ({
    schema: { validation, form },
    ...props
}) => {
    return <Formik
        { ...props }
        validate={ validate.bind(this, validation || {}) }
        render={ render.bind(this, form) } />
}

export default Form;
