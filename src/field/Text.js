import React, { Component } from 'react';

const Text = ({ config, formikProps }) => {
    const { name, label, type, attributes } = config;
    const { values, handleChange } = formikProps;

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <input
                id={ name }
                name={ name }
                type={ type }
                className="form-control"
                value={ values[name] }
                onChange={ handleChange }
                { ...attributes } />
        </div>
    );
}

export default Text;
