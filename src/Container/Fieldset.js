import React, { Component } from 'react';

import Element from '../Element';

const Fieldset = ({ config, formikProps }) => {
    const { title, elements } = config;

    return (
        <div className="card">
            { !!title && <div className="card-header"><strong>{ title }</strong></div> }
            <div className="card-block">
                { Object.keys(elements).map( (key) =>
                    <Element key={ key } config={ elements[key] } formikProps={ formikProps } />)
                }
            </div>
        </div>
    )
}

export default Fieldset;
