import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import FieldTemplate from '../FieldTemplate';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const CodeEditor = ({ config, formik, value, error }) => {
    const {
        name,
        label,
        options,
        defaultValue,
        attributes,
        labelClass = '',
        fieldClass = '',
        formGroupClass = 'form-group',
        template: Template = FieldTemplate
    } = config;
    const { setFieldValue, handleBlur } = formik;
    const selectedValue = value || '';

    return (
        <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
            <CodeMirror
                id={ name }
                name={ name }
                options={ options }
                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                onChange={ ( editor, data, value ) =>
                    changeHandler(setFieldValueWrapper(setFieldValue, name), formik, config, value)
                }
                onBlur={ (editor, event) => {
                    return handleBlur({
                        ...event,
                        target: {
                            ...event.target,
                            name
                        }
                    })
                }}
                value={ selectedValue }
                { ...attributes }
            />
        </Template>
    );
}

export default React.memo(CodeEditor);
