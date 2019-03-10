import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { changeHandler, joinNames } from '../utils';
import FieldTemplate from '../FieldTemplate';

const Text = ({ config, formik, value = '', error }) => {
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
        formGroupClass = 'form-group',
        inputGroupClass = 'input-group',
        template: Template = FieldTemplate
    } = config;

    const { handleChange, handleBlur } = formik;
    const isInputGroup = icon ? true : false;

    return (
        <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
            { isInputGroup ?
                <div className={ inputGroupClass }>
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className={ icon }></i>
                        </span>
                    </div>
                    <input
                        id={ name }
                        name={ name }
                        type={ fieldType }
                        className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                        value={ value }
                        onChange={ changeHandler.bind(this, handleChange, formik, config) }
                        onBlur={ handleBlur }
                        { ...attributes } />
                </div> :
                <input
                    id={ name }
                    name={ name }
                    type={ fieldType }
                    className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                    value={ value }
                    onChange={ changeHandler.bind(this, handleChange, formik, config) }
                    onBlur={ handleBlur }
                    { ...attributes } />
            }
        </Template>
    );
}

export default React.memo(Text);
