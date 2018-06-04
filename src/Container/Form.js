import React, { Component } from 'react';
import Element from '../Element';

const Form = ({ config, formikProps }) => {
    const { elements } = config;
    const { handleSubmit, handleReset } = formikProps;
    return(
        <form className="form-horizontal" onSubmit={ handleSubmit } onReset={ handleReset }>
            { Object.keys(elements).map( (key) =>
                <Element key={ key } config={ elements[key] } formikProps={ formikProps } />
            ) }
        </form>
    );
}

export default Form;
