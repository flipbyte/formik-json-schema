import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { hasError, changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const CodeEditor = ({ config, formikProps, submitCountToValidate, containerName }) => {
    const {
        name: elementName,
        label,
        options,
        defaultValue,
        attributes,
        prefixContainerName = false,
        labelClass = '',
        inputClass = '',
        formGroupClass = 'form-group'
    } = config;
    const { values, setFieldValue } = formikProps;
    const name = prefixContainerName && containerName ? joinNames(containerName, elementName) : elementName;
    const error = hasError(name, submitCountToValidate, formikProps);
    const selectedValue = _.get(values, name, defaultValue);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <CodeMirror
                id={ name }
                name={ name }
                options={ options }
                className={ inputClass + ( error ? ' is-invalid ' : '' ) }
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
