import _ from 'lodash';
import React from 'react';
import Label from './Label';
import Select from 'react-select';
import ErrorMessage from './ErrorMessage';
import CreatableSelect from 'react-select/lib/Creatable';
import { changeHandler, setFieldValueWrapper, joinNames } from '../utils';
import FieldTemplate from '../FieldTemplate';

const prepareOptions = ( options ) =>
    _.reduce(options, (result, value) => {
        if(!_.isObject(value) && !_.isEmpty(value)) {
            result.push({ value: value, label: value })
        } else {
            result.push(value);
        }

        return result;
    }, [])

const getSelectedOptions = ( options, values, isCreatable ) => {
    const getSelectedOption = ( value ) => {
        const selectedOption = _.filter(options, _.matches({ value }));
        return !_.isEmpty(selectedOption)
            ? selectedOption
            : isCreatable ? [{ value, label: value }] : null;
    }

    if (values && !_.isEmpty(options)) {
        if(!_.isObject(values)) {
            return getSelectedOption(values)
        }

        return _.reduce(values, (result, value) => {
            const selectedOption = getSelectedOption(value);
            if(_.isEmpty(selectedOption)) {
                return result;
            }

            return _.union(result, selectedOption);
        }, [])
    }

    return null;
}

const ReactSelect = ({ config, formik, value, error }) => {
    const {
        name,
        label,
        isMulti,
        defaultValue,
        labelClass = '',
        fieldClass = '',
        noOptionsMessage,
        isDisabled = false,
        isClearable = false,
        isCreatable = false,
        options: initialOptions,
        formGroupClass = 'form-group',
        template: Template = FieldTemplate
    } = config;
    const { setFieldValue, handleBlur } = formik;
    const options = prepareOptions(initialOptions);
    const selectedValue = value || defaultValue;
    const selectedOption = getSelectedOptions(options, selectedValue, isCreatable);

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
                formik,
                config,
                selectedValues
            );
        },
        onBlur: (event) => {
            return handleBlur({
                ...event,
                target: {
                    ...event.target,
                    name
                }
            });
        }
    };
    selectProps = _.assign(selectProps, { options });

    if(selectedOption) {
        selectProps.value = selectedOption;
    }

    const SelectComponent = isCreatable ? CreatableSelect : Select;
    return (
        <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
            <SelectComponent { ...selectProps } />
        </Template>
    );
}

export default React.memo(ReactSelect);
