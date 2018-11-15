import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler } from '../utils';

const Radio = ({ config, formikProps, submitCountToValidate }) => {
    const { name, type, attributes, options } = config;
    const { values, handleChange } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);

    return (
        <div className="form-group">
            <Label htmlFor={ name } className="mr-2">{ label }</Label>
            { options.map(( option ) =>
                <div className="form-check" key={ option.value }>
                    <label htmlFor={ name + '_' + option.value } className="form-check-label">
                        <input
                            name={ name }
                            type="radio"
                            className={ 'form-check-input' + ( error ? 'is-invalid' : '' ) }
                            id={ name + '_' + option.value }
                            value={ option.value }
                            checked={ getIn(values, name) === option.value }
                            onChange={ changeHandler.bind(this, handleChange, formikProps, config) }
                            { ...attributes } /> { option.title }
                    </label>
                </div>
            ) }
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default Radio;
