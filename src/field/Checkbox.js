import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler } from '../utils';

const Checkbox = ({ config, formikProps, submitCountToValidate }) => {
    const { name, label, type, attributes, description } = config;
    const { values, handleChange } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);

    return (
        <div className="form-group">
            <Label htmlFor={ name }>{ label }</Label>
            <div className="form-check">
                <label htmlFor={ name } className="form-check-label">
                    <input
                        id={ name }
                        name={ name }
                        className={ 'form-check-input ' + ( error ? 'is-invalid' : '' ) }
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
