import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { changeHandler, setFieldValueWrapper } from '../utils';

const CodeEditor = ({ config, formik, value, error }) => {
    const {
        name,
        options,
        defaultValue,
        attributes,
        fieldClass = ''
    } = config;
    const { setFieldValue, handleBlur } = formik;
    const selectedValue = value || '';

    return (
        <CodeMirror
            id={ name }
            name={ name }
            options={ options }
            className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
            onBeforeChange={(editor, data, value) => {
                changeHandler(setFieldValueWrapper(setFieldValue, name), formik, config, value)
            }}
            onBlur={(editor, event) => {
                return (
                    handleBlur({
                        ...event,
                        target: {
                            ...event.target,
                            name
                        }
                    })
                );
            }}
            value={ selectedValue }
            { ...attributes }
        />
    );
}

export default React.memo(CodeEditor);
