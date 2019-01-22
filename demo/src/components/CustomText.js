import _ from 'lodash';
import React from 'react';
import Label from '../../../src/Field/Label';
import ErrorMessage from '../../../src/Field/ErrorMessage';
import { hasError, changeHandler, joinNames } from '../../../src/utils';

const CustomText = ({ config, formikProps, submitCountToValidate }) => {
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

    const { values, setFieldValue, handleChange, handleBlur } = formikProps;
    const isInputGroup = icon ? true : false;
    const error = hasError(name, submitCountToValidate, formikProps);
    const currentValue = _.get(values, name, '');
    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <input
                id={ name }
                name={ name }
                type={ fieldType }
                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                value={ currentValue }
                onChange={ changeHandler.bind(this, handleChange, formikProps, config) } />
            { currentValue && <div className="mt-2">
                Your unique id for <strong>{ currentValue }</strong> is <strong>{ _.uniqueId() }</strong>
            </div> }
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default CustomText;
