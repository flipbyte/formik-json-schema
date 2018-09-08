import React, { Component } from 'react';
import { getIn } from 'formik';

const Textarea = ({ config, formikProps }) => {
    const { name, label, type, attributes, rows } = config;
    const { values, errors, handleChange } = formikProps;

    const error = getIn(errors, name);

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <textarea
                id={ name }
                name={ name }
                className={ 'form-control ' + (!!error ? 'is-invalid': '') }
                value={ getIn(values, name, '') }
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

export default Textarea;
