import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import PropTypes from 'prop-types';
import { joinNames } from '../utils';

const HtmlTag = ({
    config: {
        name: containerName = '',
        as: Component = 'div',
        elements,
        htmlClass,
        comment,
        commentClass = 'text-muted d-block mb-3'
    }
}) => (
    <Component className={ htmlClass }>
        { comment && <small className={ commentClass }>{ comment }</small> }
        { _.map(elements, ({ name, ...rest }, key) => (
            <Element
                key={ key }
                config={{ ...rest, name: joinNames(containerName, name) }}
            />
        ))}
    </Component>
);

HtmlTag.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string,
        elements: PropTypes.object.isRequired,
        htmlClass: PropTypes.string
    })
}

export default Div;
