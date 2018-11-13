import React from 'react';

const Label = ({ children, ...attributes }) =>
    children ? <label { ...attributes }>{ children }</label> : null;

export default Label;
