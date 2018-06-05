import React, { Component } from 'react';
import { getIn } from 'formik';

const Radio = ({ config, formikProps }) => {
    const { name, type, attributes, options } = config;
    const { values } = formikProps;

    return options.map(( option ) => (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <div className="form-check" key={ option.value }>
                <label htmlFor={ name + '_' + option.value } className="form-check-label">
                    <input
                        name={ name }
                        type="radio"
                        className="form-check-input"
                        id={ name + '_' + option.value }
                        value={ option.value }
                        checked={ getIn(values, name) === option.value }
                        { ...attributes } /> { option.title }
                </label>
            </div>
        </div>
    ))
}

export default Radio;
