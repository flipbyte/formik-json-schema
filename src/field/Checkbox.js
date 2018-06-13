import React, { Component } from 'react';
import { getIn } from 'formik';

const Checkbox = ({ config, formikProps }) => {
    const { name, label, type, attributes, description } = config;
    const { values, errors, handleChange } = formikProps;

    const error = getIn(errors, name);

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <div className="form-check">
                <label htmlFor={ name } className="form-check-label">
                    <input
                        id={ name }
                        name={ name }
                        className={ 'form-check-input ' + (!!error ? 'is-invalid': '') }
                        type="checkbox"
                        checked={ getIn(values, name) }
                        onChange={ handleChange }
                        { ...attributes } /> { description }
                </label>
                { !!error && (
                    <div className="invalid-feedback">
                        { error }
                    </div>
                ) }
            </div>
        </div>
    );
}

export default Checkbox;
