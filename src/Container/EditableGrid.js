import _ from 'lodash';
import React from 'react';
import { getIn } from 'formik';
import Element from '../Element';

const EditableGrid = ({ config, formikProps, fieldArrayName, arrayActions }) => {
    const { header, fields, buttons } = config;
    const { values, errors, touched } = formikProps;
    const { insert, remove, push } = arrayActions;

    const arrayFields = _.mapValues(_.assign({}, fields), () => '');

    const arrayValues = getIn(values, fieldArrayName);
    const hasValue = _.size(arrayValues) > 0;

    return (
        <div className="table-responsive">
            <table className="table table-bordered flutter-editable-grid">
                <thead>
                    <tr>
                        { _.map(fields, ({ label, width }, key) =>
                            <th key={ key } style={{ width: width + 'px' }}>{ label }</th>
                        ) }
                        { !!buttons.remove && <th></th> }
                    </tr>
                </thead>
                <tbody>
                    { hasValue ? arrayValues.map( (data, index) =>
                        <tr key={ index }>
                            { _.map(fields, ({ label, name, width, ...colProps }, key) => {
                                let element = _.assign({}, colProps);
                                element.name = `${fieldArrayName}.${index}.` + name;

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
                                        onClick={ remove.bind(this, index) }>{ buttons.remove }
                                    </button>
                                </td>
                            }
                        </tr>
                    ) : null }
                </tbody>
                <tfoot>
                    <tr>
                        { !!buttons.add &&
                            <td colSpan={ _.size(fields) + 1 }>
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
