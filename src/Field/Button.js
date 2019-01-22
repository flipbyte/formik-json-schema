import _ from 'lodash';
import React, { Component } from 'react';
import { hasError, clickHandler, joinNames, setFieldValueWrapper } from '../utils';

const Button = ({ config, formikProps }) => {
    const { label, fieldClass, buttonType, onClick } = config;
    const { values, isSubmitting, errors } = formikProps;

    let buttonProps = {
        type: buttonType ? buttonType : 'button' ,
        className: 'btn ' + fieldClass,
        disabled: isSubmitting
    };

    if(_.isFunction(onClick)) buttonProps.onClick = onClick.bind(this, formikProps, config);

    return <button { ...buttonProps }>
        { label } { isSubmitting && <i className="fa fa-spinner fa-spin" /> }
    </button>
}

export default Button;
