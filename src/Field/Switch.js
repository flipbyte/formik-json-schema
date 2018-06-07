import React, { Component } from 'react';
import { getIn } from 'formik';

const Switch = ({ config, formikProps }) => {
    const { name, label, attributes, htmlClass, dataOn, dataOff } = config;
    const { values, setFieldValue } = formikProps;

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <label className={ 'switch ' + htmlClass }>
                <input type="checkbox"
                    className="switch-input"
                    defaultChecked={ getIn(values, name) }
                    onClick={ () => setFieldValue(name, !getIn(values, name)) } />
                <span
                    className="switch-label"
                    data-on={ dataOn }
                    data-off={ dataOff }></span>
                <span className="switch-handle"></span>
            </label>
        </div>
    );
}

export default Switch;
