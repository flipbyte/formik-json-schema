import React, { Component } from 'react';
import { FieldArray } from 'formik';

import Element from '../Element';

const Array = ({ config, formikProps }) => {
    const {
        name,
        title,
        elements: { fields }
    } = config;

    return (
        <FieldArray
            name={ name }
            render={ (arrayActions) =>
                <Element
                    fieldArrayName={ name }
                    config={ fields }
                    formikProps={ formikProps }
                    arrayActions={ arrayActions } />
            } />
    )
}

export default Array;
