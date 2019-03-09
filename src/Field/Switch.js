import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import { default as ReactSwitch } from "react-switch";
import ErrorMessage from './ErrorMessage';
import { changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const Switch = ({ config, formik, value, error }) => {
    const {
        name,
        label,
        labelClass = '',
        fieldClass = 'switch',
        formGroupClass = 'form-group'
    } = config;
    const { setFieldValue } = formik;

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <label className={ fieldClass + ( error ? ' is-invalid ' : '' ) }>
                <ReactSwitch onChange={
                    () => changeHandler(setFieldValueWrapper(setFieldValue, name), formik, config, !value)
                } checked={ value } />
            </label>
            <ErrorMessage name={ name } />
        </div>
    );
}

export default React.memo(Switch);
