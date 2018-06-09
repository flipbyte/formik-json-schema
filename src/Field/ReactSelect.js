import React, { Component } from 'react';
import { getIn } from 'formik';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const ReactSelect = ({ config, formikProps }) => {
    const { name, label, options, multi } = config;
    const { values, errors, touched, setFieldValue, setFieldTouched } = formikProps;

    const error = getIn(errors, name);
    const blur = getIn(touched, name);

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <Select
                id={ name }
                name={ name }
                options={ options }
                multi={ multi }
                onChange={ (value) => setFieldValue(name, value) }
                onBlur={ (value) => setFieldTouched(name, value) }
                value={ getIn(values, name) }
            />
            { !!error && blur && (
                <div className="invalid-feedback">
                    { error }
                </div>
            ) }
        </div>
    );
}

export default ReactSelect;
