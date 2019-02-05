import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import PropTypes from 'prop-types';
import { joinNames } from '../utils';

const Div = ({
    config: {
        name,
        elements,
        htmlClass,
        prefixNameToElement = false
    }
}) =>
    <div className={ htmlClass }>
        { _.map(elements, ({ name: elementName, ...rest }, key) => {
            let element = _.assign({}, rest);
            element.name = prefixNameToElement ? joinNames(name, elementName) : elementName;

            return <Element key={ key } config={ element } containerName={ name } />
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
