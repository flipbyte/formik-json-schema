import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames } from '../utils';

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
        inputGroupClass = 'input-group'
    } = config;

    // console.log('Text', name, error);
    const { handleChange, handleBlur } = formik;
    const isInputGroup = icon ? true : false;

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
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
            <ErrorMessage name={ name } error={ error } />
        </div>
    );
}

export default React.memo(Text);
