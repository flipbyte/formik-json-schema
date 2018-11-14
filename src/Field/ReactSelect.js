import _ from 'lodash';
import React from 'react';
import Label from './Label';
import Select from 'react-select';
import ErrorMessage, { hasError } from './ErrorMessage';

const prepareOptions = ( options ) =>
    _.reduce(options, (result, value) => {
        if(!_.isObject(value) && !_.isEmpty(value)) {
            result.push({ value: value, label: value })
        } else {
            result.push(value);
        }

        return result;
    }, [])

const ReactSelect = ({ config, formikProps, submitCountToValidate }) => {
    const { name, label, options: initialOptions, defaultValue, multi, noOptionsMessage } = config;
    const { values, setFieldValue, setFieldTouched } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);

    const options = prepareOptions(initialOptions);

    const selectedValue = _.get(values, name, defaultValue);
    const selectedOption = options.filter(option => option.value == selectedValue);

    const conditionalProps = {};
    if(noOptionsMessage) {
        conditionalProps[noOptionsMessage] = noOptionsMessage;
    }

    return (
        <div className="form-group">
            <Label htmlFor={ name }>{ label }</Label>
            <Select
                id={ name }
                name={ name }
                options={ options }
                className={ error ? 'is-invalid' : '' }
                multi={ multi }
                onChange={ (value) => setFieldValue(name, value.value) }
                onBlur={ (value) => setFieldTouched(name, value.value) }
                value={ selectedOption }
                noOptionsMessage={ noOptionsMessage }
                { ...conditionalProps }
            />
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default ReactSelect;
