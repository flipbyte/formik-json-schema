import _ from 'lodash';
import React, { Component } from 'react';

const Textarea = ({ config, formikProps }) => {
    const { name, label, type, attributes, rows } = config;
    const { values, errors, handleChange } = formikProps;

    const error = _.get(errors, name, false);

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <textarea
                id={ name }
                name={ name }
                className={ 'form-control ' + (!!error ? 'is-invalid': '') }
                value={ _.get(values, name, '') }
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
