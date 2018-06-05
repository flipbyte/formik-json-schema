import React, { Component } from 'react';
import { getIn } from 'formik';

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
                        checked={ getIn(values, name) }
                        { ...attributes } /> { description }
                </label>
            </div>
        </div>
    );
}

export default Checkbox;
