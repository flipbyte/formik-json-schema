import React, { Component } from 'react';
import { getIn } from 'formik';

import Select from 'react-select';

const ReactSelect = ({ config, formikProps }) => {
    const { name, label, options, defaultValue, multi } = config;
    const { values, errors, touched, setFieldValue, setFieldTouched } = formikProps;

    const error = getIn(errors, name);
    const blur = getIn(touched, name);

    const selectedValue = getIn(values, name, defaultValue);
    const selectedOption = options.filter(option => option.value == selectedValue);

    return (
        <div className="form-group">
            { !!label && <label>{ label }</label> }
            <Select
                id={ name }
                name={ name }
                options={ options }
                className={ (!!error ? 'is-invalid': '') }
                multi={ multi }
                onChange={ (value) => setFieldValue(name, value.value) }
                onBlur={ (value) => setFieldTouched(name, value.value) }
                value={ selectedOption }
            />
            { !!error && (
                <div className="invalid-feedback">
                    { error }
                </div>
            ) }
        </div>
    );
}

export default ReactSelect;
