import React, { Component } from 'react';

const Button = ({ config, formikProps }) => {
    const { label, htmlClass, onClick } = config;
    const { values } = formikProps;

    let onClickHandler = (onClick && formikProps.hasOwnProperty(onClick)) ? formikProps[onClick] : null;
    
    console.log('BUTTON', onClickHandler);
    console.log('BUTTON', formikProps);

    return <button
        type="button"
        className={ 'btn ' + htmlClass }
        onClick={ onClickHandler }>{ label }</button>
}

export default Button;
