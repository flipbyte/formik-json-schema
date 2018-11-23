import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames } from '../utils';

const Checkbox = ({ config, formikProps, submitCountToValidate, containerName }) => {
    const {
        name: elementName,
        label,
        type,
        attributes,
        description,
        prefixContainerName = false,
        labelClass = '',
        inputClass = 'form-check-input',
        formGroupClass = 'form-group'
    } = config;
    const { values, handleChange } = formikProps;
    const name = prefixContainerName && containerName ? joinNames(containerName, elementName) : elementName;
    const error = hasError(name, submitCountToValidate, formikProps);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <div className="form-check">
                <label htmlFor={ name } className="form-check-label">
                    <input
                        id={ name }
                        name={ name }
                        className={ inputClass + ( error ? ' is-invalid ' : '' ) }
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
