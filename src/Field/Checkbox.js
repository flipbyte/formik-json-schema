import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames } from '../utils';

const Checkbox = ({ config, formikProps, submitCountToValidate }) => {
    const {
        name,
        label,
        type,
        attributes,
        description,
        labelClass = '',
        fieldClass = 'form-check-input',
        formGroupClass = 'form-group',
        formCheckClass = 'form-check'
    } = config;
    const { values, handleChange } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <div className={ formCheckClass }>
                <label htmlFor={ name } className="form-check-label">
                    <input
                        id={ name }
                        name={ name }
                        className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                        type="checkbox"
                        checked={ _.get(values, name) }
                        onChange={ changeHandler.bind(this, handleChange, formikProps, config) }
                        { ...attributes } /> { description }
                </label>
                <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
            </div>
        </div>
    );
}

export default Checkbox;
