import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { changeHandler } from '../utils';

const Checkbox = ({ config, formik, value, error }) => {
    const {
        name,
        attributes,
        options = [],
        formCheckClass = 'form-check',
        fieldClass = 'form-check-input',
        formCheckLabelClass = 'form-check-label',
    } = config;

    const { handleChange, handleBlur } = formik;
    const checkboxValue = value || [];
    return options.map(({ value, label}, key, index) => {
        const fieldName = _.kebabCase(name + ' ' + value);
        return (
            <div key={ key } className={ formCheckClass }>
                <label htmlFor={ fieldName } className={ formCheckLabelClass }>
                    <input
                        id={ fieldName }
                        name={ `${name}.${key}` }
                        className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                        type="checkbox"
                        checked={ checkboxValue[key] || false }
                        onChange={ event => {
                            changeHandler(handleChange, formik, config, event);
                            handleBlur(event);
                        }}
                        { ...attributes } /> { label }
                </label>
            </div>
        );
    });
}

Checkbox.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        formCheckClass: PropTypes.string
    })
}

export default React.memo(Checkbox);
