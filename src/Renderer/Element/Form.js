import React, { Component } from 'react';

const Form = ({ children, formikProps }) =>
    <form className="form-horizontal" onSubmit={ formikProps.handleSubmit }>
        { children }
    </form>

export default Form;
