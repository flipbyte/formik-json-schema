import React from 'react';
import Element from '../Element';
import { FieldArray } from 'formik';

const Array = ({ config, formikProps }) => {
    const {
        name,
        title,
        elements: { fields }
    } = config;

    return (
        <FieldArray
            name={ name }
            render={( arrayActions ) =>
                <Element
                    fieldArrayName={ name }
                    config={ fields }
                    formikProps={ formikProps }
                    arrayActions={ arrayActions } />
            } />
    )
}

export default Array;
