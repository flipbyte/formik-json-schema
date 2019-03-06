import expect from 'expect'
import React from 'react';
import { configure, mount } from 'enzyme';
import {
    checkConsoleError,
    restoreConsoleError,
    prepareForm,
    prepareField,
    prepareContainer,
    submitButton
} from '../test-utils'
import { Form } from 'src';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('Checkbox', () => {
    const config = {
        fieldName: 'checkbox',
        label: 'Checkbox',
        options: [{
            value: 'checkbox-1',
            label: 'Checkbox 1'
        }, {
            value: 'checkbox-2',
            label: 'Checkbox 2'
        }, {
            value: 'checkbox-3',
            label: 'Checkbox 3'
        }, {
            value: 'checkbox-4',
            label: 'Checkbox 4'
        }]
    };

    const singleCheckbox = prepareField('checkbox', {
        name: config.fieldName,
        label: config.label,
        options: config.options.splice(0, 1)
    });

    const multipleCheckboxes = prepareField('checkbox', {
        name: config.fieldName,
        label: config.label,
        options: config.options.splice(0)
    });

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders single checkbox', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            singleCheckbox: singleCheckbox
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders multiple checkboxes', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            multipleCheckboxes: multipleCheckboxes
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    // it('adds "is-invalid" when validation fails', () => {
    //     const wrapper = mount(<Form { ...prepareForm({ elements: {
    //         save: {
    //             type: "field",
    //             renderer: "button",
    //             name: "save",
    //             label: "Save",
    //             fieldClass: "btn-success float-right",
    //             buttonType: "submit",
    //         },
    //         singleCheckbox: {
    //             name: "singleCheckbox",
    //             label: "Single option",
    //             type: "field",
    //             renderer: "checkbox",
    //             labelClass: "mr-2",
    //             fieldClass: "d-inline",
    //             options: [{
    //                 value: 'checkbox-1',
    //                 label: 'Checkbox 1'
    //             }],
    //             validation: [
    //                 ['bool'],
    //                 ['test', 'singleCheckbox.0', 'You have to select this value', value => value === true],
    //                 ['required', 'You have to select this value']
    //             ]
    //         },
    //     } }) } />);
    //     // console.log(wrapper.html());
    //     // console.log(wrapper.find('button.btn-success').html());
    //     // wrapper.find('button.btn-success').simulate('click');
    //     wrapper.find('Formik').simulate('submit', {
    //       onSubmit: wrapper.find('Formik').at(0).props().onSubmit,
    //     });
    //     // console.log(wrapper.find('Formik').at(0).props());
    //     console.log(wrapper.find('#single-checkbox-checkbox-1').html());
    //     // wrapper.find(`div.${config.defaultCardHeaderClass}`).simulate('click');
    //
    //     // expect(console.error.threw).toEqual(true);
    // });
})
