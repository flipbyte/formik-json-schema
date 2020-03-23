import _ from 'lodash';
import React, { useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { changeHandler, setFieldValueWrapper } from '../utils';

const prepareOptions = ( options ) => (
    _.reduce(options, (result, value) => {
        if(!_.isObject(value) && !_.isEmpty(value)) {
            result.push({ value: value, label: value })
        } else {
            result.push(value);
        }

        return result;
    }, [])
);

const getSelectedOptions = ( options, values, isCreatable ) => {
    const getSelectedOption = ( value ) => {
        const selectedOption = _.filter(options, _.matches({ value }));
        return !_.isEmpty(selectedOption)
            ? selectedOption
            : isCreatable ? [{ value, label: value }] : null;
    }

    if (values) {
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
        isMulti,
        defaultValue,
        fieldClass = '',
        noOptionsMessage,
        isDisabled = false,
        isClearable = false,
        isCreatable = false,
        options: initialOptions,
        ...attributes
    } = config;
    const { setFieldValue, handleBlur } = formik;
    const options = prepareOptions(initialOptions);
    const selectedValue = value || defaultValue;
    const selectedOption = getSelectedOptions(options, selectedValue, isCreatable);
    const [inputValue, setInputValue] = useState('');

    var selectProps = {
        name,
        isMulti,
        noOptionsMessage,
        isClearable,
        isDisabled,
        id: name,
        inputValue,
        className: fieldClass + ( error ? ' is-invalid ' : '' ),
        onChange: ( selectedOptions ) => {
            const selectedValues = !isMulti
                ? selectedOptions.value
                : _.reduce(selectedOptions, (result, option) => [ ...result, option.value ], []);


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
        },
        onInputChange: (inputValue) => {
            changeHandler(setInputValue, formik, config, inputValue, 'onInputChange');
        },
        onKeyDown: (event) => {
            if (!isMulti || !inputValue || selectedValue.indexOf(inputValue) > -1) {
                return;
            }

            switch (event.key) {
                case 'Enter':
                case 'Tab':
                    changeHandler(
                        setFieldValueWrapper(setFieldValue, name),
                        formik,
                        config,
                        [ ...selectedValue, inputValue ],
                        'onChange'
                    );
                    setInputValue('');
                    event.preventDefault();
            }
        },
        ...attributes
    };
    selectProps = _.assign(selectProps, { options });

    if (selectedOption) {
        selectProps.value = selectedOption;
    }

    const SelectComponent = isCreatable ? CreatableSelect : Select;
    return <SelectComponent { ...selectProps } />;
}

export default React.memo(ReactSelect);
