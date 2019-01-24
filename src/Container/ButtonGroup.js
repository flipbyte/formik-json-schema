import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Element from '../Element';

const ButtonGroup = ({
    config: {
        elements,
        buttonsContainerClass = 'buttons-container',
        buttonGroupClass = 'btn-group'
    },
    formikProps
}) =>
    <div className={ buttonsContainerClass }>
        <div className={ buttonGroupClass }>
            { _.map(elements, (element, key) =>
                <Element key={ key } config={ element } formikProps={ formikProps } />)
            }
        </div>
    </div>

ButtonGroup.propTypes = {
    config: PropTypes.shape({
        buttonsContainerClass: PropTypes.string,
        buttonGroupClass: PropTypes.string,
        elements: PropTypes.object.isRequired
    })
}

export default ButtonGroup;
