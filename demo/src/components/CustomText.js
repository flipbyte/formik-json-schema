import _ from 'lodash';
import React from 'react';
import Label from '../../../src/Field/Label';
import ErrorMessage from '../../../src/Field/ErrorMessage';
import { changeHandler, joinNames } from '../../../src/utils';

const CustomText = ({ config, formik, value = '', error }) => {
    const {
        name,
        label,
        type,
        attributes,
        fieldType,
        defaultValue,
        icon,
        labelClass = '',
        fieldClass = 'form-control',
        formGroupClass = 'form-group'
    } = config;

    const { setFieldValue, handleChange, handleBlur } = formik;
    const isInputGroup = icon ? true : false;
    const currentValue = value;
    return (
        <React.Fragment>
            <input
                id={ name }
                name={ name }
                type={ fieldType }
                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                value={ currentValue }
                onChange={ changeHandler.bind(this, handleChange, formik, config) }
                onBlur={ handleBlur }
            />
            { currentValue && <div className="mt-2">
                Your unique id for <strong>{ currentValue }</strong> is <strong>{ _.uniqueId() }</strong>
            </div> }
        </React.Fragment>
    );
}

export default CustomText;
