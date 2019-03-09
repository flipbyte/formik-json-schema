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

describe('Radio', () => {
    const config = {
        name: "radio",
        label: "Radio",
        options: [{
            value: 1,
            title: "One"
        }, {
            value: 'two',
            title: "Two"
        }, {
            value: 3,
            title: "Three"
        }],
        validation: [['number'], ['required']]
    };

    const radio = prepareField('radio', config);

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            radio: radio
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('on radio click - changes selection', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            radio: radio
        } }) } />);
        expect(wrapper.find('input').at(1).prop('defaultChecked')).toEqual(false);
        wrapper.find('input').at(1).simulate('change');
        expect(wrapper.find('input').at(1).prop('defaultChecked')).toEqual(true);
    });

    // it('validates on change', () => {
    //     const wrapper = mount(<Form { ...prepareForm({ elements: {
    //         radio: radio
    //     } }) } />);
    //     wrapper.find('input').at(1).simulate('change');
    //     // expect(wrapper.find('input').at(0).prop('defaultChecked')).toEqual(true);
    //     console.log(wrapper.find('Radio').props());
    // });
})
