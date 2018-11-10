import _ from 'lodash';
import React, { Component } from 'react';
import { getIn } from 'formik';

import Element from '../Element';

const setNull = obj => Object.keys(obj).forEach(k => obj[k] = '');

const EditableGrid = ({ config, formikProps, fieldArrayName, arrayActions }) => {
    const { header, fields, buttons } = config;
    const { values, errors, touched } = formikProps;
    const { insert, remove, push } = arrayActions;

    const arrayFields = Object.assign({}, fields);
    setNull(arrayFields);

    const arrayValues = getIn(values, fieldArrayName);
    const hasValue = arrayValues && arrayValues.length > 0;

    return (
        <div className="table-responsive">
            <table className="table table-bordered flutter-editable-grid">
                <thead>
                    <tr>
                        { _.map(header, (item, key) => {
                            if(!_.isObject(item)) {
                                return <th key={ key }>{ item }</th>
                            }

                            const { width, label } = item;
                            return <th key={ key } style={{ width: width + 'px' }}>{ label }</th>;
                        }) }
                    </tr>
                </thead>
                <tbody>
                    { hasValue && arrayValues.map( (data, index) =>
                        <tr key={ index }>
                            { _.map(fields, (field, key) => {
                                let element = Object.assign({}, field);
                                element.name = `${fieldArrayName}.${index}.` + field.name;

                                return (
                                    <td key={ key }>
                                        <Element
                                            config={ element }
                                            formikProps={ formikProps } />
                                    </td>
                                );
                            }) }
                            { !! buttons.remove &&
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={ () => remove(index) }>{ buttons.remove }
                                    </button>
                                </td>
                            }
                        </tr>
                    ) }
                </tbody>
                <tfoot>
                    <tr>
                        { !!buttons.add &&
                            <td colSpan={ _.size(header) }>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={ push.bind(this, arrayFields) }>{ buttons.add }
                                </button>
                            </td>
                        }
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default EditableGrid;
