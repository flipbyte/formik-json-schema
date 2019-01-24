import _ from 'lodash';
import Element from '../Element';
import { joinNames } from '../utils';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Div = ({
    config: {
        name,
        elements,
        htmlClass,
        prefixNameToElement = false
    },
    formikProps
}) =>
    <div className={ htmlClass }>
        { _.map(elements, ({ name: elementName, ...rest }, key) => {
            let element = _.assign({}, rest);
            element.name = prefixNameToElement ? joinNames(name, elementName) : elementName;

            return <Element key={ key } config={ element } formikProps={ formikProps } containerName={ name } />
        }) }
    </div>

Div.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string,
        elements: PropTypes.object.isRequired,
        htmlClass: PropTypes.string,
        prefixNameToElement: PropTypes.bool
    })
}

export default Div;
