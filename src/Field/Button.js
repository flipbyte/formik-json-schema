import React, { Component } from 'react';

const Button = ({ config, formikProps }) => {
    const { label, htmlClass, buttonType, onClick } = config;
    const { values } = formikProps;

    return <button
        type={ buttonType ? buttonType : 'button' }
        className={ 'btn ' + htmlClass }>{ label }</button>
}

export default Button;
