import React, { Component } from 'react';

import Element from '../Element';

const ButtonGroup = ({ config, formikProps }) => {
    const { title, elements } = config;

    return (
        <div className="buttons-container clearfix">
            <div className="btn-group d-flex justify-content-end">
                { Object.keys(elements).map( (key) =>
                    <Element key={ key } config={ elements[key] } formikProps={ formikProps } />)
                }
            </div>
        </div>
    )
}

export default ButtonGroup;
