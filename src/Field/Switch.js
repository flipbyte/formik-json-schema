import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, setFieldValueWrapper } from '../utils';

const Switch = ({ config, formikProps, submitCountToValidate }) => {
    const { name, label, attributes, htmlClass, dataOn, dataOff } = config;
    const { values, setFieldValue } = formikProps;

    return (
        <div className="form-group">
            <Label htmlFor={ name } className="mr-2">{ label }</Label>
            <label className={ 'switch ' + htmlClass }>
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
