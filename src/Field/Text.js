import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames } from '../utils';

const Text = ({ config, formik, submitCountToValidate }) => {
    const {
        name,
        label,
        type,
        attributes,
        fieldType,
        defaultValue,
        icon,
        labelClass = '',
        fieldClass = 'form-control',
        formGroupClass = 'form-group',
        inputGroupClass = 'input-group'
    } = config;

    const { values, setFieldValue, handleChange, handleBlur } = formik;
    const isInputGroup = icon ? true : false;
    const error = hasError(name, submitCountToValidate, formik);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            { isInputGroup ?
                <div className={ inputGroupClass }>
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className={ icon }></i>
                        </span>
                    </div>
                    <input
                        id={ name }
                        name={ name }
                        type={ fieldType }
                        className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                        value={ _.get(values, name, '') }
                        onChange={ changeHandler.bind(this, handleChange, formik, config) }
                        { ...attributes } />
                </div> :
                <input
                    id={ name }
                    name={ name }
                    type={ fieldType }
                    className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                    value={ _.get(values, name, '') }
                    onChange={ changeHandler.bind(this, handleChange, formik, config) }
                    { ...attributes } />
            }
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default Text;
