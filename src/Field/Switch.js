import React from 'react';
import { default as ReactSwitch } from "react-switch";
import { changeHandler, setFieldValueWrapper } from '../utils';

const Switch = ({ config, formik, value = false, error }) => {
    const {
        name,
        fieldClass = 'switch'
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
