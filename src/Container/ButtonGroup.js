import _ from 'lodash';
import React from 'react';
import Element from '../Element';

const ButtonGroup = ({
    config: {
        title,
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

export default ButtonGroup;
