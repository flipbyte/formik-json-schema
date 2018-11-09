import _ from 'lodash';
import Select from 'react-select';
import React, { Component } from 'react';

const prepareOptions = ( options ) =>
    _.reduce(options, (result, value) => {
        if(!_.isObject(value)) {
            result.push({ value: value, label: value })
        } else {
            result.push(value);
        }

        return result;
    }, [])

const ReactSelect = ({ config, formikProps }) => {
    const { name, label, options: initialOptions, defaultValue, multi } = config;
    const { values, errors, touched, setFieldValue, setFieldTouched } = formikProps;

    const options = prepareOptions(initialOptions);

    const error = _.get(errors, name, false);

    const selectedValue = _.get(values, name, defaultValue);
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
