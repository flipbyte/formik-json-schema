import React, { Component } from 'react';
import { getIn } from 'formik';

const Textarea = ({ config, formikProps }) => {
    const { name, label, type, attributes, rows } = config;
    const { values, handleChange } = formikProps;

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <textarea
                id={ name }
                name={ name }
                className="form-control"
                value={ getIn(values, name) }
                onChange={ handleChange }
                { ...attributes } />
        </div>
    );
}

export default Textarea;
