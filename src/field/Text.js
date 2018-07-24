import React, { Component } from 'react';
import { getIn } from 'formik';

const Text = ({ config, formikProps }) => {
    const {
        name,
        label,
        type,
        renderer,
        attributes,
        fieldType,
        defaultValue,
        icon,
        wrapperClass = 'form-group'
    } = config;
    const { values, errors, setFieldValue, handleChange } = formikProps;

    const error = getIn(errors, name);

    return (
        <div className={ wrapperClass }>
            { !!label && <label>{ label }</label> }
            { !!icon &&
                <span className="input-group-addon">
                    <i className={ icon }></i>
                </span>
            }
            <input
                id={ name }
                name={ name }
                type={ fieldType }
                className={ 'form-control ' + (!!error ? 'is-invalid': '') }
                value={ getIn(values, name) }
                onChange={ handleChange }
                { ...attributes } />

            { !!error && (
                <div className="invalid-feedback">
                    { error }
                </div>
            ) }
        </div>
    );
}

export default Text;
