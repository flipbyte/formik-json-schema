import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import PropTypes from 'prop-types';
import { joinNames } from '../utils';

const Div = ({
    config: { name: containerName = '', elements, htmlClass }
}) => (
    <div className={ htmlClass }>
        { _.map(elements, ({ name, ...rest }, key) => (
            <Element
                key={ key }
                config={{ ...rest, name: joinNames(containerName, name) }}
            />
        ))}
    </div>
);

Div.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string,
        elements: PropTypes.object.isRequired,
        htmlClass: PropTypes.string
    })
}

export default Div;
