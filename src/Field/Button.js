import React, { Component } from 'react';

const Button = ({ config, formikProps, actions }) => {
    const { label, htmlClass, buttonType, action } = config;
    const { values } = formikProps;

    let buttonProps = {
        type: buttonType ? buttonType : 'button' ,
        className: 'btn ' + htmlClass
    }

    let onClick = (action && formikProps.hasOwnProperty(action)) ? formikProps[action] : '';
    if(onClick) buttonProps.onClick = onClick;

    return <button { ...buttonProps }>{ label }</button>
}

export default Button;
