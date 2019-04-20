import React from 'react';
import { changeHandler } from '../utils';

const Textarea = ({ config, formik, value = '', error }) => {
    const {
        name,
        type,
        attributes,
        rows,
        fieldClass = 'form-control'
    } = config;
    const { handleChange, handleBlur } = formik;

    return (
        <textarea
            id={ name }
            name={ name }
            className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
            value={ value }
            onChange={ changeHandler.bind(this, handleChange, formik, config) }
            onBlur={ handleBlur }
            { ...attributes }
        />
    );
}

export default React.memo(Textarea);
