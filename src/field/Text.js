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
        formGroupClass = 'form-group',
        inputGroupClass = 'input-group'
    } = config;

    const { values, errors, setFieldValue, handleChange } = formikProps;
    const error = getIn(errors, name);
    const isInputGroup = icon ? true : false;

    return (
        <div className={ formGroupClass }>
            { !!label && <label>{ label }</label> }
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
                        className={ 'form-control ' + (!!error ? 'is-invalid': '') }
                        value={ getIn(values, name, '') }
                        onChange={ handleChange }
                        { ...attributes } />
                </div> :
                <input
                    id={ name }
                    name={ name }
                    type={ fieldType }
                    className={ 'form-control ' + (!!error ? 'is-invalid': '') }
                    value={ getIn(values, name, '') }
                    onChange={ handleChange }
                    { ...attributes } />
            }

            { !!error && (
                <div className="invalid-feedback">
                    { error }
                </div>
            ) }
        </div>
    );
}

export default Text;
