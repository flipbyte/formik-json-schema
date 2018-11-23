import _ from 'lodash';
import Element from '../Element';
import React, { Component } from 'react';

const Div = ({ config: { name, elements, htmlClass }, formikProps }) =>
    <div className={ htmlClass }>
        { _.map(elements, (element, key) =>
            <Element key={ key } config={ element } containerName={ name } formikProps={ formikProps } />)
        }
    </div>

export default Div;
