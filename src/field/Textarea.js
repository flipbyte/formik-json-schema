import React, { Component } from 'react';

const Textarea = ({ config, formikProps }) => {
    const { name, type, attributes, rows } = config;
    const { values, setFieldValue } = formikProps;

    return <textarea
                id={ name }
                name={ name }
                className="form-control"
                value={ values[name] }
                rows={ rows || 3 }
                onChange={ setFieldValue }
                { ...attributes } />

}

export default Textarea;
