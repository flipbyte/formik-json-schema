import React, { Component } from 'react';

const Text = ({ config, formikProps }) => {
    const { name, type, attributes } = config;
    const { values, handleChange } = formikProps;

    return <input
                id={ name }
                name={ name }
                type={ type }
                className="form-control"
                value={ values[name] }
                onChange={ handleChange }
                { ...attributes } />

}

export default Text;
