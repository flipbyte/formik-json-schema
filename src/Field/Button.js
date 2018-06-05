import React, { Component } from 'react';

const Button = ({ config, formikProps }) => {
    const { label, htmlClass, buttonType, action } = config;
    const { values } = formikProps;

    let onClick = (action && formikProps.hasOwnProperty(action)) ? formikProps[action] : '';

    return <button
        type={ buttonType ? buttonType : 'button' }
        className={ 'btn ' + htmlClass }
        onClick={ () => onClick }>{ label }</button>
}

export default Button;
