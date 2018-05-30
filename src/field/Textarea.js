import React, { Component } from 'react';

const Textarea = ({ config, params }) => {
    const { name, type, attributes, rows } = config;
    const { values, setFieldValue } = params;

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
