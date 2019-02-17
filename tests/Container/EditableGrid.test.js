import expect from 'expect'
import React from 'react';
import { configure, mount } from 'enzyme';
import {
    checkConsoleError,
    restoreConsoleError,
    prepareForm,
    prepareField,
    prepareContainer
} from '../test-utils'
import { Form } from 'src';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('EditableGrid', () => {
    const containerKey = 'editableGrid';
    const config = {
        containerName: 'testFieldset',
        fieldName: 'testField',
        title: 'Test Fieldset Title',
        tableContainerClass: 'test-table-responsive',
        tableClass: 'test-editable-grid'
    };
    const container = prepareContainer('editable-grid', {
        name: config.containerName
    });
    const field = prepareField('text', {
        name: config.fieldName,
        label: "Text",
        fieldType: "text",
    });
    const multipleFields = { [containerKey]: {
        fields: {
            field1: {
                type: "field",
                renderer: "text",
                name: "field1",
                fieldType: "text",
                label: "Field 1"
            },
            field2: {
                type: "field",
                renderer: "text",
                name: "field2",
                fieldType: "text",
                label: "Field 2"
            },
        },
        ...container
    }}
    const withNoTabs = { [containerKey]: { ...container } };

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            [containerKey]: {
                fields: {
                    field1: {
                        type: "field",
                        renderer: "text",
                        name: "field1",
                        fieldType: "text",
                        label: "Field 1"
                    }
                },
                ...container
            }
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders multiple columns with fields', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            [containerKey]: {
                elements: {
                    field1: {
                        type: "field",
                        renderer: "text",
                        name: "field1",
                        fieldType: "text",
                        label: "Field 1"
                    },
                    field2: {
                        type: "field",
                        renderer: "text",
                        name: "field2",
                        fieldType: "text",
                        label: "Field 2"
                    },
                },
                ...container
        } } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    // it('throws error when "elements" is not defined', () => {
    //     const wrapper = mount(<Form { ...prepareForm({ elements: { [containerKey]: { ...container } } }) } />);
    //     expect(console.error.threw).toEqual(true);
    // });
    //
    it('throws error when "name" is not defined', () => {
        const wrapper = mount(<Form { ...prepareForm({
            elements: { [containerKey]: prepareContainer('editable-grid') }
        }) } />);
        expect(console.error.threw).toEqual(true);
    });

    context('custom html classes for tab html elements', function() {
        it('adds container class to table wrapper', () => {
            const withTableContainerClass = {
                [containerKey]: {
                    tableContainerClass: config.tableContainerClass,
                    ...container
                }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withTableContainerClass }) } />);
            expect(wrapper.find('div').first().props().className).toEqual(config.tableContainerClass);
        });

        it('adds class to table', () => {
            const withTableClass = {
                [containerKey]: { tableClass: config.tableClass, ...container }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withTableClass }) } />);
            expect(wrapper.find(`table.${config.tableClass}`).exists()).toEqual(true);
        });
    });

    context('sortable', function() {
        const sortableGrid = {
            [containerKey]: {
                elements: {
                    field1: {
                        type: "field",
                        renderer: "text",
                        name: "field1",
                        fieldType: "text",
                        label: "Field 1"
                    },
                    field2: {
                        type: "field",
                        renderer: "text",
                        name: "field2",
                        fieldType: "text",
                        label: "Field 2"
                    },
                },
                isSortable: true,
                ...container
        } };

        it('adds an extra column from drag handle at the beginning when "isSortable" is true', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: sortableGrid }) } />);

            expect(wrapper.find('th').at(0).exists()).toEqual(true);
            expect(wrapper.find('th').at(0).text()).toEqual('');
        });

    });

    context("add", function() {
        it('adds "add" button when label "add" key is set in "buttons"', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: {
                [containerKey]: {
                    elements: {
                        field1: {
                            type: "field",
                            renderer: "text",
                            name: "field1",
                            fieldType: "text",
                            label: "Field 1"
                        }
                    },
                    buttons: {
                        "add": "Add"
                    },
                    ...container
                }
            } }) } />);

            expect(wrapper.find('tfoot tr td button').text()).toEqual("Add");
        });

        it('add new row on "add" button click', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: {
                [containerKey]: {
                    elements: {
                        field1: {
                            type: "field",
                            renderer: "text",
                            name: "field1",
                            fieldType: "text",
                            label: "Field 1"
                        }
                    },
                    buttons: {
                        "add": "Add"
                    },
                    ...container
                }
            } }) } />);

            wrapper.find('tfoot tr td button').simulate('click');
            expect(wrapper.find('tbody tr').exists()).toEqual(true);
        });

        // it('add 2 rows and remove the first row', () => {
        //     const wrapper = mount(<Form { ...prepareForm({ elements: {
        //         [containerKey]: {
        //             fields: {
        //                 field1: {
        //                     type: "field",
        //                     renderer: "text",
        //                     name: "field1",
        //                     fieldType: "text",
        //                     label: "Field 1"
        //                 }
        //             },
        //             buttons: {
        //                 "add": "Add"
        //             },
        //             ...container
        //         }
        //     } }) } />);
        //
        //     wrapper.find('tfoot tr td button').simulate('click');
        //     wrapper.find('tfoot tr td button').simulate('click');
        //     // console.log(wrapper.find('tbody').props());
        //     expect(wrapper.find('tbody tr').to.have.length(2)).toEqual(true);
        // });

    })

})
