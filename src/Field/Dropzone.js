import _ from 'lodash';
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Thumb from './Thumb'
import { changeHandler, joinNames } from '../utils';
import FieldTemplate from '../FieldTemplate';

const FileUploader = ({ config, formik, value, error }) => {
    const {
        name,
        label,
        options,
        defaultValue,
        disabled,
        disabledText,
        placeholder,
        zoneActiveText,
        attributes,
        labelClass = '',
        fieldClass = 'dropzone',
        formGroupClass = 'form-group',
        template: Template = FieldTemplate
    } = config;
    const { setFieldValue } = formik;
    const selectedValue = value || defaultValue;

    return (
        <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
            <Dropzone
                className={ fieldClass + ( error ? ' is-invalid ' : '' )}
                accept={ accept }
                disabled={ disabled }
                onDrop={ acceptedFiles => {
                    if (acceptedFiles.length === 0) {
                        return;
                    }

                    changeHandler(
                        setFieldValueWrapper(setFieldValue, name),
                        formik,
                        config,
                        values[name].concat(acceptedFiles)
                    )
                }}
                { ...attributes }>

                {({ isDragActive, acceptedFiles, rejectedFiles }) => {
                    if (disabled) {
                        return disabledText;
                    }

                    if (isDragActive) {
                        return zoneActiveText;
                    }

                    return acceptedFiles.length || rejectedFiles.length ?
                        <Fragment>
                            { values[name].map(file => (
                                <Thumb key={ file.name } file={ file } />
                            )) }
                        </Fragment> : placeholder;
                }}
            </Dropzone>
        </Template>
    );
}

export default React.memo(FileUploader)
