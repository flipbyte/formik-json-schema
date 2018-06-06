import React, { Component } from 'react';
import { getIn } from 'formik';

const Text = ({ config, formikProps }) => {
    const { name, label, type, renderer, attributes, fieldType } = config;
    const { values, handleChange } = formikProps;

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <input
                id={ name }
                name={ name }
                type={ fieldType }
                className="form-control"
                value={ getIn(values, name) }
                onChange={ handleChange }
                { ...attributes } />
        </div>
    );
}

export default Text;
