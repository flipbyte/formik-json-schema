import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { joinNames } from '../utils';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const onSortEnd = ( move, { oldIndex, newIndex } ) => move(oldIndex, newIndex);
const SortableItem = SortableElement((props) => renderTableRow(props));
const SortableTableBody = SortableContainer((props) => renderTableBody(props));
const SortableRowHandle = SortableHandle((props) => renderSortableHandle(props));

const renderTableBody = ({ isObject = false, isSortable, hasValue, arrayValues, ...rowProps }) => (
    <tbody>
        { hasValue ? _.map(arrayValues, ( value, index ) =>
            isObject === false && isSortable
                ? <SortableItem key={ index } index={ index } rowIndex={ index } value={ value } isSortable={ isSortable } { ...rowProps } />
                : renderTableRow({ ...rowProps, index, rowIndex: index, value, isObject })
        ) : null }
    </tbody>
);

const renderTableRow = ({ fieldArrayName, elements, arrayActions, rowIndex, buttons, isSortable, value = {}, isObject = false }) => (
    <tr key={ rowIndex }>
        { isObject === false && isSortable && <SortableRowHandle /> }
        { _.map(elements, ({ name, label, ...rest }, key) => (
            <td key={ key }>
                <Element config={{ ...rest, name: joinNames(fieldArrayName, rowIndex, name) }} />
            </td>
        ))}
        { isObject === false && !!buttons && (
            <td style={{ minWidth: 50 }}>
                { !!buttons.remove && (
                    _.isFunction(buttons.remove)
                        ? buttons.remove(arrayActions, rowIndex, value)
                        : (
                            <button
                                type="button"
                                className="btn remove"
                                onClick={ arrayActions.remove.bind(this, rowIndex) }>{ buttons.remove }
                            </button>
                        )
                    )
                }
                { !!buttons.duplicate && (
                    _.isFunction(buttons.duplicate)
                        ? buttons.duplicate(arrayActions, value, rowIndex)
                        : (
                            <button
                                type="button"
                                className="btn duplicate"
                                onClick={ arrayActions.push.bind(this, value) }>{ buttons.duplicate }
                            </button>
                        )
                    )
                }
            </td>
        )}
    </tr>
);

const renderSortableHandle = ( props ) => <td><i className="fas fa-grip-vertical"></i></td>

const EditableGrid = ({
    config: {
        name: fieldArrayName,
        isObject = false,
        elements,
        buttons,
        isSortable = true,
        comment,
        commentClass = 'text-muted d-block mb-3',
        tableContainerClass = 'table-responsive',
        tableClass = 'table table-bordered flutter-editable-grid'
    },
    formik
}) => {
    const { values, errors, touched } = formik;
    const arrayFields = _.mapValues(_.assign({}, elements), () => '');
    const arrayValues = _.get(values, fieldArrayName);
    const hasValue = _.size(arrayValues) > 0;
    const tableWidth = _.map(elements, 'width').reduce(( sum, num ) => sum + num, 50) || '100%';
    const additionalColumnCount = isSortable ? 2 : 1;

    return (
        <FieldArray
            name={ fieldArrayName }
            render={( arrayActions ) => {
                const bodyProps = {
                    arrayValues, hasValue, elements, fieldArrayName, arrayActions, buttons, isSortable, isObject
                };

                return (
                    <div className={ tableContainerClass }>
                        { comment && <small className={ commentClass }>{ comment }</small> }
                        <table className={ tableClass } style={{ width: tableWidth }}>
                            <thead>
                                <tr>
                                    { isObject === false && isSortable && <th></th>}
                                    { _.map(elements, ({ label, width }, key) =>
                                        <th key={ key } style={{ width: width }}>{ label }</th>
                                    ) }
                                    { isObject === false && !!buttons && !!buttons.remove && <th></th> }
                                </tr>
                            </thead>
                            { isObject === false && isSortable
                                ? <SortableTableBody
                                    distance={ 10 }
                                    onSortEnd={ onSortEnd.bind(this, arrayActions.move) }
                                    useDragHandle={ true }
                                    { ...bodyProps }
                                />
                                : renderTableBody(bodyProps)
                            }
                            <tfoot>
                                <tr>
                                    { isObject === false && !!buttons && !!buttons.add &&
                                        <td colSpan={ _.size(elements) + additionalColumnCount }>
                                            { _.isFunction(buttons.add)
                                                ? buttons.add(arrayActions, arrayFields)
                                                : (
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={ arrayActions.push.bind(this, arrayFields) }>{ buttons.add }
                                                    </button>
                                                )
                                            }
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

EditableGrid.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string.isRequired,
        elements: PropTypes.object.isRequired,
        buttons: PropTypes.exact({
            add: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.func
            ]),
            remove: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.func
            ]),
            duplicate: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.func
            ]),
        }),
        isSortable: PropTypes.bool,
        tableContainerClass: PropTypes.string,
        tableClass: PropTypes.string
    })
}

export default EditableGrid;
