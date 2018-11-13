import _ from 'lodash';
import React from 'react';
import Element from '../Element';

const ButtonGroup = ({ config: { title, elements }, formikProps }) =>
    <div className="buttons-container clearfix">
        <div className="btn-group d-flex justify-content-end">
            { _.map(elements, (element, key) =>
                <Element key={ key } config={ element } formikProps={ formikProps } />)
            }
        </div>
    </div>

export default ButtonGroup;
