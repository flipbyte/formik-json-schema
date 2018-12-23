import _ from 'lodash';
import React from 'react';
import { getIn } from 'formik';
import Element from '../Element';
import { FieldArray } from 'formik';
import { joinNames } from '../utils';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const onSortEnd = ( move, { oldIndex, newIndex } ) => move(oldIndex, newIndex);
const SortableItem = SortableElement((props) => renderTableRow(props));
const SortableTableBody = SortableContainer((props) => renderTableBody(props));
const SortableRowHandle = SortableHandle((props) => renderSortableHandle(props));

const renderTableBody = ({ isSortable, hasValue, arrayValues, ...rowProps }) =>
    <tbody>
        { hasValue ? arrayValues.map(( data, index ) =>
            isSortable
                ? <SortableItem key={ index } index={ index } rowIndex={ index } isSortable={ isSortable } { ...rowProps } />
                : renderTableRow({ ...rowProps, index, rowIndex: index })
        ) : null }
    </tbody>

const renderTableRow = ({ fieldArrayName, fields, formikProps, arrayActions, rowIndex, buttons, isSortable }) =>
    <tr key={ rowIndex }>
        { isSortable && <SortableRowHandle /> }
        { _.map(fields, ({ label, name, width, ...colProps }, key) => {
            let element = _.assign({}, colProps);
            element.name = joinNames(fieldArrayName, rowIndex, name);

            return (
                <td key={ key }>
                    <Element
                        config={ element }
                        formikProps={ formikProps } />
                </td>
            );
        }) }
        { !!buttons && !!buttons.remove &&
            <td style={{ width: 50 }}>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={ arrayActions.remove.bind(this, rowIndex) }>{ buttons.remove }
                </button>
            </td>
        }
    </tr>

const renderSortableHandle = ( props ) => <td><i class="fas fa-grip-vertical"></i></td>

const EditableGrid = ({
    config: {
        name: fieldArrayName,
        fields,
        buttons,
        isSortable = true,
        tableContainerClass = 'table-responsive',
        tableClass = 'table table-bordered flutter-editable-grid'
    },
    formikProps
}) => {
    const { values, errors, touched } = formikProps;
    const arrayFields = _.mapValues(_.assign({}, fields), () => '');
    const arrayValues = getIn(values, fieldArrayName);
    const hasValue = _.size(arrayValues) > 0;
    const tableWidth = _.map(fields, 'width').reduce(( sum, num ) => sum + num, 50) || '100%';

    return (
        <FieldArray
            name={ fieldArrayName }
            render={( arrayActions ) => {
                const bodyProps = {
                    arrayValues, hasValue, fields, formikProps, fieldArrayName, arrayActions, buttons, isSortable
                };

                return (
                    <div className={ tableContainerClass }>
                        <table className={ tableClass } style={{ width: tableWidth }}>
                            <thead>
                                <tr>
                                    { isSortable && <th></th>}
                                    { _.map(fields, ({ label, width }, key) =>
                                        <th key={ key } style={{ width: width }}>{ label }</th>
                                    ) }
                                    { !!buttons && !!buttons.remove && <th></th> }
                                </tr>
                            </thead>
                            { isSortable
                                ? <SortableTableBody
                                    distance={ 10 }
                                    onSortEnd={ onSortEnd.bind(this, arrayActions.move) }
                                    useDragHandle={ true }
                                    { ...bodyProps } />
                                : renderTableBody(bodyProps)
                            }
                            <tfoot>
                                <tr>
                                    { !!buttons && !!buttons.add &&
                                        <td colSpan={ _.size(fields) + 1 }>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={ arrayActions.push.bind(this, arrayFields) }>{ buttons.add }
                                            </button>
                                        </td>
                                    }
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )
        }} />
    );
}

export default EditableGrid;
