import React, { Component } from 'react';
import { Field } from '../Renderer/Element';

const Fieldset = ({ config, formikProps }) => {
    const { name, type, attributes, title, fields } = config;
    const { values, handleChange } = formikProps;

    return (
        <div className="card">
            { !!title && <div className="card-header"><strong>{ title }</strong></div> }
            <div className="card-block">
                { Object.keys(fields).map( (key) =>
                    <Field key={ key } config={ fields[key] } formikProps={ formikProps } />)
                }
            </div>
        </div>
    )
}

export default Fieldset;
