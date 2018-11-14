import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage, { hasError } from './ErrorMessage';

const Text = ({ config, formikProps }) => {
    const {
        name,
        label,
        type,
        renderer,
        attributes,
        fieldType,
        defaultValue,
        icon,
        formGroupClass = 'form-group',
        inputGroupClass = 'input-group'
    } = config;

    const { values, setFieldValue, handleChange, handleBlur } = formikProps;
    const isInputGroup = icon ? true : false;
    const error = hasError(name, formikProps);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name }>{ label }</Label>
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
                        className={ 'form-control ' + ( error ? 'is-invalid' : '' ) }
                        value={ _.get(values, name, '') }
                        onChange={ handleChange }
                        { ...attributes } />
                </div> :
                <input
                    id={ name }
                    name={ name }
                    type={ fieldType }
                    className={ 'form-control ' + ( error ? 'is-invalid' : '' ) }
                    value={ _.get(values, name, '') }
                    onChange={ handleChange }
                    { ...attributes } />
            }
            <ErrorMessage name={ name } />
        </div>
    );
}

export default Text;
