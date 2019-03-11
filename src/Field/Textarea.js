import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { changeHandler } from '../utils';
import FieldTemplate from '../FieldTemplate';

const Textarea = ({ config, formik, value = '', error }) => {
    const {
        name,
        label,
        type,
        attributes,
        rows,
        labelClass = '',
        fieldClass = 'form-control',
        formGroupClass = 'form-group',
        template: Template = FieldTemplate
    } = config;
    const { handleChange, handleBlur } = formik;

    return (
        <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
            <textarea
                id={ name }
                name={ name }
                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                value={ value }
                onChange={ changeHandler.bind(this, handleChange, formik, config) }
                onBlur={ handleBlur }
                { ...attributes } />
        </Template>
    );
}

export default React.memo(Textarea);
