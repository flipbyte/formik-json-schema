import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import FieldTemplate from '../FieldTemplate';
import { default as ReactSwitch } from "react-switch";
import { changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const Switch = ({ config, formik, value = false, error }) => {
    const {
        name,
        label,
        labelClass = '',
        fieldClass = 'switch',
        formGroupClass = 'form-group',
        template: Template = FieldTemplate
    } = config;
    const { setFieldValue } = formik;

    return (
        <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
            <label className={ fieldClass + ( error ? ' is-invalid ' : '' ) }>
                <ReactSwitch onChange={
                    (checked) => changeHandler(setFieldValueWrapper(setFieldValue, name), formik, config, checked)
                } checked={ value } />
            </label>
        </Template>
    );
}

export default React.memo(Switch);
