import React, { Component } from 'react';

import Element from '../Element';

const Div = ({ config, formikProps }) => {
    const { elements, htmlClass } = config;

    return (
        <div className={ htmlClass }>
            { Object.keys(elements).map( (key) =>
                <Element key={ key } config={ elements[key] } formikProps={ formikProps } />)
            }
        </div>
    )
}

export default Div;
