import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const Switch = ({ config, formikProps, submitCountToValidate }) => {
    const {
        name,
        label,
        attributes,
        dataOn,
        dataOff,
        labelClass = '',
        inputClass = 'switch',
        formGroupClass = 'form-group'
    } = config;
    const { values, setFieldValue } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <label className={ inputClass + ( error ? ' is-invalid ' : '' ) }>
                <input type="checkbox"
                    className="switch-input"
                    defaultChecked={ getIn(values, name) }
                    onClick={
                        () => changeHandler(setFieldValueWrapper(setFieldValue, name), formikProps, config, !getIn(values, name))
                    } />
                <span
                    className="switch-label"
                    data-on={ dataOn }
                    data-off={ dataOff }></span>
                <span className="switch-handle"></span>
            </label>
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default Switch;
