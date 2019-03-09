import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const Switch = ({ config, formik, value, error }) => {
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
    const { setFieldValue } = formik;

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <label className={ fieldClass + ( error ? ' is-invalid ' : '' ) }>
                <input type="checkbox"
                    className="switch-input"
                    defaultChecked={ value }
                    onClick={
                        () => changeHandler(setFieldValueWrapper(setFieldValue, name), formik, config, !value)
                    } />
                <span
                    className="switch-label"
                    data-on={ dataOn }
                    data-off={ dataOff }></span>
                <span className="switch-handle"></span>
            </label>
            <ErrorMessage name={ name } />
        </div>
    );
}

export default React.memo(Switch);
