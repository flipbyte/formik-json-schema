import _ from 'lodash';
import React, { Component } from 'react';
import { clickHandler, joinNames } from '../utils';

const Button = ({ config, formik }) => {
    const { content, fieldClass, buttonType, onClick } = config;
    const { isSubmitting } = formik;

    let buttonProps = {
        type: buttonType ? buttonType : 'button' ,
        className: 'btn ' + fieldClass,
        disabled: isSubmitting
    };

    if(_.isFunction(onClick)) buttonProps.onClick = onClick.bind(this, formik, config);

    return <button { ...buttonProps }>
        { content } { buttonType === 'submit' && isSubmitting && <i className="fa fa-spinner fa-spin" /> }
    </button>
}

export default Button;
