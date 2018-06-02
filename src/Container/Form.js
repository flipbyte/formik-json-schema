import React, { Component } from 'react';
import Element from '../Element';

const Form = ({ config, formikProps }) => {
    const { elements } = config;

    return(
        <form className="form-horizontal" onSubmit={ formikProps.handleSubmit }>
            { Object.keys(elements).map( (key) =>
                <Element key={ key } config={ elements[key] } formikProps={ formikProps } />
            ) }
        </form>
    );
}

export default Form;
