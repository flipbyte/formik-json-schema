import _ from 'lodash';
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Thumb from './Thumb'
import { changeHandler, joinNames } from '../utils';

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
    } = config;
    const { setFieldValue } = formik;
    const selectedValue = value || defaultValue;

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
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
            <ErrorMessage name={ name } />
        </div>
    );
}

export default React.memo(FileUploader)
