import React, { Component } from 'react';

const Checkbox = ({ config, formikProps }) => {
    const { name, label, type, attributes, description } = config;
    const { values } = formikProps;

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <div className="form-check">
                <label htmlFor={ name } className="form-check-label">
                    <input
                        id={ name }
                        name={ name }
                        className="form-check-input"
                        type="checkbox"
                        checked={ values[name] }
                        { ...attributes } /> { description }
                </label>
            </div>
        </div>
    );
}

export default Checkbox;
