import React, { Component } from 'react';
import { FieldArray } from 'formik';

import Element from '../Element';

const setNull = obj => Object.keys(obj).forEach(k => obj[k] = '');

const Array = ({ config, formikProps }) => {
    const { name, title, elements } = config;
    const { values, errors, touched } = formikProps;
    const { fields, add, ...otherElements } = elements;

    const arrayFields = Object.assign({}, fields);
    const hasValue = values.hasOwnProperty(name) && values[name].length > 0;

    return (
        <FieldArray
            name={ name }
            render={ (arrayActions) => (
                <table className="table table-bordered">
                    <tbody>
                        { hasValue && values[name].map( (data, index) => {
                            return (
                                <tr key={ index }>
                                    <Element
                                        key={ "fields" }
                                        config={ fields }
                                        formikProps={ formikProps }
                                        arrayActions={ arrayActions }
                                        index={ index }
                                        fieldArrayName={ name } />
                                </tr>
                            )
                        }) }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <Element
                                    key={ "add" }
                                    config={ add }
                                    formikProps={ formikProps }
                                    onClick={ setNull(arrayFields) } />
                            </td>
                        </tr>
                    </tfoot>
                </table>

            ) } />
    )
}

export default Array;
