import _ from 'lodash';
import React from 'react';
import Label from './Label';
import Select from 'react-select';
import ErrorMessage from './ErrorMessage';
import AsyncSelect from 'react-select/lib/Async';
import { hasError, changeHandler, promiseHandler, setFieldValueWrapper, joinNames } from '../utils';

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
    const {
        name,
        label,
        options: initialOptions,
        defaultValue,
        multi,
        loadOptions,
        isAsync = false,
        defaultOptions = false,
        cacheOptions = false,
        labelClass = '',
        fieldClass = '',
        formGroupClass = 'form-group',
        noOptionsMessage,
    } = config;
    const { values, setFieldValue } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);
    const options = prepareOptions(initialOptions);
    const selectedValue = _.get(values, name, defaultValue);
    const selectedOption = options.filter(option => option.value == selectedValue);

    var selectProps = {
        id: name,
        name: name,
        className: fieldClass + ( error ? ' is-invalid ' : '' ),
        multi: multi,
        onChange: ( value ) => changeHandler(setFieldValueWrapper(setFieldValue, name), formikProps, config, value.value),
        value: selectedOption,
        noOptionsMessage: noOptionsMessage
    };

    var otherProps = isAsync ? {
        loadOptions: promiseHandler.bind(this, loadOptions, formikProps, config),
        cacheOptions,
        defaultOptions
    } : { options };
    selectProps = _.assign(selectProps, otherProps);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            { isAsync ? <AsyncSelect { ...selectProps } /> : <Select { ...selectProps } /> }
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default ReactSelect;
