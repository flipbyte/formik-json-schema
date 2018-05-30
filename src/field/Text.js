import React, { Component } from 'react';

const Text = ({ config, params }) => {
    const { name, type, attributes } = config;
    const { values, setFieldValue } = params;

    return <input
                id={ name }
                name={ name }
                type={ type }
                className="form-control"
                value={ values[config.name] }
                onChange={ setFieldValue }
                { ...attributes } />

}

export default Text;
