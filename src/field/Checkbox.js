import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage, { hasError } from './ErrorMessage';

const Checkbox = ({ config, formikProps }) => {
    const { name, label, type, attributes, description } = config;
    const { values, handleChange } = formikProps;
    const error = hasError(name, formikProps);

    return (
        <div className="form-group">
            <Label htmlFor={ name }>{ label }</Label>
            <div className="form-check">
                <label htmlFor={ name } className="form-check-label">
                    <input
                        id={ name }
                        name={ name }
                        className={ 'form-check-input ' + ( error ? 'is-invalid' : '' ) }
                        type="checkbox"
                        checked={ _.get(values, name) }
                        onChange={ handleChange }
                        { ...attributes } /> { description }
                </label>
                <ErrorMessage name={ name } />
            </div>
        </div>
    );
}

export default Checkbox;
