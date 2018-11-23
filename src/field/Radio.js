import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames } from '../utils';

const Radio = ({ config, formikProps, submitCountToValidate, containerName }) => {
    const {
        name: elementName,
        type,
        attributes,
        options,
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
            { options.map(( option ) =>
                <div className="form-check" key={ option.value }>
                    <label htmlFor={ name + '_' + option.value } className="form-check-label">
                        <input
                            name={ name }
                            type="radio"
                            className={ inputClass + ( error ? ' is-invalid ' : '' ) }
                            id={ name + '_' + option.value }
                            value={ option.value }
                            checked={ getIn(values, name) === option.value }
                            onChange={ changeHandler.bind(this, handleChange, formikProps, config) }
                            { ...attributes } /> { option.title }
                    </label>
                </div>
            ) }
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default Radio;
