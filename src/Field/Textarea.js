import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames } from '../utils';

const Textarea = ({ config, formikProps, submitCountToValidate }) => {
    const {
        name,
        label,
        type,
        attributes,
        rows,
        labelClass = '',
        inputClass = 'form-control',
        formGroupClass = 'form-group'
    } = config;
    const { values, handleChange } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <textarea
                id={ name }
                name={ name }
                className={ inputClass + ( error ? ' is-invalid ' : '' ) }
                value={ _.get(values, name, '') }
                onChange={ changeHandler.bind(this, handleChange, formikProps, config) }
                { ...attributes } />
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default Textarea;
