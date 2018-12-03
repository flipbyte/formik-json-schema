import _ from 'lodash';
import Element from '../Element';
import { joinNames } from '../utils';
import React, { Component } from 'react';

const Div = ({ config: {
    name,
    elements,
    htmlClass,
    prefixNameToElementName = false
}, formikProps }) =>
    <div className={ htmlClass }>
        { _.map(elements, ({ name: elementName, ...rest }, key) => {
            let element = _.assign({}, rest);
            element.name = prefixNameToElementName ? joinNames(name, elementName) : elementName;

            return <Element key={ key } config={ element } formikProps={ formikProps } containerName={ name } />
        }) }
    </div>

export default Div;
