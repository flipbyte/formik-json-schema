import React, { Component } from 'react';

const Button = ({ config, formikProps }) => {
    const { label, htmlClass, buttonType } = config;
    const { values } = formikProps;

    let buttonProps = {
        type: buttonType ? buttonType : 'button' ,
        className: 'btn ' + htmlClass
    }

    // let onClick = (action && formikProps.hasOwnProperty(action)) ? formikProps[action] : '';
    // if(onClick) buttonProps.onClick = onClick;

    return <button { ...buttonProps }>{ label }</button>
}

export default Button;
