import React, { Component } from 'react';

const Button = ({ config, formikProps }) => {
    const { label, fieldClass, buttonType } = config;
    const { values, isSubmitting, errors } = formikProps;

    let buttonProps = {
        type: buttonType ? buttonType : 'button' ,
        className: 'btn ' + fieldClass,
        disabled: isSubmitting
    };

    // let onClick = (action && formikProps.hasOwnProperty(action)) ? formikProps[action] : '';
    // if(onClick) buttonProps.onClick = onClick;

    return <button { ...buttonProps }>
        { label } { isSubmitting && <i className="fa fa-spinner fa-spin" /> }
    </button>
}

export default Button;
