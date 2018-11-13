import _ from 'lodash';
import Element from '../Element';
import React, { Component } from 'react';

const ButtonGroup = ({ config: { title, elements }, formikProps }) =>
    <div className="buttons-container clearfix">
        <div className="btn-group d-flex justify-content-end">
            { _.map(elements, (element, key) =>
                <Element key={ key } config={ element } formikProps={ formikProps } />)
            }
        </div>
    </div>

export default ButtonGroup;
