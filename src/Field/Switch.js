import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const Switch = ({ config, formik, submitCountToValidate }) => {
    const {
        name,
        label,
        attributes,
        dataOn,
        dataOff,
        labelClass = '',
        fieldClass = 'switch',
        formGroupClass = 'form-group'
    } = config;
    const { values, setFieldValue } = formik;
    const error = hasError(name, submitCountToValidate, formik);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <label className={ fieldClass + ( error ? ' is-invalid ' : '' ) }>
                <input type="checkbox"
                    className="switch-input"
                    defaultChecked={ getIn(values, name) }
                    onClick={
                        () => changeHandler(setFieldValueWrapper(setFieldValue, name), formik, config, !getIn(values, name))
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
