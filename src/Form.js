import React from 'react';
import { Formik } from 'formik';
import messages from './messages';
import Element from './Element';

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
    initialValues = {},
    ...props
}) =>
    <Formik
        { ...props }
        initialValues={ initialValues }
        validate={ validate.bind(this, validation || {}) }
        render={ props => <Element config={ form } /> } />

export default Form;
