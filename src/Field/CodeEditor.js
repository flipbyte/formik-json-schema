import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { hasError, changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const CodeEditor = ({ config, formikProps, submitCountToValidate }) => {
    const {
        name,
        label,
        options,
        defaultValue,
        attributes,
        labelClass = '',
        fieldClass = '',
        formGroupClass = 'form-group'
    } = config;
    const { values, setFieldValue } = formikProps;
    const error = hasError(name, submitCountToValidate, formikProps);
    const selectedValue = _.get(values, name, defaultValue);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <CodeMirror
                id={ name }
                name={ name }
                options={ options }
                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                onChange={ ( editor, data, value ) =>
                    changeHandler(setFieldValueWrapper(setFieldValue, name), formikProps, config, value)
                }
                value={ selectedValue }
                { ...attributes }
            />
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default CodeEditor;
