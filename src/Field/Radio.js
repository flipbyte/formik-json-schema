import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { changeHandler, joinNames } from '../utils';
import FieldTemplate from '../FieldTemplate';

const Radio = ({ config, formik, value, error }) => {
    const {
        name,
        type,
        label,
        attributes,
        options,
        labelClass = '',
        formGroupClass = 'form-group',
        formCheckClass = 'form-check',
        fieldClass = 'form-check-input',
        template: Template = FieldTemplate,
        formCheckLabelClass = 'form-check-label',
    } = config;
    const { handleChange, handleBlur } = formik;

    return (
        <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
            { options.map(( option ) =>
                <div className={ formCheckClass } key={ option.value }>
                    <label htmlFor={ name + '_' + option.value } className={ formCheckLabelClass }>
                        <input
                            name={ name }
                            type="radio"
                            className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                            id={ name + '_' + option.value }
                            value={ option.value }
                            defaultChecked={ value == option.value }
                            onChange={ event => {
                                changeHandler(handleChange, formik, config, event);
                                handleBlur(event);
                            }}
                            { ...attributes } /> { option.title }
                    </label>
                </div>
            ) }
        </Template>
    );
}

export default React.memo(Radio);
