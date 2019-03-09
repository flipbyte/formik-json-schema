import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { changeHandler } from '../utils';

const Textarea = ({ config, formik, value = '', error }) => {
    const {
        name,
        label,
        type,
        attributes,
        rows,
        labelClass = '',
        fieldClass = 'form-control',
        formGroupClass = 'form-group'
    } = config;
    const { handleChange, handleBlur } = formik;

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <textarea
                id={ name }
                name={ name }
                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                value={ value }
                onChange={ changeHandler.bind(this, handleChange, formik, config) }
                onBlur={ handleBlur }
                { ...attributes } />
            <ErrorMessage name={ name } />
        </div>
    );
}

export default React.memo(Textarea);
