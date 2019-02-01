import _ from 'lodash';
import React from 'react';
import Label from './Label';
import Select from 'react-select';
import ErrorMessage from './ErrorMessage';
import CreatableSelect from 'react-select/lib/Creatable';
import { hasError, changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const prepareOptions = ( options ) =>
    _.reduce(options, (result, value) => {
        if(!_.isObject(value) && !_.isEmpty(value)) {
            result.push({ value: value, label: value })
        } else {
            result.push(value);
        }

        return result;
    }, [])

const getSelectedOptions = ( options, values ) =>
    values && !_.isEmpty(options)
        ? _.isObject(values)
            ? _.filter(options, (option) => _.includes(values, option.value))
            : _.filter(options, (option) => option.value == values)
        : null;

const ReactSelect = ({ config, formikProps, submitCountToValidate }) => {
    const {
        name,
        label,
        options: initialOptions,
        defaultValue,
        isMulti,
        isCreatable = false,
        isClearable = false,
        isDisabled = false,
        labelClass = '',
        fieldClass = '',
        formGroupClass = 'form-group',
        noOptionsMessage,
    } = config;
    const { values, setFieldValue } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);
    const options = prepareOptions(initialOptions);
    const selectedValue = _.get(values, name, defaultValue);
    const selectedOption = getSelectedOptions(options, selectedValue);

    var selectProps = {
        name,
        isMulti,
        noOptionsMessage,
        isClearable,
        isDisabled,
        id: name,
        className: fieldClass + ( error ? ' is-invalid ' : '' ),
        onChange: ( selectedOptions ) => {
            const selectedValues = !isMulti ? selectedOptions.value : _.mapValues(selectedOptions, 'value');
            return changeHandler(
                setFieldValueWrapper(setFieldValue, name),
                formikProps,
                config,
                selectedValues
            );
        }
    };
    selectProps = _.assign(selectProps, { options });

    if(selectedOption) {
        selectProps.value = selectedOption;
    }

    const SelectComponent = isCreatable ? CreatableSelect : Select;
    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <SelectComponent { ...selectProps } />
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default ReactSelect;
