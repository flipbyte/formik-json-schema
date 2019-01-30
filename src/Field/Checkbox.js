import _ from 'lodash';
import React from 'react';
import Label from './Label';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames } from '../utils';

const Checkbox = ({ config, formikProps, submitCountToValidate }) => {
    const {
        name,
        label,
        attributes,
        options = [],
        labelClass = '',
        fieldClass = 'form-check-input',
        formGroupClass = 'form-group',
        formCheckClass = 'form-check'
    } = config;

    const { values, handleChange } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);

    return (
        <div className={ formGroupClass }>
            <Label className={ labelClass }>{ label }</Label>
            { _.map(options, ({ value, label }, key, index ) => {
                let fieldName = _.uniqueId(name);
                let checkboxValue = _.get(values, name) || [];
                return (
                    <div key={ key } className={ formCheckClass }>
                        <label htmlFor={ fieldName } className="form-check-label">
                            <input
                                id={ fieldName }
                                name={ `${name}[${key}]` }
                                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                                type="checkbox"
                                checked={ checkboxValue[key] || false }
                                onChange={ changeHandler.bind(this, handleChange, formikProps, config) }
                                { ...attributes } /> { label }
                        </label>
                        <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
                    </div>
                );
            })}
        </div>
    );
}

Checkbox.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        options: PropTypes.array.isRequired,
        labelClass: PropTypes.string,
        fieldClass: PropTypes.string,
        formGroupClass: PropTypes.string,
        formCheckClass: PropTypes.string
    })
}

export default Checkbox;
