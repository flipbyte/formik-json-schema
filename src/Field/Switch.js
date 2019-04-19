import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { default as ReactSwitch } from "react-switch";
import { changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const Switch = ({ config, formik, value = false, error }) => {
    const {
        name,
        label,
        labelClass = '',
        fieldClass = 'switch',
        formGroupClass = 'form-group'
    } = config;
    const { setFieldValue } = formik;

    return (
        <label className={ fieldClass + ( error ? ' is-invalid ' : '' ) }>
            <ReactSwitch
                checked={ value }
                onChange={ changeHandler.bind(this, setFieldValueWrapper(setFieldValue, name), formik, config) }
            />
        </label>
    );
}

export default React.memo(Switch);
